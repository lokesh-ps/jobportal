import React from "react";
import Navbar from "../Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "@/utils/data";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyId: "",
    position: 0,
    requirements: "",
    role: "",
    experience: "",
    jobType: "",
  });
  const { allCompanies = [] } = useSelector((state) => state.company || {});
  const navigate = useNavigate();
  useGetAllCompanies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleCompanySelect = (companyName) => {
    const selectedCompany = allCompanies.find((c) => c.name === companyName);
    if (!selectedCompany) {
      console.error("Selected company not found");
      return;
    }
    setInput((prevInput) => ({
      ...prevInput,
      companyId: selectedCompany._id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company before posting the job");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success(response.data.message || "Job posted successfully");
        setInput({
          title: "",
          description: "",
          location: "",
          salary: "",
          companyId: "",
          position: 0,
          requirements: "",
          role: "",
          experience: "",
          jobType: "",
        });
        navigate("/admin/jobs");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to post job";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto my-8 w-full max-w-2xl rounded-xl border border-gray-400 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter job title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                placeholder="Enter job description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter job location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter job salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            {/* <div>
            <Label>Company ID</Label>
            <Input
              type="text"
              name="companyId"
              value={input.companyId}
              placeholder="Enter company ID"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={handleChange}
            />
          </div> */}
            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Enter job position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter job requirements (comma-separated)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            {/* <div>
            <Label>Role</Label>
            <Input
              type="text"
              name="role"
              value={input.role}
              placeholder="Enter job role"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              onChange={handleChange}
            />
          </div> */}
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Enter required experience (in years)"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Enter job type"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={handleChange}
              />
            </div>
          </div>
          {allCompanies.length > 0 ? (
            <div className="mt-4">
              <Label>Company</Label>
              <Select onValueChange={handleCompanySelect}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {allCompanies.map((company) => (
                      <SelectItem key={company._id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p className="text-red-500 mt-2 font-bold text-sm">
                *No companies found. Please register a company first.*
              </p>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            {isLoading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-black hover:bg-blue-600 text-white mt-4 w-full focus-visible:ring-offset-0 focus-visible:ring-0"
              >
                Post Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
