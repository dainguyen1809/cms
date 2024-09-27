// hooks
import { useEffect } from "react"

// components
import { useToast } from "../../context/ToastContext"
import { toast } from "react-toastify";

const dashboard = () => {

  const {message, setMessage} = useToast();

  useEffect(() => {
    if(message) {
      toast.success(message);
      setMessage('');
    }
  }, [message, setMessage]);

  return (
    <div>Dashboard Layout</div>
  )
}

export default dashboard