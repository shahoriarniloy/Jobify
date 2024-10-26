import { useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import axiosSecure from "../../Hooks/UseAxiosSecure";

const Post = ({ post }) => {
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
      console.error("Error updating like status:", error);
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
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
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
          alt="Post"
          className="w-full rounded-lg mb-3"
        />
      )}

      {/* Like & Comment actions */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={handleLike} className="flex items-center text-red-500">
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className="ml-1">
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </button>
        <button className="flex items-center text-gray-500">
          <FaComment />
          <span className="ml-1">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
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
        <div className="flex items-center mt-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 text-blue-500 font-semibold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
