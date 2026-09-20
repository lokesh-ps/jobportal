import { setLoading } from "@/redux/authSlice";
import { setAllCompanies } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) return;
    const fetchAllCompanies = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/all`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(setAllCompanies([]));
        } else {
          console.log(error.message);
          toast.error(error.message || "Failed to fetch the companies");
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAllCompanies();
  }, [dispatch, user]);
};

export default useGetAllCompanies;