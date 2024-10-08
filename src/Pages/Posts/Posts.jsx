import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { FaComment } from "react-icons/fa";
import PostStatus from "./PostStatus";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";

const PostCard = () => {
  const { currentUser } = useCurrentUser();


  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ["loadedPost"],
    queryFn: async () => {
      const result = await axiosSecure.get("/posts");
      return result.data;
    }
  })

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
      console.error("Error liking/unliking post", error);
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="lg:w-1/2 mt-12">
        <PostStatus></PostStatus>
      </div>

      <div className="post-list grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-6 mt-24">
        {posts.map((post) => {
          const hasLiked = post.likes.includes(currentUser?.email);

          return (
            <div
              key={post._id}
              className="rounded-md shadow-md w-96 dark:bg-gray-50 dark:text-gray-800"
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
                      }) || "Unknown"}
                    </span>
                  </div>
                </div>
                <button title="Open options" type="button"></button>
              </div>
              <img
                src={
                  post.imageUrl || "https://source.unsplash.com/301x301/?random"
                }
                alt="Post Image"
                className="object-cover object-center w-full h-72 dark:bg-gray-500"
              />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      title={hasLiked ? "Unlike post" : "Like post"}
                      className="flex items-center justify-center"
                      onClick={() => handleLike(post._id, hasLiked)}
                    >
                      <HiHeart
                        className={`w-5 h-5 ${hasLiked ? "text-blue-500" : "text-gray-500"
                          }`}
                      />
                      <span className="ml-1">{post.likes.length || 0}</span>
                    </button>

                    <Link
                      to={`/comments/${post._id}`}
                      title="View Comments"
                      className="flex items-center justify-center"
                    >
                      <FaComment className="w-5 h-5 text-gray-500" />
                      <span className="ml-1">{post.comments?.length || 0}</span>
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
  );
};

export default PostCard;
