import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Motion from "../Motion/Motion";

const HomepageHero = ({ activeTab, setActiveTab }) => {
  const navbar = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "New Collection", link: "/newcollection" },
    { id: 3, name: "Product", link: "/product" },
  ];
  return (
    <>
      <div className="bg-background">
        <div className="relative">
          <img
            src="/img/home.png"
            className="h-full min-h-[600px] w-full object-cover"
          />
          <div className="absolute inset-y-1/4 left-4 font-medium tracking-widest text-white md:left-14">
            <Motion direction="right" delay={0.2}>
              <h1 className="pb-9 font-libre text-4xl md:text-6xl lg:text-8xl text-white">
              Timeless Treasures, Curated for Collectors
              </h1>
            </Motion>
            <Motion direction="right" delay={0.3}>
              <h3 className="pb-20 font-libre text-xl md:text-3xl lg:text-4xl text-white">
              Explore rare and vintage stamps that tell stories of the past with unmatched elegance and craftsmanship
              </h3>
            </Motion>
            <Motion direction="right" delay={0.4}>
              <Link to="/product">
                <Button
                  onClick={() => setActiveTab(navbar[2].id)}
                  Text_Color={"white"}
                  Font={"raleway"}
                  Padding_Y={"16px"}
                  Padding_X={"40px"}
                  Text={"Explore"}
                />
              </Link>
            </Motion>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageHero;