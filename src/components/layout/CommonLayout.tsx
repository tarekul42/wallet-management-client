import Navbar from "./Navbar";
import Footer from "./Footer";
import type { ReactNode } from "react";
import { useAppSelector } from "@/redux/hook";
import GlobalLoader from "@/components/ui/GlobalLoader";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const { globalLoader } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {globalLoader && <GlobalLoader />}
      <Navbar />
      <main id="main-content" className="grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
