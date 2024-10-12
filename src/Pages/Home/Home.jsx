import SearchBar from "./SearchBar";
import About from "../About/About";
import TeamMembers from "../About/TeamMembers";
import Feedback from "../About/Feedback";
import HowItWorks from "./HowItWorks";
import BuildNetwork from "./BuildNetwork";
import OurTeam from "../About/OurTeam/OurTeam";
// import TopCompanies from "./TopCompanies"
const Home = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <HowItWorks></HowItWorks>
      <BuildNetwork></BuildNetwork>
      {/* <TeamMembers></TeamMembers> */}
      <OurTeam></OurTeam>
      <Feedback></Feedback>

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
