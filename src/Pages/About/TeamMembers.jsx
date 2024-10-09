import React from "react";
import Slider from "react-slick";
import { FaFacebook, FaGithub } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TeamMembers = () => {
  const teamMembers = [
    {
      name: "Shahoriar Azad Niloy",
      role: "Team Leader, Developer",
      email: "niloyshahoriar@gmail.com",
      facebook: "https://www.facebook.com/shahoriarniloy/",
      github: "https://github.com/shahoriarniloy",
      imageUrl:
        "https://i.ibb.co/tq6BdhB/459635328-1531076374210966-5827006199608069936-n.jpg",
    },
    {
      name: "Mumtahina Mahbub Efa",
      role: "Developer",
      email: "mumtahinaefa8@gmail.com",
      facebook:
        "https://www.facebook.com/share/2zLeJux621QpVnm8/?mibextid=LQQJ4d",
      github: "https://github.com/Bella908",
      imageUrl:
        "https://i.ibb.co/KKdG923/458968663-1737661743672221-6606888850658979638-n.jpg",
    },
    {
      name: "Indra Ghosh",
      role: "Developer",
      email: "indraghosh0802@gmail.com",
      facebook: "https://www.facebook.com/indra.priya.564?mibextid=ZbWKwL",
      github: "https://github.com/indraghosh02",
      imageUrl:
        "https://i.ibb.co/Fwmn9yQ/461014362-1441578429848823-6777233053187165958-n.jpg",
    },
    {
      name: "Md. Abdullah Az Zahur",
      role: "Developer",
      email: "abdullah.az.zahur@gmail.com",
      facebook: "https://www.facebook.com/abdullahaazzahur.giyas",
      github: "https://github.com/Abdullah-Az-Zahur",
      imageUrl:
        "https://i.ibb.co/L1BnDrS/459298118-814495080572951-1002648524559915351-n.png",
    },
    {
      name: "Md Abumahid Islam (Maruf)",
      role: "Developer",
      email: "dev.abumahid@gmail.com",
      facebook: "https://www.facebook.com/profile.php?id=100027753881743",
      github: "https://github.com/md-maruf-billa",
      imageUrl:
        "https://i.ibb.co/c1dTRp2/459216252-1492857254695253-6783292354464325140-n.jpg",
    },
  ];

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // screens larger than 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // screens between 768px and 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // screens less than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto ">
      <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-700 group-hover:text-white">
                {member.name}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300 mb-2">
                {member.role}
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-400 group-hover:text-white"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gray-500 group-hover:text-white"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TeamMembers;
