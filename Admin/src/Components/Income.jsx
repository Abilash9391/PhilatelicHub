import React from "react";
import CountUp from "react-countup";
import {
  Pagination,
  A11y,
  Autoplay,
  Navigation,
  EffectCube,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-cube";
import "swiper/swiper-bundle.css";

const Income = ({ orders }) => {
  const reversedOrders = [...orders].reverse();
  const groupedData = [];
  for (let i = 0; i < reversedOrders.length; i += 3) {
    groupedData.push(reversedOrders.slice(i, i + 3));
  }

  return (
    <div className="relative flex h-72 w-80 flex-col rounded-xl bg-secondary p-5">
      <div>
        <h1 className="font-raleway text-xl text-white">Income</h1>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Swiper
          className="flex h-60 w-80 flex-col p-5"
          modules={[Navigation, Pagination, A11y, Autoplay, EffectCube]}
          autoplay={{ delay: 8000 }}
          spaceBetween={100}
          slidesPerView={1}
          effect={"cube"}
          cubeEffect={{
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {groupedData.map((group, index) => (
            <SwiperSlide key={index} className="flex flex-col justify-between">
              {group.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between gap-2 font-manrope"
                >
                  <div>
                    <h1 className="text-xl text-white">{order.name}</h1>
                    <h1 className="text-xs text-tetiary">{order.date}</h1>
                  </div>
                  <div>
                    <h1 className="flex gap-1 text-xs font-extralight tracking-widest text-tetiary">
                      <span>+$</span>
                      <span>
                        <CountUp
                          end={order.amount}
                          delay={0.2}
                          duration={5}
                          decimal=","
                        />
                      </span>
                    </h1>
                  </div>
                </div>
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Income;
