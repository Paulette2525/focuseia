// Qualification scoring system for prospects (simplified for 3-step form)

export type QualificationCategory = 'qualified' | 'evaluate' | 'unqualified';

export interface QualificationResult {
  score: number;
  maxScore: number;
  category: QualificationCategory;
  label: string;
}

interface ProspectData {
  role: string | null;
  team_size: string | null;
  main_challenges: string | null;
  ai_tools_usage: string | null;
  sector: string | null;
}

/**
 * Calculate the qualification score for a prospect
 * Based on new simplified criteria:
 * - Role (0-3 pts): CEO/Fondateur = 3, Directeur = 2, Manager = 1
 * - Team size (0-2 pts): bigger teams = higher score
 * - Main challenge alignment (0-2 pts): automation-related = 2
 * - AI experience (0-2 pts): already using = 2, a little = 1
 * - Sector filled (0-1 pt): shows engagement
 * 
 * Total: 0-10 points
 */
export function calculateQualificationScore(prospect: ProspectData): QualificationResult {
  let score = 0;
  const maxScore = 10;

  // Role: CEO/Fondateur = 3, Directeur = 2, Manager = 1
  const role = prospect.role?.toLowerCase() || '';
  if (role.includes('ceo') || role.includes('fondateur')) {
    score += 3;
  } else if (role.includes('directeur')) {
    score += 2;
  } else if (role.includes('manager')) {
    score += 1;
  }

  // Team size: 200+ = 2, 21-50/51-200 = 2, 6-20 = 1, 1-5 = 0
  const teamSize = prospect.team_size || '';
  if (teamSize === '200+' || teamSize === '51-200') {
    score += 2;
  } else if (teamSize === '21-50' || teamSize === '6-20') {
    score += 1;
  }

  // Main challenge: automation-related challenges score higher
  const challenge = prospect.main_challenges?.toLowerCase() || '';
  if (challenge.includes('automatiser') || challenge.includes('optimiser')) {
    score += 2;
  } else if (challenge.includes('améliorer') || challenge.includes('analyser')) {
    score += 1;
  }

  // AI experience: oui = 2, un peu = 1, non = 0
  const aiUsage = prospect.ai_tools_usage?.toLowerCase() || '';
  if (aiUsage === 'oui' || aiUsage.includes('yes')) {
    score += 2;
  } else if (aiUsage === 'un_peu' || aiUsage.includes('un peu') || aiUsage.includes('partially')) {
    score += 1;
  }

  // Sector filled: +1 pt for engagement
  if (prospect.sector && prospect.sector.trim()) {
    score += 1;
  }

  // Categorize
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

  return { score, maxScore, category, label };
}

/**
 * Get the badge variant based on qualification category
 */
export function getQualificationBadgeVariant(category: QualificationCategory): 'default' | 'secondary' | 'destructive' {
  switch (category) {
    case 'qualified':
      return 'default';
    case 'evaluate':
      return 'secondary';
    case 'unqualified':
      return 'destructive';
  }
}
