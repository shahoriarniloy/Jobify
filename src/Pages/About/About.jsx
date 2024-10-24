import Intro from "./Intro";
import Feedback from "./Feedback";
import WhyChooseUs from "./WhyChooseUs";
import OurTeam from "./OurTeam/OurTeam";
import { useSelector } from "react-redux";



const About = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme === "dark"? "bg-gradient-to-r from-gray-800 to-slate-900": "bg-secondary"}>
      <Intro />
      <WhyChooseUs />
      <OurTeam />
      <Feedback />
    </div>
  );
};

export default About;
