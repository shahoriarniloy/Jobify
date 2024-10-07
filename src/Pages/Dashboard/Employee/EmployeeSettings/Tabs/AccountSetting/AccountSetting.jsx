import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AccountSetting.css";
import { TfiEmail } from "react-icons/tfi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const AccountSetting = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [storedPassword, setStoredPassword] = useState(""); // State to store the password

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentPassword = "123456"; // mock stored current password

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log({ phone, email, location });
  };

  const onSubmit = (data) => {
    // Set the stored password to the new password
    setStoredPassword(data.newPassword);
    alert("Password changed successfully! New password: " + data.newPassword);
    reset(); // Reset the form after submission
  };

  console.log(storedPassword);

  // Watch the new password field to compare with confirm password
  const newPassword = watch("newPassword");

  return (
    <div className="p-4 md:p-8">
      {/* Contact Information */}
      <section>
        <h2 className="font-bold  mb-4 text-xl">Contact Information</h2>
        <form action="" onSubmit={handleContactSubmit}>
          {/* Map Location */}
          <div className="flex flex-col md:my-4">
            <label htmlFor="Map Location" className="text-lg font-medium ">
              Map Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
              placeholder=""
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col md:my-4">
            <label htmlFor="Phone" className="text-lg font-medium mb-2">
              Phone
            </label>

            <PhoneInput
              country={"bd"}
              value={phone}
              required
              onChange={(phone) => setPhone(phone)}
              containerClass="w-full"
              inputClass="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md h-10 pl-12 my-2"
              buttonClass="bg-gray-50 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              dropdownClass="absolute mt-1 w-full z-10 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:my-4">
            <label htmlFor="Email" className="text-lg font-medium ">
              Email
            </label>
            <div className="relative">
              <TfiEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 font-bold" />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
                placeholder="Email"
              />
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Save Changes
          </button>
        </form>
      </section>

      <hr className="my-8" />

      {/* Change password */}
      <section>
        <h2 className="font-bold  mb-4 text-xl">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Current Password */}
            <div className="md:mb-4 relative">
              <label
                htmlFor="currentPassword"
                className="block mb-2 font-semibold"
              >
                Current Password
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                className="border p-2 w-full rounded"
                {...register("currentPassword", {
                  required: "Current Password is required",
                  validate: (value) =>
                    value === currentPassword ||
                    "Current password is incorrect",
                })}
              />
              <button
                type="button"
                onClick={toggleCurrentPasswordVisibility}
                className="absolute right-2 top-11 text-gray-600"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.currentPassword && (
                <p className="text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="md:mb-4 relative">
              <label htmlFor="newPassword" className="block mb-2 font-semibold">
                New Password
              </label>
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="border p-2 w-full rounded"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-2 top-11 text-gray-600"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="md:mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border p-2 w-full rounded"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-11 text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Change Password
          </button>
        </form>

        {/* Display Stored Password */}
        {storedPassword && (
          <div className="mt-4">
            <h3 className="font-bold text-lg">Stored Password:</h3>
            <p className="text-gray-700">{storedPassword}</p>
          </div>
        )}
      </section>

      <hr className="my-8" />

      {/* Delete Your Company */}
      <section className="md:w-1/2">
        <h2 className="font-bold  mb-4 text-xl">Delete Your Company</h2>
        <p className="text-gray-400">
          If you delete your Jobpilot account, you will no longer be able to get
          information about the matched jobs, following employers, and job
          alert, shortlisted jobs and more. You will be abandoned from all the
          services of Jobpilot.com.
        </p>

        <button
          type="button"
          className=" btn btn-ghost  flex items-center text-red-600"
        >
          <span className="mr-2">
            <MdOutlineCancel className="text-lg" />
          </span>{" "}
          Close Account
        </button>
      </section>
    </div>
  );
};

export default AccountSetting;
