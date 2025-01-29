import React, { use, useEffect } from 'react'
import '../../globals.css';
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch } from '@/app/hooks';
import { setChannelInfo } from '@/app/features/channelSlice';

type Props = {
    id: string,
    channel: DocumentData
}

function SidebarChannel(props: Props) {
    const { id, channel } = props;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            setChannelInfo({
                channelId: id,
                channelName: channel.channel.channelName,
            })
        )
    }, []);
    return (
        <div className='mt-2' 
            onClick={() => 
                dispatch(
                    setChannelInfo({
                        channelId: id,
                        channelName: channel.channel.channelName,
                    })
                )
            }
        >
            <h4 className='pl-5 text-gray-400 items-center hover:text-white hover:bg-customBlack rounded p-1'>
                <span className='pr-2'>#</span>
                {channel.channel.channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel