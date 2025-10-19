import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Languages, ScanText, Brain, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Languages className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              EduLangLite
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link to="/ocr">
              <Button 
                variant={isActive("/ocr") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <ScanText className="w-4 h-4" />
                <span className="hidden sm:inline">OCR</span>
              </Button>
            </Link>
            <Link to="/translate">
              <Button 
                variant={isActive("/translate") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">Translate</span>
              </Button>
            </Link>
            <Link to="/qna">
              <Button 
                variant={isActive("/qna") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Q&A</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
