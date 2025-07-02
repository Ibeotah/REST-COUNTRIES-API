import React from "react";
import { Spin } from "antd";
// import styles from "../loader/loader.module.css"
type LoaderProps = {
  className?: string
}
export const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <div className={className}>
      <Spin />
    </div>
  );
};
