import { useState, useRef, useCallback, useEffect } from "react";
import { runWasmScript } from "@/lib/scriptRunner";

export function useWasmRunner(id: string, wasmJsUrl: string) {
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback(() => {
    if (running) return;
    setRunning(true);
    setOutput([]);
    setError(null);

    runWasmScript(id, wasmJsUrl, setOutput, setError, setRunning, mountedRef);
  }, [running, wasmJsUrl, id]);

  return { output, running, error, run };
}
