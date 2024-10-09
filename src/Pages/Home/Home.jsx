import SearchBar from "./SearchBar";
import About from "../About/About";
import TeamMembers from "../About/TeamMembers";
import Feedback from "../About/Feedback";
// import TopCompanies from "./TopCompanies"
const Home = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <TeamMembers></TeamMembers>
      <Feedback></Feedback>

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
