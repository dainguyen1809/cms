import {createContext, ReactNode, useContext, useState} from 'react';

// data type definition context
interface ToastContextType {
    message: string,
    setMessage: (message:string) => void,
}

// data type definition props
interface ToastProviderProps {
    children: ReactNode
}

// create context || init value undefined
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => { // props children
    const [message, setMessage] = useState<string>('');

    return (
        // value={{message, setMessage}} children component able access
      <ToastContext.Provider value={{message, setMessage}}> 
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