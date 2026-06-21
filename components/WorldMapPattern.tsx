'use client'

export function WorldMapPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.12]"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* World map simplified continent outlines */}
      {/* North America */}
      <path
        d="M220 180 L240 160 L280 155 L310 165 L340 170 L350 190 L345 210 L330 220 L310 230 L290 240 L270 250 L250 260 L240 280 L220 290 L200 280 L190 260 L185 240 L195 220 L205 200 L210 185Z"
        fill="currentColor"
      />
      <path
        d="M150 320 L170 300 L195 290 L220 300 L230 320 L225 340 L210 350 L190 355 L170 350 L155 340Z"
        fill="currentColor"
      />
      {/* South America */}
      <path
        d="M280 380 L300 370 L320 380 L335 400 L345 430 L350 460 L345 490 L335 510 L320 520 L305 525 L290 515 L280 500 L275 470 L270 440 L275 410Z"
        fill="currentColor"
      />
      {/* Europe */}
      <path
        d="M520 170 L540 160 L570 155 L600 160 L620 170 L630 190 L625 210 L610 220 L590 225 L570 220 L550 215 L535 205 L525 190Z"
        fill="currentColor"
      />
      {/* Africa */}
      <path
        d="M540 250 L560 240 L580 245 L600 260 L610 280 L615 310 L610 340 L600 360 L585 375 L570 380 L555 375 L545 360 L540 340 L535 310 L530 285 L535 265Z"
        fill="currentColor"
      />
      {/* Asia */}
      <path
        d="M680 140 L720 130 L770 125 L820 130 L860 140 L890 160 L910 180 L920 210 L910 240 L890 260 L860 270 L830 275 L800 270 L770 260 L750 250 L730 235 L710 220 L695 200 L685 175Z"
        fill="currentColor"
      />
      {/* India subcontinent */}
      <path
        d="M780 280 L800 270 L820 280 L830 300 L835 325 L830 345 L820 355 L805 358 L790 350 L780 335 L775 315Z"
        fill="currentColor"
      />
      {/* Southeast Asia / Indonesia */}
      <path
        d="M860 310 L880 305 L900 315 L910 330 L900 345 L880 350 L860 345 L850 330Z"
        fill="currentColor"
      />
      <path
        d="M880 365 L900 360 L920 365 L930 380 L920 395 L900 398 L880 392 L870 380Z"
        fill="currentColor"
      />
      {/* Australia */}
      <path
        d="M920 430 L950 420 L980 425 L1000 440 L1010 460 L1005 480 L990 495 L960 500 L935 495 L920 480 L915 455Z"
        fill="currentColor"
      />
      {/* Decorative lines for grid/globe effect */}
      <ellipse cx="600" cy="350" rx="500" ry="300" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
      <ellipse cx="600" cy="350" rx="380" ry="220" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      <ellipse cx="600" cy="350" rx="250" ry="150" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
      {/* Latitude lines */}
      <line x1="100" y1="200" x2="1100" y2="200" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <line x1="100" y1="280" x2="1100" y2="280" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <line x1="100" y1="350" x2="1100" y2="350" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <line x1="100" y1="420" x2="1100" y2="420" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <line x1="100" y1="500" x2="1100" y2="500" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      {/* Longitude lines */}
      <line x1="300" y1="50" x2="250" y2="650" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <line x1="450" y1="50" x2="430" y2="650" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <line x1="600" y1="50" x2="600" y2="650" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <line x1="750" y1="50" x2="770" y2="650" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <line x1="900" y1="50" x2="950" y2="650" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      {/* Dot markers on major cities */}
      <circle cx="300" cy="200" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="580" cy="180" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="580" cy="310" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="780" cy="200" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="800" cy="310" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="320" cy="440" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
