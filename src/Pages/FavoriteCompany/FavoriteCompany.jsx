import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosSecure from "../../Hooks/UseAxiosSecure";

const FavoriteCompany = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userEmail = currentUser?.email;

  const [companyEmails, setCompanyEmails] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userEmail) {
      const fetchFavoriteCompanyEmails = async () => {
        try {
          const response = await axiosSecure.get(
            `/users/${userEmail}/favorite-company`
          );
          setCompanyEmails(response.data.FavoriteCompany);
        } catch (err) {
          setError("Failed to load favorite company emails");
        }
      };
      fetchFavoriteCompanyEmails();
    }
  }, [userEmail]);

  console.log(companyEmails);

  return (
    <div>
      <h2></h2>
    </div>
  );
};

export default FavoriteCompany;
