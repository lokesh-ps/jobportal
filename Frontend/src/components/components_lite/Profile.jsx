import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Download, Loader2, Mail, Pencil, Phone } from "lucide-react";

const defaultSkills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Node.js",
  "MongoDB",
  "MySQL",
  "Redux",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
];

const defaultAppliedJobs = [
  {
    date: "23-12-2024",
    title: "Software Engineer",
    company: "Microsoft",
    status: "Selected",
  },
  {
    date: "23-12-2024",
    title: "Software Engineer",
    company: "Microsoft",
    status: "Selected",
  },
  {
    date: "23-12-2024",
    title: "Software Engineer",
    company: "Microsoft",
    status: "Selected",
  },
];

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills)
      ? user?.profile.skills.join(", ")
      : typeof user?.profile?.skills === "string"
        ? user?.profile.skills
        : "",
  });

  //   if (!user) {
  //     return (
  //       <div>
  //         <Navbar />
  //         <div className="mx-auto mt-20 max-w-7xl text-center">
  //           <h1 className="text-2xl font-bold">Please login to view profile</h1>
  //         </div>
  //       </div>
  //     );
  //   }

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOpenEdit = () => {
    setInput({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: Array.isArray(user?.profile?.skills)
        ? user?.profile.skills.join(", ")
        : typeof user?.profile?.skills === "string"
          ? user?.profile.skills
          : "",
    });
    setResumeFile(null);
    setOpen(true);
  };

  const changeFileHandler = (e) => {
    setResumeFile(e.target.files?.[0] || null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (resumeFile) {
      formData.append("file", resumeFile);
    }
    try {
      setLoading(true);
      const result = await axios.put(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (result?.data?.success) {
        dispatch(setUser(result?.data?.user));
        toast.success(result?.data?.message);
        setOpen(false);
        setResumeFile(null);
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Unexpected error occurred";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const skills = Array.isArray(user?.profile?.skills)
    ? user?.profile.skills
    : typeof user?.profile?.skills === "string"
      ? user?.profile.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : defaultSkills;

  const appliedJobs = user?.appliedJobs?.length
    ? user?.appliedJobs
    : defaultAppliedJobs;

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-6 max-w-3xl px-4 pb-10">
        <div className="rounded-2xl border border-[#d8d8d8] p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 rounded-full border-2 border-white shadow-sm">
                <AvatarImage
                  src={user?.profile?.profilePhoto || ""}
                  alt={user?.fullName || "Profile"}
                />
                <AvatarFallback className="bg-[#d7d7d7] text-lg font-semibold text-slate-700">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  {user?.fullName || "Full Name"}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  {user?.profile?.bio || "Lorem ipsum dolor sit amet"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenEdit}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d1d1d1] text-slate-700 shadow-sm transition hover:bg-gray-50"
              aria-label="Edit profile"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 space-y-3 text-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Mail className="h-4 w-4" />
              <span>{user?.email || "AnkitPathak@gmail.com"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Phone className="h-4 w-4" />
              <span>{user?.phoneNumber || "+919874563210"}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-800">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[#2e2e2e] bg-[#1f1f1f] px-2.5 py-1 text-xs font-medium text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-[#dcdcdc] pt-4">
            <h2 className="text-lg font-semibold text-slate-800">Resume</h2>
            {user?.profile?.resume ? (
              <a
                href={user?.profile.resume}
                download={user?.profile.resumeOriginalName || "resume"}
                className="mt-2 inline-flex items-center gap-2 text-sm text-[#1888d8] hover:underline"
              >
                <Download className="h-4 w-4" />
                {user?.profile?.resumeOriginalName || "Download"}
              </a>
            ) : (
              <p className="mt-2 text-sm text-gray-400">No resume uploaded</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800">Applied Jobs</h2>

          <div className="mt-4 overflow-hidden rounded-lg border border-[#d8d8d8]">
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead className="px-4 py-3 text-sm font-medium text-slate-500">
                    Date
                  </TableHead>
                  <TableHead className="px-4 py-3 text-sm font-medium text-slate-500">
                    Job Title
                  </TableHead>
                  <TableHead className="px-4 py-3 text-sm font-medium text-slate-500">
                    Company
                  </TableHead>
                  <TableHead className="px-4 py-3 text-sm font-medium text-slate-500">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedJobs.map((job, index) => (
                  <TableRow
                    key={`${job.date}-${job.company}-${index}`}
                    className="last:border-0"
                  >
                    <TableCell className="px-4 py-3 text-sm text-slate-700">
                      {job.date}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-slate-700">
                      {job.title}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-slate-700">
                      {job.company}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span className="inline-flex rounded-md bg-[#1f1f1f] px-3 py-1 text-xs font-medium text-white">
                        {job.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Input
                type="text"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                placeholder="Short bio"
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label>Skills</Label>
              <Input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="Comma separated, e.g. React, Node.js"
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label>Resume</Label>
              <Input
                type="file"
                accept="application/pdf,.doc,.docx"
                onChange={changeFileHandler}
                className="mt-1 h-9 cursor-pointer"
              />
              {user?.profile?.resumeOriginalName && (
                <p className="mt-1 text-xs text-gray-400">
                  Current: {user?.profile.resumeOriginalName}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1f1f1f] font-medium hover:bg-black"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
