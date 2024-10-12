import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useSelector, useDispatch } from "react-redux";
import { HiHeart } from "react-icons/hi";

const CommentsModal = ({ isOpen, onClose }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const postResponse = await axiosSecure.get(`/post/${postId}`);
        if (!postResponse.data) {
          throw new Error("Failed to fetch data");
        }
        setPost(postResponse.data);
        setHasLiked(postResponse.data.likes.includes(currentUser.email));
      } catch (error) {
        // console.error("Error fetching post and comments:", error);
        setError("Failed to load post.");
      }
    };

    if (postId && currentUser) {
      fetchData();
    }
  }, [postId, currentUser?.email, isOpen]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const response = await axiosSecure.post(`/posts/${postId}/comment`, {
        userEmail: currentUser.email,
        userName: currentUser.name,
        userPhoto: currentUser.photoURL,
        comment: newComment,
      });

      if (response.data) {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, response.data],
        }));
        setNewComment("");
      } else {
        throw new Error("Failed to post comment");
      }
    } catch (error) {
      // console.error("Error posting comment:", error);
      setError("Failed to post comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;

    try {
      if (hasLiked) {
        await axiosSecure.put(`/posts/${postId}/unlike`, {
          userEmail: currentUser.email,
        });
      } else {
        await axiosSecure.put(`/posts/${postId}/like`, {
          userEmail: currentUser.email,
        });
      }
      setHasLiked(!hasLiked);

      setPost((prevPost) => ({
        ...prevPost,
        likes: hasLiked
          ? prevPost.likes.filter((email) => email !== currentUser.email)
          : [...prevPost.likes, currentUser.email],
      }));
    } catch (error) {
      // console.error("Error liking/unliking post:", error);
      setError("Failed to update like status.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-auto max-h-[90vh] overflow-y-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading post...</p>
        ) : (
          post && (
            <div className="flex flex-col gap-6">
              <div className="relative">
                <img
                  src={
                    post.imageUrl ||
                    "https://source.unsplash.com/301x301/?random"
                  }
                  alt="Post Image"
                  className="object-cover w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        post.userPhoto ||
                        "https://source.unsplash.com/50x50/?portrait"
                      }
                      alt={`${post.userName}'s avatar`}
                      className="object-cover object-center w-10 h-10 rounded-full shadow-sm"
                    />
                    <div className="text-sm">
                      <h2 className="font-semibold">{post.userName}</h2>
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-4">{post.content}</p>

                <div className="flex items-center space-x-3 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={handleLike}
                  >
                    <HiHeart
                      className={`w-5 h-5 ${
                        hasLiked ? "text-blue-500" : "text-gray-500"
                      }`}
                    />
                    <span className="ml-1">{post.likes?.length || 0}</span>
                  </button>
                </div>

                <h2 className="font-semibold mb-2">Comments</h2>
                <div className="border p-4 max-h-60 overflow-auto rounded-lg">
                  {post.comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                  ) : (
                    post.comments.map((comment, index) => (
                      <div key={index} className="p-2 border-b">
                        <div className="flex items-center">
                          <img
                            src={
                              comment.userPhoto ||
                              "https://source.unsplash.com/50x50/?portrait"
                            }
                            alt={`${comment.userName}'s avatar`}
                            className="object-cover object-center w-8 h-8 rounded-full shadow-sm"
                          />
                          <div className="ml-2">
                            <strong>{comment.userName}</strong>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border p-2 w-full rounded-lg"
                    placeholder="Add a comment"
                    disabled={commentLoading}
                  />
                  <button
                    type="submit"
                    className={`mt-2 bg-blue-500 text-white p-2 rounded-lg ${
                      commentLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={commentLoading}
                  >
                    {commentLoading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          )
        )}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CommentsModal;
