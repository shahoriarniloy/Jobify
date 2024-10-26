import { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { FaComment, FaHeart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { t } from "i18next";

const FollowPosts = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFollowingState, setIsFollowingState] = useState({});

  const currentUser = useCurrentUser();
  const userEmail = currentUser?.currentUser?.email;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [followingRes, followersRes] = await Promise.all([
          axiosSecure.get(`/users/following/${userEmail}`),
          axiosSecure.get(`/users/followers/${userEmail}`),
        ]);
        setFollowing(followingRes.data);
        setFollowers(followersRes.data);

        const initialFollowState = {};
        followingRes.data.forEach((user) => {
          initialFollowState[user.email] = true;
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

      setPosts(postsRes.data);
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

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 p-4 bg-secondary">
      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto h-fit">
        <h3 className="text-lg font-semibold mb-2">Following</h3>
        <ul className="space-y-3">
          {following?.map((user) => (
            <li key={user?._id} className="flex items-center space-x-3">
              <Link to={`/userProfile/${user?.email}`}>
                <img
                  src={user?.photoURL}
                  alt={`${user?.name}'s avatar`}
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </Link>
              <button
                onClick={() =>
                  handleFollowToggle(user?.email, isFollowingState[user.email])
                }
                className={`px-3 py-1 rounded-lg text-sm font-medium ml-auto flex items-center space-x-2 ${
                  isFollowingState[user.email]
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {isFollowingState[user.email] ? (
                  <>
                    <FaUserMinus className="mr-1" /> <span>Unfollow</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus className="mr-1" /> <span>Follow</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Your Posts</h3>
        <div className="grid  grid-cols-1 space-y-4 gap-4">
          {posts?.map((post) => (
            <div key={post?._id} className="p-4 bg-gray-50 rounded-lg shadow">
              <Link to={`/comments/${post._id}`} title={t("view_comments")}>
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={post?.userPhoto}
                    alt={`${post?.userName}'s avatar`}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <h4 className="font-semibold text-gray-800">
                    {post?.userName}
                  </h4>
                </div>
                <p className="text-gray-700 mb-2">
                  {post?.content?.split(" ").slice(0, 20).join(" ")}
                  {post?.content?.split(" ").length > 20 && "…see more"}
                </p>
                {post?.imageUrl && (
                  <img
                    src={post?.imageUrl}
                    alt="Post visual"
                    className="w-full  rounded-lg mb-2"
                    loading="lazy"
                  />
                )}
                <div className="flex space-x-4 text-lg text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaHeart /> {post?.likes?.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment /> {post?.comments?.length}
                  </span>
                </div>
              </Link>
            </div>
          ))}
          {loading && (
            <p className="text-center text-gray-500">Loading posts...</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto h-fit">
        <h3 className="text-lg font-semibold mb-2">Followers</h3>
        <ul className="space-y-3">
          {followers?.map((user) => (
            <li key={user?._id} className="flex items-center space-x-3">
              <img
                src={user?.photoURL}
                alt={`${user?.name}'s avatar`}
                className="w-10 h-10 rounded-full"
                loading="lazy"
              />
              <span className="text-gray-700 font-medium">
                {user?.name || user.displayName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowPosts;
