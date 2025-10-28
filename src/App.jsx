import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/[slug]";
import { Header } from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/posts/:slug" element={<PostWrapper />} />
        <Route path="/" element={<GlobeComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

// Simple wrapper to extract slug from URL
import { useParams } from "react-router-dom";
import GlobeComponent from "./Globe";
const PostWrapper = () => {
  const { slug } = useParams();
  return <PostPage slug={slug} />;
};

export default App;
