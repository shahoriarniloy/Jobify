import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useSelector } from "react-redux";
import { HiHeart, HiOutlineEmojiHappy } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import useCurrentUser from "../../Hooks/useCurrentUser";

const CommentsPage = () => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { currentUser } = useCurrentUser();
  const emojiPickerRef = useRef(null);
  const isDarkTheme = useSelector((state) => state.theme.theme === "dark");
  const loggedUser = useSelector((state) => state.user.loggedUser);

  const {
    data: post,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allComments"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/post/${postId}`);
      return result.data;
    },
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await axiosSecure.post(`/posts/${postId}/comment`, {
        userEmail: currentUser?.email,
        userName:
          currentUser.displayName ||
          loggedUser?.name ||
          loggedUser?.displayName,
        userPhoto: loggedUser?.photoURL,
        comment: newComment,
      });
      refetch();
      if (!response.data) throw new Error("Failed to post comment");

      setNewComment("");
    } catch (error) {
      // console.error("Error posting comment:", error);
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
      refetch();
      setHasLiked(!isLiked);
    } catch (error) {
      // console.error("Error liking/unliking post:", error);
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

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div
      className={`grid lg:grid-cols-2 gap-6 lg:mx-24 mt-24 ${
        isDarkTheme ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <Helmet>
        <title>Jobify - Comments</title>
      </Helmet>
      {post && (
        <>
          <div className="relative rounded-lg border h-auto shadow-md">
            <img
              src={
                post.imageUrl || "https://source.unsplash.com/301x301/?random"
              }
              alt={t("post_image_alt")}
              className="object-cover w-full h-auto"
            />
          </div>

          <div
            className={`flex flex-col justify-between p-6 overflow-auto border shadow-md rounded-lg ${
              isDarkTheme
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-white"
            }`}
          >
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
                      }) || t("unknown_date")}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mb-4">{post.content}</p>

              <div className="flex items-center space-x-3 mb-6">
                <button
                  type="button"
                  title={t("like_post_title")}
                  className="flex items-center justify-center"
                  onClick={handleLike}
                >
                  <HiHeart
                    className={`w-5 h-5 ${
                      hasLiked
                        ? "text-blue-500"
                        : isDarkTheme
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="ml-1">{post.likes?.length || 0}</span>
                </button>
              </div>

              <h2 className="font-semibold mb-2">{t("comments_title")}</h2>
              <div
                className={`border p-4 max-h-60 overflow-auto rounded-md shadow-md ${
                  isDarkTheme ? "border-gray-600" : "border-gray-300"
                }`}
              >
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
                    className={`border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      isDarkTheme
                        ? "border-gray-600 bg-gray-700 text-gray-200"
                        : "border-gray-300 bg-white"
                    }`}
                    placeholder={t("add_comment_placeholder")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className={`absolute right-2 top-2 ${
                      isDarkTheme
                        ? "text-gray-400 hover:text-blue-500"
                        : "text-gray-500 hover:text-blue-600"
                    }`}
                    aria-label={t("emoji_picker_label")}
                  >
                    <HiOutlineEmojiHappy size={24} />
                  </button>

                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="absolute bottom-12 right-0 z-10 h-full mx-w-screen"
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
                  className={`mt-2 p-2 rounded-lg transition-colors ${
                    isDarkTheme
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {t("comment_button")}
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
