namespace ChatService.Hubs
{
	public class UserConnection
	{
        public string User { get; set; }

        public string Room { get; set; }

        public string PersonalMessageFrom { get; set; }

        public string PersonalMessageTo { get; set; }

        public string PersonalMessage { get; set; }

    }
}
