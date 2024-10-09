"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { WebviewWindow } from "@tauri-apps/api/window";

const TitleBar = () => {
  const [appWindow, setAppWindow] = useState<WebviewWindow | null>(null);
  const [isTauri, setIsTauri] = useState(false);

  useEffect(() => {
    const initializeTauri = async () => {
      try {
        // Directly create a new WebviewWindow instance
        const appWindow = new WebviewWindow("main");
        setAppWindow(appWindow);
        setIsTauri(true);
      } catch (error) {
        console.error("Failed to initialize window:", error);
      }
    };

    initializeTauri();
  }, []);

  const handleClose = async () => {
    try {
      if (appWindow) {
        await appWindow.close();
      }
    } catch (error) {
      console.error("Failed to close window:", error);
    }
  };

  // Don't render if we're not in Tauri
  if (!isTauri || !appWindow) {
    return null;
  }

  return (
    <div
      className='h-8 bg-gray-800 flex items-center justify-between px-2 select-none'
      data-tauri-drag-region
    >
      <div className='text-gray-300 text-sm'>My Tauri App</div>
      <button
        onClick={handleClose}
        className='p-1 hover:bg-red-500 rounded transition-colors duration-200'
        aria-label='Close window'
      >
        <X className='h-4 w-4 text-gray-300' />
      </button>
    </div>
  );
};

export default TitleBar;
