import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { FaComment, FaHeart } from "react-icons/fa";

const UserProfile = () => {
  const { userEmail } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const isDarkTheme = useSelector((state) => state.theme.theme === "dark");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axiosSecure.get(`/users/${userEmail}`);
        const postsRes = await axiosSecure.get(`/ownPosts/${userEmail}`);

        setUserData(userRes?.data);
        setPosts(postsRes?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-secondary text-black"
      } p-6`}
    >
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-md mx-auto mb-6 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center mt-6">
          <img
            src={userData?.photoURL}
            alt={`${userData?.name}'s avatar`}
            className="w-16 h-16 rounded-full"
            loading="lazy"
          />
          <h2 className="text-3xl font-semibold">{userData?.name}</h2>
          <p className="text-xl">{userData?.role}</p>
          <p>{userData?.phone}</p>
          <div className="mt-2">
            {userData?.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-blue-600 hover:underline mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link?.platform}
              </a>
            ))}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: userData?.userInfo[0]?.about }}
            className="text-gray-700 text-center"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Education Section */}
        <div
          className={` p-4 sm:p-6 rounded-lg shadow-md lg:w-1/3 mb-6 h-fit ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          <ul className="space-y-4">
            {userData?.education?.map((edu, index) => (
              <li key={index} className="border-b pb-2">
                <h4 className="font-semibold">
                  {edu?.degree} in {edu.field}
                </h4>
                <p>{edu?.schoolName}</p>
                <p>
                  {edu?.startDate} - {edu.endDate}
                </p>
                <p>CGPA: {edu?.cgpa}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                  className={`${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Posts Section */}
        <div
          className={`p-4 sm:p-6 rounded-lg lg:w-2/3 mb-6 container mx-auto ${
            isDarkTheme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Posts</h3>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {posts?.map((post) => (
              <div
                key={post._id}
                className={`p-4 rounded-lg shadow ${
                  isDarkTheme
                    ? "bg-gray-700 text-gray-100"
                    : "bg-white text-gray-800"
                }`}
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
                      isDarkTheme ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {post?.userName}
                  </h4>
                </div>
                <p
                  className={`mb-2 ${
                    isDarkTheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {post.content.split(" ").slice(0, 20).join(" ")}
                  {post.content.split(" ").length > 20 && "…see more"}
                </p>
                {post?.imageUrl && (
                  <img
                    src={post?.imageUrl}
                    alt="Post visual"
                    className="w-full rounded-lg mb-2 object-cover"
                    loading="lazy"
                  />
                )}
                <div
                  className={`flex space-x-4 text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <FaHeart />
                    {post?.likes?.length}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment /> {post?.comments?.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
