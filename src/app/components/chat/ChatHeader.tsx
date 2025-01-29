import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
    channelName: string | null;
};

function ChatHeader( props: Props ) {
    const { channelName } = props;
    return (
        <div className='flex items-center justify-between w-[100%] pt-2.5'>
            {/* chatHeaderLeft */}
            <div className='pl-3'>
                <h3 className='text-white'>
                    <span className='pr-1 text-gray-400'>#</span>
                    {channelName}
                </h3>
            </div>

            {/* chatHeaderRight */}
            <div className='pr-3 flex items-center gap-3 text-gray-400 cursor-pointer'>
                <NotificationsIcon />
                <PushPinIcon />
                <PeopleIcon  className='cursor-pointer' />
                <div className='flex items-center bg-customBlack'>
                    <input type="text" placeholder='検索' className='bg-transparent outline-none text-white p-1' />
                    <SearchIcon className='p-1 rounded' />
                </div>
                <SendIcon />
                <HelpIcon />
            </div>
        </div>
    )
}

export default ChatHeader