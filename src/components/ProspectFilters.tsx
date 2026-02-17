import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import type { QualificationCategory } from "@/lib/prospectScoring";

export type FilterType = 'all' | QualificationCategory;

interface ProspectFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    qualified: number;
    evaluate: number;
    unqualified: number;
  };
}

const ProspectFilters = ({ activeFilter, onFilterChange, counts }: ProspectFiltersProps) => {
  const filters: { value: FilterType; label: string; color?: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'qualified', label: 'Qualifiés', color: 'text-green-600' },
    { value: 'evaluate', label: 'À évaluer', color: 'text-orange-500' },
    { value: 'unqualified', label: 'Non qualifiés', color: 'text-red-500' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-card rounded-lg border mb-6">
      <Filter className="h-4 w-4 text-muted-foreground mr-2" />
      <span className="text-sm font-medium text-muted-foreground mr-2">Filtrer :</span>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className={`gap-2 ${activeFilter !== filter.value && filter.color ? filter.color : ''}`}
        >
          {filter.label}
          <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
            activeFilter === filter.value 
              ? 'bg-primary-foreground/20 text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {counts[filter.value]}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ProspectFilters;
