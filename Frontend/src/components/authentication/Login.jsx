import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();

    try {
      const result = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(result);
      if (result.data.success) {
        toast.success(result.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const errorMsg =
        err?.response?.data?.message || "Unexpected error occured";
      toast.error(errorMsg);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          action=""
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-blue-500">
            Login
          </h1>
          <div className="my-2">
            <Label className="my-1">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="JohnDoe@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label className="my-1">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="************"
            ></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="student"
              className="flex items-center gap-4 my-2 flex-row"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button className="block w-full py-3 my-3 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md">
            Login
          </button>
          {/* already account then login */}
          <p className="text-gray-500 text-sm my-2 text-end">
            Didn't have an account?{" "}
            <Link to={"/register"} className="text-blue-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
