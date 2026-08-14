import Navbar from "./Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { use, useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { setSelectedJob } from "@/redux/jobSlice";
import { setLoading } from "@/redux/authSlice";

const Description = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const { selectedJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isApplied =
    selectedJob?.applications?.some((appli) => appli.applicant === user?._id) ||
    false;
  useEffect(() => {
    const fetchJobById = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSelectedJob(res.data.job));
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message || "Failed to fetch the job");
      } finally {
        dispatch(setLoading(false));
      }
    };
    if (jobId) {
      fetchJobById();
    }
  }, [jobId, dispatch, user?._id]);
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
                    {(selectedJob?.company?.name || selectedJob?.title || "J")
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">
                      {selectedJob?.title || "Job Title"}
                    </h1>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="size-4" />{" "}
                      {selectedJob?.location || "Location"}
                    </span>
                  </div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {selectedJob?.company?.name ||
                      selectedJob?.company ||
                      "Company"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedJob?.createdAt
                      ? new Date(selectedJob.createdAt).toLocaleDateString()
                      : "Recently posted"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center mt-5">
                <Badge className="text-blue-600 font-bold" variant="ghost">
                  {selectedJob?.position || "N/A"} Position
                </Badge>
                <Badge className="text-[#FA4F09] font-bold" variant="ghost">
                  {selectedJob?.salary || "N/A"} LPA
                </Badge>
                <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
                  {selectedJob?.location || "Remote"}
                </Badge>
                <Badge className="text-black font-bold" variant="ghost">
                  {selectedJob?.jobType || "Full Time"}
                </Badge>
              </div>
            </div>

            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Job Description
              </h2>
              <div className="mt-3 space-y-3 text-gray-600">
                {selectedJob?.description || "No description available."}
              </div>
            </div>

            <div className="p-6 rounded-md shadow-xl bg-white border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Requirements</h2>
              <ul className="mt-3 space-y-2">
                {(selectedJob?.requirements?.length
                  ? selectedJob.requirements
                  : ["No specific requirements mentioned"]
                ).map((req, index) => (
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
                      {selectedJob?.jobType || "Full Time"}
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
                      {selectedJob?.position || "N/A"}
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
                      {selectedJob?.salary || "N/A"} LPA
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
                      {selectedJob?.location || "N/A"}
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
                      {selectedJob?.createdAt
                        ? new Date(selectedJob.createdAt).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Briefcase className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob?.experience != null
                        ? `${selectedJob.experience} Years`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-[#6B3AC2]/10 text-[#6B3AC2]">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <p className="text-gray-400">No. of Applications</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob?.applications?.length ?? "N/A"}
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
