import { useAppSelector } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link } from "react-router";

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const sidebarItems = getSidebarItems(user?.role);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index} className="mb-2">
            <Link to={item.path} className="hover:text-gray-300">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
