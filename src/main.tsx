import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const Home = React.lazy(() => import("./Pages/Home/Home"));
const NotFoundPage = React.lazy(() => import("./Pages/NotFoundPage/NotFoundPage"));
const AddPortfolio = React.lazy(() => import("./Pages/Portfolio/AddPortfolio"));
const ViewPortfolio = React.lazy(() => import("./Pages/Portfolio/ViewPortfolio"));
const SimplePage = React.lazy(() => import("./Pages/SimplePage"));
const AddSociallyEngaged = React.lazy(() => import("./Pages/Socially_Engaged/AddSociallyEngaged"));
const ViewSociallyEngaged = React.lazy(() => import("./Pages/Socially_Engaged/ViewSociallyEngaged"));
const AddFeedback = React.lazy(() => import("./Pages/Feedback/AddFeedback"));
const ViewFeedback = React.lazy(() => import("./Pages/Feedback/ViewFeedback"));
const AddMeettheExperts = React.lazy(() => import("./Pages/Meet the Experts/AddMeettheExperts"));
const ViewMeettheExperts = React.lazy(() => import("./Pages/Meet the Experts/ViewMeettheExperts"));
const Addskills = React.lazy(() => import("./Pages/Skills/Addskills"));
const Viewskills = React.lazy(() => import("./Pages/Skills/Viewskills"));
const Addcategories = React.lazy(() => import("./Pages/Categories/Addcategories"));
const Viewcategories = React.lazy(() => import("./Pages/Categories/Viewcategories"));
const Profile = React.lazy(() => import("./Pages/Yourprofile/profile"));
const Settings = React.lazy(() => import("./Pages/Settings/Settings"));
const ViewInquiries = React.lazy(() => import("./Pages/Inquiries/viewInquiries"));
const Login = React.lazy(() => import("./Pages/login/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio/add/:id?",
        element: <AddPortfolio />,
      },
      {
        path: "/portfolio/view",
        element: <ViewPortfolio />,
      },
      {
        path: "/resume",
        element: <SimplePage title="Resume" />,
      },

      {
        path: "/categories/view",
        element: <Viewcategories />,
      },
      {
        path: "/categories/add/:id?",
        element: <Addcategories />,
      },

      {
        path: "/skills/view",
        element: <Viewskills />,
      },
      {
        path: "/skills/add/:id?",
        element: <Addskills />,
      },
      {
        path: "/achievements",
        element: <SimplePage title="Achievements" />,
      },
      {
        path: "/messages",
        element: <ViewInquiries />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/socially-engaged/add/:id?",
        element: <AddSociallyEngaged />,
      },
      {
        path: "/socially-engaged/view",
        element: <ViewSociallyEngaged />,
      },
      {
        path: "/social",
        element: <ViewSociallyEngaged />,
      },

      {
        path: "/testimonials/view",
        element: <ViewFeedback />,
      },
      {
        path: "/testimonials/add/:id?",
        element: <AddFeedback />,
      },

      {
        path: "/team/view",
        element: <ViewMeettheExperts />,
      },
      {
        path: "/team/add/:id?",
        element: <AddMeettheExperts />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <Suspense fallback={<div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
    <ToastContainer />
  </>
);
