import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Users, Mail, Phone, Building2, RefreshCw, Target, Settings, Brain, UserCheck, CalendarCheck, Trash2, Loader2, LogOut, Send, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import ProspectFilters, { type FilterType } from "@/components/ProspectFilters";
import QualificationBadge from "@/components/QualificationBadge";
import { calculateQualificationScore } from "@/lib/prospectScoring";
import EmailComposerModal from "@/components/EmailComposerModal";
import AdminAvailability from "@/components/AdminAvailability";
import AdminBookings from "@/components/AdminBookings";

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
  const { signOut, user } = useAuth();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailProspect, setEmailProspect] = useState<Prospect | null>(null);
  const [emailTemplate, setEmailTemplate] = useState<string>("welcome");

  const openEmailModal = (prospect: Prospect, template: string = "welcome") => {
    setEmailProspect(prospect);
    setEmailTemplate(template);
    setEmailModalOpen(true);
  };

  // Calculate filtered prospects and counts
  const { filteredProspects, filterCounts } = useMemo(() => {
    const counts = { all: 0, qualified: 0, evaluate: 0, unqualified: 0 };
    
    prospects.forEach((prospect) => {
      const result = calculateQualificationScore(prospect);
      counts.all++;
      counts[result.category]++;
    });

    const filtered = activeFilter === 'all' 
      ? prospects 
      : prospects.filter((prospect) => {
          const result = calculateQualificationScore(prospect);
          return result.category === activeFilter;
        });

    return { filteredProspects: filtered, filterCounts: counts };
  }, [prospects, activeFilter]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Déconnexion réussie");
  };

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

  const handleDelete = async (prospect: Prospect) => {
    setDeletingId(prospect.id);
    const { error } = await supabase
      .from("prospects")
      .delete()
      .eq("id", prospect.id);

    if (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du prospect");
    } else {
      toast.success(`Prospect ${prospect.full_name} supprimé`);
      setProspects((prev) => prev.filter((p) => p.id !== prospect.id));
      if (selectedProspect?.id === prospect.id) {
        setDetailOpen(false);
      }
    }
    setDeletingId(null);
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
              <h1 className="text-3xl font-bold text-foreground">Administration</h1>
              <p className="text-muted-foreground">
                Gestion des prospects et rendez-vous
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:inline">
              {user?.email}
            </span>
            <Button onClick={handleSignOut} variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="prospects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prospects" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Prospects</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Rendez-vous</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Disponibilités</span>
            </TabsTrigger>
          </TabsList>

          {/* Prospects Tab */}
          <TabsContent value="prospects">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {prospects.length} prospect{prospects.length !== 1 ? "s" : ""} enregistré{prospects.length !== 1 ? "s" : ""}
              </p>
              <Button onClick={fetchProspects} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Actualiser</span>
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
              <>
                <ProspectFilters 
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={filterCounts}
                />
                <div className="space-y-4">
                  {filteredProspects.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mb-3" />
                        <p className="text-muted-foreground text-center">
                          Aucun prospect dans cette catégorie
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredProspects.map((prospect) => (
                      <Card key={prospect.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <Badge variant="secondary" className="text-lg font-bold px-3 py-1 min-w-[50px] text-center">
                                {prospect.numero}
                              </Badge>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-lg font-semibold text-foreground truncate">
                                    {prospect.full_name}
                                  </h3>
                                  <QualificationBadge prospect={prospect} />
                                </div>
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
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                                {formatDate(prospect.created_at)}
                              </span>
                              <Button
                                onClick={() => openEmailModal(prospect, "booking")}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                title="Envoyer un email"
                              >
                                <Send className="h-4 w-4" />
                                <span className="hidden lg:inline">Email</span>
                              </Button>
                              <Button
                                onClick={() => openDetail(prospect)}
                                variant="default"
                                size="sm"
                                className="gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline">Voir plus</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={deletingId === prospect.id}
                                  >
                                    {deletingId === prospect.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Supprimer ce prospect ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer <strong>{prospect.full_name}</strong> ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(prospect)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <AdminBookings />
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability">
            <AdminAvailability />
          </TabsContent>
        </Tabs>

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
            {selectedProspect && (
              <div className="pt-4 border-t flex gap-3">
                <Button 
                  onClick={() => {
                    setDetailOpen(false);
                    openEmailModal(selectedProspect, "welcome");
                  }}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Envoyer un email
                </Button>
                <Button 
                  onClick={() => {
                    setDetailOpen(false);
                    openEmailModal(selectedProspect, "booking");
                  }}
                  variant="outline"
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Inviter à réserver
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Email Composer Modal */}
        <EmailComposerModal
          open={emailModalOpen}
          onOpenChange={setEmailModalOpen}
          prospect={emailProspect}
          defaultTemplate={emailTemplate}
        />
      </div>
    </div>
  );
};

export default Admin;
