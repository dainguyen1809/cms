// package import
// import { toast } from "react-toastify";

// utils import
import axios from "../utils/axios";
import { handleAxiosError } from "../helpers/helper";


type LoginPayload = {
  email: string;
  password: string;
};

const login = async (payload: LoginPayload): Promise<boolean> => {
  try {
    const res = await axios.post("auth/login", {
      email: payload.email,
      password: payload.password,
    });

    return true;

  } catch (error: any) {
    handleAxiosError(error);
    // toast.error(error.response.data.message);    
    return false;
  }
};

export { login };
