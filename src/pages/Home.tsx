import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScanText, Languages, Brain, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-education.jpg";
import ocrIcon from "@/assets/ocr-icon.png";
import translateIcon from "@/assets/translate-icon.png";
import ragIcon from "@/assets/rag-icon.png";

const Home = () => {
  const features = [
    {
      icon: ocrIcon,
      title: "OCR Text Extraction",
      description: "Extract text from PDFs, images, and handwritten notes with AI-powered precision",
      link: "/ocr",
      color: "from-primary to-purple-600"
    },
    {
      icon: translateIcon,
      title: "Smart Translation",
      description: "Translate educational content across multiple Indian languages instantly",
      link: "/translate",
      color: "from-accent to-orange-500"
    },
    {
      icon: ragIcon,
      title: "Document Q&A",
      description: "Ask questions about your documents and get intelligent answers",
      link: "/qna",
      color: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Education</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Break Language Barriers in{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Education
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                EduLangLite uses advanced AI to extract, translate, and analyze educational content 
                across multiple Indian languages. Make learning accessible for everyone.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/ocr">
                  <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 blur-3xl" />
              <img 
                src={heroImage} 
                alt="Educational technology platform" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful AI Tools for Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three essential tools to transform how you work with multilingual educational content
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="relative w-16 h-16 mx-auto"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-center text-sm">
                    {feature.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Try Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary to-purple-600 border-0 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <CardContent className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Education?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and students using EduLangLite to break down language barriers
            </p>
            <Link to="/ocr">
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 shadow-xl hover:shadow-2xl transition-all"
              >
                Start Using EduLangLite
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
