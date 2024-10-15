import React, { useEffect, useState } from "react";
import "./Styles/Style.css"; // Add your CSS file here

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Shahoriar Azad Niloy",
      imageUrl:
        "https://i.ibb.co/tq6BdhB/459635328-1531076374210966-5827006199608069936-n.jpg",
    },
    {
      name: "Mumtahina Mahbub Efa",
      imageUrl:
        "https://i.ibb.co/KKdG923/458968663-1737661743672221-6606888850658979638-n.jpg",
    },
    {
      name: "Indra Ghosh",
      imageUrl:
        "https://i.ibb.co/Fwmn9yQ/461014362-1441578429848823-6777233053187165958-n.jpg",
    },
    {
      name: "Md. Abdullah Az Zahur (Gias)",
      imageUrl:
        "https://i.ibb.co/L1BnDrS/459298118-814495080572951-1002648524559915351-n.png",
    },
    {
      name: "Md Abumahid Islam (Maruf)",
      imageUrl:
        "https://i.ibb.co/c1dTRp2/459216252-1492857254695253-6783292354464325140-n.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  return (
    <div className="carousel-container">
      {teamMembers.map((member, index) => {
        const isMiddle = index === currentIndex;
        const isNext =
          (index - currentIndex + teamMembers.length) % teamMembers.length ===
          1;
        const isPrev =
          (currentIndex - index + teamMembers.length) % teamMembers.length ===
          1;

        return (
          <img
            key={index}
            src={member.imageUrl}
            alt={member.name}
            className={`carousel-image ${isMiddle ? "active" : ""} ${
              isNext ? "next" : ""
            } ${isPrev ? "prev" : ""}`}
          />
        );
      })}
    </div>
  );
};

export default OurTeam;
