import useGetAllJobs from "@/hooks/useGetAllJobs";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import LatestJobs from "./LatestJobs";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  useGetAllJobs(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <div>
      <Navbar></Navbar>
      <Header />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
