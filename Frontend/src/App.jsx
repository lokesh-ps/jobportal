import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy";
import TermsOfService from "./components/components_lite/TermsOfService";
import Jobs from "./components/components_lite/Jobs";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";
import Description from "./components/components_lite/Description";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/description/:id",
    element: <Description />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default App;
