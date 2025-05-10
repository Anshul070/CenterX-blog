import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/profile/" element={<Profile />}/>
      </Routes>
    </main>
  );
}

export default App;
