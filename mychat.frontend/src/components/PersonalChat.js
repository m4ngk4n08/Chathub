/* React JS */
import React, { useState, useEffect, useRef } from "react";
import SendPersonalChat from "./SendPersonalChat";

const Chatbox = ({ users, user, initiatePersonalMessage, userPersonalMessage, recievePersonalMessages }) => {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const messageRef = useRef();

//   useEffect(() =>{
//     if(messageRef && messageRef.current){
//         const { scrollHeight, clientHeight } = messageRef.current;
//         messageRef.current.scrollTo({left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' })
//     }
// }, [recievePersonalMessages])
 
  const handlesHideChatbox = (e) => {
    setIsChatboxVisible(!isChatboxVisible);
    setSelectedUser(null);

    const newMessage = {
      sender: "Me",
      message: e.target.message.value,
    };

    setMessages([...messages, newMessage]);
    e.target.message.value = "";
  };



  const handlesUserClick = (selectedUser) =>{

    setSelectedUser(selectedUser);
    initiatePersonalMessage("testroom", selectedUser, user, "Test")
  }


  return (
    <div>
      <div className='user-list'>
          <h4>Connected Users</h4>
          {users.map((user, idx) => (
              <div key={idx}>
                  <ul>
                      <li >
                      <a href="#"><h6 onClick={() => handlesUserClick(user)}>{user}</h6></a>
                      </li>
                  </ul>
              </div>
              )
          )}
      </div>

    <div class="chatbox">
        <div class="chat-header">
            <h2>Facebook Chat</h2>
        </div>
        <div class="chat-messages">
            {recievePersonalMessages.map((message, index) => 
                <div key={index} className='personalMessage from-me'>
                    <p>{message.baduyMessage}</p>
                    <p>{message.user}</p>
                </div>
            )}
            <div class="personalMessage from-other">
                <p>User</p>
                <p>Hello!</p>
            </div>
            <div class="personalMessage from-me">
                <p>User</p>
                <p>Hello!</p>
            </div>
        </div>
            <SendPersonalChat userPersonalMessage={userPersonalMessage} />
    </div>
</div>
  );
  
};

export default Chatbox;