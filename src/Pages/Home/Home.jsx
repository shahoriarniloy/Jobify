import SearchBar from "./SearchBar";
import Feedback from "../About/Feedback";
import HowItWorks from "./HowItWorks";
import OurTeam from "../About/OurTeam/OurTeam";
import PopularCategory from "./PopularCategory";
import TopCompanies from "./TopCompanies";
<<<<<<< HEAD
import { Helmet } from "react-helmet";
// import TopCompanies from "./TopCompanies"
=======
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import Testimonial from "./Testimonial";

 
>>>>>>> 23a554ecac333c53cceaceec773be1041b0f20e2
const Home = () => {
  // load all necessary data for home page
  const { data,isLoading } = useQuery({
    queryKey: ["all-info"],
    queryFn: async () => {
      const result = await axiosSecure.get("/homepage-info");
      return result.data;
    }
  })
  if(isLoading) return;
  return (
    <div>
<<<<<<< HEAD
        <Helmet>
        <title>Jobify - Home</title>
        <meta name="description" content="Explore jobs, top companies, popular categories, and how Jobify works." />
      </Helmet>
      <SearchBar></SearchBar>
      <PopularCategory/>
      <HowItWorks></HowItWorks>
      <TopCompanies/>
=======
      <SearchBar 
      jobCount={data.jobCount} 
      companyCount={data.companyCount}
      candidates={data.candidates}
      successPeoples={data.successPeoples}
>>>>>>> 23a554ecac333c53cceaceec773be1041b0f20e2


      ></SearchBar>
      <PopularCategory categoryCounts={data.categoryCounts} />
      <HowItWorks></HowItWorks>
      <TopCompanies />
      <Testimonial reviews={data?.reviews}/>

      {/* <OurTeam></OurTeam> */}
      {/* <Feedback></Feedback> */}

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
