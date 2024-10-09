"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import AddButtonDialog from "./addButtonDialog";
import EditButtonDialog from "./modifyButtonDialog";
import { useData } from "@/components/dataContext";
import { Badge } from "./ui/badge";
import {
  FileSpreadsheet,
  IdCard,
  Percent,
  Stethoscope,
  Weight,
} from "lucide-react";

const DataRenderer: React.FC = () => {
  const { data, handleDelete } = useData();
  return (
    <div className='flex flex-wrap justify-around items-center'>
      {data.map((entry, index) => (
        <div key={index} className='w-1/4 h-1/2 p-4 relative'>
          <Card className=''>
            <CardHeader className='flex justify-between items-center'>
              <CardTitle>{entry.name}</CardTitle>
              <Button
                variant='destructive'
                size='icon'
                className='absolute top-6 right-8'
                onClick={() => handleDelete(entry.id)}
              >
                <TrashIcon />
              </Button>
              <EditButtonDialog entry={entry} />
            </CardHeader>
            <CardContent className='space-y-4 p-6'>
              <div className='flex items-center gap-2'>
                <IdCard className='h-4 w-4 text-gray-300' />
                <Label className='font-semibold text-gray-400'>ID:</Label>
                <span className='ml-2'>{entry.id}</span>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Stethoscope className='h-4 w-4 text-blue-500' />
                  <Label className='font-semibold text-gray-400'>RX:</Label>
                  <span className='ml-2'>{entry.smallExam}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <FileSpreadsheet className='h-4 w-4 text-purple-500' />
                  <Label className='font-semibold text-gray-400'>
                    TC RM ECO TLX:
                  </Label>
                  <span className='ml-2'>{entry.bigExam}</span>
                </div>
              </div>

              <div className='space-y-2 pt-2 border-t'>
                <div className='flex items-center gap-2'>
                  <Weight className='h-4 w-4 text-green-500' />
                  <Label className='font-semibold text-gray-400'>
                    Peso Totale:
                  </Label>
                  <span className='ml-2'>{entry.personalWeight}</span>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Percent className='h-4 w-4 text-orange-500' />
                    <Label className='font-semibold text-gray-400'>
                      Percentuali:
                    </Label>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    <Badge className='bg-blue-500 hover:bg-blue-600'>
                      Parti Uguali: {entry.percentageEqualParts}%
                    </Badge>
                    <Badge className='bg-blue-500 hover:bg-blue-600'>
                      Ruolo: {entry.percentageRole}%
                    </Badge>
                    {entry.finalPercentage !== undefined && (
                      <Badge variant='secondary'>
                        Finale: {entry.finalPercentage}%
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      <div className='w-1/4 h-1/2 p-4 relative'>
        <AddButtonDialog />
      </div>
    </div>
  );
};

export default DataRenderer;
