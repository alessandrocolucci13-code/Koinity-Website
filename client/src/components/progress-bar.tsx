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

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={votes}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-label={`${votes} voti su ${goal}`}
      >
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
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
