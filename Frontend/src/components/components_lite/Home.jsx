import useGetAllJobs from "@/hooks/useGetAllJobs";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import LatestJobs from "./LatestJobs";
import Navbar from "./Navbar";

const Home = () => {
  useGetAllJobs();
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
Home;
