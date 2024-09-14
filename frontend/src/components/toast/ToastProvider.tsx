import { createContext, ReactNode, useContext, useState } from "react";
import Toast from "./Toast";

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
interface ToastContextType {
    addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = ()=>{
    const context = useContext(ToastContext);
    if(!context){
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export const ToastProvider = ( { children } : { children: ReactNode }) => {
    const [ toast, setToast ] = useState<Toast>();
    const [ timeOutId, setTimeoutId ] = useState<NodeJS.Timeout>();
    const addToast = (message: string, type: ToastType) =>{
        clearTimeout(timeOutId);
        const id = Date.now();
        setToast({id, message, type});
        setTimeoutId(setTimeout(() => removeToast(id), 3000))
    }
    const removeToast = (id: number) => {
        // setToasts(toasts.filter(toast => toast.id !== id));
        setToast(undefined)
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {toast&&(
                <Toast 
                key={toast.id}
                message={toast.message}
                type={toast.type}
            />
            )}
        </ToastContext.Provider>
    );
}