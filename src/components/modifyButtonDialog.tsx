import { useState, useEffect } from "react";
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
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useData } from "@/components/dataContext";
import {
  FileSpreadsheet,
  IdCard,
  Percent,
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

interface EditButtonDialogProps {
  entry: InputData;
}

const EditButtonDialog: React.FC<EditButtonDialogProps> = ({ entry }) => {
  const { handleEdit, loadData } = useData();

  const [name, setName] = useState(entry?.name || "");
  const [id, setId] = useState(entry?.id || "");
  const [smallExam, setSmallExam] = useState(
    entry?.smallExam?.toString() || "0"
  );
  const [bigExam, setBigExam] = useState(entry?.bigExam?.toString() || "0");
  const [percentageEqualParts, setPercentageEqualParts] = useState(
    entry?.percentageEqualParts?.toString() || "0"
  );
  const [percentageRole, setPercentageRole] = useState(
    entry?.percentageRole?.toString() || "0"
  );

  useEffect(() => {
    if (entry) {
      setName(entry.name);
      setId(entry.id);
      setSmallExam(entry.smallExam.toString());
      setBigExam(entry.bigExam.toString());
      setPercentageEqualParts(entry.percentageEqualParts.toString());
      setPercentageRole(entry.percentageRole.toString());
    }
  }, [entry]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleSmallExamChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSmallExam(event.target.value);
  };

  const handleBigExamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBigExam(event.target.value);
  };

  const handlePercentageEqualPartsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPercentageEqualParts(event.target.value);
  };

  const handlePercentageRoleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPercentageRole(event.target.value);
  };

  const handleSubmit = async () => {
    const smallExamNum = parseFloat(smallExam);
    const bigExamNum = parseFloat(bigExam);
    const percentageEqualPartsNum = parseFloat(percentageEqualParts);
    const percentageRoleNum = parseFloat(percentageRole);

    const personalWeight = smallExamNum * 0.8 + bigExamNum * 6;

    const updatedData: InputData = {
      name,
      id,
      smallExam: smallExamNum,
      bigExam: bigExamNum,
      personalWeight,
      percentageEqualParts: percentageEqualPartsNum,
      percentageRole: percentageRoleNum,
      finalPercentage: entry.finalPercentage,
    };

    console.log("Dialog : Updated data from dialog:", updatedData);

    await handleEdit(updatedData);

    loadData();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='absolute bottom-8 right-8'
          variant='outline'
          size='icon'
        >
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='text-2xl font-bold text-foreground'>
            Edit Entry
          </DialogTitle>
          <DialogDescription className='text-gray-500'>
            Modify the details below to update the entry. All fields are
            required.
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
                type='text'
                placeholder='Name and Surname'
                required
                value={name}
                onChange={(e) => handleNameChange(e)}
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
                type='text'
                required
                value={id}
                onChange={(e) => handleIdChange(e)}
                className='focus-visible:ring-purple-500'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='smallExam' className='flex items-center gap-2'>
                  <Stethoscope className='w-4 h-4 text-green-500' />
                  <span>RX</span>
                </Label>
                <Input
                  id='smallExam'
                  type='text'
                  required
                  value={smallExam}
                  onChange={(e) => handleSmallExamChange(e)}
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
                  type='text'
                  required
                  value={bigExam}
                  onChange={(e) => handleBigExamChange(e)}
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
                  <span>Percentuale in Parti Uguali</span>
                </Label>
                <Input
                  id='percentageEqualParts'
                  type='number'
                  required
                  value={percentageEqualParts}
                  onChange={(e) => handlePercentageEqualPartsChange(e)}
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
                  required
                  value={percentageRole}
                  onChange={(e) => handlePercentageRoleChange(e)}
                  className='focus-visible:ring-indigo-500'
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button
              type='submit'
              className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700'
              onClick={handleSubmit}
            >
              Salva Modifiche
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButtonDialog;
