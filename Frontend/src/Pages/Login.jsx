import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../Authentication/store/reducer/auth";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
  const { setToken } = useContext(ProductContext);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        setToken(action.payload);
        localStorage.setItem("token", action.payload);
        navigate("/");
        // localStorage.setItem("UserId",)
        toast.success("Signed In");
      }
    });
  };
  return (
    <>
      <div className="grid h-screen w-screen md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src="/img/auth/auth1.jpg"
            className="h-full w-full object-cover"
            placeholder="blur"
          />
        </div>

        <div className="ml-5 flex flex-col items-center justify-center">
          <h1 className="mb-7 font-serif text-2xl font-semibold text-latergator md:text-4xl">
            Login to PhilatelicHub
          </h1>
          <div className="flex flex-col justify-center text-red-400">
            {auth.error && <p>{auth.error}</p>}
            {errors.email && <p>Email is required</p>}
            {errors.password && <p>Pasword is required</p>}
          </div>
          <form
            className="flex flex-col gap-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email..."
              className="w-72 bg-[#EFF0F2] px-3 py-2 outline-none ring-1 ring-slate-900/10"
            ></input>
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Password "
              className="w-72 bg-[#EFF0F2] px-3 py-2 outline-none ring-1 ring-slate-900/10"
            ></input>

            <button
              type="submit"
              className="l bg-latergator px-7 py-3 text-white"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
