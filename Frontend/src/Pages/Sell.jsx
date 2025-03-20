import React from "react";
import SellProducts from "./SellProducts";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";


const Sell=()=>{
    const navigate=useNavigate();
    const handle=()=>{
        navigate("/product");
    }
    const handleAdd=()=>{
        navigate("/addproduct");
    }   
     return(
        <>
            <div className="flex m-2 justify-between">
                <Button
                onClick={handle}
                type="submit"
                Text_Color={"white"}
                Font={"raleway"}
                Padding_Y={"10px"}
                Padding_X={"32px"}
                Text={"Back to Products"}
                />
                <Button
                    onClick={handleAdd}
                    Text_Color={"white"}
                    Font={"raleway"}
                    Padding_Y={"8px"}
                    Padding_X={"24px"}
                    Text={"Sell a Product"}
                />
            </div>
            <SellProducts/>
        </>
    );
}

export default Sell;