import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("Navbar renders", () => {
  it("renders navigation links for unauthenticated user", async () => {
    const Navbar = (await import("@/components/layout/Navbar")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});

describe("Explore page renders", () => {
  it("renders search input and filters", async () => {
    const Explore = (await import("@/pages/Explore")).default;
    render(
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Search services...")).toBeInTheDocument();
  });

  it("shows loading skeleton initially", async () => {
    const Explore = (await import("@/pages/Explore")).default;
    render(
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});

describe("Login page renders", () => {
  it("renders login button", async () => {
    const Login = (await import("@/pages/Login")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});

describe("ForgotPassword page renders", () => {
  it("renders forgot password form", async () => {
    const ForgotPassword = (await import("@/pages/ForgotPassword")).default;
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });
});

describe("NotFound page renders", () => {
  it("renders 404 message", async () => {
    const NotFound = (await import("@/pages/NotFound")).default;
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

describe("Home page renders", () => {
  it("renders the hero heading", async () => {
    const Home = (await import("@/pages/Home/Home")).default;
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /digital wallet/i, level: 1 })).toBeInTheDocument();
  });
});

describe("About page renders", () => {
  it("renders about content", async () => {
    const About = (await import("@/pages/About")).default;
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
  });
});

describe("Contact page renders", () => {
  it("renders contact form", async () => {
    const Contact = (await import("@/pages/Contact/Contact")).default;
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /contact/i, level: 1 })).toBeInTheDocument();
  });
});

describe("SendMoneyPage renders", () => {
  it("renders send money page heading", async () => {
    const SendMoneyPage = (await import("@/pages/Dashboard/User/SendMoneyPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SendMoneyPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /send money/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/transfer funds/i)).toBeInTheDocument();
  });
});

describe("New pages render without crashing", () => {
  it("UpdatePasswordPage renders heading", async () => {
    const UpdatePasswordPage = (await import("@/pages/Dashboard/User/UpdatePasswordPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdatePasswordPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /update password/i, level: 1 })).toBeInTheDocument();
  });

  it("CommissionHistoryPage renders loading state", async () => {
    const CommissionHistoryPage = (await import("@/pages/Dashboard/Agent/CommissionHistoryPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommissionHistoryPage />
        </BrowserRouter>
      </Provider>
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("ManageWalletsPage renders loading state", async () => {
    const ManageWalletsPage = (await import("@/pages/Dashboard/Admin/ManageWalletsPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageWalletsPage />
        </BrowserRouter>
      </Provider>
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("SystemConfigPage renders loading state", async () => {
    const SystemConfigPage = (await import("@/pages/Dashboard/Admin/SystemConfigPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SystemConfigPage />
        </BrowserRouter>
      </Provider>
    );
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("CreateAdminPage renders heading", async () => {
    const CreateAdminPage = (await import("@/pages/Dashboard/Admin/CreateAdminPage")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CreateAdminPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /create admin/i, level: 1 })).toBeInTheDocument();
  });
});

describe("Register page renders", () => {
  it("renders create account heading", async () => {
    const Register = (await import("@/pages/Register")).default;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /create your account/i, level: 1 })).toBeInTheDocument();
  });
});
