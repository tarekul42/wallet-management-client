import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import { LogOut, PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  mobileOpen = false,
  onMobileClose,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [triggerLogout] = useLogoutMutation();
  const sidebarItems = getSidebarItems(user?.role);

  const handleLogout = async () => {
    try {
      await triggerLogout(undefined).unwrap();
    } catch {
      // proceed with client-side logout
    }
    dispatch(logout());
    navigate("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
        {!collapsed && (
          <Link to="/" className="font-bold text-lg text-primary">
            Wallet
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="font-bold text-lg text-primary mx-auto">
            W
          </Link>
        )}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin" aria-label="Dashboard navigation">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <TooltipProvider key={item.path} delayDuration={collapsed ? 100 : 999999}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="ml-2">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      <div className="border-t p-3 shrink-0">
        {collapsed ? (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full p-2.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
            size="sm"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-sidebar border-r transition-all duration-300 ease-in-out shrink-0",
          collapsed ? "w-16" : "w-64"
        )}
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onClose={onMobileClose || (() => {})} side="left">
        {sidebarContent}
      </Sheet>
    </>
  );
};

export default Sidebar;
