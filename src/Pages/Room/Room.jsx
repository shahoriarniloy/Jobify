
import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Link, useParams } from "react-router-dom";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Helmet } from "react-helmet";

const Room = () => {
  const {currentUser} = useCurrentUser();
  const { roomID } = useParams();

  const startCall = async (element) => {
    const appID = 639103717;
    const serverSecret = "8de40f6b3f46174f6c83f0e0b61ed0e7";

    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      currentUser?.email,
      currentUser?.displayName || "Null"
    );

    const zp = ZegoUIKitPrebuilt.create(TOKEN);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://jobify-13db1.web.app/rooms/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });

    zp.addPlugins({ ZegoSuperBoardManager });
  };

  return (
    <div className="h-screen zego-room-background">
       <Helmet>
        <title>Jobify - Room</title>
      </Helmet>
      <div className="h-full" ref={startCall}></div>
    </div>
  );
};

export default Room;

