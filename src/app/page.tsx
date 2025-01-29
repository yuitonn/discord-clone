"use client";

import React, { useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/chat/Chat'
import { Provider } from 'react-redux'
import { store } from './store'
import Login from './components/login/Login';
import { useAppDispatch, useAppSelector } from './hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/utils/ErrorFallBack';

const App = () => {
    return (
        <Provider store={store} >
            <InnerComponent />
        </Provider>
    );
}

const InnerComponent = () => {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        auth.onAuthStateChanged((LoginUser) => {
            console.log(LoginUser);
            if (LoginUser) {
                dispatch(login({
                    uid: LoginUser.uid,
                    photo: LoginUser.photoURL,
                    email: LoginUser.email,
                    displayName: LoginUser.displayName,
                }));
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return (
        <>
            {user ? (
                <div className='flex'>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Sidebar />
                    </ErrorBoundary>
                    <Chat />
                </div>
            ) : (
                <Login />
            )}
        </>
    );
}

export default App  
