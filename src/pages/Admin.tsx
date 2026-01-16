import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Mail, Phone, Building2, RefreshCw, Target, Settings, Brain, UserCheck, CalendarCheck } from "lucide-react";

interface Prospect {
  id: string;
  numero: number;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  role: string | null;
  company_age: string | null;
  team_size: string | null;
  sector: string | null;
  growth_vision: string | null;
  main_challenges: string | null;
  speed_blocker: string | null;
  no_change_consequence: string | null;
  time_savings: string | null;
  manual_tasks: string | null;
  error_prone_areas: string | null;
  unstructured_processes: string | null;
  current_ai_tools: string | null;
  ai_tools_usage: string | null;
  ai_frustrations: string | null;
  top_automation_priority: string | null;
  is_decision_maker: string | null;
  previous_investments: string | null;
  failure_criteria: string | null;
  project_priority: string | null;
  why_now: string | null;
  session_expectations: string | null;
  ready_to_change: string | null;
  created_at: string;
}

const Admin = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const fetchProspects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .order("numero", { ascending: true });

    if (error) {
      console.error("Erreur lors du chargement des prospects:", error);
    } else {
      setProspects((data as Prospect[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProspects();
  }, []);

  const openDetail = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setDetailOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSummary = (prospect: Prospect) => {
    const parts = [];
    if (prospect.sector) parts.push(prospect.sector);
    if (prospect.team_size) parts.push(`${prospect.team_size} employés`);
    if (prospect.project_priority) parts.push(`Priorité: ${prospect.project_priority}`);
    return parts.length > 0 ? parts.join(" • ") : "Aucun résumé disponible";
  };

  const DetailRow = ({ label, value }: { label: string; value: string | null }) => {
    if (!value) return null;
    return (
      <div className="py-3">
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground whitespace-pre-wrap">{value}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestion des Prospects</h1>
              <p className="text-muted-foreground">
                {prospects.length} prospect{prospects.length !== 1 ? "s" : ""} enregistré{prospects.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Button onClick={fetchProspects} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : prospects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Aucun prospect pour le moment</h2>
              <p className="text-muted-foreground text-center max-w-md">
                Les prospects qui remplissent le formulaire de contact apparaîtront ici.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {prospects.map((prospect) => (
              <Card key={prospect.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Badge variant="secondary" className="text-lg font-bold px-3 py-1 min-w-[50px] text-center">
                        {prospect.numero}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {prospect.full_name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {prospect.email}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {prospect.phone}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          {getSummary(prospect)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(prospect.created_at)}
                      </span>
                      <Button
                        onClick={() => openDetail(prospect)}
                        variant="default"
                        size="sm"
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Voir plus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Détails */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                  #{selectedProspect?.numero}
                </Badge>
                <span>{selectedProspect?.full_name}</span>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              {selectedProspect && (
                <div className="space-y-6">
                  {/* Coordonnées */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Coordonnées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                          <p className="text-foreground">{selectedProspect.full_name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p className="text-foreground">{selectedProspect.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                          <p className="text-foreground">{selectedProspect.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date de soumission</p>
                          <p className="text-foreground">{formatDate(selectedProspect.created_at)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Identité & Contexte */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Identité & Contexte
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Nom de l'entreprise" value={selectedProspect.company_name} />
                      <DetailRow label="Rôle dans l'entreprise" value={selectedProspect.role} />
                      <DetailRow label="Ancienneté de l'entreprise" value={selectedProspect.company_age} />
                      <DetailRow label="Nombre d'employés" value={selectedProspect.team_size} />
                      <DetailRow label="Secteur d'activité" value={selectedProspect.sector} />
                    </CardContent>
                  </Card>

                  {/* Vision & Ambition */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Vision & Ambition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Vision à 2-3 ans" value={selectedProspect.growth_vision} />
                      <DetailRow label="Limite de croissance" value={selectedProspect.main_challenges} />
                      <DetailRow label="Ce qui empêche d'aller plus vite" value={selectedProspect.speed_blocker} />
                      <DetailRow label="Conséquences si rien ne change" value={selectedProspect.no_change_consequence} />
                    </CardContent>
                  </Card>

                  {/* Organisation */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Organisation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Tâches les plus chronophages" value={selectedProspect.time_savings} />
                      <DetailRow label="Tâches trop dépendantes de l'humain" value={selectedProspect.manual_tasks} />
                      <DetailRow label="Zones d'erreurs ou de lenteurs" value={selectedProspect.error_prone_areas} />
                      <DetailRow label="Processus mal structurés" value={selectedProspect.unstructured_processes} />
                    </CardContent>
                  </Card>

                  {/* IA & Automatisation */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        IA & Automatisation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Utilise déjà des outils IA" value={selectedProspect.current_ai_tools} />
                      <DetailRow label="Comment sont utilisés les outils IA" value={selectedProspect.ai_tools_usage} />
                      <DetailRow label="Frustrations avec les outils actuels" value={selectedProspect.ai_frustrations} />
                      <DetailRow label="Priorité d'automatisation" value={selectedProspect.top_automation_priority} />
                    </CardContent>
                  </Card>

                  {/* Décision & Engagement */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Décision & Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Est décideur" value={selectedProspect.is_decision_maker} />
                      <DetailRow label="Investissements précédents" value={selectedProspect.previous_investments} />
                      <DetailRow label="Critères d'échec" value={selectedProspect.failure_criteria} />
                      <DetailRow label="Priorité du projet" value={selectedProspect.project_priority} />
                    </CardContent>
                  </Card>

                  {/* Séance Gratuite */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4" />
                        Séance Gratuite
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Pourquoi maintenant" value={selectedProspect.why_now} />
                      <DetailRow label="Attentes de la séance" value={selectedProspect.session_expectations} />
                      <DetailRow label="Prêt à changer" value={selectedProspect.ready_to_change} />
                    </CardContent>
                  </Card>
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
