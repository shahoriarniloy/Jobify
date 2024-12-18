import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import PostStatus from "./PostStatus";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import { useTranslation } from "react-i18next";

const Feed = ({ currentUser }) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axiosSecure.get("/posts");
      setPosts(data);
    } catch (error) {
      // console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <PostStatus currentUser={currentUser} fetchPosts={fetchPosts} />

      <div className="posts-list">
        {posts.length === 0 ? (
          <p>{t("no_posts_available")}</p> // Example placeholder for no posts
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              currentUser={currentUser}
              fetchPosts={fetchPosts}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
