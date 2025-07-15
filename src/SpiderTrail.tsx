import { useEffect, useRef } from "react";

const SpiderTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth out position
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.15;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.15;

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const radius = 25 + i * 2;
        const x = smoothPos.current.x + Math.cos(angle) * radius;
        const y = smoothPos.current.y + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(smoothPos.current.x, smoothPos.current.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`; // light web strands
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999,
        pointerEvents: "none",
      }}
    />
  );
};

export default SpiderTrail;
