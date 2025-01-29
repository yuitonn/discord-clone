import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from "../../firebase";

function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider).catch((err) =>{
            alert(err.message);
        });
    };
    return (
        <div className='flex flex-col justify-center items-center w-full h-[100vh] gap-7'>
            <div>
                <img src="/discordIcon.png" alt="" className='w-[150px] object-cover flex justify-center'/>
            </div>

            <Button 
                onClick={signIn} 
                className='w-[150px] text-black font-semibold hover:bg-customBlack hover:text-white'
            >
                ログイン
            </Button>
        </div>
    )
}

export default Login
