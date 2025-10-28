// MDXProvider.jsx
import { MDXProvider } from "@mdx-js/react";
import { Title, Text, Code, Blockquote, List } from "@mantine/core";

const components = {
  h1: (props) => <Title order={1} mt="xl" mb="md" {...props} />,
  h2: (props) => <Title order={2} mt="lg" mb="sm" {...props} />,
  h3: (props) => <Title order={3} mt="md" mb="sm" {...props} />,
  h4: (props) => <Title order={4} mt="md" mb="xs" {...props} />,
  h5: (props) => <Title order={5} mt="sm" mb="xs" {...props} />,
  h6: (props) => <Title order={6} mt="sm" mb="xs" {...props} />,
  p: (props) => <Text mb="sm" {...props} />,
  code: (props) => <Code {...props} />,
  blockquote: (props) => <Blockquote my="md" {...props} />,
  ul: (props) => <List my="sm" {...props} />,
  ol: (props) => <List type="ordered" my="sm" {...props} />,
};

export function CustomMDXProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
