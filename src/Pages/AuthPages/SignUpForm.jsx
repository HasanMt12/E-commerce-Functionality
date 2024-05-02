import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../services/index/users.js";
import { userActions } from "../../store/reducers/userReducer.js";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const SignUpForm = ({ handleButtonClick , setSelectedDive }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // Define the mutation function using react-query's useMutation
  const { mutate, isLoading } = useMutation({

    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });        // Use the signup service function to register the user
    },
    onSuccess: (data) => {
      toast.success("Register Successfully");
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      setSelectedDive(1)
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Redirect to the home page if the user is already logged in
  useEffect(() => {
    if (userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  // Use react-hook-form for form management
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Handle form submission
  const submitHandler = (data) => {
    const loadingToast = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(loadingToast.id);
    }, 1200);
    const { name, email, password } = data;
    mutate({ name, email, password }); // Pass the country value from the data object
  };

  return (
    <div className="left-0 right-0 inline-block lg:mt-0 md:mt-20 mt-10  lg:px-4 md:px-0 py-2.5  sm:px-0">
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6 pb-4 my-auto" >
        <div>
          <div className="mb-2">
            <Input type="text" size="lg" variant="underlined"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 3-30 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter your name"
              className={`${errors.name ? "border-red-500" : "border-[#c3cad9]"}`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message} </p>)}
          </div>

        </div>
        <div>
          <div className="mb-2">
            <Input type="email" size="lg" variant="underlined"
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
              placeholder="Enter your email"
              className={` ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

        </div>
        <div>
          <div className="mb-2">
            <Input  size="lg" variant="underlined"
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
              className={`${errors.password ? "border-red-500" : "border-[#c3cad9]"}`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

        </div>

        <div className="flex flex-col gap-2">


          <button type="submit" className="relative inline-flex items-center justify-center md:px-10 px-6 py-1 overflow-hidden font-medium tracking-tighter text-white  bg-[#526D82] group w-[100%] rounded-full">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#9DB2BF] rounded-full group-hover:w-[100%] group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[#526D82]"></span>
            <span className="relative lg:text-lg md:text-md text-sm flex items-center justify-between  w-full">
              <h2 className=" cursor-pointer font-semibold text-white">Sign Up </h2>
              <div
                className="rounded-full p-2  cursor-pointer text-white z-20 flex  justify-center items-center">
                <IoIosArrowForward className="text-xl" />
              </div>
            </span>
          </button>


          <div className="mt-4">
            <h1 className="text-center  text-[#6f7277]">Already have an account? <span onClick={() => handleButtonClick(1)} className="text-[#526D82] cursor-pointer font-semibold underline mb-5">Log In</span></h1>
          </div>
        </div>


      </form>

    </div>
  );
}

export default SignUpForm;