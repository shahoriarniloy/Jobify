import { useState } from "react";
import PostStatusModal from "./PostStatusModal";
import useCurrentUser from "../../Hooks/useCurrentUser";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PostStatus = ({}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { currentUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);
  const loggedUser = useSelector((state) => state.user.loggedUser);

  return (
    <div className="post-status lg:w-1/2 md:w-1/2 w-full">
      <div
        className={
          theme === "dark"
            ? "bg-slate-900 shadow-md p-4 rounded-lg cursor-pointer"
            : "bg-white shadow-md p-4 rounded-lg cursor-pointer"
        }
        onClick={openModal}
      >
        <p className={theme === "dark" ? " text-slate-300" : "text-gray-600"}>
          {t("whats_on_your_mind")},{" "}
          {currentUser?.displayName ||
            loggedUser?.company_name ||
            loggedUser?.name ||
            loggedUser?.displayName}
          ?
        </p>
      </div>

      <PostStatusModal
        open={isModalOpen}
        onClose={closeModal}
        currentUser={currentUser}
      />
    </div>
  );
};

export default PostStatus;
