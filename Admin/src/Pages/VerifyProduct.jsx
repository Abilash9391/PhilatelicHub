import React from "react";
import { useState,useEffect } from "react";
import Upload from "../assets/uploadfield.svg";
import { FaPlus } from "react-icons/fa";
import DeleteIcon from "../Icons/DeleteIcon";
import SearchIcon from "../Icons/SearchIcon";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBlack from "../assets/loadingblack.svg";

const VerifyProduct = () => {
    const [verificationStatus, setVerificationStatus] = useState("");

    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    // const URL = "https://ecommercerezlocker.onrender.com";
    const URL = "http://localhost:3000";

    const fetchList = async () => {
    const response = await axios.get(`${URL}/api/product/verifyproducts`);
    if (response.data.success) {
        console.log(response.data.data);
        setList(response.data.data);
    } else {
        toast.error(response.data.message);
    }
    };
    useEffect(() => {
        fetchList();
      }, []);

      const handleVerificationChange= async (productId,value)=>{
        try{
          const response = await axios.post(`${URL}/api/product/verifyprod/${productId}`,{verified: value});
          if(response.data.success){
            toast.success(response.data.message);
            setVerificationStatus(response.data.data);
          }
        }
        catch(err){
          console.log(err);
        }
      }
    
    return(
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
                    
                    {updateproducts.verified=="pending" ?(<select 
                        value={verificationStatus[updateproducts._id] || ""}
                        onChange={(e) => handleVerificationChange(updateproducts._id, e.target.value)}
                        className="mt-2 rounded-md bg-secondary text-white"
                    >
                        <option value="">pending</option>
                        <option value="Verified">verified</option>
                        <option value="rejected">rejected</option>
                    </select>): <p>{updateproducts.verified}</p>}

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
    
}

const handleVerificationChange = (id, status) => {
    setVerificationStatus((prev) => ({
        ...prev,
        [id]: status,
    }));
};

export default VerifyProduct;
