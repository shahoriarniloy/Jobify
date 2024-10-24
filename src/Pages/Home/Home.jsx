import SearchBar from "./SearchBar";
import Feedback from "../About/Feedback";
import HowItWorks from "./HowItWorks";
import OurTeam from "../About/OurTeam/OurTeam";
import PopularCategory from "./PopularCategory";
import TopCompanies from "./TopCompanies";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import Testimonial from './Testimonial';

 
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
      <SearchBar 
      jobCount={data.jobCount} 
      companyCount={data.companyCount}
      candidates={data.candidates}
      successPeoples={data.successPeoples}


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
