import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { LayoutDashboard, LogOut, User as UserIcon, Sun, Moon, Menu } from "lucide-react";
import { role } from "@/constants/role";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs" },
];

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [triggerLogout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await triggerLogout(undefined).unwrap();
    } catch {
      // proceed with client-side logout
    }
    dispatch(logout());
    navigate("/login");
  };

  const getDashboardLink = (userRole?: string) => {
    if (userRole === role.admin || userRole === role.superAdmin)
      return "/dashboard/admin";
    if (userRole === role.agent) return "/dashboard/agent";
    return "/dashboard/user";
  };

  const authLinks = user
    ? [
        ...navigationLinks,
        { href: getDashboardLink(user.role), label: "Dashboard" },
      ]
    : navigationLinks;

  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
                <Button
                  className="md:hidden"
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-44 p-1.5 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {authLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink className="py-1.5 px-2 rounded-md" asChild>
                        <NavLink to={link.href}>{link.label}</NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0" aria-label="Home">
              <Logo className="block" />
            </Link>
            <NavigationMenu className="max-md:hidden flex items-center">
              <NavigationMenuList className="gap-1 flex items-center">
                {authLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      className="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-transparent data-[active]:bg-transparent data-[active]:hover:bg-transparent transition-colors"
                      asChild
                    >
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          isActive ? "text-primary font-semibold" : ""
                        }
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 text-muted-foreground hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </Button>
          {user ? (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn("size-9 rounded-full bg-primary/10 text-primary font-semibold text-sm","border border-primary/20 hover:bg-primary/15 transition-colors","flex items-center justify-center")} aria-label="User menu">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-60 p-2">
                  <div className="flex flex-col space-y-1 mb-2 px-2 py-1.5">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <span className="text-xs text-muted-foreground capitalize mt-1">
                      {user.role?.toLowerCase()}
                    </span>
                  </div>
                  <div className="border-t border-border/70 my-2" />
                  <div className="grid gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 font-normal h-9"
                      asChild
                    >
                      <Link to={getDashboardLink(user.role)}>
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 font-normal h-9"
                      asChild
                    >
                      <Link to={`/dashboard/${user.role === role.superAdmin || user.role === role.admin ? "admin" : user.role.toLowerCase()}/profile`}>
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start gap-2 h-9 text-destructive hover:text-destructive hover:bg-destructive/10 font-normal"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
