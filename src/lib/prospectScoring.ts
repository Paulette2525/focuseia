// Qualification scoring system for prospects

export type QualificationCategory = 'qualified' | 'evaluate' | 'unqualified';

export interface QualificationResult {
  score: number;
  maxScore: number;
  category: QualificationCategory;
  label: string;
}

interface ProspectData {
  is_decision_maker: string | null;
  project_priority: string | null;
  ready_to_change: string | null;
  current_ai_tools: string | null;
  previous_investments: string | null;
}

/**
 * Calculate the qualification score for a prospect
 * Based on key criteria:
 * - Decision maker status (0-3 pts)
 * - Project priority (0-3 pts)
 * - Ready to change (0-2 pts)
 * - Current AI tools usage (0-1 pt)
 * - Previous investments (0-1 pt)
 * 
 * Total: 0-10 points
 */
export function calculateQualificationScore(prospect: ProspectData): QualificationResult {
  let score = 0;
  const maxScore = 10;

  // Decision maker: +3 pts for "yes", +1 pt for "partial"
  const decisionMaker = prospect.is_decision_maker?.toLowerCase() || '';
  if (decisionMaker.includes('oui') || decisionMaker.includes('yes') || decisionMaker === 'entièrement') {
    score += 3;
  } else if (decisionMaker.includes('partiel') || decisionMaker.includes('partial') || decisionMaker.includes('partiellement')) {
    score += 1;
  }

  // Project priority: +3 pts for "critical", +2 pts for "high", +1 pt for "medium"
  const priority = prospect.project_priority?.toLowerCase() || '';
  if (priority.includes('critique') || priority.includes('critical') || priority.includes('urgente')) {
    score += 3;
  } else if (priority.includes('élevée') || priority.includes('high') || priority.includes('haute')) {
    score += 2;
  } else if (priority.includes('moyenne') || priority.includes('medium') || priority.includes('modérée')) {
    score += 1;
  }

  // Ready to change: +2 pts for "yes", +1 pt for "maybe"
  const readyToChange = prospect.ready_to_change?.toLowerCase() || '';
  if (readyToChange.includes('oui') || readyToChange.includes('yes') || readyToChange.includes('absolument')) {
    score += 2;
  } else if (readyToChange.includes('peut-être') || readyToChange.includes('maybe') || readyToChange.includes('envisageable')) {
    score += 1;
  }

  // Current AI tools: +1 pt if using any tools (not "no" or empty)
  const aiTools = prospect.current_ai_tools?.toLowerCase() || '';
  if (aiTools && !aiTools.includes('non') && !aiTools.includes('no') && !aiTools.includes('aucun')) {
    score += 1;
  }

  // Previous investments: +1 pt for "yes"
  const investments = prospect.previous_investments?.toLowerCase() || '';
  if (investments.includes('oui') || investments.includes('yes')) {
    score += 1;
  }

  // Categorize based on score
  let category: QualificationCategory;
  let label: string;

  if (score >= 7) {
    category = 'qualified';
    label = 'Très qualifié';
  } else if (score >= 4) {
    category = 'evaluate';
    label = 'À évaluer';
  } else {
    category = 'unqualified';
    label = 'Non qualifié';
  }

  return {
    score,
    maxScore,
    category,
    label,
  };
}

/**
 * Get the badge variant based on qualification category
 */
export function getQualificationBadgeVariant(category: QualificationCategory): 'default' | 'secondary' | 'destructive' {
  switch (category) {
    case 'qualified':
      return 'default'; // Will be styled green via className
    case 'evaluate':
      return 'secondary'; // Will be styled orange via className
    case 'unqualified':
      return 'destructive'; // Red
  }
}
