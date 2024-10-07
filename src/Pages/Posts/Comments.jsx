import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { HiHeart, HiOutlineEmojiHappy } from "react-icons/hi";

const CommentsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { currentUser, loading } = useCurrentUser();
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axiosSecure.get(`/post/${postId}`);
        if (!postResponse.data) throw new Error("Failed to fetch data");

        setPost(postResponse.data);
        setHasLiked(postResponse.data.likes.includes(currentUser?.email));
      } catch (error) {
        console.error("Error fetching post and comments:", error);
      }
    };

    fetchData();
  }, [postId, currentUser?.email]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await axiosSecure.post(`/posts/${postId}/comment`, {
        userEmail: currentUser.email,
        userName: currentUser.name,
        userPhoto: currentUser.photoURL,
        comment: newComment,
      });
      if (!response.data) throw new Error("Failed to post comment");

      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;

    try {
      const isLiked = post.likes.includes(currentUser.email);
      const endpoint = isLiked ? "unlike" : "like";
      await axiosSecure.put(`/posts/${postId}/${endpoint}`, {
        userEmail: currentUser.email,
      });
      setHasLiked(!isLiked);

      const updatedPostResponse = await axiosSecure.get(`/post/${postId}`);
      setPost(updatedPostResponse.data);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid lg:grid-cols-2  gap-6 lg:mx-24 mt-24">
      {post && (
        <>
          <div className="relative rounded-lg border h-auto shadow-md">
            <img
              src={
                post.imageUrl || "https://source.unsplash.com/301x301/?random"
              }
              alt="Post Image"
              className="object-cover w-full  h-auto"
            />
          </div>

          <div className="flex flex-col justify-between p-6 overflow-auto border shadow-md rounded-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      post.userPhoto ||
                      "https://source.unsplash.com/50x50/?portrait"
                    }
                    alt={`${post.userName}'s avatar`}
                    className="object-cover object-center w-10 h-10 rounded-full"
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
                      }) || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mb-4">{post.content}</p>

              <div className="flex items-center space-x-3 mb-6">
                <button
                  type="button"
                  title="Like post"
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
              <div className="border p-4 max-h-60 overflow-auto rounded-md shadow-md">
                {post?.comments.map((comment, index) => (
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
                ))}
              </div>

              <form onSubmit={handleCommentSubmit} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Add a comment"
                  />

                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-blue-500"
                    aria-label="Emoji Picker"
                  >
                    <HiOutlineEmojiHappy size={24} />
                  </button>

                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="absolute bottom-12 right-0 z-10 h-full  mx-w-screen"
                    >
                      <Picker
                        data={data}
                        perLine={7}
                        onEmojiSelect={(emoji) =>
                          setNewComment(newComment + emoji.native)
                        }
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsPage;
