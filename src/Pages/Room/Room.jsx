import React from 'react';
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Link, useParams } from 'react-router-dom'
import useCurrentUser from '../../Hooks/useCurrentUser';


const Room = () => {
    const { currentUser } = useCurrentUser();
    const { roomID } = useParams();

    const startCall = async (element) => {
        const appID = 639103717;
        const serverSecret = "8de40f6b3f46174f6c83f0e0b61ed0e7";
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), currentUser?.displayName);

        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `https://jobify-13db1.web.app/${roomID}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            }
        })
    }
    return (
        <div >
{/* className='min-h-[90vh] flex flex-col justify-center items-center gap-8' */}
            <div className='h-screen' ref={startCall}></div>

            {/* <Link to="/">
                <button
                    className="bg-white px-5 py-2 lg:px-7 lg:py-3 rounded-lg text-blue-500 border border-blue-400 "
                >
                    Back to Home
                </button>
            </Link> */}

        </div>
    );
};

export default Room;