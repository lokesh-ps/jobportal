import { setLoading } from "@/redux/authSlice";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = (user) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;
    const fetchAllJobs = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("res", res);
          dispatch(setAllJobs(res.data.jobs));
          toast.success("All Jobs are fetched successfully");
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message || "Failed to fetch the Jobs");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
