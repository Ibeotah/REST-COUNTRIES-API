import React from 'react'
import { Alert as AntAlert } from "antd";
import type { AlertProps } from "antd";
interface CustomAlertProps extends AlertProps {
    border?: boolean
}
export const Alert: React.FC<CustomAlertProps> = ({border= false, message,...props}) => {
    if(border) return <span style={{color: "red"}}>{message}</span>
    return <AntAlert {...props} 
   message={message} />;
};
