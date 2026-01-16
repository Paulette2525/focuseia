import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Send, Building2, Target, Settings, Brain, UserCheck, CalendarCheck } from "lucide-react";

interface BookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Identité & Contexte", icon: Building2 },
  { id: 2, title: "Vision & Ambition", icon: Target },
  { id: 3, title: "Organisation", icon: Settings },
  { id: 4, title: "IA & Automatisation", icon: Brain },
  { id: 5, title: "Décision", icon: UserCheck },
  { id: 6, title: "Séance Gratuite", icon: CalendarCheck },
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
    // Here you would typically send the data to your backend
    alert("Merci ! Nous vous contacterons très prochainement pour planifier votre séance gratuite.");
    onOpenChange(false);
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Qui êtes-vous, vraiment ?</h3>
              <p className="text-muted-foreground text-sm">Aidez-nous à comprendre votre contexte</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-foreground">Quel est le nom de votre entreprise ?</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="mt-2 bg-background/50 border-border"
                  placeholder="Nom de l'entreprise"
                />
              </div>
              
              <div>
                <Label htmlFor="role" className="text-foreground">Quel est votre rôle exact dans l'entreprise ?</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="mt-2 bg-background/50 border-border"
                  placeholder="Ex: CEO, Directeur des opérations..."
                />
              </div>
              
              <div>
                <Label htmlFor="companyAge" className="text-foreground">Depuis combien de temps l'entreprise existe-t-elle ?</Label>
                <Input
                  id="companyAge"
                  value={formData.companyAge}
                  onChange={(e) => handleInputChange("companyAge", e.target.value)}
                  className="mt-2 bg-background/50 border-border"
                  placeholder="Ex: 5 ans"
                />
              </div>
              
              <div>
                <Label htmlFor="employeeCount" className="text-foreground">Combien de personnes travaillent actuellement dans l'organisation ?</Label>
                <Input
                  id="employeeCount"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                  className="mt-2 bg-background/50 border-border"
                  placeholder="Ex: 25 employés"
                />
              </div>
              
              <div>
                <Label htmlFor="sector" className="text-foreground">Dans quel secteur évoluez-vous ?</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => handleInputChange("sector", e.target.value)}
                  className="mt-2 bg-background/50 border-border"
                  placeholder="Ex: E-commerce, Santé, Finance..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Où voulez-vous aller ?</h3>
              <p className="text-muted-foreground text-sm">Partagez votre vision et vos ambitions</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="vision2to3Years" className="text-foreground">Où souhaitez-vous voir votre entreprise dans 2 à 3 ans ?</Label>
                <Textarea
                  id="vision2to3Years"
                  value={formData.vision2to3Years}
                  onChange={(e) => handleInputChange("vision2to3Years", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Décrivez votre vision..."
                />
              </div>
              
              <div>
                <Label htmlFor="growthLimit" className="text-foreground">Qu'est-ce qui, aujourd'hui, limite le plus votre croissance ?</Label>
                <Textarea
                  id="growthLimit"
                  value={formData.growthLimit}
                  onChange={(e) => handleInputChange("growthLimit", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Identifiez vos freins..."
                />
              </div>
              
              <div>
                <Label htmlFor="speedBlocker" className="text-foreground">Selon vous, qu'est-ce qui vous empêche d'aller plus vite ?</Label>
                <Textarea
                  id="speedBlocker"
                  value={formData.speedBlocker}
                  onChange={(e) => handleInputChange("speedBlocker", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Vos obstacles principaux..."
                />
              </div>
              
              <div>
                <Label htmlFor="noChangeConsequence" className="text-foreground">Si rien ne change dans votre organisation actuelle, que se passe-t-il dans 12 mois ?</Label>
                <Textarea
                  id="noChangeConsequence"
                  value={formData.noChangeConsequence}
                  onChange={(e) => handleInputChange("noChangeConsequence", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Projetez-vous dans le futur..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Comment ça fonctionne au quotidien ?</h3>
              <p className="text-muted-foreground text-sm">Décrivez votre réalité opérationnelle</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="timeConsumingTasks" className="text-foreground">Quelles sont les tâches les plus chronophages dans votre entreprise ?</Label>
                <Textarea
                  id="timeConsumingTasks"
                  value={formData.timeConsumingTasks}
                  onChange={(e) => handleInputChange("timeConsumingTasks", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Listez les tâches qui prennent le plus de temps..."
                />
              </div>
              
              <div>
                <Label htmlFor="humanDependentTasks" className="text-foreground">Quelles tâches reposent encore trop sur l'humain ?</Label>
                <Textarea
                  id="humanDependentTasks"
                  value={formData.humanDependentTasks}
                  onChange={(e) => handleInputChange("humanDependentTasks", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Tâches manuelles répétitives..."
                />
              </div>
              
              <div>
                <Label htmlFor="errorProneAreas" className="text-foreground">Où constatez-vous le plus d'erreurs, d'oublis ou de lenteurs ?</Label>
                <Textarea
                  id="errorProneAreas"
                  value={formData.errorProneAreas}
                  onChange={(e) => handleInputChange("errorProneAreas", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Points de friction identifiés..."
                />
              </div>
              
              <div>
                <Label htmlFor="unstructuredProcesses" className="text-foreground">Quels processus sont aujourd'hui mal structurés ou inexistants ?</Label>
                <Textarea
                  id="unstructuredProcesses"
                  value={formData.unstructuredProcesses}
                  onChange={(e) => handleInputChange("unstructuredProcesses", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Processus à améliorer..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Votre rapport à l'IA</h3>
              <p className="text-muted-foreground text-sm">Évaluons votre niveau de conscience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Utilisez-vous déjà des outils d'IA ou d'automatisation ?</Label>
                <RadioGroup
                  value={formData.currentAITools}
                  onValueChange={(value) => handleInputChange("currentAITools", value)}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="ai-yes" />
                    <Label htmlFor="ai-yes" className="text-muted-foreground cursor-pointer">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="ai-no" />
                    <Label htmlFor="ai-no" className="text-muted-foreground cursor-pointer">Non</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="partially" id="ai-partial" />
                    <Label htmlFor="ai-partial" className="text-muted-foreground cursor-pointer">Partiellement</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="aiToolsUsage" className="text-foreground">Si oui, lesquels et pour quels usages ?</Label>
                <Textarea
                  id="aiToolsUsage"
                  value={formData.aiToolsUsage}
                  onChange={(e) => handleInputChange("aiToolsUsage", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Ex: ChatGPT pour la rédaction, Zapier pour l'automatisation..."
                />
              </div>
              
              <div>
                <Label htmlFor="aiFrustrations" className="text-foreground">Qu'est-ce qui vous frustre dans votre utilisation actuelle de l'IA ?</Label>
                <Textarea
                  id="aiFrustrations"
                  value={formData.aiFrustrations}
                  onChange={(e) => handleInputChange("aiFrustrations", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Vos frustrations..."
                />
              </div>
              
              <div>
                <Label htmlFor="topAutomationPriority" className="text-foreground">Si vous deviez automatiser UNE seule chose demain, laquelle serait-ce ?</Label>
                <Textarea
                  id="topAutomationPriority"
                  value={formData.topAutomationPriority}
                  onChange={(e) => handleInputChange("topAutomationPriority", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Votre priorité #1..."
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Décision & Engagement</h3>
              <p className="text-muted-foreground text-sm">Comprenons votre capacité d'action</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Êtes-vous décisionnaire sur ce type de projet ?</Label>
                <RadioGroup
                  value={formData.isDecisionMaker}
                  onValueChange={(value) => handleInputChange("isDecisionMaker", value)}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="decision-yes" />
                    <Label htmlFor="decision-yes" className="text-muted-foreground cursor-pointer">Oui, entièrement</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="partial" id="decision-partial" />
                    <Label htmlFor="decision-partial" className="text-muted-foreground cursor-pointer">Partiellement, avec validation</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="decision-no" />
                    <Label htmlFor="decision-no" className="text-muted-foreground cursor-pointer">Non, je dois consulter</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="text-foreground">Avez-vous déjà investi dans des solutions similaires par le passé ?</Label>
                <RadioGroup
                  value={formData.previousInvestments}
                  onValueChange={(value) => handleInputChange("previousInvestments", value)}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="invest-yes" />
                    <Label htmlFor="invest-yes" className="text-muted-foreground cursor-pointer">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="invest-no" />
                    <Label htmlFor="invest-no" className="text-muted-foreground cursor-pointer">Non</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="failureCriteria" className="text-foreground">Qu'est-ce qui ferait que cette collaboration serait un échec pour vous ?</Label>
                <Textarea
                  id="failureCriteria"
                  value={formData.failureCriteria}
                  onChange={(e) => handleInputChange("failureCriteria", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Définissez vos critères d'échec..."
                />
              </div>
              
              <div>
                <Label className="text-foreground">À quel point ce projet est-il prioritaire aujourd'hui ?</Label>
                <RadioGroup
                  value={formData.projectPriority}
                  onValueChange={(value) => handleInputChange("projectPriority", value)}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="low" id="priority-low" />
                    <Label htmlFor="priority-low" className="text-muted-foreground cursor-pointer">Faible</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="medium" id="priority-medium" />
                    <Label htmlFor="priority-medium" className="text-muted-foreground cursor-pointer">Moyenne</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="high" id="priority-high" />
                    <Label htmlFor="priority-high" className="text-muted-foreground cursor-pointer">Élevée</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="critical" id="priority-critical" />
                    <Label htmlFor="priority-critical" className="text-muted-foreground cursor-pointer">Critique</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Séance Gratuite</h3>
              <p className="text-muted-foreground text-sm">Le filtre final – là où tout se joue</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="whyNow" className="text-foreground">Pourquoi souhaitez-vous échanger avec FOCUSEIA maintenant et pas plus tard ?</Label>
                <Textarea
                  id="whyNow"
                  value={formData.whyNow}
                  onChange={(e) => handleInputChange("whyNow", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Qu'est-ce qui vous motive aujourd'hui..."
                />
              </div>
              
              <div>
                <Label htmlFor="sessionExpectations" className="text-foreground">Qu'attendez-vous concrètement de cette première séance gratuite ?</Label>
                <Textarea
                  id="sessionExpectations"
                  value={formData.sessionExpectations}
                  onChange={(e) => handleInputChange("sessionExpectations", e.target.value)}
                  className="mt-2 bg-background/50 border-border min-h-[80px]"
                  placeholder="Vos attentes..."
                />
              </div>
              
              <div>
                <Label className="text-foreground">Êtes-vous prêt à remettre en question votre organisation actuelle si nécessaire ?</Label>
                <RadioGroup
                  value={formData.readyToChange}
                  onValueChange={(value) => handleInputChange("readyToChange", value)}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="change-yes" />
                    <Label htmlFor="change-yes" className="text-muted-foreground cursor-pointer">Oui, absolument</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="maybe" id="change-maybe" />
                    <Label htmlFor="change-maybe" className="text-muted-foreground cursor-pointer">Peut-être, selon les recommandations</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="change-no" />
                    <Label htmlFor="change-no" className="text-muted-foreground cursor-pointer">Non, je cherche des optimisations mineures</Label>
                  </div>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Réservez votre séance gratuite
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex justify-center gap-2 my-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-primary text-primary-foreground scale-110"
                    : step.id < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
            );
          })}
        </div>

        {/* Step Title */}
        <div className="text-center mb-4">
          <span className="text-sm text-muted-foreground">
            Étape {currentStep} sur 6
          </span>
          <h2 className="text-lg font-semibold text-primary">
            {steps[currentStep - 1].title}
          </h2>
        </div>

        {/* Form Content */}
        <div className="py-4">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Envoyer ma demande
              <Send className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
