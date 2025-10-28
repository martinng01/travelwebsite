import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mantine/core";

export default function PostPage() {
  const { slug } = useParams();
  const Post = React.lazy(() => import(`../posts/${slug}.mdx`));

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Post />
    </React.Suspense>
  );
}
