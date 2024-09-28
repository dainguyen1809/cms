// hooks
import { useEffect } from "react"

// components
import { useToast } from "../../context/ToastContext"

// helpers
import { showNotify } from "../../helpers/notify";

const dashboard = () => {

  const {message, type, setMessage} = useToast();

  useEffect(() => {
    showNotify(message, type, setMessage);
  }, [message, type, setMessage]);

  return (
    <div>Dashboard Layout</div>
  )
}

export default dashboard