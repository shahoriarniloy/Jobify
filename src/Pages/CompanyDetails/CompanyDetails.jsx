import bannerBg from "../../assets/image/CompanyDetails/bannerBg.png";
import instagram_logo from "../../assets/image/CompanyDetails/instagram_logo.png";

const CompanyDetails = () => {
  return (
    <div className="">
      <div className="relative">
        {/* Banner Image */}
        <div>
          <img className="w-full" src={bannerBg} alt="Banner" />
        </div>

        {/* Company Details Section (half over the banner) */}
        <div className="container absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 bg-white rounded-lg shadow-lg p-6 w-3/4">
          <div className="flex md:p-4 items-center">
            {/* Company Logo */}
            <img
              src={instagram_logo}
              className="w-16 h-16 object-cover rounded-full"
              alt="Company Logo"
            />

            {/* Company Information */}
            <div className="pl-4">
              <h3 className="font-bold text-xl md:pb-2">Twitter</h3>
              <p className="text-gray-500">Information Technology (IT)</p>
            </div>

            {/* CTA Button */}
            <div className="ml-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View Open Position →
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl">Company Details</h2>
    </div>
  );
};

export default CompanyDetails;
