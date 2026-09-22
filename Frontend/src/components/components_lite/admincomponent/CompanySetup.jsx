import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((state) => state.company);
  const params = useParams();
  useGetCompanyById(params.id);
  console.log("params", params);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form action="" onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              className={" flex items-center gap-2 text-gray-600 font-semibold"}
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft />
              Back
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Company Setup</h1>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 my-2">
              <div>
                <Label>Company Name</Label>
                <Input
                  type={"text"}
                  name="name"
                  value={input.name}
                  placeholder="Company Name"
                  onChange={changeEventHandler}
                />
              </div>

              <div>
                <Label>Company Description</Label>
                <Input
                  type={"text"}
                  name="description"
                  placeholder="Description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type={"text"}
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label>Company Location</Label>
                <Input
                  type={"text"}
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="New Delhi, India"
                />
              </div>
              <div>
                <Label>Company Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  className="w-fit"
                />
                {singleCompany?.logo && (
                  <a
                    href={singleCompany.logo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex w-fit items-center gap-2 text-sm text-blue-600 underline"
                  >
                    <img
                      src={singleCompany.logo}
                      alt="Current company logo"
                      className="h-10 w-10 rounded object-cover"
                    />
                    Click to view logo
                  </a>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button type="submit" className={"w-full mt-8"}>
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
