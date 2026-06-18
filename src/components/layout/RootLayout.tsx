import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={1}
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
