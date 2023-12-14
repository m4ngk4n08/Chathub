using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
	public class ChatHub : Hub
	{
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string,UserConnection> connections)
        {
            _botUser = "My ChatBot";
			_connections = connections;
		}

		public override Task OnDisconnectedAsync(Exception? exception)
		{
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("RecievedMessage", _botUser, $"{userConnection.User} has left the room.");

                SendConnectedUsers(userConnection.Room);
            }

			return base.OnDisconnectedAsync(exception);
		}

		public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room)
                    .SendAsync("RecievedMessage", userConnection.User, message);
            }
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("RecievedMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");

            await SendConnectedUsers(userConnection.Room);
        }

		public async Task SendPersonalMessage(string message)
		{
			if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
			{
				await Clients.Group(userConnection.Room)
					.SendAsync("SendPersonalMessage", userConnection.PersonalMessageFrom, message);
			}
		}

		public async Task InitiatePersonalMessage(UserConnection userConnection)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

			_connections[Context.ConnectionId] = userConnection;

			await Clients.Group(userConnection.Room).SendAsync("SendPersonalMessage", _botUser, $"{userConnection.User}");
		}

		public Task SendConnectedUsers(string room)
        {
            var users = _connections.Values
                .Where(j => j.Room == room)
                .Select(j => j.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
