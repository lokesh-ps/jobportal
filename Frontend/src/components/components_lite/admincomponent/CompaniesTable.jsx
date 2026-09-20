import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { Input } from "@/components/ui/input";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { allCompanies } = useSelector((state) => state.company);
  const { loading } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  useGetAllCompanies();

  const filteredCompanies = (allCompanies || []).filter((company) =>
    company.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <Input
        className={"mb-4 w-fit"}
        placeholder="Filter by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading companies...
              </TableCell>
            </TableRow>
          ) : filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {allCompanies?.length === 0
                  ? 'No companies found. Click "Add Company" to get started.'
                  : "No companies match your search."}
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company, index) => (
              <TableRow key={company._id || index}>
                <TableCell>
                  {company.logo ? (
                    <a
                      href={company.logo}
                      target="_blank"
                      rel="noreferrer"
                      title="Click to view logo"
                    >
                      <Avatar>
                        <AvatarImage
                          src={company.logo}
                          alt={company.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {company.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </a>
                  ) : (
                    <Avatar>
                      <AvatarFallback>
                        {company.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{formatDate(company.createdAt)}</TableCell>
                <TableCell className={"text-right cursor-pointer"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
