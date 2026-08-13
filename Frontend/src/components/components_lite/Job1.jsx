import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job1 = () => {
  const navigate = useNavigate();
  const jobId = "33t";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">3 days ago</p>
        <Button variant="outline" className={"rounded-full"} size="icon">
          <Bookmark />
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-2 my-2">
          <Button className={"p-6"} variant="outline" size="icon">
            <Avatar>
              <AvatarImage src="data:image/jpeg;base64,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" />
            </Avatar>
          </Button>
          <div>
            <h1 className="text-lg font-medium">Company Name</h1>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg my-2">Job Title</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet Animi harum recusandae debitis blanditiis
            vero neque adipisci eos deserunt molestias quidem, ratione
            voluptates
          </p>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <Badge className={"text-blue-600 font-bold mr-2"} variant={"ghost"}>
            10 Position
          </Badge>
          <Badge className={"text-[#FA4F09] font-bold mr-2"} variant={"ghost"}>
            20 LPA
          </Badge>
          <Badge className={"text-[#6B3AC2] font-bold mr-2"} variant={"ghost"}>
            Remote
          </Badge>
          <Badge className={"text-black font-bold"} variant={"ghost"}>
            Full Time
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          variant="outline"
          className={"font-bold rounded-sm"}
        >
          {" "}
          Details
        </Button>
        <Button
          variant="outline"
          className={"bg-[#6B3AC2] text-white font-bold rounded-sm"}
        >
          {" "}
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;
