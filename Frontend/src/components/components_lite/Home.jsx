import useGetAllJobs from "@/hooks/useGetAllJobs";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import LatestJobs from "./LatestJobs";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  useGetAllJobs(user);
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
