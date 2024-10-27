import SearchBar from "./SearchBar";
import HowItWorks from "./HowItWorks";
import PopularCategory from "./PopularCategory";
import TopCompanies from "./TopCompanies";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import Testimonial from "./Testimonial";
import DashboardLoader from "../../Shared/DashboardLoader";
import { Helmet } from "react-helmet";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-info"],
    queryFn: async () => {
      const result = await axiosSecure.get("/homepage-info");
      return result.data;
    },
  });
  if (isLoading) return <DashboardLoader />;
  return (
    <div>
      <Helmet>
        <title>Jobify - Home</title>
        <meta
          name="description"
          content="Explore jobs, top companies, popular categories, and how Jobify works."
        />
      </Helmet>
      <SearchBar
        jobCount={data.jobCount}
        companyCount={data.companyCount}
        candidates={data.candidates}
        successPeoples={data.successPeoples}
      ></SearchBar>
      <PopularCategory categoryCounts={data.categoryCounts} />
      <HowItWorks></HowItWorks>
      <TopCompanies />
      <Testimonial reviews={data?.reviews} />

      {/* <OurTeam></OurTeam> */}
      {/* <Feedback></Feedback> */}

      {/* <TopCompanies></TopCompanies> */}
    </div>
  );
};

export default Home;
