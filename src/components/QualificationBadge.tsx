import { Badge } from "@/components/ui/badge";
import { calculateQualificationScore, type QualificationCategory } from "@/lib/prospectScoring";
import { cn } from "@/lib/utils";

interface QualificationBadgeProps {
  prospect: {
    role: string | null;
    team_size: string | null;
    main_challenges: string | null;
    ai_tools_usage: string | null;
    sector: string | null;
  };
  showLabel?: boolean;
  className?: string;
}

const categoryStyles: Record<QualificationCategory, string> = {
  qualified: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
  evaluate: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100',
  unqualified: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
};

const QualificationBadge = ({ prospect, showLabel = true, className }: QualificationBadgeProps) => {
  const result = calculateQualificationScore(prospect);

  return (
    <Badge 
      variant="outline"
      className={cn(
        categoryStyles[result.category],
        "font-semibold",
        className
      )}
    >
      <span className="font-bold">{result.score}/{result.maxScore}</span>
      {showLabel && (
        <span className="ml-1.5 hidden sm:inline">{result.label}</span>
      )}
    </Badge>
  );
};

export default QualificationBadge;
