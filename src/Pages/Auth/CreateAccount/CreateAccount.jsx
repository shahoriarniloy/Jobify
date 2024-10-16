import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowRight } from "react-icons/ti";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../Redux/userSlice";
import axiosSecure from "../../../Hooks/UseAxiosSecure";

const Register = ({ setLoginModalOpen, setSignUpModalOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const accountType = selectedIndex === 0 ? "Job Seeker" : "Employer";

  const { loading, error } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await dispatch(
        createUser({ email, password })
      ).unwrap();
      const { email: userEmail, uid, photoURL } = userCredential;

      try {
        const response = await axiosSecure.post("/users", {
          name,
          email: userEmail,
          uid: uid,
          photoURL: photoURL || "",
          role: accountType,
        });

        const dbResult = response.data;

        if (dbResult.insertedId) {
          // console.log("User added to the database:", dbResult);
        } else {
          // console.log(dbResult.message || "User already exists");
        }

        toast.success("Account created successfully!");
        setSignUpModalOpen(false);
        setLoginModalOpen(true);
      } catch (dbError) {
        // console.error("Failed to add user to the database:", dbError);
        toast.error("Failed to save user data to the database.");
      }
    } catch (error) {
      // console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center w-[400px] max-w-2xl">
      <div className="w-full p-7">
        <h2 className="text-4xl font-semibold text-center">Create Account</h2>

        <form className="mt-8" onSubmit={handleRegister}>
          <Tabs
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <div className="flex items-center justify-between">
              <p className="text-[#0A65CC]">Your Account Type? </p>
              <TabList className="flex space-x-4 border-b">
                <Tab
                  className={`pb-2 cursor-pointer ${
                    selectedIndex === 0
                      ? "border-b-4"
                      : "text-gray-700"
                  }`}
                >
                  Employee
                </Tab>
                <Tab
                  className={`pb- cursor-pointer ${
                    selectedIndex === 1
                      ? "border-b-4"
                      : "text-gray-700"
                  }`}
                >
                  HR Manager
                </Tab>
              </TabList>
            </div>

            <TabPanel>
              <div className="flex gap-5 mt-4">
                <input
                  type="text"
                  name="name" // Changed from fullName to name
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              <div className="space-y-5 mt-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex gap-5 mt-4">
                <input
                  type="text"
                  name="name" // Changed from fullName to name
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              <div className="space-y-5 mt-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </TabPanel>
          </Tabs>

          <div className="mt-6">
            <button
              type="submit"
              className="btn w-full bg-[#0A65CC] text-white"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Creating Account..." : "Create Account"}{" "}
              <TiArrowRight className="text-2xl" />
            </button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <p className="text-xs text-center mt-3">
          Already have an account?
          <button
            className="text-blue-500 underline"
            onClick={() => {
              setLoginModalOpen(true);
              setSignUpModalOpen(false);
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
