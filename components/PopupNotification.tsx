"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import React from "react";

interface PopupNotificationProps {
  open: boolean;
  onClose: () => void;
  type?: "success" | "error";
  title: string;
  description?: string;
}

export default function PopupNotification({ open, onClose, type = "success", title, description }: PopupNotificationProps) {
  if (!open) return null;
  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-4 z-[9999] min-w-[280px] max-w-[400px] sm:min-w-[320px] sm:max-w-[420px] shadow-lg animate-fadeIn">
      <Alert variant={type === "error" ? "destructive" : "default"} className="relative pr-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 hover:bg-opacity-20 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-700" />
        </button>
        <AlertTitle className="text-sm sm:text-base font-semibold">{title}</AlertTitle>
        {description && (
          <AlertDescription className="text-xs sm:text-sm mt-1 opacity-90">
            {description}
          </AlertDescription>
        )}
      </Alert>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
} 