import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { FaComment, FaUserPlus } from "react-icons/fa";
import PostStatus from "./PostStatus";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { t } from "i18next";

const MAX_POSTS = 100;

const PostCard = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const theme = useSelector((state) => state.theme.theme);
  const queryClient = useQueryClient();
  const observer = useRef();

  // Fetch posts with infinite scrolling
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["loadedPost"],
    async ({ pageParam = 1 }) => {
      const result = await axiosSecure.get(
        `/posts?currentUserEmail=${currentUser?.email}&page=${pageParam}&limit=5`
      );
      return result.data;
    },
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.flat().length < MAX_POSTS && lastPage.length
          ? allPages.length + 1
          : undefined,
    }
  );

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  const handleLike = async (postId, hasLiked) => {
    try {
      const url = `/posts/${postId}/${hasLiked ? "unlike" : "like"}`;
      await axiosSecure.put(url, { userEmail: currentUser?.email });

      // Optimistically update likes
      queryClient.setQueryData(["loadedPost"], (oldData) =>
        oldData.pages.map((page) =>
          page.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: hasLiked
                    ? post.likes.filter((email) => email !== currentUser?.email)
                    : [...post.likes, currentUser?.email],
                }
              : post
          )
        )
      );
    } catch (error) {
      // console.error("Error liking/unliking post", error);
    }
  };

  if (isLoading) return <DashboardLoader />;

  return (
    <div
      className={`container mx-auto py-8 ${
        theme === "dark" ? " text-white" : "bg-secondary text-gray-800"
      }`}
    >
      <Helmet>
        <title>Jobify - Posts</title>
      </Helmet>

      <PostStatus />
      <div className="flex justify-between mt-16 px-4">
        <h1
          className={`text-lg ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}
        >
          {t("posts_from_people_you_follow")}
        </h1>
        <Link to="/find-job-seekers">
          <button className="flex items-center gap-2">
            <FaUserPlus
              className={`w-6 h-6 mr-1 ${
                theme === "dark" ? "text-blue-400" : "text-blue-500"
              }`}
            />
            <span className="text-gray-700">{t("follow_people")}</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-between items-center">
        <div className="post-list grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-8 w-full">
          {data?.pages?.map((page) =>
            page.map((post, index) => {
              const hasLiked = post.likes.includes(currentUser?.email);
              const isLastPost = index === page.length - 1;

              return (
                <PostCardItem
                  key={post._id}
                  post={post}
                  hasLiked={hasLiked}
                  handleLike={handleLike}
                  ref={isLastPost ? lastPostElementRef : null}
                  theme={theme}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const PostCardItem = React.forwardRef(({ post, hasLiked, handleLike }, ref) => {
  const { userPhoto, userName, createdAt, imageUrl, content, likes, comments } =
    post;

  const sliceContent = (text) => {
    const words = text.split(" ");
    return words.length > 20
      ? words.slice(0, 20).join(" ") + "...[Read More]"
      : text;
  };

  return (
    <div
      ref={ref}
      className="rounded-md shadow-md w-full sm:max-w-sm lg:max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img
            src={userPhoto || "https://source.unsplash.com/50x50/?portrait"}
            alt={`${userName}'s avatar`}
            className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300"
          />
          <div className="-space-y-1">
            <h2 className="text-sm font-semibold leading-none">{userName}</h2>
            <span className="inline-block text-xs leading-none">
              {new Date(createdAt).toLocaleString("en-US", {
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
          imageUrl ||
          "https://i.ibb.co/z73W3Cx/failed-to-load-error-page-404-concept-illustration-flat-design-eps10-modern-graphic-element-for-land.jpg"
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
              className="flex items-center justify-center transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-300"
              onClick={() => handleLike(post._id, hasLiked)}
            >
              <HiHeart
                className={`w-6 h-6 ${
                  hasLiked ? "text-blue-500" : "text-gray-500"
                }`}
              />
              <span className="ml-1">{likes.length || 0}</span>
            </button>

            <Link
              to={`/comments/${post._id}`}
              title={t("view_comments")}
              className="flex items-center justify-center transition-colors duration-200 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <FaComment className="w-6 h-6 text-gray-500" />
              <span className="ml-1">{comments?.length || 0}</span>
            </Link>
          </div>
        </div>

        <Link to={`/comments/${post._id}`}>
          <div>
            <p>{sliceContent(content)}</p>
          </div>
        </Link>
      </div>
    </div>
  );
});

PostCardItem.displayName = "PostCardItem";

export default PostCard;
