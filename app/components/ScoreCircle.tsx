const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    // Unique ID to avoid SVG gradient conflicts when multiple circles render
    const gradientId = `circle-grad-${score}-${Math.random().toString(36).slice(2, 6)}`;
    const glowId = `circle-glow-${score}-${Math.random().toString(36).slice(2, 6)}`;

    return (
        <div className="relative w-[100px] h-[100px]">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                <defs>
                    <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D4AA" />
                        <stop offset="100%" stopColor="#FF6B6B" />
                    </linearGradient>
                    <filter id={glowId}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                {/* Progress arc with glow */}
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={`url(#${gradientId})`}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    filter={`url(#${glowId})`}
                />
            </svg>

            {/* Score label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-semibold text-sm" style={{ color: '#F0F4F8' }}>{`${score}/100`}</span>
            </div>
        </div>
    );
};

export default ScoreCircle;