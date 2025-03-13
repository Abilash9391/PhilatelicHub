import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Authentication/store/reducer/auth";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { toast } from "react-toastify";
import ArchiveIcon from "../../assets/Icons/ArchiveIcon";
import ArrowRightIcon from "../../assets/Icons/ArrowRightIcon";
import LogoutIcon from "../../assets/Icons/LogoutIcon";

const ProfileNav = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken } = useContext(ProductContext);
  const storedToken = localStorage.getItem("token");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3,setIsHovered3] =useState(false);

  return (
    <>
      <div className="flex h-32 w-32 flex-col items-center justify-center gap-4 rounded-2xl bg-primary text-black">
        <div>
          <Link
            to="/myorders"
            className="flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ArchiveIcon isHovered={isHovered} />
            <h1 className="font-raleway text-white">My Orders </h1>
          </Link>
        </div>

        {!storedToken ? (
          <div>
            <Link
              to="/signup"
              className="flex items-center justify-center"
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              <h1 className="font-raleway text-white">Sign Up </h1>
              <ArrowRightIcon isHovered={isHovered1} />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center"
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            >
              <h1 className="font-raleway text-white">Login </h1>
              <ArrowRightIcon isHovered={isHovered1} />
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                dispatch(logout()).then(() => {
                  navigate("/");
                  setToken(null);
                  toast.success("Logged Out");
                })
              }
              className="flex items-center justify-center font-raleway text-white"
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              <h1>Log Out</h1>
              <LogoutIcon isHovered={isHovered2} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileNav;
