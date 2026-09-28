import Navbar from "../Navbar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Download, Loader2, MoreHorizontal, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const { id: jobId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const fetchApplicants = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${jobId}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setApplications(res.data.data);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch applicants",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const filteredApplications = (applications || []).filter((application) => {
    const applicant = application.applicant || {};
    const query = searchTerm.trim().toLowerCase();
    return (
      applicant.fullName?.toLowerCase().includes(query) ||
      applicant.email?.toLowerCase().includes(query)
    );
  });

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  const updateStatus = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message || "Application status updated");
        setApplications((prev) =>
          (prev || []).map((application) =>
            application._id === applicationId
              ? { ...application, status }
              : application,
          ),
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update application status",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-5">
          <h1 className="text-2xl font-bold">
            Applicants{" "}
            <span className="text-sm font-normal text-gray-500">
              ({filteredApplications.length})
            </span>
          </h1>
          <Input
            className="w-full sm:w-64"
            placeholder="Filter by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableCaption>A list of applicants who applied to this job</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin inline-block" />
                  <span className="ml-2 text-gray-500">Loading applicants...</span>
                </TableCell>
              </TableRow>
            ) : filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {applications?.length === 0
                    ? "No applicants yet for this job."
                    : "No applicants match your search."}
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((application, index) => {
                const applicant = application.applicant || {};
                return (
                  <TableRow key={application._id || index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={applicant?.profile?.profilePhoto}
                            alt={applicant?.fullName}
                          />
                          <AvatarFallback>
                            {getInitials(applicant?.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{applicant?.fullName || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{applicant?.email || "N/A"}</TableCell>
                    <TableCell>{applicant?.phoneNumber || "N/A"}</TableCell>
                    <TableCell>
                      {applicant?.profile?.resume ? (
                        <a
                          href={applicant.profile.resume}
                          download={
                            applicant.profile.resumeOriginalName || "resume"
                          }
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Download className="h-4 w-4" />
                          {applicant.profile.resumeOriginalName || "Download"}
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(application?.createdAt)}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal className="w-5 h-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-40">
                          <div
                            className="flex cursor-pointer items-center gap-2"
                            onClick={() =>
                              updateStatus(application._id, "Accepted")
                            }
                          >
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Accept</span>
                          </div>
                          <div
                            className="flex cursor-pointer items-center gap-2 mt-2"
                            onClick={() =>
                              updateStatus(application._id, "Rejected")
                            }
                          >
                            <X className="h-4 w-4 text-red-600" />
                            <span>Reject</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Applicants;