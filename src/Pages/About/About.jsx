import Intro from "./Intro";
import Feedback from "./Feedback";
import WhyChooseUs from "./WhyChooseUs";
import OurTeam from "./OurTeam/OurTeam";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="bg-secondary">
        <Helmet>
        <title>Jobify - About</title>
      </Helmet>
      <Intro />
      <WhyChooseUs />
      <OurTeam />
      <Feedback />
    </div>
  );
};

export default About;
