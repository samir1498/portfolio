import { useState } from "react";
import { useWasmRunner } from "@/hooks/useWasmRunner";
import CodeView from "./CodeView";
import OutputDisplay from "./OutputDisplay";

interface JavaWasmRunnerProps {
  id: string;
  label: string;
  sourceCode: string;
  wasmJsUrl: string;
}

function RunButton({
  onClick,
  running,
}: {
  onClick: () => void;
  running: boolean;
}) {
  return (
    <button
      onClick={onClick}
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
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="border-t border-border bg-red-50/50 px-4 py-2 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
      {message}
    </div>
  );
}

export default function JavaWasmRunner({
  id,
  label,
  sourceCode,
  wasmJsUrl,
}: JavaWasmRunnerProps) {
  const { output, running, error, run } = useWasmRunner(id, wasmJsUrl);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 rounded-xl border border-border bg-page">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/30 px-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span aria-hidden="true" className="shrink-0 text-primary">
            {">_"}
          </span>
          <span className="truncate text-xs font-semibold text-foreground sm:text-sm">
            {label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:text-foreground"
          >
            {showCode ? "Hide" : "Code"}
          </button>
          <RunButton onClick={run} running={running} />
        </div>
      </div>

      {showCode && <CodeView code={sourceCode} />}
      {error && !running && <ErrorBanner message={error} />}
      {output.length > 0 && !running && <OutputDisplay output={output} />}
    </div>
  );
}
