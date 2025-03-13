// import Card  from "../Components/ui/Card";
// import Avatar from "../Components/ui/Avatar"; // Updated to default import
// import { Button } from "../Components/Button/Button";
// // import { Badge } from "'components/ui/badge'";
// import { Stamp, Heart, ShoppingCart } from "lucide-react";

// const UserProfile = ({ user }) => {
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Card className="p-4 shadow-lg">
//         <CardHeader className="flex items-center gap-4">
//           <Avatar className="w-20 h-20">
//             <AvatarImage src={user.avatar} alt={user.name} />
//           </Avatar>
//           <div>
//             <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
//             <p className="text-gray-500">{user.email}</p>
//             {/* <Badge className="mt-2">{user.membership}</Badge> */}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-3 gap-4">
//             <Button variant="outline" className="flex items-center gap-2">
//               <Stamp className="w-5 h-5" /> Collection 
//               {/* ({user.collection.length}) */}
//             </Button>
//             <Button variant="outline" className="flex items-center gap-2">
//               <Heart className="w-5 h-5" /> Wishlist 
//               {/* ({user.wishlist.length}) */}
//             </Button>
//             <Button variant="outline" className="flex items-center gap-2">
//               <ShoppingCart className="w-5 h-5" /> Purchases 
//               {/* ({user.purchases.length}) */}
//             </Button>
//           </div>
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold">Recent Activity</h3>
//             {/* <ul className="mt-2 space-y-2">
//               {user.recentActivity.map((activity, index) => (
//                 <li key={index} className="text-gray-700">
//                   {activity}
//                 </li>
//               ))}
//             </ul> */}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserProfile;
