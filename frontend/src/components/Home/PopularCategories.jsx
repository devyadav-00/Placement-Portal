import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Software Development",
      subTitle: "150+ Openings",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      subTitle: "80+ Openings",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Full Stack Development",
      subTitle: "120+ Openings",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "Cloud Computing",
      subTitle: "90+ Openings",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Investment Banking",
      subTitle: "45+ Openings",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "AI & Machine Learning",
      subTitle: "75+ Openings",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Digital Marketing",
      subTitle: "60+ Openings",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Product Management",
      subTitle: "40+ Openings",
      icon: <IoGameController />,
    },
  ];  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
