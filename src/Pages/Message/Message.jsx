import React, { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useUserRole from "../../Hooks/useUserRole";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Message = () => {
  const { t } = useTranslation(); // Destructure useTranslation
  const { currentUser } = useCurrentUser();
  const [massages, setMassages] = useState();
  const [senderId, setSenderId] = useState();
  const [userInput, setUserInput] = useState("");
  const [ref, setRef] = useState();
  const role = useUserRole();
  const theme = useSelector((state) => state.theme.theme);

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
    role.role === "Job Seeker"
      ? `/send-massage?senderId=${currentUser?.email}&receiverId=${senderId}`
      : `/send-massage?senderId=${senderId}&receiverId=${currentUser?.email}`;

  const handelSendMassage = async () => {
    const { data } = await axiosSecure.post(url, {
      massage: userInput,
      smsSender: currentUser?.email,
    });
    if (data?.acknowledged) {
      refetch();
      setUserInput("");
    }
  };

  useEffect(() => {
    const result = data?.find((msg) => msg._id == ref);
    setMassages(result?.messages);
  }, [ref, data]);

  const messagingWithName = () => {
    const currentMsg = data?.find((msg) => msg._id === ref);
    return role.role === "Job Seeker"
      ? currentMsg?.receiverName
      : currentMsg?.senderName;
  };

  return (
    <div
      className={`h-full ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex h-full gap-2">
        <div
          className={`border-r-2 w-1/2 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-black"
          }`}
        >
          <h1 className="mb-4">Messages</h1>
          {data?.map((msg) => (
            <div
              key={msg._id}
              onClick={() => {
                setMassages(msg?.messages);
                setSenderId(
                  role.role === "Job Seeker" ? msg?.receiver : msg?.sender
                );
                setRef(msg._id);
              }}
              className={`flex items-center gap-2 border-b cursor-pointer mb-2 ${
                msg._id === ref
                  ? `rounded-md p-1 ${
                      theme === "dark" ? "bg-gray-800" : "bg-blue-100"
                    }`
                  : ""
              } ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            >
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    role.role === "Job Seeker" ? msg.receiverImg : msg.senderImg
                  }
                  alt=""
                />
              </div>
              <div>
                <h3>
                  {role.role === "Job Seeker"
                    ? msg.receiverName
                    : msg.senderName}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {massages ? (
          <div className="w-2/3 flex flex-col justify-between h-full">
            <div>
              <div
                className={`flex justify-between w-full border-2 px-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-blue-100 text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <h1 className="py-2">{messagingWithName()}</h1>
                </div>
              </div>

              <div className="mt-4 h-[340px] overflow-y-scroll">
                {massages?.map((sms) => (
                  <div
                    key={sms._id}
                    className={`chat ${
                      currentUser.email === sms.sender
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    <div
                      className={`chat-bubble ${
                        theme === "dark"
                          ? "bg-blue-800 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {sms?.massage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                onChange={(e) => setUserInput(e.target.value)}
                type="text"
                value={userInput}
                placeholder={t("type_message_here")} // Translated
                className="input input-bordered input-md w-full max-w-xs text-gray-900"
              />
              <button
                onClick={() => handelSendMassage()}
                className="btn bg-blue-600 text-white hover:bg-blue-500"
              >
                {t("send")} <BsFillSendFill /> {/* Translated */}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex flex-col justify-center items-center gap-4 h-full">
            <FaFacebookMessenger
              className={`text-4xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h2
              className={`font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-blue-700"
              }`}
            >
              {t("select_a_conversation")}{" "}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
