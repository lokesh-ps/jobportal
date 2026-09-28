import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "@/redux/jobSlice";
const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Devops Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];
const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Explore our extensice job market.
        </p>
      </div>
      <Carousel className={"w-full max-w-xl mx-auto my-10"}>
        <CarouselContent>
          {Category.map((category) => {
            return (
              <CarouselItem
                key={category}
                className={"mb:basis-1/2 lg-basis-1/3"}
              >
                <Button
                  onClick={(category) => {
                    dispatch(setsearchQuery(category));
                    navigate("/browse");
                  }}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  {category}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
