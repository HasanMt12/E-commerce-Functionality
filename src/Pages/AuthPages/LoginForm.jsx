import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { login } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducer";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ handleButtonClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [captchaValue, setCaptchaValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
    else {
      setDisabled(true)
    }
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("User login successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState?.userInfo?.data?.email) {
      navigate("/");
    }
    if (userState?.userInfo?.data?.admin === true) {
      navigate("/dashboard");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    if (!validateCaptcha(captchaValue)) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }
    const loadingToast = toast.loading("Please wait...");

    setTimeout(() => {
    toast.dismiss(loadingToast.id);
    }, 1200);
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <div className="left-0 right-0 inline-block lg:mt-0 md:mt-20 mt-12  lg:px-4 md:px-0 py-2.5 z-20  sm:px-0 bg-clip-padding backdrop-filter backdrop-blur-lg">

      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6 pb-4 my-auto " >

{/* Email */}
        <div>
          <div className="mb-2">
            <Input type="email" size="lg" variant="underlined" placeholder="Enter email"
              className={` ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />

            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

        </div>

{/* Password */}
        <div>
          <div className="mb-2">
            <Input size="lg" variant="underlined"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Eye color="#121212"  />
                ) : (
                  <EyeOff color="#121212"  />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password length must be at least 6 characters",
                },
              })}
              placeholder="Enter password"
              className={` ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`}

            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

        </div>

{/* CAPTCHA */}      
        <div>
          <div className="mb-2">
            <LoadCanvasTemplate />
            <Input type="text" size="sm" variant="underlined" placeholder="Enter the CAPTCHA"
              id="captcha"
              value={captchaValue}
              onChange={(e) => setCaptchaValue(e.target.value)}
            />
          </div>
        </div>


        <div className="flex flex-col gap-2">
          <button type="submit" className="relative inline-flex items-center justify-center md:px-10 px-6 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#b89c07] group w-[100%] rounded-full">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#a08300] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#b89c07]"></span>
            <span className="relative lg:text-lg md:text-md text-sm flex items-center justify-between  w-full">
              <h2 className=" cursor-pointer font-semibold text-white">Sign In </h2>
              <div
                className="rounded-full p-2  cursor-pointer text-white z-20 flex  justify-center items-center">
                <IoIosArrowForward className="text-xl" />
              </div>
            </span>
          </button>


          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#6f7277] cursor-pointer font-semibold">
                <input type="checkbox" name="" id="" />
                <p>Remember Me</p>
              </div>
              <h2 className="text-[#6f7277] cursor-pointer font-semibold underline">Forgot Password</h2>
            </div>
            <h1 className="text-center mt-5 text-[#6f7277]">Don't have an account? <span onClick={() => handleButtonClick(2)} className="text-[#b89c07] cursor-pointer font-semibold underline mb-5">Sign Up</span></h1>
          </div>

        </div>
      </form >

    </div >
  );
}

export default LoginForm;


// - State management: Utilizes useState hook to manage visibility of password input and captcha validation.
// - Navigation: Utilizes useNavigate hook from React Router for programmatic navigation.
// - Redux integration: Implements state management for user information using useDispatch and useSelector hooks.
// - Captcha validation: Integrates captcha validation logic to ensure secure login.
// - User login mutation: Implements login mutation logic using react-query's useMutation hook.
// - Redirect logic: Handles redirecting users based on their role after successful login.
// - Form validation: Implements form validation using react-hook-form for enhanced user experience.