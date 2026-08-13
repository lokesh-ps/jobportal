import Navbar from "./Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const jobData = {
  companyName: "Google",
  location: "India",
  title: "Full Stack Developer",
  postedDate: "3 days ago",
  position: "10",
  salary: 20,
  jobType: "Full Time",
  requirements: [
    "Experience with React, Node.js and MongoDB",
    "Strong understanding of REST APIs and system design",
    "Knowledge of CI/CD pipelines and Docker",
    "Good problem solving and communication skills",
    "3+ years of relevant experience",
  ],
  description: [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi harum recusandae debitis blanditiis vero neque adipisci eos deserunt molestias quidem, ratione voluptates velit veniam ipsa veritatis obcaecati tempora tempore aperiam.",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi harum recusandae debitis blanditiis vero neque adipisci eos deserunt molestias quidem, ratione voluptates velit veniam ipsa veritatis obcaecati tempora tempore aperiam.",
  ],
};

const Description = () => {
  const navigate = useNavigate();
  const isApplied = false;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-8 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 font-medium text-gray-600"
        >
          <ArrowLeft /> Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200">
              <div className="flex items-center gap-4">
                <Avatar className="size-14 rounded-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#6B3AC2] text-white text-lg">
                    {jobData.companyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">
                      {jobData.companyName}
                    </h1>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="size-4" /> {jobData.location}
                    </span>
                  </div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {jobData.title}
                  </h2>
                  <p className="text-sm text-gray-500">{jobData.postedDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center mt-5">
                <Badge className="text-blue-600 font-bold" variant="ghost">
                  {jobData.position} Position
                </Badge>
                <Badge className="text-[#FA4F09] font-bold" variant="ghost">
                  {jobData.salary} LPA
                </Badge>
                <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
                  {jobData.location}
                </Badge>
                <Badge className="text-black font-bold" variant="ghost">
                  {jobData.jobType}
                </Badge>
              </div>
            </div>

            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Job Description
              </h2>
              <div className="mt-3 space-y-3 text-gray-600">
                {jobData.description.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Requirements</h2>
              <ul className="mt-3 space-y-2">
                {jobData.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <CheckCircle2 className="size-5 text-[#6B3AC2] mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200 h-max">
              <h2 className="text-lg font-bold text-gray-800">Job Overview</h2>
              <div className="mt-4 space-y-4 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Briefcase className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Job Type</p>
                    <p className="font-medium text-gray-800">
                      {jobData.jobType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Positions</p>
                    <p className="font-medium text-gray-800">
                      {jobData.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Banknote className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Salary</p>
                    <p className="font-medium text-gray-800">
                      {jobData.salary} LPA
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="font-medium text-gray-800">
                      {jobData.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Posted</p>
                    <p className="font-medium text-gray-800">
                      {jobData.postedDate}
                    </p>
                  </div>
                </div>
              </div>
              {isApplied ? (
                <Button
                  disabled
                  className="w-full mt-6 bg-green-600 hover:bg-green-600 font-bold h-10"
                >
                  <CheckCircle2 /> Already Applied
                </Button>
              ) : (
                <Button className="w-full mt-6 bg-[#6B3AC2] hover:bg-[#5a2fa6] font-bold h-10">
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
