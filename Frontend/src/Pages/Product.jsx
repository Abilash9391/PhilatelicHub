import { React, useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { IoMdSearch } from "react-icons/io";
import ButtonGreen from "../Components/Button/ButtonGreen.jsx";
import Shoppage from "../Components/Product/Shoppage.jsx";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const navigate= useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;


  const handleSell=()=>{
    console.log("Sell button clicked");
    navigate("/sell");
  }

  const filteredProducts = products.filter((product) => {
    if (search === "") {
      return product;
    } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
      return product;
    }
    return false;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background py-10">
        <div className="flex items-center justify-center">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5">
              <IoMdSearch size={20} className="fill-slate-300" />
            </span>
            <input
              className="block rounded-full bg-secondary py-2 pl-12 font-raleway text-white shadow-sm placeholder:text-white"
              placeholder="Search"
              type="text"
              name="src"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </label>
            <ButtonGreen 
            onClick={handleSell}
            Text_Color={"white"}
            Font={"raleway"}
            Padding_Y={"16px"}
            Padding_X={"32px"}
            Text={"Sell"}
                  />
        </div>

        <div className="mt-10 grid grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map((product, i) => (
            <Shoppage updateproducts={product} key={i} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded-md px-4 py-2 ${
                currentPage === 1
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-secondary text-white hover:bg-secondary/80"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`rounded-md px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-secondary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`rounded-md px-4 py-2 ${
                currentPage === totalPages
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-secondary text-white hover:bg-secondary/80"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="mt-10 text-center text-lg text-white">
            No products found matching your search.
          </div>
        )}
      </div>
    </>
  );
};

export default Product;