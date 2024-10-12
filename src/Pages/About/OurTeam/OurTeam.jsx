import TeamMemberCard from "./TeamMemberCard";
import './Styles/Style.css'

const OurTeam = () => {
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
      name: "Md. Abdullah Az Zahur (Gias)",
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

  return (
    <div>
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
