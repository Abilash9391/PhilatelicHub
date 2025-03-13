import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";


const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const URL="http://localhost:3000/api/posts";
  const name=localStorage.getItem('name');

   useEffect(() => {
      async function getposts(){
        try{
            const response = await axios.get(`${URL}/getpost`);
        setPosts(response.data);
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
      }
      getposts();
    }, []);

  const addPost=async ()=>{
    const newPostData = {
        user: name,
        content: newPost,
        image: selectedImage
        };
        try{
            const res= await axios.post(`${URL}/addpost`,newPostData);
            if(res.data.success)
            {
                setPosts([...posts, newPostData]);
                setNewPost("");
                setSelectedImage(null);
                console.log(posts);
            }
        }
        catch(err){
            console.log(err);
        }
  }

  const handleLike =async (id) => {
    try{
        const res = await axios.put(`${URL}/likepost/${id}`);
        if(res.data.success){
            setPosts(posts.map(post => 
              post._id === id ? {...post, likes: post.likes + 1} : post
            ));
        }
        else{
            console.log("Like failed:", res.data.message);
        }
    }
    catch(err){
        console.log("Error in handleLike:", err);
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start p-6 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?stamps,collection')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 w-full max-w-3xl bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">📬 Philatelic Community</h1>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <input 
            type="text" 
            placeholder="Share something..." 
            value={newPost} 
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-2 rounded-md text-black"
          />

          <input 
            type="file" 
            accept="image/*" 
            className="mt-3 w-full text-white" 
            onChange={handleImageChange} 
          />

          {selectedImage && (
            <div className="mt-3">
              <img src={selectedImage} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}

          <button 
            className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md"
            onClick={addPost}
          >
            Post 📢
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post,i) => (
            <motion.div 
              key={post.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
              className="bg-gray-700 p-4 rounded-lg shadow-lg"
            >
              <p className="font-semibold text-lg">{post.user==name ? "You":post.user}</p>
              <p className="text-gray-300 mt-1">{post.content}</p>

              {post.image=="null" ? (
                <div className="mt-3">
                  <img src={post.image} alt="User Upload" className="w-full h-40 object-cover rounded-md" />
                </div>
              ): <></>}

              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-400">👍 {post.likes} Likes</p>
                <button 
                  className="bg-green-500 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                  onClick={() => { 
                    handleLike(post._id);
                  }}


                >
                  Like ❤️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
