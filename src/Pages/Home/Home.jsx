import SearchBar from "./SearchBar";
import Feedback from "../About/Feedback";
import HowItWorks from "./HowItWorks";
import OurTeam from "../About/OurTeam/OurTeam";
import PopularCategory from "./PopularCategory";
import TopCompanies from "./TopCompanies";
import { Helmet } from "react-helmet";
// import TopCompanies from "./TopCompanies"
const Home = () => {
  return (
    <div>
        <Helmet>
        <title>Jobify - Home</title>
        <meta name="description" content="Explore jobs, top companies, popular categories, and how Jobify works." />
      </Helmet>
      <SearchBar></SearchBar>
      <PopularCategory/>
      <HowItWorks></HowItWorks>
      <TopCompanies/>


      {/* <OurTeam></OurTeam> */}
      {/* <Feedback></Feedback> */}

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
