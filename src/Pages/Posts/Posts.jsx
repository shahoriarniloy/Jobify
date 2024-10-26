import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";
import { FaComment, FaUserPlus } from "react-icons/fa";
import PostStatus from "./PostStatus";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import DashboardLoader from "../../Shared/DashboardLoader";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import LazyLoad from "react-lazyload";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

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
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
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

      // Update likes optimistically
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
      console.error("Error liking/unliking post", error);
    }
  };

  if (isLoading) return <DashboardLoader />;

  return (
    <div className={theme === "dark" ? "" : "bg-secondary"}>
      <Helmet>
        <title>Jobify - Posts</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <PostStatus />
        <div className="flex justify-between mt-16 px-4">
          <h1 className={theme === "dark"? "text-lg text-slate-300" : "text-lg text-gray-700"}>

            {t("posts_from_people_you_follow")}
          </h1>
          <Link to="/find-job-seekers">
            <button className="flex items-center gap-2">
              <FaUserPlus className="w-6 h-6 mr-1 text-blue-500" />
              <span className=" text-gray-700">Follow People</span>
            </button>
          </Link>
        </div>

        <div className="flex flex-col justify-between items-center ">
          <div className="post-list grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-8 w-full">
            {data.pages.map((page, pageIndex) =>
              page.map((post, index) => {
                const hasLiked = post.likes.includes(currentUser?.email);

                const isLastPost =
                  pageIndex === data.pages.length - 1 &&
                  index === page.length - 1;

                return (
                  <div
                    ref={isLastPost ? lastPostElementRef : null}
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
                    <LazyLoad height={200} offset={100} once>
                      <img
                        src={
                          post.imageUrl ||
                          "https://i.ibb.co/z73W3Cx/failed-to-load-error-page-404-concept-illustration-flat-design-eps10-modern-graphic-element-for-land.jpg"
                        }
                        alt="Post Image"
                        className="object-cover object-center w-full h-72 sm:h-56 md:h-64 lg:h-72 dark:bg-gray-500"
                      />
                    </LazyLoad>
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
                              className={`w-6 h-6 ${
                                hasLiked ? "text-blue-500" : "text-gray-500"
                              }`}
                            />
                            <span className="ml-1">
                              {post.likes.length || 0}
                            </span>
                          </button>

                          <Link
                            to={`/comments/${post._id}`}
                            title={t("view_comments")}
                            className="flex items-center justify-center"
                          >
                            <FaComment className="w-6 h-6 text-gray-500" />
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
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
