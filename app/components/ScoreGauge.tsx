import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = score / 100;

    const gradientId = `gauge-grad-${Math.random().toString(36).slice(2, 6)}`;
    const glowId = `gauge-glow-${Math.random().toString(36).slice(2, 6)}`;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Arc geometry:
    // viewBox = "0 0 120 75"  →  plenty of headroom
    // Arc center at (60, 65), radius 45  →  top of arc at y=20
    // strokeWidth 8  →  top of stroke at y=16, well within viewBox
    // Arc: M15,65 A45,45 0 0,1 105,65

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: '10rem', height: '5.5rem' }}>
                <svg
                    viewBox="0 0 120 75"
                    className="w-full h-full"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#00D4AA" />
                            <stop offset="50%" stopColor="#00B4D8" />
                            <stop offset="100%" stopColor="#FF6B6B" />
                        </linearGradient>
                        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M15,65 A45,45 0 0,1 105,65"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc with glow */}
                    <path
                        ref={pathRef}
                        d="M15,65 A45,45 0 0,1 105,65"
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        filter={`url(#${glowId})`}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <div className="text-xl font-semibold" style={{ color: '#F0F4F8' }}>{score}/100</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;