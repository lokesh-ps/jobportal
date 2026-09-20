import { setLoading } from "@/redux/authSlice";
import { setSingleCompany } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          console.log("res", res);
          dispatch(setSingleCompany(res.data.company));
          toast.success("Company details fetched successfully");
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message || "Failed to fetch the company details");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
