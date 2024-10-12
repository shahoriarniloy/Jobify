import { useState } from "react";
import PostStatusModal from "./PostStatusModal";
import { useSelector } from "react-redux";

const PostStatus = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="post-status">
      <div
        className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
        onClick={openModal}
      >
        <p className="text-gray-600">
          What's on your mind, {currentUser?.displayName}?
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
