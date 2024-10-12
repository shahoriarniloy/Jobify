import { FaEnvelope, FaFacebook, FaGithub } from "react-icons/fa";
import "./Styles/Style.css";

const TeamMemberCard = ({ imageUrl, name, role, email, facebook, github, index }) => {
  const isEven = index % 2 === 0; // Check if the index is even

  return (
    <div className="flex flex-col items-center md:mt-28 sm:mt-5 mt-5"> {/* Flexbox for alignment */}
      <div
        className={`relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-150 hover:scale-105 hover:shadow-2xl 
        ${isEven ? 'animate-bounce-faster' : 'animate-bounce-lower'} hover:animate-none delay-${index * 200}ms`}
      >
        {/* Image Section */}
        <div className="w-full h-72 md:h-60 lg:h-72 overflow-hidden"> {/* Responsive height */}
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Info Section */}
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-600">{role}</p>

          {/* Contact Icons */}
          <div className="flex justify-center mt-4 space-x-4">
            {email && (
              <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-800">
                <FaEnvelope />
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <FaFacebook />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
