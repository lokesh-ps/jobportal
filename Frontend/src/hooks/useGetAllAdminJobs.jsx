import { setLoading } from "@/redux/authSlice";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllAdminJobs = (user) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchAllAdminJobs = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (isMounted) {
          const jobs = res?.data?.jobs || [];
          dispatch(setAllAdminJobs(jobs));

          if (jobs.length > 0) {
            toast.success("All Admin Jobs are fetched successfully");
          }
        }
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch the Admin Jobs";

        if (isMounted) {
          dispatch(setAllAdminJobs([]));
          toast.error(message);
        }
      } finally {
        if (isMounted) {
          dispatch(setLoading(false));
        }
      }
    };

    fetchAllAdminJobs();

    return () => {
      isMounted = false;
    };
  }, [dispatch, user]);
};

export default useGetAllAdminJobs;
