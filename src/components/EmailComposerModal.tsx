import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { emailTemplates, getTemplateById, type TemplateVariables } from "@/lib/emailTemplates";
import { generateBookingUrl } from "@/lib/calendarConfig";

interface Prospect {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  sector: string | null;
}

interface EmailComposerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prospect: Prospect | null;
  defaultTemplate?: string;
}

const EmailComposerModal = ({ 
  open, 
  onOpenChange, 
  prospect,
  defaultTemplate = "welcome"
}: EmailComposerModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [sending, setSending] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Generate template variables
  const getTemplateVars = (): TemplateVariables => ({
    prospect_name: prospect?.full_name || "Client",
    company_name: prospect?.company_name || undefined,
    sector: prospect?.sector || undefined,
    booking_url: prospect ? generateBookingUrl(prospect.email, prospect.full_name) : undefined,
  });

  // Update content when template changes
  useEffect(() => {
    if (!prospect) return;
    
    const template = getTemplateById(selectedTemplate);
    if (template) {
      const vars = getTemplateVars();
      setSubject(template.subject);
      setHtmlContent(template.getContent(vars));
    }
  }, [selectedTemplate, prospect]);

  // Reset when modal opens with new prospect
  useEffect(() => {
    if (open && prospect) {
      setSelectedTemplate(defaultTemplate);
      const template = getTemplateById(defaultTemplate);
      if (template) {
        const vars = getTemplateVars();
        setSubject(template.subject);
        setHtmlContent(template.getContent(vars));
      }
      setPreviewMode(false);
    }
  }, [open, prospect?.id, defaultTemplate]);

  const handleSend = async () => {
    if (!prospect) return;
    
    if (!subject.trim()) {
      toast.error("Le sujet ne peut pas être vide");
      return;
    }

    if (!htmlContent.trim()) {
      toast.error("Le contenu ne peut pas être vide");
      return;
    }

    setSending(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast.error("Vous devez être connecté pour envoyer des emails");
        return;
      }

      const response = await supabase.functions.invoke("send-email", {
        body: {
          to: prospect.email,
          subject: subject,
          html: htmlContent,
          prospect_id: prospect.id,
          template_type: selectedTemplate,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success(`Email envoyé à ${prospect.full_name}`);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error(`Erreur: ${error.message || "Impossible d'envoyer l'email"}`);
    } finally {
      setSending(false);
    }
  };

  if (!prospect) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Envoyer un email à {prospect.full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {/* Recipient info */}
          <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{prospect.email}</span>
            {prospect.company_name && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{prospect.company_name}</span>
              </>
            )}
          </div>

          {/* Template selector */}
          <div className="space-y-2">
            <Label>Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un template" />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      {template.id === "booking" && <Calendar className="h-3 w-3" />}
                      {template.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Sujet de l'email"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Contenu</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? "Éditer" : "Prévisualiser"}
              </Button>
            </div>
            
            {previewMode ? (
              <div 
                className="border rounded-lg p-4 bg-white min-h-[300px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            ) : (
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Contenu HTML de l'email"
                className="min-h-[300px] font-mono text-sm"
              />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSend} disabled={sending} className="gap-2">
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Envoyer
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailComposerModal;
