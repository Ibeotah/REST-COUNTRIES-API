// import styles from "../container/container.module.css";

import { useState } from "react";

export const Container = ({
  children,
  className,
  isNav = true,
}: {
  children?: React.ReactNode;
  className?: string;
  isNav?: boolean;
}) => {
  const [isNavbar] = useState(isNav);

  return isNavbar ? (
    <nav className={className}>{children}</nav>
  ) : (
    <div className={className}>{children}</div>
  );
};
