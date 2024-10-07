import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./AccountSetting.css";
import { TfiEmail } from "react-icons/tfi";

const AccountSetting = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ phone, email, location });
  };

  return (
    <div>
      <h2 className="font-bold mt-8 mb-4 text-xl">Contact Information</h2>

      {/* Contact update */}
      <section>
        <form action="" onSubmit={handleSubmit}>
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

      {/* Change password */}
      <section></section>

      {/* Delete Account */}
      <section></section>
    </div>
  );
};

export default AccountSetting;
