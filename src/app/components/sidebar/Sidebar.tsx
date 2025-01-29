import '../../globals.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '@/app/firebase';
import { useAppSelector } from '@/app/hooks';
import Tooltip from '@mui/material/Tooltip';
import { useCollection } from '@/app/hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';


const Sidebar = () => {
    const user = useAppSelector((state) => state.user);
    const { documents: channels } = useCollection("channels");
    const addChannel = async () => {
        let channelName: string | null = prompt("新しいチャンネルを作成します");
        if (channelName) {
            await addDoc(collection(db, "channels"), {
                channelName: channelName,
            });
        }
    }
    return (
        <div className='flex h-[100vh] bg-customGreen'>

            {/* sidebarLeft */}
            <div className='bg-customBlack flex-col flex items-center px-3 py-4 gap-4'>
                <div className='flex justify-center rounded-full'>
                    <img src="/discordIcon.png" alt="" className='w-[45px]' />
                </div>
                <div className='w-[45px] h-[45px] bg-white flex justify-center rounded-full'>
                    <img src="/globe.svg" alt="" className='w-[40px]' />
                </div>
            </div>

            {/* sidebarRight */}
            <div className='relative'>
                <div className='text-white flex items-center p-5 justify-between w-[250px]'>
                    <h3>Discord</h3>
                    <ExpandMoreIcon />
                </div>

                {/* sidebarChannels */}
                <div className='px-3 mt-3'>
                    <div className='flex text-white justify-between items-center mt-1'>
                        <div className='flex items-center'>
                            <ExpandMoreIcon />
                            <h4 className='text-sm'>プログラミングチャンネル</h4>
                        </div>
                        <AddIcon className='cursor-pointer' onClick={() => addChannel()} />
                    </div>

                    <div>
                        {channels.map((channel) => (
                            <SidebarChannel 
                                channel={channel} 
                                id={channel.id} 
                                key={channel.id}    
                            />
                        ))}
                    </div>

                    {/* sidebarUser */}
                    <div className='absolute bottom-0 flex justify-between items-center w-[93%] pb-3 border-t border-t border-white/50 pt-2'>
                        <div className='flex items-center'>
                            <Tooltip title="ログアウトする" enterDelay={0}>
                                <img
                                    src={user.user?.photo}
                                    alt="user"
                                    className="w-[50px] rounded-full"
                                    onClick={() => auth.signOut()}
                                />
                            </Tooltip>
                            <div className='ml-3'>
                                <h4 className='text-white font-medium'>{user.user?.displayName}</h4>
                                <span className='text-gray-400'>#{user.user?.uid.substring(0, 4)}</span>
                            </div>
                        </div>
                        <div className='flex items-center text-gray-400 mr-2'>
                            <MicIcon />
                            <HeadphonesIcon />
                            <SettingsIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
