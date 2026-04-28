import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 10;
const COLOR = "#e879f9"; // fuchsia — не сливается ни с cyan, ни с тёмным фоном

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

export default function DumbbellCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [hovering, setHovering] = useState(false);
  const idRef = useRef(0);
  const rafRef = useRef<number>(0);
  const rawPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };

      setTrail((prev) => {
        const next = [
          { x: e.clientX, y: e.clientY, id: idRef.current++ },
          ...prev,
        ].slice(0, TRAIL_LENGTH);
        return next;
      });

      const t = e.target as HTMLElement;
      setHovering(
        !!(t.closest("a, button, [role='button'], input, textarea, select, label"))
      );
    };

    const tick = () => {
      setPos({ ...rawPos.current });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* След */}
      {trail.map((dot, i) => {
        const opacity = (1 - i / TRAIL_LENGTH) * 0.5;
        const size = 8 * (1 - i / TRAIL_LENGTH);
        return (
          <div
            key={dot.id}
            style={{
              position: "fixed",
              left: dot.x,
              top: dot.y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: COLOR,
              opacity,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 99998,
              transition: "opacity 0.1s",
            }}
          />
        );
      })}

      {/* Основная точка */}
      <div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: hovering ? 18 : 10,
          height: hovering ? 18 : 10,
          borderRadius: "50%",
          background: COLOR,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          boxShadow: hovering
            ? `0 0 14px 5px ${COLOR}99, 0 0 28px 8px ${COLOR}44`
            : `0 0 8px 3px ${COLOR}88`,
          transition: "width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease",
          animation: hovering ? "cursor-pulse 1s ease-in-out infinite" : "none",
        }}
      />
    </>
  );
}
