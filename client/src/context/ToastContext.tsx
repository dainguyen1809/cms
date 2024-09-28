import {createContext, ReactNode, useContext, useState} from 'react';

// data type definition context

export type ToastType = 'success' | 'warning' | 'error' | null;

interface ToastContextType {
    message: string,
    type: ToastType,
    setMessage: (message:string, type: ToastType) => void,
}

// data type definition props
interface ToastProviderProps {
    children: ReactNode
}

// create context || init value undefined
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => { // props children
    const [message, setToastMessage] = useState<string>('');
    const [type, setType] = useState<ToastType>(null);

    const setMessage = (message: string, type: ToastType = null) => {
        setToastMessage(message);
        setType(type);
    }

    return (
        // value={{message, setMessage}} children component able access
      <ToastContext.Provider value={{message, type, setMessage}}> 
        {children}
      </ToastContext.Provider>  
    );
}

export const useToast = (): ToastContextType => {
    const toastContext = useContext(ToastContext);
    if(!toastContext)
        throw new Error('Đã có lỗi xảy ra');
    return toastContext; // object
}