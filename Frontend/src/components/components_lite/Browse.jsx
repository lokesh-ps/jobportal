import Navbar from "./Navbar";
import Job1 from "./Job1";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Search <span className="text-[#6B3AC2]">Results</span>
          </h1>
          <div className="flex items-center gap-2 mt-4 max-w-xl">
            <div className="relative flex-1">
              <Search className="size-4 absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search jobs, skills, companies"
                className="pl-8 h-9"
              />
            </div>
            <Button className="bg-[#6B3AC2] hover:bg-[#5a2fa6] font-bold h-9">
              Search
            </Button>
          </div>
        </div>

        <div className="flex-1 pb-5">
          {allJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {allJobs.map((job, index) => (
                <Job1 job={job} key={job._id || index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
