import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { FaComment } from "react-icons/fa";
import PostStatus from "./PostStatus";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import { FaUserPlus } from "react-icons/fa";
import axiosSecure from "../../Hooks/useAxiosSecure";
import { useTranslation } from "react-i18next"; // Import useTranslation

const PostCard = () => {
  const { t } = useTranslation(); // Destructure t from useTranslation
  const currentUser = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.theme);

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loadedPost"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/posts?currentUserEmail=${currentUser?.email}`
      );
      return result.data;
    },
  });

  const handleLike = async (postId, hasLiked) => {
    try {
      if (hasLiked) {
        await axiosSecure.put(`/posts/${postId}/unlike`, {
          userEmail: currentUser?.email,
        });
      } else {
        await axiosSecure.put(`/posts/${postId}/like`, {
          userEmail: currentUser?.email,
        });
      }
      refetch();
    } catch (error) {
      // console.error("Error liking/unliking post", error);
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className={theme === "dark" ? "" : "bg-secondary"}>
      <div className="container mx-auto py-8">
        <PostStatus />
        <div className="flex justify-between mt-16 px-4">
          <h1 className="text-lg text-gray-700">
            {t("posts_from_people_you_follow")}
          </h1>
          <Link to="/find-job-seekers">
            <button>
              <FaUserPlus className="w-6 h-6 mr-1 text-blue-500" />
            </button>
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center px-4">
          <div className="post-list grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-8 w-full">
            {posts.map((post) => {
              const hasLiked = post.likes.includes(currentUser?.email);

              return (
                <div
                  key={post._id}
                  className="rounded-md shadow-md w-full sm:max-w-sm lg:max-w-md dark:bg-gray-50 dark:text-gray-800"
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={
                          post.userPhoto ||
                          "https://source.unsplash.com/50x50/?portrait"
                        }
                        alt={`${post.userName}'s avatar`}
                        className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300"
                      />
                      <div className="-space-y-1">
                        <h2 className="text-sm font-semibold leading-none">
                          {post.userName}
                        </h2>
                        <span className="inline-block text-xs leading-none dark:text-gray-600">
                          {new Date(post.createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }) || t("unknown")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <img
                    src={
                      post.imageUrl ||
                      "https://i.ibb.co.com/z73W3Cx/failed-to-load-error-page-404-concept-illustration-flat-design-eps10-modern-graphic-element-for-land.jpg"
                    }
                    alt="Post Image"
                    className="object-cover object-center w-full h-72 sm:h-56 md:h-64 lg:h-72 dark:bg-gray-500"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          title={hasLiked ? t("unlike_post") : t("like_post")}
                          className="flex items-center justify-center"
                          onClick={() => handleLike(post._id, hasLiked)}
                        >
                          <HiHeart
                            className={`w-5 h-5 ${
                              hasLiked ? "text-blue-500" : "text-gray-500"
                            }`}
                          />
                          <span className="ml-1">{post.likes.length || 0}</span>
                        </button>

                        <Link
                          to={`/comments/${post._id}`}
                          title={t("view_comments")}
                          className="flex items-center justify-center"
                        >
                          <FaComment className="w-5 h-5 text-gray-500" />
                          <span className="ml-1">
                            {post.comments?.length || 0}
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <p>{post.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
