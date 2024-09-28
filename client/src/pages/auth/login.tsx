import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// shadcn import
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

// components
import { login } from "../../services/AuthServices";
import { useToast } from "../../context/ToastContext";

// redux toolkit
import { setToast } from "../../redux/slice/toastSlice";
import { useDispatch, UseDispatch } from "react-redux";

// hooks
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  // context
  // const {setMessage} = useToast();

  // redux
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleLogin: SubmitHandler<Inputs> = async (payload) => {
    setLoading(true);


    //  context
    //  setMessage("Đăng nhập thành công", "success");

    // redux
    try {
      const isLogin = await login(payload);
      dispatch(setToast({ message: "Đăng nhập thành công", type: "success" }));
      isLogin && navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-lg text-center font-bold">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full border p-3 border-gray-400 rounded-xl outline-none mt-4"
              placeholder="domain@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Vui lòng nhập Email</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold"
            >
              Mật Khẩu
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full border p-3 border-gray-400 rounded-xl outline-none mt-4"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Vui lòng nhập Mật Khẩu</span>
            )}
          </div>
          <div className="mb-4">
            {/* <button className="w-full p-3 transition ease-in-out delay-200 bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-lg">
              Đăng nhập
            </button> */}
            <Button
              disabled={loading}
              className="w-full p-6 mt-5 transition linear delay-200 bg-blue-500 hover:bg-blue-700 duration-300 text-white rounded-lg"
            >
              {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Đang xử lý' : 'Đăng nhập'}
            </Button>
          </div>
          <div className="text-end">Quên mật khẩu</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
