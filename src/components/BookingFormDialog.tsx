import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Send, Building2, Target, Settings, Brain, UserCheck, CalendarCheck, Rocket } from "lucide-react";

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Identité & Contexte", icon: Building2, subtitle: "Qui êtes-vous ?" },
  { id: 2, title: "Vision & Ambition", icon: Target, subtitle: "Vos objectifs" },
  { id: 3, title: "Organisation", icon: Settings, subtitle: "Votre quotidien" },
  { id: 4, title: "IA & Automatisation", icon: Brain, subtitle: "Votre maturité" },
  { id: 5, title: "Décision", icon: UserCheck, subtitle: "Votre engagement" },
  { id: 6, title: "Séance Gratuite", icon: CalendarCheck, subtitle: "Le décollage" },
];

const BookingFormDialog = ({ open, onOpenChange }: BookingFormDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Identité & Contexte
    companyName: "",
    role: "",
    companyAge: "",
    employeeCount: "",
    sector: "",
    // Step 2 - Vision & Ambition
    vision2to3Years: "",
    growthLimit: "",
    speedBlocker: "",
    noChangeConsequence: "",
    // Step 3 - Organisation
    timeConsumingTasks: "",
    humanDependentTasks: "",
    errorProneAreas: "",
    unstructuredProcesses: "",
    // Step 4 - IA & Automatisation
    currentAITools: "",
    aiToolsUsage: "",
    aiFrustrations: "",
    topAutomationPriority: "",
    // Step 5 - Décision
    isDecisionMaker: "",
    previousInvestments: "",
    failureCriteria: "",
    projectPriority: "",
    // Step 6 - Séance Gratuite
    whyNow: "",
    sessionExpectations: "",
    readyToChange: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Merci ! Nous vous contacterons très prochainement pour planifier votre séance gratuite.");
    onOpenChange(false);
    setCurrentStep(1);
  };

  const progressPercentage = (currentStep / 6) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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

      case 2:
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

      case 3:
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

      case 4:
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
                  {["Oui", "Non", "Partiellement"].map((option, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio">
                      <RadioGroupItem value={["yes", "no", "partially"][i]} id={`ai-${i}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`ai-${i}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">{option}</Label>
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

      case 5:
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
                    { value: "no", label: "Non, je dois consulter" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio">
                      <RadioGroupItem value={option.value} id={`decision-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`decision-${option.value}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">{option.label}</Label>
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
                  {["Oui", "Non"].map((option, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio">
                      <RadioGroupItem value={["yes", "no"][i]} id={`invest-${i}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`invest-${i}`} className="text-muted-foreground cursor-pointer group-hover/radio:text-foreground transition-colors">{option}</Label>
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
                    { value: "low", label: "Faible", color: "text-muted-foreground" },
                    { value: "medium", label: "Moyenne", color: "text-yellow-400" },
                    { value: "high", label: "Élevée", color: "text-orange-400" },
                    { value: "critical", label: "Critique", color: "text-red-400" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio">
                      <RadioGroupItem value={option.value} id={`priority-${option.value}`} className="border-primary/50 text-primary" />
                      <Label htmlFor={`priority-${option.value}`} className={`cursor-pointer group-hover/radio:text-foreground transition-colors ${option.color}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 6:
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
                    { value: "no", label: "Non, je cherche des optimisations mineures", icon: "📊" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-3 rounded-xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group/radio">
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-xl border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] p-0">
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

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Rocket className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/30 rounded-full blur-lg animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent">
                Mission : Transformation
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Circular Progress Gauge */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-center gap-6">
              {/* Main Circular Gauge */}
              <div className="relative w-20 h-20 md:w-24 md:h-24">
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
                  <span className="text-xl md:text-2xl font-bold text-primary">{currentStep}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">/ 6</span>
                </div>
              </div>

              {/* Step Info */}
              <div className="flex-1 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  {(() => {
                    const Icon = steps[currentStep - 1].icon;
                    return <Icon className="w-5 h-5 text-primary" />;
                  })()}
                  <h3 className="text-lg font-semibold text-foreground">
                    {steps[currentStep - 1].title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep - 1].subtitle}
                </p>
                {/* Mini step indicators */}
                <div className="flex gap-1.5 mt-3">
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

          {/* Form Content with scroll */}
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="p-6 pt-4 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex-1 border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Précédent</span>
              </Button>

              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground hover:from-primary/90 hover:to-cyan-500/90 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-primary via-cyan-500 to-primary text-primary-foreground shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300 animate-pulse"
                  style={{ animationDuration: '2s' }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Lancer la mission
                  <Send className="w-4 h-4 ml-2" />
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
