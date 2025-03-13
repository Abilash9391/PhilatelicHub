import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingWhite from "../../assets/loadingwhite.svg";
import LoadingBlack from "../../assets/loadingblack.svg";
import ButtonGreen from "../Button/ButtonGreen";

const NewsLetter = ({ theme, setTheme }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({
    email: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const response = await axios.post(
      `http://localhost:3000/api/news/newsubscribe`,
      { email: data.email },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    if (response.data.success) {
      setData({
        email: "",
      });
      setIsLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
    try {
    } catch (error) {
      toast.error("Something went wrong.Please try again.");
    }
  };
  return (
    <>
      <div className="flex justify-center bg-background">
        <div className="grid h-[428px] w-[1024px] grid-cols-1 md:h-[315px]">
          <div className="flex flex-col items-center justify-center gap-y-6">
            <h1 className="w-[300px] text-center font-libre text-5xl font-semibold text-white md:w-full md:tracking-widest">
              Subscribe to Our Newsletter
            </h1>
            <p className="w-[264px] break-normal text-center font-lora text-base tracking-widest text-white md:w-[400px] md:text-left">
              Don't miss out on your discounts. Subscribe to our email
              newsletter to get the best offers, discounts, coupons, gifts and
              much more.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col items-center justify-center gap-2 md:flex-row"
            >
              <input
                onChange={onChangeHandler}
                type="text"
                value={data.email}
                name="email"
                placeholder="Enter Your Email"
                className="w-72 border-b-2 bg-background px-2 py-2 font-raleway text-white outline-none"
              />
              <ButtonGreen
                Text_Color={"white"}
                Font={"raleway"}
                Padding_Y={"16px"}
                Padding_X={"32px"}
                Text={"Submit"}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter