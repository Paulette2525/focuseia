import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Mail, Phone, Building2, RefreshCw } from "lucide-react";

interface Prospect {
  id: string;
  numero: number;
  full_name: string;
  email: string;
  phone: string;
  business_type: string | null;
  team_size: string | null;
  main_challenges: string | null;
  growth_vision: string | null;
  desired_revenue: string | null;
  time_savings: string | null;
  manual_tasks: string | null;
  current_ai_tools: string | null;
  is_decision_maker: string | null;
  previous_investments: string | null;
  project_priority: string | null;
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
      setProspects(data || []);
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
    if (prospect.business_type) parts.push(prospect.business_type);
    if (prospect.team_size) parts.push(`${prospect.team_size} pers.`);
    if (prospect.project_priority) parts.push(`Priorité: ${prospect.project_priority}`);
    return parts.length > 0 ? parts.join(" • ") : "Aucun résumé disponible";
  };

  const DetailRow = ({ label, value }: { label: string; value: string | null }) => {
    if (!value) return null;
    return (
      <div className="py-3">
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground">{value}</p>
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

        {/* Detail Modal */}
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
                  {/* Contact Info */}
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
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p className="text-foreground">{selectedProspect.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                          <p className="text-foreground">{selectedProspect.phone}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Soumis le {formatDate(selectedProspect.created_at)}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Business Info */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Informations Entreprise
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Type d'activité" value={selectedProspect.business_type} />
                      <DetailRow label="Taille de l'équipe" value={selectedProspect.team_size} />
                      <DetailRow label="Principaux défis" value={selectedProspect.main_challenges} />
                    </CardContent>
                  </Card>

                  {/* Vision */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Vision & Ambition</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Vision de croissance" value={selectedProspect.growth_vision} />
                      <DetailRow label="Revenus souhaités" value={selectedProspect.desired_revenue} />
                    </CardContent>
                  </Card>

                  {/* Operations */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Organisation</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Économie de temps recherchée" value={selectedProspect.time_savings} />
                      <DetailRow label="Tâches manuelles" value={selectedProspect.manual_tasks} />
                    </CardContent>
                  </Card>

                  {/* AI & Automation */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">IA & Automatisation</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Outils IA actuels" value={selectedProspect.current_ai_tools} />
                    </CardContent>
                  </Card>

                  {/* Decision */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Décision & Engagement</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-border">
                      <DetailRow label="Décideur" value={selectedProspect.is_decision_maker} />
                      <DetailRow label="Investissements précédents" value={selectedProspect.previous_investments} />
                      <DetailRow label="Priorité du projet" value={selectedProspect.project_priority} />
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
