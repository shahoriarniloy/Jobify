import { useState } from "react";
import PostStatusModal from "./PostStatusModal";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PostStatus = ({}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);

  return (
    <div className="post-status">
      <div
        className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
        onClick={openModal}
      >
        <p className="text-gray-600">
          {t("whats_on_your_mind")}, {currentUser?.displayName}?

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
