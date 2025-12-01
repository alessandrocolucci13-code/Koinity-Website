interface ProgressBarProps {
  votes: number;
  goal: number;
  showNumbers?: boolean;
  className?: string;
}

export function ProgressBar({
  votes,
  goal,
  showNumbers = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min((votes / goal) * 100, 100);
  
  // Genera colore gradient dal secondario al primario basato sulla percentuale
  const getProgressColor = () => {
    if (percentage >= 100) return "hsl(var(--primary))";
    // Interpola tra secondario (grigio) e primario (arancione)
    const hue = 18; // Hue dell'arancione primario
    const saturation = Math.round(100 * (percentage / 100));
    const lightness = 60;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-sm bg-white/20"
        role="progressbar"
        aria-valuenow={votes}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-label={`${votes} voti su ${goal}`}
      >
        <div
          className="h-full transition-all duration-500 ease-out rounded-sm shadow-sm"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, #FFD600, #FFA500)`,
            boxShadow: `0 0 12px rgba(255, 166, 0, 0.6)`
          }}
        />
      </div>
      {showNumbers && (
        <div className="flex justify-between text-xs">
          <span className="text-foreground font-medium" data-testid="text-votes-current">
            {votes} voti
          </span>
          <span className="text-muted-foreground" data-testid="text-votes-goal">
            Obiettivo: {goal}
          </span>
        </div>
      )}
    </div>
  );
}
