import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SlidersHorizontal } from "lucide-react";

const filterData = [
  {
    fiterType: "Location",
    array: [
      "Andhra Pradesh",
      "Goa",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Tamil Nadu",
      "Telangana",
      "West Bengal",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Marketing",
      "Healthcare",
      "Education",
      "Manufactoring",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 h-max">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="size-5 text-[#6B3AC2]" />
        <h1 className="text-lg font-bold">Filter Jobs</h1>
      </div>

      {filterData.map((filter, index) => {
        const filterType = filter.filterType || filter.fiterType;
        return (
          <div key={filterType} className="mb-5">
            <Label className="text-sm font-medium mb-2 block">
              {filterType}
            </Label>
            <RadioGroup defaultValue={filter.array[0]} className="gap-2">
              {filter.array.map((option, optIndex) => {
                const optionId = `${filterType}-${index}-${optIndex}`;
                return (
                  <div key={option} className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={optionId} />
                    <Label htmlFor={optionId}>{option}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );
      })}

      <div className="flex items-center gap-3 mt-6">
        <Button className="bg-[#6B3AC2] hover:bg-[#5a2fa6] flex-1 font-bold">
          Filter
        </Button>
        <Button variant="outline" className="font-bold">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;
