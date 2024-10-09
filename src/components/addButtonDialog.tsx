import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  FileSpreadsheet,
  IdCard,
  Percent,
  Plus,
  Stethoscope,
  User,
} from "lucide-react";

interface InputData {
  name: string;
  id: string;
  smallExam: number;
  bigExam: number;
  personalWeight: number;
  percentageEqualParts: number;
  percentageRole: number;
  finalPercentage?: number;
}

const AddButtonDialog: React.FC = () => {
  const { handleAdd } = useData();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [smallExam, setSmallExam] = useState("");
  const [bigExam, setBigExam] = useState("");
  const [percentageEqualParts, setPercentageEqualParts] = useState("");
  const [percentageRole, setPercentageRole] = useState("");

  const handleSubmit = async () => {
    const smallExamNum = parseFloat(smallExam);
    const bigExamNum = parseFloat(bigExam);
    const percentageEqualPartsNum = parseFloat(percentageEqualParts);
    const percentageRoleNum = parseFloat(percentageRole);

    const personalWeight = smallExamNum * 0.8 + bigExamNum * 6;

    const newData: InputData = {
      name,
      id,
      smallExam: smallExamNum,
      bigExam: bigExamNum,
      personalWeight,
      percentageEqualParts: percentageEqualPartsNum,
      percentageRole: percentageRoleNum,
    };

    console.log("Dialog : New data from dialog:", newData);

    await handleAdd(newData);

    // Clear the form fields after submission
    setName("");
    setId("");
    setSmallExam("");
    setBigExam("");
    setPercentageEqualParts("");
    setPercentageRole("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='w-full h-72 group  hover:bg-blue-500 transition-all duration-300'
        >
          <Plus className='w-10 h-10 transition-colors' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <form>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-foreground'>
              Aggiungi Elemento
            </DialogTitle>
            <DialogDescription className='text-gray-500'>
              Inserisci i campi per aggiungere un nuovo elemento.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-6 py-6'>
            <div className='grid gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='name' className='flex items-center gap-2'>
                  <User className='w-4 h-4 text-blue-500' />
                  <span>Nome</span>
                </Label>
                <Input
                  id='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='focus-visible:ring-blue-500'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='id' className='flex items-center gap-2'>
                  <IdCard className='w-4 h-4 text-purple-500' />
                  <span>ID</span>
                </Label>
                <Input
                  id='id'
                  placeholder='Enter ID'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className='focus-visible:ring-purple-500'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='smallExam'
                    className='flex items-center gap-2'
                  >
                    <Stethoscope className='w-4 h-4 text-green-500' />
                    <span>RX</span>
                  </Label>
                  <Input
                    id='smallExam'
                    placeholder='Enter small exam'
                    value={smallExam}
                    onChange={(e) => setSmallExam(e.target.value)}
                    className='focus-visible:ring-green-500'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bigExam' className='flex items-center gap-2'>
                    <FileSpreadsheet className='w-4 h-4 text-orange-500' />
                    <span>TC RM ECO TLX</span>
                  </Label>
                  <Input
                    id='bigExam'
                    placeholder='Enter big exam'
                    value={bigExam}
                    onChange={(e) => setBigExam(e.target.value)}
                    className='focus-visible:ring-orange-500'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='percentageEqualParts'
                    className='flex items-center gap-2'
                  >
                    <Percent className='w-4 h-4 text-red-500' />
                    <span>Percentuale Parti Uguali</span>
                  </Label>
                  <Input
                    id='percentageEqualParts'
                    type='number'
                    placeholder='Enter percentage'
                    value={percentageEqualParts}
                    onChange={(e) => setPercentageEqualParts(e.target.value)}
                    className='focus-visible:ring-red-500'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='percentageRole'
                    className='flex items-center gap-2'
                  >
                    <Percent className='w-4 h-4 text-indigo-500' />
                    <span>Percentuale Ruolo</span>
                  </Label>
                  <Input
                    id='percentageRole'
                    type='number'
                    placeholder='Enter percentage'
                    value={percentageRole}
                    onChange={(e) => setPercentageRole(e.target.value)}
                    className='focus-visible:ring-indigo-500'
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='submit'
                className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700'
                onClick={handleSubmit}
              >
                Aggiungi
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddButtonDialog;
