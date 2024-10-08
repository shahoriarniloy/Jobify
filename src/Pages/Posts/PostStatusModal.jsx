import { useState, useRef, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import axios from "axios";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useQueryClient } from "@tanstack/react-query";

const PostStatusModal = ({ open, onClose, currentUser, fetchPosts }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const queryClient = useQueryClient();

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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return response.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) {
      alert("Please add some content or an image to post");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToImgBB(image);
      }

      const postData = {
        userEmail: currentUser.email,
        userName: currentUser.name,
        userPhoto: currentUser.photoURL || "default-photo.jpg",
        content,
        imageUrl,
      };

      await axiosSecure.post("/postStatus", postData);
      setContent("");
      setImage(null);
      onClose();
      queryClient.invalidateQueries(["loadedPost"])

    } catch (error) {
      console.error("Error posting status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded-md resize-none"
              rows="4"
            ></textarea>

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
                className="absolute bottom-12 right-0 z-10 h-full max-w-screen"
              >
                <Picker
                  data={data}
                  perLine={5}
                  onEmojiSelect={(emoji) => {
                    setContent(content + emoji.native);
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          {!image && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          )}

          {image && (
            <div className="relative mt-2 w-40 h-40">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute top-1 right-1 flex space-x-2">
                <button
                  type="button"
                  className="bg-red-500 p-1 rounded-full text-white"
                  onClick={handleRemoveImage}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>

                <label
                  htmlFor="replace-image"
                  className="bg-blue-500 p-1 rounded-full text-white cursor-pointer"
                >
                  <PencilIcon className="h-5 w-5" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="replace-image"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default PostStatusModal;
