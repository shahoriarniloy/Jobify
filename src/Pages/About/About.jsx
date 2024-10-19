import Intro from "./Intro";
import TeamMembers from "./TeamMembers";
import Feedback from "./Feedback";
import WhyChooseUs from "./WhyChooseUs";
import OurTeam from "./OurTeam/OurTeam";

const About = () => {
  return (
    <div className="bg-secondary">
      <Intro />
      <WhyChooseUs />
      <OurTeam />
      <Feedback />
    </div>
  );
};

export default About;
