import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../Authentication/store/reducer/auth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const { email, password, fullname } = data;
    dispatch(signup({ email, password, fullname })).then((action) => {
      if (signup.fulfilled.match(action)) {
        localStorage.setItem("token", action.payload);
        navigate("/");
        toast.success("Welcome", fullname);
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
          <h1 className="mb-7 font-serif text-2xl font-semibold text-primary md:text-4xl">
            Welcome to PhilatelicHub
          </h1>
          <div className="flex flex-col justify-center gap-2 text-red-400">
            {auth.error && <p>{auth.error}</p>}
            {errors.email && <p>Email is not valid</p>}
            {errors.password && <p>Pasword is not Strong Enough</p>}
          </div>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Full Name</label>
            <input
              type="text"
              {...register("fullname", { required: true })}
              placeholder="Full Name..."
              className="w-72 bg-[#EFF0F2] px-3 py-2 outline-none ring-1 ring-slate-900/10"
            />

            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email..."
              className="w-72 bg-[#EFF0F2] px-3 py-2 outline-none ring-1 ring-slate-900/10"
            ></input>

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              })}
              placeholder="Password "
              className="w-72 bg-[#EFF0F2] px-3 py-2 outline-none ring-1 ring-slate-900/10"
            ></input>

            <button type="submit" className="bg-primary px-10 py-2 text-white">
              Create Account
            </button>

            <p>
              Already have an account ?
              <span className="text-primary">
                <Link to="/login"> Log in</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
