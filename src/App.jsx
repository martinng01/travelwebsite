import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostPage from "./pages/[slug]";
import { CustomMDXProvider } from "./MDXProvider.jsx";

function App() {
  return (
    <CustomMDXProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/posts/:slug" element={<PostWrapper />} />
          <Route path="/" element={<GlobeComponent />} />
        </Routes>
      </BrowserRouter>
    </CustomMDXProvider>
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
