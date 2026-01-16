import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Send, Building2, Target, Settings, Brain, UserCheck, CalendarCheck, Rocket, User, CheckCircle2, Sparkles } from "lucide-react";

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Vos Coordonnées", icon: User, subtitle: "Pour vous contacter" },
  { id: 2, title: "Identité & Contexte", icon: Building2, subtitle: "Qui êtes-vous ?" },
  { id: 3, title: "Vision & Ambition", icon: Target, subtitle: "Vos objectifs" },
  { id: 4, title: "Organisation", icon: Settings, subtitle: "Votre quotidien" },
  { id: 5, title: "IA & Automatisation", icon: Brain, subtitle: "Votre maturité" },
  { id: 6, title: "Décision", icon: UserCheck, subtitle: "Votre engagement" },
  { id: 7, title: "Séance Gratuite", icon: CalendarCheck, subtitle: "Le décollage" },
];

const BookingFormDialog = ({ open, onOpenChange }: BookingFormDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Coordonnées
    fullName: "",
    email: "",
    phone: "",
    // Step 2 - Identité & Contexte
    companyName: "",
    role: "",
    companyAge: "",
    employeeCount: "",
    sector: "",
    // Step 3 - Vision & Ambition
    vision2to3Years: "",
    growthLimit: "",
    speedBlocker: "",
    noChangeConsequence: "",
    // Step 4 - Organisation
    timeConsumingTasks: "",
    humanDependentTasks: "",
    errorProneAreas: "",
    unstructuredProcesses: "",
    // Step 5 - IA & Automatisation
    currentAITools: "",
    aiToolsUsage: "",
    aiFrustrations: "",
    topAutomationPriority: "",
    // Step 6 - Décision
    isDecisionMaker: "",
    previousInvestments: "",
    failureCriteria: "",
    projectPriority: "",
    // Step 7 - Séance Gratuite
    whyNow: "",
    sessionExpectations: "",
    readyToChange: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isEmailValid = (value: string) => {
    const v = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const isPhoneValid = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8;
  };

  const validateStep = (step: number): string | null => {
    const requiredByStep: Record<number, Array<keyof typeof formData>> = {
      1: ["fullName", "email", "phone"],
      2: ["companyName", "role", "companyAge", "employeeCount", "sector"],
      3: ["vision2to3Years", "growthLimit", "speedBlocker", "noChangeConsequence"],
      4: ["timeConsumingTasks", "humanDependentTasks", "errorProneAreas", "unstructuredProcesses"],
      5: ["currentAITools", "aiToolsUsage", "aiFrustrations", "topAutomationPriority"],
      6: ["isDecisionMaker", "previousInvestments", "failureCriteria", "projectPriority"],
      7: ["whyNow", "sessionExpectations", "readyToChange"],
    };

    const fields = requiredByStep[step] ?? [];

    for (const field of fields) {
      // Conditional: if no AI tools, aiToolsUsage can be skipped
      if (step === 5 && field === "aiToolsUsage" && formData.currentAITools === "no") {
        continue;
      }

      const value = String(formData[field] ?? "").trim();
      if (!value) return "Merci de répondre à toutes les questions avant de continuer.";

      if (step === 1 && field === "email" && !isEmailValid(value)) {
        return "Merci d'entrer une adresse email valide.";
      }
      if (step === 1 && field === "phone" && !isPhoneValid(value)) {
        return "Merci d'entrer un numéro de téléphone valide.";
      }
    }

    return null;
  };

  const getFirstInvalidStep = (): number | null => {
    for (let step = 1; step <= 7; step++) {
      const err = validateStep(step);
      if (err) return step;
    }
    return null;
  };

  const canGoNext = validateStep(currentStep) === null;

  const nextStep = () => {
    const err = validateStep(currentStep);
    if (err) {
      setError(err);
      return;
    }
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const firstInvalid = getFirstInvalidStep();
    if (firstInvalid) {
      setCurrentStep(firstInvalid);
      setError("Merci de répondre à toutes les questions avant d'envoyer le formulaire.");
      return;
    }

    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleCloseDialog = () => {
    onOpenChange(false);
    // Reset form after closing
    setTimeout(() => {
      setCurrentStep(1);
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        role: "",
        companyAge: "",
        employeeCount: "",
        sector: "",
        vision2to3Years: "",
        growthLimit: "",
        speedBlocker: "",
        noChangeConsequence: "",
        timeConsumingTasks: "",
        humanDependentTasks: "",
        errorProneAreas: "",
        unstructuredProcesses: "",
        currentAITools: "",
        aiToolsUsage: "",
        aiFrustrations: "",
        topAutomationPriority: "",
        isDecisionMaker: "",
        previousInvestments: "",
        failureCriteria: "",
        projectPriority: "",
        whyNow: "",
        sessionExpectations: "",
        readyToChange: "",
      });
    }, 300);
  };

  const renderConfirmation = () => (
    <div className="flex flex-col h-full min-h-0">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Success Icon with Animation */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Demande envoyée avec succès !
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-md">
              Merci <span className="text-primary font-semibold">{formData.fullName}</span> pour votre confiance !
            </p>
          </div>

          {/* Details Card */}
          <div className="w-full max-w-md bg-primary/5 border border-primary/20 rounded-xl p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-3 text-left">
              <CalendarCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium text-xs sm:text-sm">
                  Séance d'audit gratuite
                </p>
                <p className="text-muted-foreground text-[10px] sm:text-xs">
                  Nous vous contacterons très prochainement pour planifier votre première séance.
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-3">
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                Un email de confirmation sera envoyé à :
              </p>
              <p className="text-primary font-medium mt-1 text-xs sm:text-sm break-all">
                {formData.email}
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="space-y-2 text-left w-full max-w-md">
            <h3 className="text-foreground font-semibold text-xs sm:text-sm">Prochaines étapes :</h3>
            <ul className="space-y-1.5 text-muted-foreground text-[10px] sm:text-xs">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                Notre équipe analyse votre dossier
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                Nous vous contactons sous 24-48h
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                Nous planifions ensemble votre séance d'audit gratuite
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Close Button - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 sm:p-6 pt-3 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
        <Button
          onClick={handleCloseDialog}
          className="w-full h-10 sm:h-12 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-500/90 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300"
        >
          <span className="text-sm sm:text-base">Fermer</span>
        </Button>
      </div>
    </div>
  );

  const progressPercentage = (currentStep / 7) * 100;

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
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="space-input"
                    placeholder="Ex: Jean Dupont"
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="email" className="text-foreground text-sm font-medium mb-2 block">
                  Quelle est votre adresse email ?
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="space-input"
                    placeholder="Ex: jean.dupont@entreprise.com"
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="phone" className="text-foreground text-sm font-medium mb-2 block">
                  Quel est votre numéro de téléphone ?
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="space-input"
                    placeholder="Ex: +33 6 12 34 56 78"
                  />
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
                  Quel est le nom de votre entreprise ?
                </Label>
                <div className="relative">
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="space-input"
                    placeholder="Nom de l'entreprise"
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="role" className="text-foreground text-sm font-medium mb-2 block">
                  Quel est votre rôle exact dans l'entreprise ?
                </Label>
                <div className="relative">
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="space-input"
                    placeholder="Ex: CEO, Directeur des opérations..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="companyAge" className="text-foreground text-sm font-medium mb-2 block">
                  Depuis combien de temps l'entreprise existe-t-elle ?
                </Label>
                <div className="relative">
                  <Input
                    id="companyAge"
                    value={formData.companyAge}
                    onChange={(e) => handleInputChange("companyAge", e.target.value)}
                    className="space-input"
                    placeholder="Ex: 5 ans"
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="employeeCount" className="text-foreground text-sm font-medium mb-2 block">
                  Combien de personnes travaillent actuellement ?
                </Label>
                <div className="relative">
                  <Input
                    id="employeeCount"
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                    className="space-input"
                    placeholder="Ex: 25 employés"
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="sector" className="text-foreground text-sm font-medium mb-2 block">
                  Dans quel secteur évoluez-vous ?
                </Label>
                <div className="relative">
                  <Input
                    id="sector"
                    value={formData.sector}
                    onChange={(e) => handleInputChange("sector", e.target.value)}
                    className="space-input"
                    placeholder="Ex: E-commerce, Santé, Finance..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="vision2to3Years" className="text-foreground text-sm font-medium mb-2 block">
                  Où souhaitez-vous voir votre entreprise dans 2 à 3 ans ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="vision2to3Years"
                    value={formData.vision2to3Years}
                    onChange={(e) => handleInputChange("vision2to3Years", e.target.value)}
                    className="space-textarea"
                    placeholder="Décrivez votre vision..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="growthLimit" className="text-foreground text-sm font-medium mb-2 block">
                  Qu'est-ce qui limite le plus votre croissance ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="growthLimit"
                    value={formData.growthLimit}
                    onChange={(e) => handleInputChange("growthLimit", e.target.value)}
                    className="space-textarea"
                    placeholder="Identifiez vos freins..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="speedBlocker" className="text-foreground text-sm font-medium mb-2 block">
                  Qu'est-ce qui vous empêche d'aller plus vite ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="speedBlocker"
                    value={formData.speedBlocker}
                    onChange={(e) => handleInputChange("speedBlocker", e.target.value)}
                    className="space-textarea"
                    placeholder="Vos obstacles principaux..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="noChangeConsequence" className="text-foreground text-sm font-medium mb-2 block">
                  Si rien ne change, que se passe-t-il dans 12 mois ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="noChangeConsequence"
                    value={formData.noChangeConsequence}
                    onChange={(e) => handleInputChange("noChangeConsequence", e.target.value)}
                    className="space-textarea"
                    placeholder="Projetez-vous dans le futur..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="timeConsumingTasks" className="text-foreground text-sm font-medium mb-2 block">
                  Quelles tâches sont les plus chronophages ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="timeConsumingTasks"
                    value={formData.timeConsumingTasks}
                    onChange={(e) => handleInputChange("timeConsumingTasks", e.target.value)}
                    className="space-textarea"
                    placeholder="Listez les tâches qui prennent le plus de temps..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="humanDependentTasks" className="text-foreground text-sm font-medium mb-2 block">
                  Quelles tâches reposent encore trop sur l'humain ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="humanDependentTasks"
                    value={formData.humanDependentTasks}
                    onChange={(e) => handleInputChange("humanDependentTasks", e.target.value)}
                    className="space-textarea"
                    placeholder="Tâches manuelles répétitives..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="errorProneAreas" className="text-foreground text-sm font-medium mb-2 block">
                  Où constatez-vous le plus d'erreurs ou de lenteurs ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="errorProneAreas"
                    value={formData.errorProneAreas}
                    onChange={(e) => handleInputChange("errorProneAreas", e.target.value)}
                    className="space-textarea"
                    placeholder="Points de friction identifiés..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="unstructuredProcesses" className="text-foreground text-sm font-medium mb-2 block">
                  Quels processus sont mal structurés ou inexistants ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="unstructuredProcesses"
                    value={formData.unstructuredProcesses}
                    onChange={(e) => handleInputChange("unstructuredProcesses", e.target.value)}
                    className="space-textarea"
                    placeholder="Processus à améliorer..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  Utilisez-vous déjà des outils d'IA ou d'automatisation ?
                </Label>
                <RadioGroup
                  value={formData.currentAITools}
                  onValueChange={(value) => handleInputChange("currentAITools", value)}
                  className="space-y-2"
                >
                  {[
                    { value: "yes", label: "Oui" },
                    { value: "no", label: "Non" },
                    { value: "partially", label: "Partiellement" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("currentAITools", option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleInputChange("currentAITools", option.value);
                      }}
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
                <Label htmlFor="aiToolsUsage" className="text-foreground text-sm font-medium mb-2 block">
                  Si oui, lesquels et pour quels usages ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="aiToolsUsage"
                    value={formData.aiToolsUsage}
                    onChange={(e) => handleInputChange("aiToolsUsage", e.target.value)}
                    className="space-textarea"
                    placeholder="Ex: ChatGPT pour la rédaction, Zapier pour l'automatisation..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="aiFrustrations" className="text-foreground text-sm font-medium mb-2 block">
                  Qu'est-ce qui vous frustre dans votre utilisation de l'IA ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="aiFrustrations"
                    value={formData.aiFrustrations}
                    onChange={(e) => handleInputChange("aiFrustrations", e.target.value)}
                    className="space-textarea"
                    placeholder="Vos frustrations..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="topAutomationPriority" className="text-foreground text-sm font-medium mb-2 block">
                  Si vous deviez automatiser UNE seule chose, laquelle ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="topAutomationPriority"
                    value={formData.topAutomationPriority}
                    onChange={(e) => handleInputChange("topAutomationPriority", e.target.value)}
                    className="space-textarea"
                    placeholder="Votre priorité #1..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  Êtes-vous décisionnaire sur ce type de projet ?
                </Label>
                <RadioGroup
                  value={formData.isDecisionMaker}
                  onValueChange={(value) => handleInputChange("isDecisionMaker", value)}
                  className="space-y-2"
                >
                  {[
                    { value: "yes", label: "Oui, entièrement" },
                    { value: "partial", label: "Partiellement, avec validation" },
                    { value: "no", label: "Non, je dois consulter" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("isDecisionMaker", option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleInputChange("isDecisionMaker", option.value);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio"
                    >
                      <RadioGroupItem value={option.value} id={`decision-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`decision-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  Avez-vous déjà investi dans des solutions similaires ?
                </Label>
                <RadioGroup
                  value={formData.previousInvestments}
                  onValueChange={(value) => handleInputChange("previousInvestments", value)}
                  className="space-y-2"
                >
                  {[
                    { value: "yes", label: "Oui" },
                    { value: "no", label: "Non" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("previousInvestments", option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleInputChange("previousInvestments", option.value);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio"
                    >
                      <RadioGroupItem value={option.value} id={`invest-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`invest-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="group">
                <Label htmlFor="failureCriteria" className="text-foreground text-sm font-medium mb-2 block">
                  Qu'est-ce qui ferait que ce serait un échec pour vous ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="failureCriteria"
                    value={formData.failureCriteria}
                    onChange={(e) => handleInputChange("failureCriteria", e.target.value)}
                    className="space-textarea"
                    placeholder="Définissez vos critères d'échec..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  À quel point ce projet est-il prioritaire ?
                </Label>
                <RadioGroup
                  value={formData.projectPriority}
                  onValueChange={(value) => handleInputChange("projectPriority", value)}
                  className="grid grid-cols-2 gap-2"
                >
                  {[
                    { value: "low", label: "Faible" },
                    { value: "medium", label: "Moyenne" },
                    { value: "high", label: "Élevée" },
                    { value: "critical", label: "Critique" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("projectPriority", option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleInputChange("projectPriority", option.value);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio"
                    >
                      <RadioGroupItem value={option.value} id={`priority-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`priority-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="whyNow" className="text-foreground text-sm font-medium mb-2 block">
                  Pourquoi souhaitez-vous échanger avec FOCUSEIA maintenant ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="whyNow"
                    value={formData.whyNow}
                    onChange={(e) => handleInputChange("whyNow", e.target.value)}
                    className="space-textarea"
                    placeholder="Qu'est-ce qui vous motive aujourd'hui..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label htmlFor="sessionExpectations" className="text-foreground text-sm font-medium mb-2 block">
                  Qu'attendez-vous de cette première séance gratuite ?
                </Label>
                <div className="relative">
                  <Textarea
                    id="sessionExpectations"
                    value={formData.sessionExpectations}
                    onChange={(e) => handleInputChange("sessionExpectations", e.target.value)}
                    className="space-textarea"
                    placeholder="Vos attentes..."
                  />
                  <div className="input-glow" />
                </div>
              </div>
              
              <div className="group">
                <Label className="text-foreground text-sm font-medium mb-3 block">
                  Êtes-vous prêt à remettre en question votre organisation ?
                </Label>
                <RadioGroup
                  value={formData.readyToChange}
                  onValueChange={(value) => handleInputChange("readyToChange", value)}
                  className="space-y-2"
                >
                  {[
                    { value: "yes", label: "Oui, absolument", icon: "🚀" },
                    { value: "maybe", label: "Peut-être, selon les recommandations", icon: "🤔" },
                    { value: "no", label: "Non, je cherche des optimisations mineures", icon: "📊" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInputChange("readyToChange", option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleInputChange("readyToChange", option.value);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio"
                    >
                      <RadioGroupItem value={option.value} id={`change-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`change-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors flex items-center gap-2">
                        <span>{option.icon}</span> {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] h-[90vh] sm:h-[85vh] flex flex-col bg-background/95 backdrop-blur-xl border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] p-0 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orbiting particles */}
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
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          {/* Corner glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {isSubmitted ? (
          /* Confirmation Page */
          <div className="relative z-10 flex flex-col h-full min-h-0">
            {renderConfirmation()}
          </div>
        ) : (
          /* Form Steps */
          <div className="relative z-10 flex flex-col h-full min-h-0">
            {/* Header - Fixed */}
            <DialogHeader className="flex-shrink-0 p-4 sm:p-6 pb-2">
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                  <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary/30 rounded-full blur-lg animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent">
                  Mission : Transformation
                </DialogTitle>
              </div>
            </DialogHeader>

            {/* Circular Progress Gauge - Fixed */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                {/* Main Circular Gauge */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-primary/10"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${progressPercentage * 2.64} 264`}
                      className="transition-all duration-700 ease-out"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.5))' }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{currentStep}</span>
                    <span className="text-[10px] md:text-xs text-muted-foreground">/ 7</span>
                  </div>
                </div>

                {/* Step Info */}
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
                  {/* Mini step indicators */}
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

            {/* Form Content with scroll - This is the scrollable area */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-3 custom-scrollbar">
              {renderStep()}
            </div>

            {/* Navigation Buttons - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-primary/10 bg-background/80 backdrop-blur-sm">
              {error ? (
                <p className="mb-3 text-sm text-destructive text-center">{error}</p>
              ) : null}

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

                {currentStep < 7 ? (
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
                    disabled={!canGoNext}
                    className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-primary via-cyan-500 to-primary text-primary-foreground shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Rocket className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="text-sm sm:text-base">Envoyer</span>
                    <Send className="w-4 h-4 ml-1 sm:ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
