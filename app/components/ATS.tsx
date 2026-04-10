interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Determine accent glow color based on score
    const glowColor = score > 69
        ? 'rgba(0, 212, 170, 0.12)'
        : score > 49
            ? 'rgba(255, 179, 71, 0.12)'
            : 'rgba(255, 107, 107, 0.12)';

    const borderColor = score > 69
        ? 'rgba(0, 212, 170, 0.25)'
        : score > 49
            ? 'rgba(255, 179, 71, 0.25)'
            : 'rgba(255, 107, 107, 0.25)';

    // Determine icon based on score
    const iconSrc = score > 69
        ? '/icons/ats-good.svg'
        : score > 49
            ? '/icons/ats-warning.svg'
            : '/icons/ats-bad.svg';

    // Determine subtitle based on score
    const subtitle = score > 69
        ? 'Great Job!'
        : score > 49
            ? 'Good Start'
            : 'Needs Improvement';

    return (
        <div
            className="glass-card w-full p-6"
            style={{
                boxShadow: `0 8px 32px ${glowColor}`,
                borderColor: borderColor,
            }}
        >
            {/* Top section with icon and headline */}
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
                <div>
                    <h2 className="text-2xl font-bold" style={{ color: '#F0F4F8' }}>ATS Score - {score}/100</h2>
                </div>
            </div>

            {/* Description section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#F0F4F8' }}>{subtitle}</h3>
                <p className="mb-4" style={{ color: '#94A3B8' }}>
                    This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
                </p>

                {/* Suggestions list */}
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt={suggestion.type === "good" ? "Check" : "Warning"}
                                className="w-5 h-5 mt-1"
                            />
                            <p style={{ color: suggestion.type === "good" ? '#00D4AA' : '#FFB347' }}>
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Closing encouragement */}
            <p className="italic" style={{ color: '#64748B' }}>
                Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
            </p>
        </div>
    )
}

export default ATS