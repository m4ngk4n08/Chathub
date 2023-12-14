import { useState, useRef } from 'react';
import PersonalChat from "./PersonalChat";
      

const ConnectedUsers = ({users}) => {
    
    const [selectedUser, setSelectedUser] = useState(null);

    const handlesUserClick = (user) =>{
        setSelectedUser(user);
    }

    return <div className='user-list'>
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
        {<PersonalChat user={selectedUser} />}
    </div>
}


export default ConnectedUsers;
