// import { Button } from "@/components/ui/button";
// import Image from "next/image";

const  OrderItem=({
  image,
  name,
  quantity,
  price,
  status,
  deliveryDate,
})=> {
  return (
    <div className="flex gap-4 p-6 pb-6 border-b border-gray-100 last:border-b-0">
      <div className="w-24 h-24 bg-gray-50 flex-shrink-0">
        <img src={image} alt={name} width={96} height={96} className="object-cover" />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1">
          <h3 className="font-medium">{name}</h3>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Qty: {quantity}</span>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col items-center">
          <span className="text-sm text-gray-500">Status</span>
          <span className="text-orange-500 font-medium">{status}</span>
        </div>
        <div className="col-span-3 md:col-span-1 flex flex-col items-end">
          <span className="text-sm text-gray-500">Expected Delivery</span>
          <span className="font-medium">{deliveryDate}</span>
          <span className="font-medium mt-auto">${price}</span>
        </div>
      </div>
    </div>
  );
}
export default OrderItem;