import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col absolute w-full">
      <Navbar />
      <div className="grow-1 relative">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
