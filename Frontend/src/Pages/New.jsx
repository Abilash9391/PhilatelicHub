"use client";

import { useState, } from "react";

import Upload from "../assets/uploadfield.svg";

import Card from "../Components/ui/Card.jsx";
import CardContent from "../Components/ui/CardContent.jsx";
import CardHeader from "../Components/ui/CardHeader.jsx";
import CardFooter from "../Components/ui/CardFooter.jsx";
import CardTitle from "../Components/ui/CardTitle.jsx";
import Button from "../Components/ui/Button.jsx";
import Input from "../Components/ui/Input.jsx";
import Label from "../Components/ui/Label.jsx";
import Textarea from "../Components/ui/Textarea.jsx"; 
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function New() {
  const URL="http://localhost:3000/api/product";
  const navigate=useNavigate();

  // const URL = "http://localhost:3000";
    const [isSelected, setIsSelected] = useState(false);
    const [image, setImage] = useState("null");
    const [isLoading, setIsLoading] = useState(null);
    const [imageUrl, setImageUrl] = useState(Upload);
    const [data, setData] = useState({
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      imageFile: null,
      color: "",
      quantity:"",
      features: "",
      inStock: true,
    });


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
    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("brand", data.brand);
    formData.append("imageFile", data.imageFile);
    formData.append("category", data.category);
    formData.append("color", data.color);
    formData.append("features", data.features);
    formData.append("quantity",data.quantity);
    formData.append("inStock", Boolean(true));
    formData.append("verified","pending");
    formData.append("userId",userId)
try{
    const response = await axios.post(`${URL}/adduserprod`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        imageFile: null,
        color: "",
        quantity:"",
        features: ""
      });
      setIsLoading(false);
      setImage(null);
      setImageUrl(Upload);
      toast.success(response.data.message);
      navigate("/product")
    } else {
      console.error("Submission failed");
      toast.error(response.data.message);

      setIsLoading(false);
    }

    } catch (error) {
      console.log("Error in Submitting Form", error);
    }
  
  };

//   async function handleSubmit(event) {
//     event.preventDefault();
//     setIsSubmitting(true);
  
//     const userId = localStorage.getItem("userId");
//     const formData = new FormData(event.currentTarget);
  
//     formData.append("userId", userId);
//     formData.append("verified", "pending");
//     formData.append("inStock", "true");

//     const fileInput = document.getElementById("image");
//     if (fileInput.files.length > 0) {
//         formData.append("image", fileInput.files[0]); // Ensure field name matches backend
//     }

//     // 🔍 Debugging: Log FormData keys
//     for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//     }

//     try {
//         const response = await axios.post(`${URL}/adduserprod`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//         });
  
//         console.log(response.data);
//         toast.success("Product submitted for verification.");
//     } catch (error) {
//         console.error("Failed to create product:", error);
//         toast.error("Failed to submit product. Please try again later.");
//     } finally {
//         setIsSubmitting(false);
//     }
// }


  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  
  //   const userId = localStorage.getItem("userId");
  //   const formData = new FormData(event.currentTarget);
  
  //   // Append fields
  //   formData.append("userId", userId);
  //   formData.append("verified", "pending");
  //   formData.append("inStock", "true");
  
  //   // Ensure correct file field name
  //   // const fileInput = document.getElementById("imageFile");
  //   const fileInput = event.currentTarget.image;
  //   if (fileInput.files.length > 0) {
  //     formData.append("image", fileInput.files?.[0]); // Must match backend Multer field name
  //   }
  
  //   try {
  //     const response = await axios.post(`${URL}/adduserprod`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  
  //     console.log(response.data);
  //     toast.success("Product submitted for verification.");
  //   } catch (error) {
  //     console.error("Failed to create product:", error);
  //     toast.error("Failed to submit product. Please try again later.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }
  

  

  // function handleImageChange(event) {
    
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
      
  //     reader.onload = (e) => {
  //       setImagePreview(e.target?.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name !== "inStock" || name !== "newCollection") {
      setData((data) => ({ ...data, [name]: value }));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Sell a Product</h1>
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={onSubmitHandler}>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <h1>
              Fill out the form below to list your product. It will be reviewed by an admin before being published.
            </h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name"
              onChange={onChangeHandler}
              name="name" 
              value={data.name}
              required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} required value={data.description} 
              onChange={onChangeHandler}

              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
              value={data.price}
              onChange={onChangeHandler}
               id="price" name="price" type="number" step="0.01" min="0.01" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
              value={data.quantity}
              onChange={onChangeHandler}
               id="quantity" name="quantity" type="number" step="1" min="0" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={data.category}
                onChange={onChangeHandler}
                className="border rounded-md p-2 w-full"
                required
              >
                <option value="">Select a category</option>
                <option value="Revenue Stamps">Revenue Stamps</option>
                  <option value="Postal Stamps">Postal Stamps</option>
                  <option value="Hundi Stamps">Hundi Stamps</option>
                  <option value="Foreign Exchange Stamps">Foreign Exchange Stamps</option>
                  <option value="Customs Stamps">Customs Stamps</option>
              </select>
            </div>

            <div className="space-y-2">
            {/* <div className="w-40"> */}
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
              {/* <Label htmlFor="imageFile">Product Image</Label>
              <Input
              onChange={onImageChange}
              required
              hidden
              id="imageFile" name="imageFile" type="file" accept="image/*"/>

              {/* {imagePreview && (
                <div className="mt-2 relative w-full h-48 bg-muted rounded-md overflow-hidden">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )} *} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
              value={data.brand}
              onChange={onChangeHandler}
              id="brand" name="brand" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input 
              value={data.color}
              onChange={onChangeHandler}
              id="color" name="color" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Input
              value={data.features}
              onChange={onChangeHandler}
              id="features" name="features" required />
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Submitting..." : "Submit for Verification"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}