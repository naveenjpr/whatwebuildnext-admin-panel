import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home/Home"
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage"
import RootLayout from "./RootLayout"
import "./index.css"
import AddPortfolio from "./Pages/Portfolio/AddPortfolio"
import ViewPortfolio from "./Pages/Portfolio/ViewPortfolio"
import SimplePage from "./Pages/SimplePage"
import AddSociallyEngaged from "./Pages/Socially_Engaged/AddSociallyEngaged"
import ViewSociallyEngaged from "./Pages/Socially_Engaged/ViewSociallyEngaged"
import AddFeedback from "./Pages/Feedback/AddFeedback"
import ViewFeedback from "./Pages/Feedback/ViewFeedback"
import AddMeettheExperts from "./Pages/Meet the Experts/AddMeettheExperts"
import ViewMeettheExperts from "./Pages/Meet the Experts/ViewMeettheExperts"
import Addskills from "./Pages/Skills/Addskills"
import Viewskills from "./Pages/Skills/Viewskills"
import Addcategories from "./Pages/Categories/Addcategories"
import Viewcategories from "./Pages/Categories/Viewcategories"
import Profile from "./Pages/Yourprofile/profile"
import Settings from "./Pages/Settings/Settings"
import Login from "./Pages/login/Login"

const router = createBrowserRouter([

  {
path: "/",
element: <RootLayout/>,
    children:[

      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/portfolio/add",
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
        path: "/category",
        element: <Viewcategories />,
      },
      {
        path: "/categories/view",
        element: <Viewcategories />,
      },
      {
        path: "/categories/add",
        element: <Addcategories />,
      },
      {
        path: "/skills",
        element: <Viewskills />,
      },
      {
        path: "/skills/view",
        element: <Viewskills />,
      },
      {
        path: "/skills/add",
        element: <Addskills />,
      },
      {
        path: "/achievements",
        element: <SimplePage title="Achievements" />,
      },
      {
        path: "/messages",
        element: <SimplePage title="Client Messages" />,
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
        path: "/socially-engaged/add",
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
        path: "/testimonials",
        element: <ViewFeedback />,
      },
      {
        path: "/testimonials/view",
        element: <ViewFeedback />,
      },
      {
        path: "/testimonials/add",
        element: <AddFeedback />,
      },
      {
        path: "/team",
        element: <ViewMeettheExperts />,
      },
      {
        path: "/team/view",
        element: <ViewMeettheExperts />,
      },
      {
        path: "/team/add",
        element: <AddMeettheExperts />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  }
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
)