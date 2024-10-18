// package import
// import { toast } from "react-toastify";

// utils import
import axios from '../utils/axios';
import { handleAxiosError } from '../helpers/helper';
import { User } from '@/types/types';

type LoginPayload = {
  email: string;
  password: string;
};

const login = async (payload: LoginPayload): Promise<User | null> => {
  try {
    const res = await axios.post('auth/login', {
      email: payload.email,
      password: payload.password,
    });

    const user = res.data.user;

    return user;
  } catch (error: any) {
    handleAxiosError(error);
    // toast.error(error.response.data.message);
    return error;
  }
};

const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await axios.get('auth/profile');
  } catch (err: any) {
    console.log(err);
  }
};

export { login, fetchUser };
