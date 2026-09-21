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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs = [] } = useSelector((state) => state.job || {});
  const { loading, user } = useSelector((state) => state.auth || {});
  const [searchTerm, setSearchTerm] = useState("");

  useGetAllAdminJobs(user);

  const filteredJobs = (allAdminJobs || []).filter((job) =>
    job.title?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <Input
        className={"mb-4 w-fit"}
        placeholder="Filter by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableCaption>Your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading admin jobs...
              </TableCell>
            </TableRow>
          ) : filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {allAdminJobs?.length === 0
                  ? 'No admin jobs found. Click "Post new Job" to get started.'
                  : "No admin jobs match your search."}
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job, index) => (
              <TableRow key={job._id || index}>
                <TableCell>{job.company?.name || "Unknown company"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell className={"text-right cursor-pointer"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
