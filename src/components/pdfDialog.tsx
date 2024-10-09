"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useData } from "@/components/dataContext";

const AddNoteDialog: React.FC = () => {
  const { handleGeneratePDF } = useData();
  const [note, setNote] = useState("");

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("AddNoteDialog : Note to be added:", note);
    handleGeneratePDF(note);
    setNote(""); // Clear the note after submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Esporta PDF</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='text-2xl font-bold text-foreground'>
            Note
          </DialogTitle>
          <DialogDescription className='text-gray-500'>
            Inserisci note alla fine del pdf.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-6'>
          <div className='space-y-2'>
            <Textarea
              id='note'
              placeholder='Enter your note here...'
              required
              value={note}
              onChange={handleNoteChange}
              className='focus-visible:ring-blue-500 h-40'
            />
          </div>
        </div>

        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button
              type='submit'
              className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700'
              onClick={handleSubmit}
            >
              Esporta PDF
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
