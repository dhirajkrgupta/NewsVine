import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home, {loadNews} from "./components/Home";
import Footer from "./components/Footer";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /><Footer /></>,
      loader: loadNews,
    },
  ])

  return (
    <>
      <div className="grid h-screen   grid-rows-[100px_1fr_164px]">
      <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App

