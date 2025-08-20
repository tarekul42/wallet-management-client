import CommonLayout from "./components/Layout/CommonLayout";
import { Outlet } from "react-router";
function App() {
  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
