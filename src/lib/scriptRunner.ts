import type { Dispatch, SetStateAction } from "react";

interface ScriptRunnerContext {
  captured: string[];
  hasError: () => boolean;
  handleLoad: () => void;
  handleError: () => void;
}

function captureConsole(args: unknown[]): string {
  return args.map((a) => String(a)).join(" ");
}

function createScriptRunnerContext(
  setOutput: Dispatch<SetStateAction<string[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setRunning: Dispatch<SetStateAction<boolean>>,
  mountedRef: React.MutableRefObject<boolean>,
): ScriptRunnerContext {
  let captured: string[] = [];
  let hasError = false;

  const originalLog = console.log;
  const originalError = console.error;

  console.log = (...args: unknown[]) => {
    captured.push(captureConsole(args));
  };
  console.error = (...args: unknown[]) => {
    captured.push(captureConsole(args));
    hasError = true;
  };

  function restoreLogs() {
    console.log = originalLog;
    console.error = originalError;
  }

  function setOutputFromCapture() {
    setOutput([...captured]);
  }

  function setErrorIfNeeded(err?: string) {
    if (hasError) setError("Check console for details.");
    else if (err) setError(err);
  }

  function addNoOutputMessage(err?: string) {
    if (captured.length > 0) return;
    if (hasError) return;
    if (err) return;
    captured.push(
      "No output — WASM module may have loaded without console output.",
    );
  }

  function finalize(err?: string) {
    restoreLogs();
    if (!mountedRef.current) return;
    addNoOutputMessage(err);
    setOutputFromCapture();
    setErrorIfNeeded(err);
    setRunning(false);
  }

  function handleLoad() {
    const t0 = performance.now();
    const poll = setInterval(() => {
      const elapsed = performance.now() - t0;
      if (elapsed > 8000 || captured.length > 0) {
        clearInterval(poll);
        finalize();
      }
    }, 100);
  }

  function handleError() {
    restoreLogs();
    captured.push("Error: failed to load WASM module.");
    if (mountedRef.current) {
      setOutput([...captured]);
      setError("Script load failed");
      setRunning(false);
    }
  }

  return { captured, hasError: () => hasError, handleLoad, handleError };
}

function hasPendingScript(id: string): boolean {
  return !!document.querySelector(`script[id^="wr-${id}"]`);
}

export function runWasmScript(
  id: string,
  wasmJsUrl: string,
  setOutput: Dispatch<SetStateAction<string[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setRunning: Dispatch<SetStateAction<boolean>>,
  mountedRef: React.MutableRefObject<boolean>,
): void {
  if (hasPendingScript(id)) {
    const prev = document.querySelector(`script[id^="wr-${id}"]`);
    if (prev) prev.remove();
  }

  const ctx = createScriptRunnerContext(
    setOutput,
    setError,
    setRunning,
    mountedRef,
  );
  const script = document.createElement("script");
  script.src = wasmJsUrl;
  script.id = `wr-${id}-${Date.now()}`;
  script.onload = ctx.handleLoad;
  script.onerror = ctx.handleError;
  document.body.appendChild(script);
}
