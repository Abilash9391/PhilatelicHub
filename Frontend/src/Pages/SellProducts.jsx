"use client"

import { useState, useEffect } from "react"
import Card from "../Components/ui/Card.jsx";
import CardContent from "../Components/ui/CardContent.jsx";
import CardHeader from "../Components/ui/CardHeader.jsx";
import CardFooter from "../Components/ui/CardFooter.jsx";
import CardTitle from "../Components/ui/CardTitle.jsx";
import Badge from "../Components/ui/Badge.jsx";
// import { Button } from "@/components/ui/button"
import Button from "../Components/Button/Button.jsx"
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react"
import axios from "axios";
// import { getProducts } from "@/lib/actions"

export function SellProducts() {
  const URL = "http://localhost:3000/api/product";
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${URL}/userverifyprod/${userId}`);
        if (response.data.success) {
          setProducts(response.data.data);
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-48 bg-muted rounded-t-lg" />
            <CardContent className="pt-4">
              <div className="h-6 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No products available</h2>
        <p className="text-muted-foreground mb-6">Be the first to sell something!</p>
        <Button asChild
        >
          <Link to="/products/new">Sell a Product</Link>
        </Button>
      </div>
    )
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="relative h-48 bg-muted">
            <img
              src={product.imageFile || `/placeholder.svg?height=192&width=384`}
              alt={product.name}
              className="w-full h-full object-cover"
            />

          </div>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{product.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                {product.verified === "pending" && (
                  <Badge variant="secondary">Pending Verification</Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground line-clamp-2">{product.description}</p>
            <p className="mt-2 text-sm">Seller: {product.userId == userId ? "You" : ""}</p>
          </CardContent>
          <CardFooter className="flex justify-between">

            <Link to={`/userproducts/${encodeURIComponent(product._id)}`}>

              <button>View Details</button></Link>

            {/* {product.verified === "verified" && (
              <Button asChild>
                <Link href={`/chat/${product.sellerId}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with Seller
                </Link>
              </Button>
            )} */}
          </CardFooter>
        </Card>
      ))}
    </div>

  )
}
// export default exprod;
export default SellProducts;
