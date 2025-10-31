import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { store } from './app/store.jsx';
import { createRoot } from 'react-dom/client';
import { MainLayout } from './components/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Popular } from './pages/Popular.jsx';
import { Upcoming } from './pages/Upcoming.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { Provider } from "react-redux";
import { TopRated } from './pages/TopRelated.jsx';
import { NowPlaying } from './pages/NowPlaying.jsx';
import { More } from './pages/More.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Search } from './components/SearchResults.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const routing = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "popular",
        element: <Popular />
      },
      {
        path: "upcoming",
        element: <Upcoming />
      },
      {
        path: "top-rated",
        element: <TopRated />
      },
      {
        path: "now-playing",
        element: <NowPlaying />
      },
      {
        path: "more",
        element: <More />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "/search",
        element: <Search />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routing} />
    </Provider>
  </StrictMode>,
)
