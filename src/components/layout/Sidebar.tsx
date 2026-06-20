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
import Logo from "@/assets/icons/Logo";

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
    <div className="flex flex-col h-full bg-sidebar">
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border/70 shrink-0">
        {!collapsed ? (
          <Link to="/" className="flex items-center font-semibold tracking-tight text-sidebar-foreground"><Logo /></Link>
        ) : (
          <Link to="/" className="mx-auto" aria-label="Home"><Logo /></Link>
        )}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
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
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      collapsed && "justify-center",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
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

      <div className="border-t border-sidebar-border/70 p-3 shrink-0">
        {collapsed ? (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-normal"
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
          "hidden md:flex flex-col bg-sidebar border-r border-sidebar-border/70 transition-all duration-300 ease-in-out shrink-0",
          collapsed ? "w-[68px]" : "w-64"
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
