import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const highlighterStyles = {
  margin: 0,
  borderRadius: 0,
  fontSize: "0.75rem",
  lineHeight: "1.5",
  background: "transparent",
  overflowX: "auto",
  maxWidth: "100%",
  minWidth: 0,
};

export default function CodeView({
  code,
  language = "java",
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="max-w-full overflow-x-auto border-b border-border">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={highlighterStyles}
        showLineNumbers={false}
        wrapLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
