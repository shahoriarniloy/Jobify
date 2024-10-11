import React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Link, useParams } from 'react-router-dom'
import useCurrentUser from '../../Hooks/useCurrentUser';
import { ZegoSuperBoardManager } from "zego-superboard-web";



const Room = () => {
    const { currentUser } = useCurrentUser();
    const { roomID } = useParams();




    // const startCall = async (element) => {
    //     const appID = 639103717;
    //     const serverSecret = "8de40f6b3f46174f6c83f0e0b61ed0e7";

    //     const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    //         appID,
    //         serverSecret,
    //         roomID,
    //         currentUser.email,
    //         currentUser.displayName
    //     );

    //     const zp = ZegoUIKitPrebuilt.create(TOKEN);

    //     // Join the room
    //     zp.joinRoom({
    //         container: element,
    //         sharedLinks: [
    //             {
    //                 name: "Copy Link",
    //                 url: `https://jobify-13db1.web.app/rooms/${roomID}`
    //             }
    //         ],
    //         onUserAvatarSetter: (userList) => {
    //             userList.forEach(user => {
    //                 const defaultAvatar = "https://example.com/default-avatar.png";
    //                 const userAvatar = user.photoURL || defaultAvatar;
    //                 user.setUserAvatar(userAvatar);
    //             });
    //         },
    //         scenario: {
    //             mode: ZegoUIKitPrebuilt.GroupCall
    //         },
    //         videoResolutionList: [
    //             ZegoUIKitPrebuilt.VideoResolution_360P,
    //             ZegoUIKitPrebuilt.VideoResolution_180P,
    //             ZegoUIKitPrebuilt.VideoResolution_480P,
    //             ZegoUIKitPrebuilt.VideoResolution_720P,
    //         ],
    //         videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,
    //     });
    //     zp.addPlugins({ZegoSuperBoardManager});

    //     // Delay setting the background to ensure ZegoUIKitPrebuilt doesn't override it
    //     setTimeout(() => {
    //         element.style.backgroundColor = 'white !important';
    //     }, 1000);  // Adjust delay as necessary
    // };


    const startCall = async (element) => {
        const appID = 639103717;
        const serverSecret = "8de40f6b3f46174f6c83f0e0b61ed0e7";

        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            currentUser.email,
            currentUser.displayName
        );

        const zp = ZegoUIKitPrebuilt.create(TOKEN);

        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `https://jobify-13db1.web.app/rooms/${roomID}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            },
        });

        zp.addPlugins({ ZegoSuperBoardManager });


    };

    return (
        <div className="h-screen zego-room-background">
            <div className="h-full" ref={startCall}></div>
        </div>
    );

};

export default Room;


