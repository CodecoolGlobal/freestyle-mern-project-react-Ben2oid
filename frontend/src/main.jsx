import React from "react";
import ReactDOM from "react-dom/client";
import {
  AuthPage,
  GuestView,
  MainPage,
  NotFound,
  UserView,
  Friends,
  NewsFeed,
  Movies,
  MyList,
} from "./Pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.styles.scss";
import { MoviePage } from "./Pages/MoviePage/MoviePage";

const isItLoggedIn = false;

const routing = createBrowserRouter([
  {
    path: "/",
    element: <GuestView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
    ],
  },
  {
    path: "/",
    element: <UserView isItLoggedIn={isItLoggedIn} />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/my-list",
        element: <MyList />,
      },
      {
        path: "/newsfeed",
        element: <NewsFeed />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routing} />
  </React.StrictMode>
);
