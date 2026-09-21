import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-end my-5">
          <Button onClick={() => navigate("/admin/jobs/create")}>
            Post new Job
          </Button>
        </div>
        <div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
