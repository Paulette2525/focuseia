import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Send, Building2, Brain, User, Loader2, CheckCircle, Calendar, Rocket, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BookingCalendar from "@/components/BookingCalendar";

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Vos Coordonnées", icon: User, subtitle: "Pour vous contacter" },
  { id: 2, title: "Votre Entreprise", icon: Building2, subtitle: "Quelques infos clés" },
  { id: 3, title: "Votre Besoin", icon: Brain, subtitle: "Comment vous aider" },
  { id: 4, title: "Votre Créneau", icon: CalendarDays, subtitle: "Choisissez un RDV" },
];

const SECTOR_OPTIONS = [
  "E-commerce",
  "Santé",
  "Finance",
  "Immobilier",
  "Services",
  "Industrie",
  "Autre",
];

const TEAM_SIZE_OPTIONS = ["1-5", "6-20", "21-50", "51-200", "200+"];

const ROLE_OPTIONS = ["CEO / Fondateur", "Directeur", "Manager", "Autre"];

const CHALLENGE_OPTIONS = [
  "Automatiser des tâches répétitives",
  "Améliorer le service client",
  "Optimiser les processus internes",
  "Analyser mes données",
  "Autre",
];

const BookingFormDialog = ({ open, onOpenChange }: BookingFormDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prospectId, setProspectId] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    sector: "",
    teamSize: "",
    role: "",
    mainChallenge: "",
    aiExperience: "",
    projectDescription: "",
    meetingObjective: "",
    projectUrgency: "",
    estimatedBudget: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isPhoneValid = (value: string) => value.replace(/\D/g, "").length >= 8;

  const validateStep = (step: number): string | null => {
    const requiredByStep: Record<number, Array<keyof typeof formData>> = {
      1: ["fullName", "email", "phone"],
      2: ["companyName", "sector", "teamSize", "role"],
      3: ["mainChallenge", "aiExperience", "meetingObjective", "projectUrgency", "estimatedBudget"],
    };

    const fields = requiredByStep[step] ?? [];
    for (const field of fields) {
      const value = String(formData[field] ?? "").trim();
      if (!value) return "Merci de répondre à toutes les questions avant de continuer.";
      if (step === 1 && field === "email" && !isEmailValid(value)) return "Merci d'entrer une adresse email valide.";
      if (step === 1 && field === "phone" && !isPhoneValid(value)) return "Merci d'entrer un numéro de téléphone valide.";
    }
    return null;
  };

  const getFirstInvalidStep = (): number | null => {
    for (let step = 1; step <= 3; step++) {
      if (validateStep(step)) return step;
    }
    return null;
  };

  const canGoNext = validateStep(currentStep) === null;

  const nextStep = () => {
    const err = validateStep(currentStep);
    if (err) { setError(err); return; }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1 && currentStep <= 3) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const firstInvalid = getFirstInvalidStep();
    if (firstInvalid) {
      setCurrentStep(firstInvalid);
      setError("Merci de répondre à toutes les questions avant d'envoyer le formulaire.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: insertError } = await supabase.from("prospects").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.companyName,
        sector: formData.sector,
        team_size: formData.teamSize,
        role: formData.role,
        main_challenges: formData.mainChallenge,
        ai_tools_usage: formData.aiExperience,
        growth_vision: formData.projectDescription || null,
        meeting_objective: formData.meetingObjective,
        project_urgency: formData.projectUrgency,
        estimated_budget: formData.estimatedBudget,
      }).select("id").single();

      if (insertError) {
        console.error("Erreur lors de l'enregistrement:", insertError);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        setIsSubmitting(false);
        return;
      }

      setSubmittedName(formData.fullName);
      setSubmittedEmail(formData.email);
      setProspectId(data.id);
      setCurrentStep(4); // Go to booking step
    } catch (err) {
      console.error("Erreur inattendue:", err);
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookingConfirmed = (date: string, time: string) => {
    setBookingDate(date);
    setBookingTime(time);
    setIsSubmitted(true);
  };

  const handleSkipBooking = () => {
    setIsSubmitted(true);
  };

  const totalSteps = 4;
  const progressPercentage = currentStep <= 3 ? (currentStep / totalSteps) * 100 : 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="fullName" className="text-foreground text-sm font-medium mb-2 block">
                  Quel est votre nom et prénom ?
                </Label>
                <div className="relative">
                  <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="space-input" placeholder="Ex: Jean Dupont" />
                  <div className="input-glow" />
                </div>
              </div>
              <div className="group">
                <Label htmlFor="email" className="text-foreground text-sm font-medium mb-2 block">
                  Quelle est votre adresse email ?
                </Label>
                <div className="relative">
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="space-input" placeholder="Ex: jean.dupont@entreprise.com" />
                  <div className="input-glow" />
                </div>
              </div>
              <div className="group">
                <Label htmlFor="phone" className="text-foreground text-sm font-medium mb-2 block">
                  Quel est votre numéro de téléphone ?
                </Label>
                <div className="relative">
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="space-input" placeholder="Ex: +33 6 12 34 56 78" />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="companyName" className="text-foreground text-sm font-medium mb-2 block">
                  Nom de votre entreprise
                </Label>
                <div className="relative">
                  <Input id="companyName" value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} className="space-input" placeholder="Nom de l'entreprise" />
                  <div className="input-glow" />
                </div>
              </div>
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-2 block">Secteur d'activité</Label>
                <Select value={formData.sector} onValueChange={(v) => handleInputChange("sector", v)}>
                  <SelectTrigger className="space-input"><SelectValue placeholder="Sélectionnez votre secteur" /></SelectTrigger>
                  <SelectContent>
                    {SECTOR_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-2 block">Taille de l'équipe</Label>
                <Select value={formData.teamSize} onValueChange={(v) => handleInputChange("teamSize", v)}>
                  <SelectTrigger className="space-input"><SelectValue placeholder="Nombre de personnes" /></SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-2 block">Votre rôle</Label>
                <Select value={formData.role} onValueChange={(v) => handleInputChange("role", v)}>
                  <SelectTrigger className="space-input"><SelectValue placeholder="Sélectionnez votre rôle" /></SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-2 block">
                  Quel est votre principal défi aujourd'hui ?
                </Label>
                <Select value={formData.mainChallenge} onValueChange={(v) => handleInputChange("mainChallenge", v)}>
                  <SelectTrigger className="space-input"><SelectValue placeholder="Sélectionnez votre défi" /></SelectTrigger>
                  <SelectContent>
                    {CHALLENGE_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  Avez-vous déjà utilisé des outils d'IA ?
                </Label>
                <RadioGroup value={formData.aiExperience} onValueChange={(v) => handleInputChange("aiExperience", v)} className="space-y-2">
                  {[
                    { value: "oui", label: "Oui" },
                    { value: "non", label: "Non" },
                    { value: "un_peu", label: "Un peu" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("aiExperience", option.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleInputChange("aiExperience", option.value); }}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio"
                    >
                      <RadioGroupItem value={option.value} id={`ai-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`ai-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="group">
                <Label htmlFor="projectDescription" className="text-foreground text-sm font-medium mb-2 block">
                  Un mot sur votre projet <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <div className="relative">
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                    className="space-textarea"
                    placeholder="Décrivez brièvement votre projet..."
                    rows={3}
                  />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return prospectId ? (
          <BookingCalendar
            prospectId={prospectId}
            prospectName={submittedName}
            onBookingConfirmed={handleBookingConfirmed}
          />
        ) : null;

      default:
        return null;
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      setProspectId(null);
      setBookingDate("");
      setBookingTime("");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        sector: "",
        teamSize: "",
        role: "",
        mainChallenge: "",
        aiExperience: "",
        projectDescription: "",
        meetingObjective: "",
        projectUrgency: "",
        estimatedBudget: "",
      });
    }, 300);
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] bg-background/95 backdrop-blur-xl border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] p-0 overflow-hidden">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full blur-sm" />
                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-cyan-400/30 rounded-full blur-sm" />
              </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[85vh]">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.5)]">
                    <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary/20 blur-xl animate-pulse" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent mb-3">
              {bookingDate ? "Rendez-vous confirmé !" : "Demande envoyée avec succès !"}
            </h2>

            <p className="text-center text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              Merci <span className="text-primary font-semibold">{submittedName}</span> pour votre confiance !
            </p>

            {bookingDate ? (
              <div className="bg-background/50 border border-primary/20 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Votre rendez-vous</h3>
                    <p className="text-primary font-semibold">{bookingDate}</p>
                    <p className="text-foreground">à {bookingTime}</p>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-primary/10 text-center">
                  <p className="text-muted-foreground text-sm sm:text-base mb-2">Un email de confirmation sera envoyé à :</p>
                  <p className="text-primary font-semibold text-base sm:text-lg">{submittedEmail}</p>
                </div>
              </div>
            ) : (
              <div className="bg-background/50 border border-primary/20 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Séance d'audit gratuite</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Nous vous contacterons très prochainement pour planifier votre première séance.</p>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-primary/10 text-center">
                  <p className="text-muted-foreground text-sm sm:text-base mb-2">Un email de confirmation sera envoyé à :</p>
                  <p className="text-primary font-semibold text-base sm:text-lg">{submittedEmail}</p>
                </div>
              </div>
            )}

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Prochaines étapes :</h3>
              <div className="space-y-3">
                {(bookingDate
                  ? ["Notre équipe prépare votre séance", `Rendez-vous le ${bookingDate}`, "Vous recevrez un rappel avant la séance"]
                  : ["Notre équipe analyse votre dossier", "Nous vous contactons sous 24-48h", "Nous planifions ensemble votre séance d'audit gratuite"]
                ).map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-sm">{index + 1}.</span>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleClose} className="w-full h-12 sm:h-14 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[95vw] h-[90vh] sm:h-[85vh] flex flex-col bg-background/95 backdrop-blur-xl border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] p-0 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full blur-sm" />
              <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-cyan-400/30 rounded-full blur-sm" />
            </div>
            <div className="absolute inset-0 animate-[spin_30s_linear_infinite_reverse]">
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-purple-400/30 rounded-full blur-sm" />
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary/30 rounded-full blur-sm" />
            </div>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full min-h-0">
          {/* Header */}
          <DialogHeader className="flex-shrink-0 p-4 sm:p-6 pb-2">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary/30 rounded-full blur-lg animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent">
                {currentStep === 4 ? "Réservez votre créneau" : "Mission : Transformation"}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Circular Progress Gauge */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary/10" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#progressGradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${progressPercentage * 2.64} 264`} className="transition-all duration-700 ease-out" style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.5))' }} />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{currentStep}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">/ {totalSteps}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {(() => {
                    const Icon = steps[currentStep - 1].icon;
                    return <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />;
                  })()}
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground truncate">
                    {steps[currentStep - 1].title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {steps[currentStep - 1].subtitle}
                </p>
                <div className="flex gap-1 sm:gap-1.5 mt-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        step.id === currentStep
                          ? "bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                          : step.id < currentStep
                          ? "bg-primary/50"
                          : "bg-primary/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-3 custom-scrollbar">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
            {error && <p className="mb-3 text-sm text-destructive text-center">{error}</p>}

            <div className="flex justify-between gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex-1 h-10 sm:h-12 border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 disabled:opacity-30"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Précédent</span>
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canGoNext}
                    className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-500/90 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm sm:text-base">Suivant</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canGoNext || isSubmitting}
                    className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-primary via-cyan-500 to-primary text-primary-foreground shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" />
                        <span className="text-sm sm:text-base">Envoi...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="text-sm sm:text-base">Envoyer</span>
                        <Send className="w-4 h-4 ml-1 sm:ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
