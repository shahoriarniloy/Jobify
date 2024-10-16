import SearchBar from "./SearchBar";
import Feedback from "../About/Feedback";
import HowItWorks from "./HowItWorks";
import OurTeam from "../About/OurTeam/OurTeam";
import PopularCategory from "./PopularCategory";
// import TopCompanies from "./TopCompanies"
const Home = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <HowItWorks></HowItWorks>

      <PopularCategory/>

      <OurTeam></OurTeam>
      <Feedback></Feedback>

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
