import React from 'react'
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props = {
    timestamp: Timestamp;
    message: string;
    user: {
        uid: string;
        photo: string;
        email: string;
        displayName: string;
    }
}
function ChatMessage( props: Props ) {
    const { message, timestamp, user } = props
    return (
        <div className='flex items-center px-4 pt-3.5 text-white mb-5'>
            <Avatar className='mr-4' src={user.photo} />
            <div>
                <h4>
                    {user?.displayName}
                    {timestamp ? (
                        <span className='text-gray-400 ml-5'>
                            {new Date(timestamp.toDate()).toLocaleString()}
                        </span>
                    ) : null}
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage
