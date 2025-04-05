
import React, { useState } from 'react';
import { Menu, X, MoonStar, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, children }) => {
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[350px]">
                  {sidebar}
                </SheetContent>
              </Sheet>
            ) : null}
            <h1 className="text-xl font-bold text-primary">سامانه مدیریت کارها</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 container pt-6 pb-12 px-4">
        {!isMobile && (
          <aside className="w-64 flex-shrink-0 ml-6 hidden md:block">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 max-w-3xl mx-auto md:mx-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
