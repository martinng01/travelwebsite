import { useEffect, useState } from "react";

export default function usePosts(selectedSlug) {
  const [PostComponent, setPostComponent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedSlug) {
      setPostComponent(null);
      setError(null);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    import(`../../posts/${selectedSlug}.mdx`)
      .then((mod) => {
        if (!mounted) return;
        setPostComponent(() => mod.default || mod);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Post not found");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedSlug]);

  return { PostComponent, loading, error };
}
