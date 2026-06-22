type Props = { size?: number; mood?: "neutral" | "happy" };

/** Tiny pixel-art companion rendered with CSS grid cells. Minimal & light. */
export function Mascot({ size = 96 }: Props) {
  // 12x12 pixel grid. 0=empty, 1=ink outline, 2=yellow body, 3=white eye, 4=dark eye
  const g: number[][] = [
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,2,2,2,2,2,2,1,0,0],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,3,4,2,2,3,4,2,2,1],
    [1,2,2,3,3,2,2,3,3,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,1,1,1,1,2,2,2,1],
    [0,1,2,2,2,2,2,2,2,2,1,0],
    [0,0,1,1,2,2,2,2,1,1,0,0],
    [0,0,0,0,1,2,2,1,0,0,0,0],
    [0,0,0,1,2,2,2,2,1,0,0,0],
    [0,0,0,1,1,0,0,1,1,0,0,0],
  ];
  const colors: Record<number, string> = {
    0: "transparent",
    1: "var(--ink)",
    2: "var(--yellow)",
    3: "#ffffff",
    4: "var(--ink)",
  };
  const cell = size / 12;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(12, ${cell}px)`,
        gridTemplateRows: `repeat(12, ${cell}px)`,
        width: size,
        height: size,
      }}
      aria-label="มาสคอตพิกซี่"
    >
      {g.flat().map((v, i) => (
        <div key={i} style={{ backgroundColor: colors[v], width: cell, height: cell }} />
      ))}
    </div>
  );
}