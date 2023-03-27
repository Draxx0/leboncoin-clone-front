import { Route, Routes } from "react-router-dom";
import FormPost from "../components/posts/formPost/FormPost";
import Home from "../pages/Home/Home";
import PostPage from "../pages/postPage/PostPage";

const PrimaryRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create-post" element={<FormPost />}></Route>
      <Route path="/create-post/:id" element={<FormPost />}></Route>
      <Route path="/post/:id" element={<PostPage />}></Route>
    </Routes>
  );
};

export default PrimaryRouter;
