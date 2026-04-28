import { useEffect, useRef, useState } from "react";

export default function DumbbellCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
      }
      raf.current = requestAnimationFrame(update);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(
        !!(t.closest("a, button, [role='button'], input, textarea, select, label, [onclick]"))
      );
    };

    const onDown = () => {
      setClicking(true);
      setTimeout(() => setClicking(false), 420);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    raf.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const cls = [
    "dumbbell-cursor",
    hovering ? "hovering" : "",
    clicking ? "clicking" : "",
  ].join(" ").trim();

  return (
    <div ref={cursorRef} className={cls}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Левая большая пластина */}
        <rect x="1" y="9" width="4" height="10" rx="2" fill="#00d4ff"/>
        {/* Левая малая пластина */}
        <rect x="5" y="11" width="3" height="6" rx="1.5" fill="#00b8e6"/>
        {/* Гриф */}
        <rect x="8" y="12.5" width="12" height="3" rx="1.5" fill="#e8f4f8"/>
        {/* Правая малая пластина */}
        <rect x="20" y="11" width="3" height="6" rx="1.5" fill="#00b8e6"/>
        {/* Правая большая пластина */}
        <rect x="23" y="9" width="4" height="10" rx="2" fill="#00d4ff"/>
      </svg>
    </div>
  );
}
