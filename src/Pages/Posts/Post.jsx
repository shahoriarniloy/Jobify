import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Post = ({ post }) => {
  const { t } = useTranslation(); // Import useTranslation
  const isDarkTheme = useSelector((state) => state.theme.theme === "dark");
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(likes.includes(post.userEmail));
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axiosSecure.post(`/posts/${post._id}/unlike`, {
          userEmail: post.userEmail,
        });
        setLikes(likes.filter((email) => email !== post.userEmail));
      } else {
        await axiosSecure.post(`/posts/${post._id}/like`, {
          userEmail: post.userEmail,
        });
        setLikes([...likes, post.userEmail]);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(t("error_updating_like_status"), error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axiosSecure.post(`/posts/${post._id}/comment`, {
        userEmail: post.userEmail,
        content: newComment,
      });
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error(t("error_adding_comment"), error);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md mb-4 ${
        isDarkTheme ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      {/* User info */}
      <div className="flex items-center mb-3">
        <img
          src={post.userPhoto}
          alt={post.userName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{post.userName}</h4>
          <small className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </div>
      </div>

      {/* Post content */}
      <p className="mb-3">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={t("post_image_alt")}
          className="w-full rounded-lg mb-3"
        />
      )}

      {/* Like & Comment actions */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={handleLike} className="flex items-center text-red-500">
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className="ml-1">
            {likes.length}{" "}
            {likes.length === 1 ? t("like_singular") : t("like_plural")}
          </span>
        </button>
        <button className="flex items-center text-gray-500">
          <FaComment />
          <span className="ml-1">
            {comments.length}{" "}
            {comments.length === 1
              ? t("comment_singular")
              : t("comment_plural")}
          </span>
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-3">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold mr-2">{comment.userEmail}:</span>
            <span>{comment.content}</span>
          </div>
        ))}

        {/* Add a new comment */}
        <div
          className={`border rounded-lg p-2 w-full ${
            isDarkTheme
              ? "border-gray-600 bg-gray-900 text-gray-100"
              : "border-gray-300 bg-white"
          }`}
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("add_comment_placeholder")}
            className={`border rounded-lg p-2 w-full ${
              isDarkTheme
                ? "border-gray-600 bg-gray-900 "
                : "border-gray-300 bg-gray-900"
            }`}
          />
          <button
            onClick={handleAddComment}
            className={`ml-2 font-semibold ${
              isDarkTheme
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-blue-500 hover:bg-blue-100"
            } rounded-lg p-2 transition duration-200`}
          >
            {t("post_button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
