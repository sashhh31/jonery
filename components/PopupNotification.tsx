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
    <div style={{
      position: "fixed",
      top: 24,
      right: 24,
      zIndex: 9999,
      minWidth: 320,
      maxWidth: 400,
      boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
      animation: "fadeIn 0.2s"
    }}>
      <Alert variant={type === "error" ? "destructive" : "default"} className="relative pr-10">
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", cursor: "pointer" }}
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-700" />
        </button>
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
} 