
import React from "react";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNavigation?: boolean;
}

const Layout = ({ children, className, hideNavigation = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className={cn("flex-1 pb-16", className)}>
        <div className="page-container">{children}</div>
      </main>
      {!hideNavigation && <Navigation />}
    </div>
  );
};

export default Layout;
