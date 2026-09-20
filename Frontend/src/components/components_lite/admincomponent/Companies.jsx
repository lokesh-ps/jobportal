import React from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-end my-5">
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
