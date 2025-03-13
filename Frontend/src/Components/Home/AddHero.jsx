import React from "react";

const AddHero = () => {
  const product = [
    { id: 1, image: "/img/hublot.png" },
    { id: 2, image: "/img/patek.png" },
    { id: 3, image: "/img/rolex.png" },
    { id: 4, image: "/img/paneri.png" },
  ];

  return (
    <>
      <div className="dark:bg-black">
        <div className="md:container md:rounded-3xl pt-8">
          <div className="relative w-full h-full  ">
            <img
              src="/img/AddHero.jpg"
              className="w-full h-full object-none lg:object-left min-h-[700px] md:max-h-[400px] md:min-h-[400px]  "
            />
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-75"></div>
            <div className="absolute top-16 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 ">
              <div className="order-last md:order-first text-white grid grid-cols-2 justify-items-center gap-y-4">
                {product.map((product) => (
                  <div key={product.id}>
                    <img
                      src={product.image}
                      className="h-[calc(90%)] w-[calc(90%)] "
                    />
                  </div>
                ))}
              </div>
              <div className="text-white px-5 flex items-center justify-center flex-col gap-y-3">
                <h1 className="text-xl tracking-widest font-semibold">
                  Rezlocker delivers precision and elegance with every tick.
                </h1>
                <p className="text-base tracking-widest text-pretty  ">
                  Rez Locker epitomizes the peak of sophistication and precision
                  in timekeeping. Our meticulously curated collection blends
                  classic elegance with cutting-edge innovation, offering
                  watches that are more than just timekeepers they are refined
                  statements of your style and personality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHero;
