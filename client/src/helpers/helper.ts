import axios from "axios";
import { toast } from "react-toastify";


const handleAxiosError = (err: any) => {
    if(axios.isAxiosError(err)){
        if(err.response && err.response.data && err.response.data.message){
            toast.error(err.response.data.message);
        }else {
            toast.error('Network Error');
        }
    }else {
        toast.error('Đã có lỗi xảy ra');
    }
};

export { handleAxiosError };
