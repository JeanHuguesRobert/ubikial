
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Menu, X } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "fr" : "en");
    toast({
      title: language === "en" ? "Langue changée en Français" : "Language changed to English",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="fixed top-0 w-full z-50 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold text-primary">EchoSphere</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="slide-up"
                onClick={toggleLanguage}
              >
                <Globe className="mr-2 h-4 w-4" />
                {language === "en" ? "EN" : "FR"}
              </Button>
              {isSignedIn ? (
                <>
                  <Button variant="default" className="slide-up">
                    {language === "en" ? "New Post" : "Nouveau Post"}
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton>
                    <Button variant="ghost" className="slide-up">
                      {language === "en" ? "Sign In" : "Connexion"}
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="default" className="slide-up">
                      {language === "en" ? "Sign Up" : "S'inscrire"}
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
            <div className="p-4 space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleLanguage}
              >
                <Globe className="mr-2 h-4 w-4" />
                {language === "en" ? "English" : "Français"}
              </Button>
              {isSignedIn ? (
                <>
                  <Button variant="default" className="w-full">
                    {language === "en" ? "New Post" : "Nouveau Post"}
                  </Button>
                  <div className="flex justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <>
                  <SignInButton>
                    <Button variant="ghost" className="w-full">
                      {language === "en" ? "Sign In" : "Connexion"}
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="default" className="w-full">
                      {language === "en" ? "Sign Up" : "S'inscrire"}
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 pt-24 pb-12">
        {children}
      </main>
    </div>
  );
}
