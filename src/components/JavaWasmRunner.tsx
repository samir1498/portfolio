import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useWasmRunner } from "@/hooks/useWasmRunner";

interface JavaWasmRunnerProps {
  id: string;
  label: string;
  sourceCode: string;
  wasmJsUrl: string;
}

const highlighterStyles = {
  margin: 0,
  borderRadius: 0,
  fontSize: "0.75rem",
  lineHeight: "1.5",
  background: "transparent",
};

export default function JavaWasmRunner({
  id,
  label,
  sourceCode,
  wasmJsUrl,
}: JavaWasmRunnerProps) {
  const { output, running, error, run } = useWasmRunner(id, wasmJsUrl);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-page">
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="shrink-0 text-primary">
            &gt;_
          </span>
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:text-foreground"
          >
            {showCode ? "Hide" : "Code"}
          </button>
          <button
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {running ? (
              <span
                aria-hidden="true"
                className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
            ) : (
              <span aria-hidden="true" className="inline-block text-white">
                &rsaquo;
              </span>
            )}
            {running ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {showCode && (
        <div className="max-w-full overflow-x-auto border-b border-border">
          <SyntaxHighlighter
            language="java"
            style={oneDark}
            customStyle={highlighterStyles}
            showLineNumbers={false}
            wrapLines={false}
          >
            {sourceCode}
          </SyntaxHighlighter>
        </div>
      )}

      {error && !running && (
        <div className="border-t border-border bg-red-50/50 px-4 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {output.length > 0 && !running && (
        <div className="max-h-64 overflow-y-auto border-t border-border bg-black/10 p-4 font-mono text-xs leading-relaxed dark:bg-white/5">
          {output.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith("Error")
                  ? "text-red-500"
                  : line.startsWith("---")
                    ? "font-semibold text-primary"
                    : "text-secondary-foreground"
              }
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
