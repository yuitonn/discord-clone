import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '@/app/hooks';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { DocumentData, CollectionReference } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore';

interface Message {
    timestamp: Timestamp;
    message: string;
    user: {
        uid: string;
        photo: string;
        email: string;
        displayName: string;
    }
}

function Chat() {
    const [inputText, setInputText] = useState<string>("");
    const [message, setMessage] = useState<any[]>([]);
    const channelName = useAppSelector((state) => state.channel.channelName);
    const channelId = useAppSelector((state) => state.channel.channelId);
    const user = useAppSelector((state) => state.user.user)

    useEffect(() => {
        let collectionRef = collection (
            db, 
            "channels", 
            String(channelId),
            "message"
        );
        const collectionRefOrderBy = query(
            collectionRef,
            orderBy("timestamp", "asc")
        );

        onSnapshot(collectionRefOrderBy, (snapshot) => {
            let results: Message[] = [];
            snapshot.docs.forEach((doc) => {
                results.push({
                    timestamp: doc.data().timestamp,
                    message: doc.data().message,
                    user: doc.data().user,
                });
            });
            setMessage(results);
        });
    }, [channelId])
    
    const sendMessage = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(
        db, 
        "channels", 
        String(channelId), 
        "message"
    );
    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
    });
    console.log(docRef);
    setInputText("");
};

    return (
        <div className='bg-customGray flex flex-col w-full h-[100vh] overflow-hidden'>
            {/* chatHeader */}
            <ChatHeader channelName={channelName} />

            {/* chatMessage */}
            <div className='grow overflow-y-scroll'>
                {message.map((message, messageId) => (
                    <ChatMessage 
                        key={messageId} 
                        message={message.message} 
                        timestamp={message.timestamp}
                        user={message.user}
                    />
                ))};
            </div>
            

            {/* chatInput */}
            <div className='flex items-center justify-between p-3 rounded m-5 bg-customBlack text-gray-400'>
                <AddCircleOutlineIcon />
                <form action="" className='p-4 grow text-white'>
                    <input 
                        type="text" 
                        placeholder='#udemyへメッセージを送信' 
                        className='bg-transparent outline-none w-full' 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                        value={inputText}
                    />
                    <button 
                        type='submit' 
                        className='hidden' 
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}
                    >
                        送信
                    </button>
                </form>
                
                <div className='space-x-2'>
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat