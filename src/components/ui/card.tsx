import React from "react";
import { cn } from "@/lib/utils"; // if you're using a className merge helper

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("rounded-2xl shadow p-4 bg-white", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-2">{children}</div>;
}

