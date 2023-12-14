import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './components/Chat';

const App = () => {
  
  const [connection, setConnection] = useState();

  let [messages, setMessages] = useState([]);

  let [recievePersonalMessages, setRecievePersonalMessage] = useState([]);

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState();

  const joinRoom = async (user, room) => {
    try{
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7038/chat")
        .configureLogging(LogLevel.Information)
        .build();

        setUser(user);

        connection.on("UsersInRoom", (users) => {
          setUsers(users);
        })

        connection.on("RecievedMessage", (user, message) => {
          setMessages(messages = [...messages, { user, message }]);
        });
        
        connection.onclose(e => {
          setConnection();
          setMessages([]);
          setUsers([]);
          setUser('');
        });

        await connection.start();
        await connection.invoke("JoinRoom", {user, room});
        setConnection(connection);
    }catch(e){
      console.log(e);
    }
  }

  const initiatePersonalMessage = async (room, personalMessageFrom, personalMessageTo, personaMessage) => {
    const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7038/chat")
    .configureLogging(LogLevel.Information)
    .build();

    connection.on("SendPersonalMessage", (user, baduyMessage) => {
      setRecievePersonalMessage(recievePersonalMessages = [...recievePersonalMessages, { user, baduyMessage }]);

      console.log(recievePersonalMessages);
    })
    
    await connection.start();
    await connection.invoke("InitiatePersonalMessage", {room, personalMessageFrom, personalMessageTo, personaMessage});
    setConnection(connection);
  }

  const closeConnection = async () => {
    try{
      await connection.stop();
    }catch(e){
      console.log(e)
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    }catch(e){
      console.log(e);
    }
  }
  
  const userPersonalMessage = async(message) => {
    try{
      await connection.invoke("SendPersonalMessage", message);
    }catch(e){
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>My Chat</h2>
    <hr className='line' />
    {!connection ? <Lobby joinRoom={joinRoom} /> : <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users} user={user} initiatePersonalMessage={initiatePersonalMessage} userPersonalMessage={userPersonalMessage} recievePersonalMessages={recievePersonalMessages} />}
  
  </div>
}

export default App;
