import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useUserRole from "../../Hooks/useUserRole";
import { FaFacebookMessenger } from "react-icons/fa6";

const Message = () => {
  const { currentUser } = useCurrentUser();
  const [massages, setMassages] = useState();
  const [senderId, setSenderId] = useState();
  const [userInput, setUserInput] = useState("");
  const [ref, setRef] = useState();
  const role = useUserRole();
  const { data, refetch } = useQuery({
    queryKey: ["load massage"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/get-all-message?senderId=${currentUser?.email}`
      );
      return data;
    },
  });
  const url =
    role.role == "Job Seeker"
      ? `/send-massage?senderId=${currentUser?.email}&receiverId=${senderId}`
      : `/send-massage?senderId=${senderId}&receiverId=${currentUser?.email}`;

  const handelSendMassage = async () => {
    const { data } = await axiosSecure.post(url, {
      massage: userInput,
      smsSender: currentUser?.email,
    });
    if (data?.acknowledged) {
      refetch();
      setUserInput(" ");
    }
  };
  useEffect(() => {
    const result = data?.find((msg) => msg._id == ref);
    setMassages(result?.messages);
  }, [handelSendMassage]);

  return (
    <div className="h-full ">
      <div className="flex h-full gap-2">
        {/* connected Peoples */}
        <div className="border-r-2 w-1/3">
          {data?.map((msg) => (
            <div
              key={msg._id}
              onClick={() => {
                setMassages(msg?.messages);
                setSenderId(
                  role.role == "Job Seeker" ? msg?.receiver : msg?.sender
                );
                setRef(msg._id);
              }}
              className="flex items-center gap-2 border-b mb-2 cursor-pointer"
            >
              <div>
                <img
                  className="size-[46px] rounded-full"
                  src={
                    role.role == "Job Seeker" ? msg.receiverImg : msg.senderImg
                  }
                  alt=""
                />
              </div>

              <div>
                <h3>
                  {role.role == "Job Seeker"
                    ? msg.receiverName
                    : msg.senderName}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* conversation details */}
        {massages ? (
          <div className="w-2/3 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between w-full border-2 px-2 rounded-lg">
                <div className="flex items-center gap-3">
                  {/* header */}
                  <div>
                    <img
                      className="size-[46px] rounded-full"
                      src="https://th.bing.com/th/id/OIP.Lpx9j83qR_cfQuaPHuvwWQHaHw?rs=1&pid=ImgDetMain"
                      alt=""
                    />
                  </div>

                  <h1>Name</h1>
                </div>

                <button>
                  <IoSettings className="text-2xl" />
                </button>
              </div>

              {/* message body */}

              <div className="mt-4 h-[340px] overflow-y-scroll">
                {massages?.map((sms) => (
                  <>
                    {currentUser.email == sms.sender ? (
                      <div className="chat chat-end">
                        <div className="chat-bubble"> {sms?.massage}</div>
                      </div>
                    ) : (
                      <div className="chat chat-start">
                        <div className="chat-bubble">{sms?.massage}</div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            {/* send massage */}
            <div className="flex items-center gap-4">
              <input
                onChange={(e) => setUserInput(e.target.value)}
                type="text"
                value={userInput}
                placeholder="Type Message here"
                className="input input-bordered input-md w-full max-w-xs"
              />

              <button
                onClick={() => handelSendMassage()}
                className="btn bg-blue-700 text-white hover:bg-blue-600"
              >
                send <BsFillSendFill />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex flex-col justify-center items-center gap-4 h-full">
            <FaFacebookMessenger className="text-4xl text-blue-400" />
            <h2 className="text-blue-700 font-semibold">
              Select a conversation
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
