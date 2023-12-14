
import { Form, Button, FormControl, InputGroup} from "react-bootstrap";
import { useState } from "react";

const SendPersonalChat = ({ userPersonalMessage }) => {
    const [message, setMessage] = useState('');
    return <Form onSubmit={ e => {
        e.preventDefault();
        userPersonalMessage(message);
        setMessage('');
      }
    }>
        <div class="chat-input">
            <input type="text" placeholder="Type a message..." onChange={e => setMessage(e.target.value)} value={message} />
            <button type="submit"  disabled={!message}>Send</button>
        </div>
    </Form>
}

export default SendPersonalChat;