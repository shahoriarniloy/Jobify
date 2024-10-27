import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import {
  FaComment,
  FaHeart,
  FaUserMinus,
  FaUserPlus,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"; // Import useSelector

const FollowPosts = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState({});
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  const userEmail = currentUser?.currentUser?.email;
  const theme = useSelector((state) => state.theme.theme); // Access theme from Redux

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [followingRes, followersRes] = await Promise.all([
          axiosSecure.get(`/users/following/${userEmail}`),
          axiosSecure.get(`/users/followers/${userEmail}`),
        ]);
        setFollowing(followingRes?.data);
        setFollowers(followersRes?.data);

        const initialFollowState = {};
        followingRes.data.forEach((user) => {
          initialFollowState[user?.email] = true;
        });
        setIsFollowingState(initialFollowState);
      } catch (error) {
        console.error("Error fetching followers data:", error);
      }
    };

    fetchInitialData();
  }, [userEmail]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const screenBasedLimit = Math.ceil(window.innerHeight / 100);
      const postsRes = await axiosSecure.get(
        `/ownPosts/${userEmail}?limit=${screenBasedLimit}`
      );
      setPosts(postsRes?.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const handleResize = () => fetchPosts();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollowToggle = async (followedEmail, isFollowing) => {
    try {
      if (isFollowing) {
        await axiosSecure.delete("/unfollow-job-seeker", {
          data: { followerEmail: userEmail, followedEmail },
        });
      } else {
        await axiosSecure.post("/follow-job-seeker", {
          followerEmail: userEmail,
          followedEmail,
        });
      }
      setIsFollowingState((prevState) => ({
        ...prevState,
        [followedEmail]: !isFollowing,
      }));
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axiosSecure.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleRemoveFollower = async (followerEmail) => {
    try {
      await axiosSecure.delete("/remove-follower", {
        data: { followerEmail, followedEmail: userEmail },
      });
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.email !== followerEmail)
      );
    } catch (error) {
      console.error("Error removing follower:", error);
    }
  };

  return (
    <div
      className={`flex lg:flex-row flex-col p-4 gap-6 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="w-full lg:w-2/3">
        <div
          className={`p-6 rounded-lg shadow-md border-2 border-gray-200 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">{t("your_posts")}</h3>

          <div className="space-y-4">
            {posts?.map((post) => (
              <div
                key={post?._id}
                className={`p-4 rounded-lg shadow ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <Link
                    to={`/comments/${post._id}`}
                    title={t("view_comments")}
                    className="flex-1"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={post?.userPhoto}
                        alt={`${post?.userName}'s avatar`}
                        className="w-10 h-10 rounded-full"
                        loading="lazy"
                      />
                      <h4
                        className={`font-semibold ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {post?.userName}
                      </h4>
                    </div>
                    <p
                      className={`text-gray-700 mb-2 ${
                        theme === "dark" ? "dark:text-gray-300" : ""
                      }`}
                    >
                      {post?.content?.split(" ").slice(0, 20).join(" ")}
                      {post?.content?.split(" ").length > 20 && "…see more"}
                    </p>
                    {post?.imageUrl && (
                      <img
                        src={post?.imageUrl}
                        alt="Post visual"
                        className="w-full rounded-lg mb-2"
                        loading="lazy"
                      />
                    )}
                    <div
                      className={`flex space-x-4 text-lg ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <FaHeart /> {post?.likes?.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment /> {post?.comments?.length}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post?._id)}
                    className="text-red-500 hover:text-red-600 ml-4"
                    title="Delete Post"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            {loading && (
              <p
                className={`text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("loading")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div
          className={`p-4 rounded-lg shadow-md border-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } h-[calc(50vh-1rem)] overflow-y-auto`}
        >
          <h3 className="text-lg font-semibold mb-4">{t("following")}</h3>
          <ul className="space-y-3">
            {following?.map((user) => (
              <li key={user?._id} className="flex flex-row items-center">
                <Link
                  to={`/userProfile/${user?.email}`}
                  className="flex flex-row gap-4"
                >
                  <img
                    src={user?.photoURL}
                    alt={`${user?.name || user?.displayName}'s avatar`}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <span
                    className={`text-gray-700 font-medium ${
                      theme === "dark" ? "dark:text-gray-200" : ""
                    }`}
                  >
                    {user?.name || user?.displayName}
                  </span>
                </Link>
                <button
                  onClick={() =>
                    handleFollowToggle(
                      user?.email,
                      isFollowingState[user.email]
                    )
                  }
                  className={`px-3 py-1 rounded-lg text-sm font-medium ml-auto flex items-center space-x-2 ${
                    isFollowingState[user.email]
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  {isFollowingState[user.email] ? (
                    <>
                      <FaUserMinus className="mr-1" />{" "}
                      <span>{t("unfollow")}</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-1" /> <span>{t("follow")}</span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`p-4 rounded-lg shadow-md border-2 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } h-[calc(50vh-1rem)] overflow-y-auto`}
        >
          <h3 className="text-lg font-semibold mb-4">{t("followers")}</h3>
          <ul className="space-y-3">
            {followers?.map((follower) => (
              <li key={follower?._id} className="flex flex-row items-center">
                <Link
                  to={`/userProfile/${follower?.email}`}
                  className="flex flex-row gap-4"
                >
                  <img
                    src={follower?.photoURL}
                    alt={`${follower?.name || follower?.displayName}'s avatar`}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <span
                    className={`text-gray-700 font-medium ${
                      theme === "dark" ? "dark:text-gray-200" : ""
                    }`}
                  >
                    {follower?.name || follower?.displayName}
                  </span>
                </Link>
                <button
                  onClick={() => handleRemoveFollower(follower.email)}
                  className="text-red-500 hover:text-red-600 ml-auto"
                  title="Remove Follower"
                >
                  <FaUserMinus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowPosts;
