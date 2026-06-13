import { useState, useRef, useCallback, useEffect } from "react";

function captureConsole(args: unknown[]): string {
  return args.map((a) => String(a)).join(" ");
}

function hasPendingScript(id: string): boolean {
  return !!document.querySelector(`script[id^="wr-${id}"]`);
}

export function useWasmRunner(id: string, wasmJsUrl: string) {
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const logRef = useRef<[typeof console.log, typeof console.error] | null>(
    null,
  );

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (logRef.current) {
        console.log = logRef.current[0];
        console.error = logRef.current[1];
      }
    };
  }, []);

  function createScriptRunner() {
    let captured: string[] = [];
    let hasError = false;

    logRef.current = [console.log, console.error];

    console.log = (...args: unknown[]) => {
      captured.push(captureConsole(args));
    };
    console.error = (...args: unknown[]) => {
      captured.push(captureConsole(args));
      hasError = true;
    };

    function restoreLogs() {
      if (logRef.current) {
        console.log = logRef.current[0];
        console.error = logRef.current[1];
        logRef.current = null;
      }
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

  const run = useCallback(() => {
    if (running) return;
    setRunning(true);
    setOutput([]);
    setError(null);

    if (hasPendingScript(id)) {
      const prev = document.querySelector(`script[id^="wr-${id}"]`);
      if (prev) prev.remove();
    }

    const runner = createScriptRunner();
    const script = document.createElement("script");
    script.src = wasmJsUrl;
    script.id = `wr-${id}-${Date.now()}`;
    script.onload = runner.handleLoad;
    script.onerror = runner.handleError;
    document.body.appendChild(script);
  }, [running, wasmJsUrl, id]);

  return { output, running, error, run };
}
