import PersonalChat from "./PersonalChat";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import {Button} from 'react-bootstrap';

const Chat = ({messages, sendMessage, closeConnection, users, user, initiatePersonalMessage, userPersonalMessage, recievePersonalMessages }) =>
<div>
    <div className='leave-room'>
        <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
    </div>
    <PersonalChat users={users} user={user} initiatePersonalMessage={initiatePersonalMessage} userPersonalMessage={userPersonalMessage} recievePersonalMessages={recievePersonalMessages} />
    <div className='Chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;