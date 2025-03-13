import React from "react";
import CountUp from "react-countup";

const Statistics = ({ orders }) => {
  const totalAmount = orders.reduce(
    (total, orders) => total + orders.amount,
    0,
  );
  return (
    <div className="flex h-32 w-80 flex-col items-start justify-center gap-4 rounded-xl bg-primary pl-10 font-manrope text-tetiary">
      <h1 className="">Total Orders</h1>
      <h1 className="flex gap-4">
        <span className="text-xl">$</span>
        <span className="text-5xl font-extralight tracking-widest">
          <CountUp
            start={0}
            end={totalAmount}
            delay={0.2}
            duration={5}
            decimal=","
          />
        </span>
      </h1>
    </div>
  );
};

export default Statistics;
