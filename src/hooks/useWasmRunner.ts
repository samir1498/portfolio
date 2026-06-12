import { useState, useRef, useCallback, useEffect } from "react";

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

  const run = useCallback(() => {
    if (running) return;
    setRunning(true);
    setOutput([]);
    setError(null);

    const captured: string[] = [];
    let hasError = false;

    logRef.current = [console.log, console.error];

    const capture = (args: unknown[]) =>
      captured.push(args.map((a) => String(a)).join(" "));

    console.log = (...args: unknown[]) => capture(args);
    console.error = (...args: unknown[]) => {
      capture(args);
      hasError = true;
    };

    const restore = () => {
      if (logRef.current) {
        console.log = logRef.current[0];
        console.error = logRef.current[1];
        logRef.current = null;
      }
    };

    const prev = document.querySelector(`script[id^="wr-${id}"]`);
    if (prev) prev.remove();

    const script = document.createElement("script");
    script.src = wasmJsUrl;
    script.id = `wr-${id}-${Date.now()}`;

    const t0 = performance.now();
    let resolved = false;

    const finish = (err?: string) => {
      if (resolved) return;
      resolved = true;
      restore();
      if (!mountedRef.current) return;
      if (captured.length === 0 && !hasError && !err) {
        captured.push(
          "No output — WASM module may have loaded without console output.",
        );
      }
      setOutput([...captured]);
      if (hasError || err) setError(err || "Check console for details.");
      setRunning(false);
    };

    script.onload = () => {
      const poll = setInterval(() => {
        if (performance.now() - t0 > 8000) {
          clearInterval(poll);
          finish();
        } else if (captured.length > 0) {
          clearInterval(poll);
          finish();
        }
      }, 100);
    };

    script.onerror = () => {
      restore();
      captured.push("Error: failed to load WASM module.");
      if (mountedRef.current) {
        setOutput([...captured]);
        setError("Script load failed");
        setRunning(false);
      }
    };

    document.body.appendChild(script);
  }, [running, wasmJsUrl, id]);

  return { output, running, error, run };
}
