import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Loader2, Copy, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const TranslatePage = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi (हिंदी)" },
    { code: "ta", name: "Tamil (தமிழ்)" },
    { code: "te", name: "Telugu (తెలుగు)" },
    { code: "bn", name: "Bengali (বাংলা)" },
    { code: "mr", name: "Marathi (मराठी)" },
    { code: "gu", name: "Gujarati (ગુજરાતી)" },
    { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const sourceLanguage = languages.find(l => l.code === sourceLang)?.name || "English";
      const targetLanguage = languages.find(l => l.code === targetLang)?.name || "Hindi";
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage,
          targetLanguage,
          userId: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
      toast({
        title: "Translation complete",
        description: "Your text has been translated"
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation failed",
        description: error instanceof Error ? error.message : "Failed to translate text",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Translation copied successfully"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Smart Translation
            </h1>
            <p className="text-muted-foreground">
              Translate educational content across multiple Indian languages
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Source Text</CardTitle>
                <CardDescription>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="min-h-[300px] resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Translation</span>
                  {translatedText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="min-h-[300px] resize-none bg-muted/50"
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
              size="lg"
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  Translate
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;
