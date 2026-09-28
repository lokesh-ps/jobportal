import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const useGetAllAppliedJobs = (user) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const fetchAppliedJobs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data || []));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [dispatch, user]);

  return { isLoading };
};

export default useGetAllAppliedJobs;
