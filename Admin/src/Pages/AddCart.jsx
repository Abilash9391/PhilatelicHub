import { React, useEffect, useState } from "react";
import Upload from "../assets/uploadfield.svg";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingBlack from "../assets/loadingblack.svg";
import classNames from "classnames";

const AddCart = () => {
  const URL = "http://localhost:3000";
  const [isSelected, setIsSelected] = useState(false);
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [image, setImage] = useState("null");
  const [isLoading, setIsLoading] = useState(null);
  const [imageUrl, setImageUrl] = useState(Upload);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "Luxury Watches",
    imageFile: null,
    color: "",
    quantity:"",
    features: "",
    inStock: false,
    newCollection: false,
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "inStock" || name !== "newCollection") {
      setData((data) => ({ ...data, [name]: value }));
    }
  };
  const onToggleSwitch = () => {
    setIsSelected((prev) => {
      const newValue = !prev;
      setData((prevData) => ({ ...prevData, inStock: newValue }));
      return newValue;
    });
  };
  const onToggleSwitchNewCollection = () => {
    setIsNewCollection((prev) => {
      const newValue = !prev;
      setData((prevData) => ({ ...prevData, newCollection: newValue }));
      return newValue;
    });
  };
  // const onImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file instanceof File) {
  //     setImage(file);
  //     setData((prevData) => ({ ...prevData, imageFile: file }));
  //     if (URL && URL.createObjectURL) {
  //       const url = URL.createObjectURL(file);
  //       console.log('Image URL:', objectURL);
  //       setImageUrl(url);
  //       return () => URL.revokeObjectURL(url);
  //     }
  //     else{
  //       console.error('URL.createObjectURL is not supported');
  //     }
  //   }
  function onImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setData((prevData) => ({ ...prevData, imageFile: file }));
        const reader = new FileReader();
        reader.onload = function(e) {
            // console.log('Image URL:', e.target.result);
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        console.error('No file selected');
    }

  };

  const onSubmitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("brand", data.brand);
    formData.append("imageFile", data.imageFile);
    formData.append("category", data.category);
    formData.append("color", data.color);
    formData.append("features", data.features);
    formData.append("inStock", Boolean(data.inStock));
    formData.append("newCollection", Boolean(data.newCollection));
try{
    const response = await axios.post(`${URL}/api/product/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        brand: "",
        category: "Luxury Watches",
        price: "",
        imageFile: null,
        color: "",
        features: "",
        quantity:"",
        inStock: false,
        newCollection: false,
      });
      setIsLoading(false);
      setImage(null);
      setImageUrl(Upload);
      toast.success(response.data.message);
    } else {
      console.error("Submission failed");
      toast.error(response.data.message);
      setIsLoading(false);
    }

    } catch (error) {
      console.log("Error in Submitting Form", error);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col bg-background">
        <div className="w-full py-10 pl-10">
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5">
            <h1 className="header">Product Information</h1>
            <div>
              <p className="subheader">Product Name</p>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Type here..."
                className="productsmall"
              />
            </div>
            <div>
              <p className="subheader">Product Description</p>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                className="productlarge"
                type="text"
                name="description"
                rows={"6"}
                placeholder="Write description here..."
                required
              />
            </div>
            <div>
              <p className="subheader">Product Features</p>
              <textarea
                onChange={onChangeHandler}
                value={data.features}
                className="productlarge"
                type="text"
                name="features"
                rows={"6"}
                placeholder="Write features here..."
                required
              />
            </div>
            <div>
              <p className="subheader">Product Brand</p>
              <input
                onChange={onChangeHandler}
                value={data.brand}
                type="text"
                name="brand"
                placeholder="Type Brand Name Here"
                className="productsmall"
              />
            </div>
            <div>
              <p className="subheader">Quantity</p>
              <input
                onChange={onChangeHandler}
                value={data.quantity}
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="productsmall"
              />
            </div>
            <div>
              <p className="subheader">Product Color</p>
              <input
                onChange={onChangeHandler}
                value={data.color}
                type="text"
                name="color"
                placeholder="Type Brand Name Here"
                className="productsmall"
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <p className="subheader">Product In Stock</p>

              <div
                onClick={onToggleSwitch}
                className={classNames(
                  "m-5 flex h-5 w-10 rounded-full bg-gray-600 transition-all duration-500",
                  { "bg-green-500": isSelected },
                )}
              >
                <span
                  className={classNames(
                    "h-5 w-5 rounded-full bg-white transition-all duration-500",
                    {
                      "ml-5": isSelected,
                    },
                  )}
                ></span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <p className="subheader">New Collection</p>

              <div
                onClick={onToggleSwitchNewCollection}
                className={classNames(
                  "m-5 flex h-5 w-10 rounded-full bg-gray-600 transition-all duration-500",
                  { "bg-green-500": isNewCollection },
                )}
              >
                <span
                  className={classNames(
                    "h-5 w-5 rounded-full bg-white transition-all duration-500",
                    {
                      "ml-5": isNewCollection,
                    },
                  )}
                ></span>
              </div>
            </div>
            <div className="w-40">
              <p className="subheader">Product Image</p>
              <label htmlFor="imageFile">
                <img src={imageUrl} alt="" className="h-20" />
              </label>
              <input
                onChange={onImageChange}
                type="file"
                id="imageFile"
                hidden
                required
              />
            </div>
            <div className="flex flex-col gap-x-5 md:flex-row">
              <div>
                <p className="subheader">Product Category</p>
                <select
                  onChange={onChangeHandler}
                  value={data.category}
                  name="category"
                  className="w-40 rounded-full bg-secondary px-3 py-1 font-lora text-white outline-none"
                >
                  <option value="">Select a category</option>
                <option value="Revenue Stamps">Revenue Stamps</option>
                  <option value="Postal Stamps">Postal Stamps</option>
                  <option value="Hundi Stamps">Hundi Stamps</option>
                  <option value="Foreign Exchange Stamps">Foreign Exchange Stamps</option>
                  <option value="Customs Stamps">Customs Stamps</option>
                </select>
              </div>
              <div>
                <p className="subheader">Product Price </p>
                <input
                  onChange={onChangeHandler}
                  value={data.price}
                  type="number"
                  placeholder="$20"
                  name="price"
                  className="w-40 bg-secondary px-3 py-1 text-white outline-none"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="rounded-l-full rounded-r-full bg-primary px-7 py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-x-3">
                    <img src={LoadingBlack} className="h-6 w-6" />

                    <p className="font-playfair text-white">Processing...</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-3 text-white">
                    <FaPlus />
                    <p className="font-playfair">Add Product</p>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCart;
