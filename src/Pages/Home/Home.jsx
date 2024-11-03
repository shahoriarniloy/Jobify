import SearchBar from "./SearchBar";
import HowItWorks from "./HowItWorks";
import PopularCategory from "./PopularCategory";
import TopCompanies from "./TopCompanies";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import Testimonial from "./Testimonial";
import { Helmet } from "react-helmet";
import CreateAccountSuggestion from "./CreateAccountSuggestion";
import SuggestedJobs from "./SuggestedJobs";
import { useSelector } from "react-redux";

const Home = () => {
  const loggedUser = useSelector((state) => state.user.loggedUser);

  const { data, isLoading } = useQuery({
    queryKey: ["all-info"],
    queryFn: async () => {
      const result = await axiosSecure.get("/homepage-info");
      return result.data;
    },
  });
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
        jobCount={data?.jobCount}
        companyCount={data?.companyCount}
        candidates={data?.candidates}
        successPeoples={data?.successPeoples}
        isLoading={isLoading}
      ></SearchBar>
      <PopularCategory isLoading={isLoading} categoryCounts={data?.categoryCounts} />
      <hr />
      <SuggestedJobs jobs={data?.jobs} isLoading={isLoading}/>
      <HowItWorks />
      <TopCompanies />
      <Testimonial isLoading={isLoading} reviews={data?.reviews} />
      {!loggedUser && (      <CreateAccountSuggestion/>
)}
    </div>
  );
};

export default Home;
