import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import PostPage from "./pages/[slug]";
import { CustomMDXProvider } from "./MDXProvider.jsx";
import GlobeComponent from "./components/Globe/GlobeComponent.jsx";

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

const PostWrapper = () => {
  const { slug } = useParams();
  return <PostPage slug={slug} />;
};

export default App;
