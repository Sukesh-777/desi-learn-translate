import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Translation {
  id: string;
  source_text: string;
  translated_text: string;
  source_language: string;
  target_language: string;
  created_at: string;
}

const TranslationHistory = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('translation_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTranslations(data || []);
    } catch (error) {
      console.error('Error fetching translations:', error);
      toast({
        title: "Failed to load history",
        description: "Could not load translation history",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('translation_history')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTranslations(translations.filter(t => t.id !== id));
      toast({
        title: "Deleted",
        description: "Translation removed from history"
      });
    } catch (error) {
      console.error('Error deleting translation:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete translation",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Translation History
            </h1>
            <p className="text-muted-foreground">
              View your recent translations
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : translations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No translation history yet. Start translating to see your history here.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {translations.map((translation) => (
                <Card key={translation.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formatDate(translation.created_at)}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(translation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {translation.source_language} → {translation.target_language}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold mb-1 text-muted-foreground">
                          Original
                        </div>
                        <p className="text-sm">
                          {translation.source_text.length > 150
                            ? translation.source_text.substring(0, 150) + "..."
                            : translation.source_text}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-1 text-muted-foreground">
                          Translation
                        </div>
                        <p className="text-sm">
                          {translation.translated_text.length > 150
                            ? translation.translated_text.substring(0, 150) + "..."
                            : translation.translated_text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationHistory;
