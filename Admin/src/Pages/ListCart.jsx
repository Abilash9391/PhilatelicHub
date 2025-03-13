import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import LoadingGreen from "../assets/loadinggreen.svg";
import DeleteIcon from "../Icons/DeleteIcon";
import SearchIcon from "../Icons/SearchIcon";

const ListCart = ({ theme, setTheme }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [search, setSearch] = useState("");
  // const URL = "https://ecommercerezlocker.onrender.com";
  const URL = "http://localhost:3000";

  const fetchList = async () => {
    const response = await axios.get(`${URL}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeProduct = async (productId) => {
    setIsLoading(true);
    const response = await axios.post(`${URL}/api/product/remove`, {
      id: productId,
    });
    await fetchList();
    if (response.data.succes) {
      toast.success(response.data.message);
      setIsLoading(false);
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <div className="my-8 flex items-center justify-center">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              className="block rounded-full bg-secondary py-2 pl-12 font-raleway text-white shadow-sm placeholder:text-white"
              placeholder="Search"
              type="text"
              name="src"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 justify-between justify-items-center gap-y-2 rounded-md md:grid-cols-3 md:pl-5 lg:grid-cols-5">
          {list
            .filter((updateproducts) => {
              if (search == "") {
                return updateproducts;
              } else if (
                updateproducts.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return updateproducts;
              }
            })
            .map((updateproducts, index) => (
              <div
                key={index}
                className="h-[300px] w-[175px] rounded-md bg-secondary"
              >
                <div className="relative h-[175px] w-full bg-tetiary">
                  <img
                    src={updateproducts.imageFile}
                    className="h-full w-full object-cover object-center"
                    placeholder="blur"
                  />
                  {updateproducts.newCollection ? (
                    <p className="absolute left-1 top-1 flex items-center justify-center bg-black px-0.5 py-0.5 text-xs text-white">
                      NEW
                    </p>
                  ) : null}
                  <button
                    className="absolute right-1 top-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div>
                        <img src={LoadingGreen} className="h-4 w-4" />
                      </div>
                    ) : (
                      <div onClick={() => removeProduct(updateproducts._id)}>
                        <DeleteIcon />
                      </div>
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-y-2 pt-2 text-center font-lora text-white">
                  <p>{updateproducts.name}</p>
                  <p className="truncate tracking-tight">
                    {updateproducts.category}
                  </p>
                  <p> ${updateproducts.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListCart;
