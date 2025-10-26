import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { store } from './app/store.jsx';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/Layout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Popular } from './pages/Popular.jsx';
import { Upcoming } from './pages/Upcoming.jsx';
import { TopRelated } from './pages/TopRelated.jsx'
import { NewPlaying } from './pages/NewPlaying.jsx';
import { More } from './pages/More.jsx';
import { SignIn } from './pages/SignIn.jsx';
import { Provider } from "react-redux";

const routing = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "popular",
        element: <Popular/>
      },
      {
        path: "upcoming",
        element: <Upcoming/>
      },
      {
        path: "top-rated",
        element: <TopRelated/>
      },
      {
        path: "now-playing",
        element: <NewPlaying/>
      },
      {
        path: "more",
        element: <More/>
      },
      {
        path: "sign-in",
        element: <SignIn/>
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
