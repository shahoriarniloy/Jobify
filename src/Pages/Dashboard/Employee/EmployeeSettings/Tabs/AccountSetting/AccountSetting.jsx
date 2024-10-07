import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AccountSetting.css";
import { TfiEmail } from "react-icons/tfi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AccountSetting = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentPassword = "123456";

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
    console.log("password", data.newPassword);
    reset();
  };

  // Watch the new password field to compare with confirm password
  const newPassword = watch("newPassword");

  return (
    <div className="p-4 md:p-8">
      {/*  Contact Information */}
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
          {/* Current Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="currentPassword"
              className="block mb-2 font-semibold"
            >
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              name=""
              id="currentPassword"
              className="border p-2 w-full rounded"
              {...register("currentPassword", {
                required: "Current Password is required",
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
          <div className="mb-4 relative">
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
          <div className="mb-4 relative">
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
                validate: (value) => {
                  value === newPassword || "Passwords do not match";
                },
              })}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-11 text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 md:mt-8 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* Delete Account */}
      <section></section>
    </div>
  );
};

export default AccountSetting;
