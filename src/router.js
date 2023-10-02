import { createBrowserRouter } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Home from "./Pages/Home";
import Course from "./Pages/Course";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LoginSignupGuard from "./guards/LoginSignupGuard";
import RoutesGuard from "./guards/RoutesGuard";
import Error from "./Pages/Error";
import KnowledgeGraph from "./Pages/KnowledgeGraph";
import ApproveNotes from "./Pages/ApproveNotes";
import Leaderboard from './Pages/Leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RoutesGuard>
        <div className="App">
          <Header />
          <Home />
        </div>
      </RoutesGuard>
    ),
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <LoginSignupGuard>
        <Login />
      </LoginSignupGuard>
    ),
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: (
      <LoginSignupGuard>
        <Signup />
      </LoginSignupGuard>
    ),
    errorElement: <Error />,
  },
  {
    path: "/course/:courseId/video/:videoId?",
    element: (
      <RoutesGuard>
        <Course />
      </RoutesGuard>
    ),
    errorElement: <Error />,
  },
  {
    path: "/knowledgeGraph",
    element: (
      <RoutesGuard>
        <KnowledgeGraph />
      </RoutesGuard>
    ),
    errorElement: <Error />,
  },
  {
    path: "approvenotes/:courseId?",
    element: (
      <RoutesGuard>
        <ApproveNotes />
      </RoutesGuard>
    ),
    errorElement: <Error />,
  },
    {
        path: '/leaderboard',
        element: (
          <RoutesGuard>
            <Leaderboard> /</Leaderboard>
          </RoutesGuard>
        ),
        errorElement: <Error />,
      },
]);

export default router;
