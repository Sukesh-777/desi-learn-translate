import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, Send, Loader2, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QnAPage = () => {
  const [document, setDocument] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocument(file);
      toast({
        title: "Document uploaded",
        description: `${file.name} is ready for questions`
      });
    }
  };

  const handleAskQuestion = async () => {
    if (!document) {
      toast({
        title: "No document uploaded",
        description: "Please upload a document first",
        variant: "destructive"
      });
      return;
    }

    if (!question.trim()) {
      toast({
        title: "No question entered",
        description: "Please enter a question",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = { role: "user", content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a sample answer. Connect to Lovable Cloud to enable real document Q&A using RAG (Retrieval Augmented Generation)."
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Document Q&A
            </h1>
            <p className="text-muted-foreground">
              Upload documents and ask questions to get intelligent answers
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Document
                </CardTitle>
                <CardDescription>
                  Upload a document to start asking questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="doc-upload"
                  />
                  <label 
                    htmlFor="doc-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <FileText className="w-10 h-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {document ? document.name : "Click to upload document"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, TXT, DOC, DOCX up to 10MB
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="min-h-[400px] flex flex-col">
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>
                  Ask questions about your document
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4 mb-4 overflow-y-auto min-h-[250px] max-h-[400px]">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Upload a document and ask a question to get started
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
                    placeholder="Ask a question about your document..."
                    disabled={!document || isLoading}
                  />
                  <Button
                    onClick={handleAskQuestion}
                    disabled={!document || !question.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnAPage;
