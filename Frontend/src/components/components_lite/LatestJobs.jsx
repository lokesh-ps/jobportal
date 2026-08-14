import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  console.log("allJobs", allJobs);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold text-center">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h2>
      {/* job cards */}

      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.length > 0 ? (
          allJobs?.slice(0, 6).map((job, index) => {
            return <JobCards key={job._id || index} job={job} />;
          })
        ) : (
          <span>No Jobs Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
