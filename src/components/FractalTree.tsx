export function FractalTree() {
  return (
    <div className="mb-12 relative">
      <div className="w-32 h-32 mx-auto relative">
        <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
          <g transform="translate(50,90)" stroke="#64ffda" strokeWidth="0.5" fill="none">
            <line x1="0" y1="0" x2="0" y2="-25" className="animate-pulse" />
            <g transform="translate(0,-25)">
              <g transform="rotate(25)">
                <line x1="0" y1="0" x2="0" y2="-17" />
                <g transform="translate(0,-17) rotate(25)">
                  <line x1="0" y1="0" x2="0" y2="-11" />
                </g>
                <g transform="translate(0,-17) rotate(-25)">
                  <line x1="0" y1="0" x2="0" y2="-11" />
                </g>
              </g>
              <g transform="rotate(-25)">
                <line x1="0" y1="0" x2="0" y2="-17" />
                <g transform="translate(0,-17) rotate(25)">
                  <line x1="0" y1="0" x2="0" y2="-11" />
                </g>
                <g transform="translate(0,-17) rotate(-25)">
                  <line x1="0" y1="0" x2="0" y2="-11" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
