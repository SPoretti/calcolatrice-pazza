"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DataRenderer from "@/components/dataRenderer";
import { useData } from "@/components/dataContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import ThemeButton from "@/components/themeButton";
import PDFDialog from "@/components/pdfDialog";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { loadData, calculatePercentages } = useData();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className='h-screen w-full flex'>
      <div className='w-full p-4 overflow-y-auto'>
        <div className='h-14 flex flex-row items-center justify-center gap-2'>
          <ThemeButton />
          <PDFDialog />
          <Button variant={"ghost"} onClick={calculatePercentages}>
            Calcola Percentuali
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={loadData}>
            <ReloadIcon />
          </Button>
        </div>
        <DataRenderer />
      </div>
    </div>
  );
}
