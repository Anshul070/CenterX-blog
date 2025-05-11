import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import NewBlog from "./pages/NewBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";

function App() {
  return (
    <main className="w-full font-['Montserrat']">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Header />
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <Header />
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/"
          element={
            <ProtectedRoute>
              <Header />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/new/"
          element={
            <ProtectedRoute>
              <Header />
              <NewBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/update/:id"
          element={
            <ProtectedRoute>
              <Header />
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
