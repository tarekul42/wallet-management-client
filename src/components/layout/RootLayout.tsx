import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";

const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default RootLayout;
