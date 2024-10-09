"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { InputData } from "@/components/types";
import {
  loadDataFromFirebase,
  saveDataToFirebase,
  deleteDataFromFirebase,
  updateDataInFirebase,
  database,
} from "@/firebase";
import { generatePDF } from "./pdfGenerator";
import { ref, update } from "firebase/database";
import { debounce } from "lodash";

interface DataContextProps {
  data: InputData[];
  handleAdd: (newData: InputData) => void;
  handleDelete: (id: string) => void;
  handleEdit: (updatedData: InputData) => void;
  handleGeneratePDF: (note: string) => void;
  loadData: () => Promise<void>;
  calculatePercentages: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<InputData[]>([]);
  const [editMade, setEditMade] = useState(false);

  const loadData = async () => {
    console.log("DataContext.tsx : Loading data from Firebase...");
    const savedData = await loadDataFromFirebase();
    if (savedData) {
      setData(savedData);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editMade) {
      loadData();
      setEditMade(false);
    }
  }, [editMade]);

  const handleAdd = async (newData: InputData) => {
    if (!newData.id) {
      console.error("ID is required for new data");
      return;
    }
    setData((prevData) => {
      console.log("Previous data:", prevData);
      const updatedData = [...prevData, newData];
      console.log("Updated data after add:", updatedData);
      saveDataToFirebase(newData);
      return updatedData;
    });
  };

  const handleDelete = async (id: string) => {
    setData((prevData) => {
      console.log("Previous data:", prevData);
      const updatedData = prevData.filter((item) => item.id !== id);
      console.log("Updated data after delete:", updatedData);
      deleteDataFromFirebase(id);
      return updatedData;
    });
  };

  const handleEdit = async (updatedData: InputData) => {
    console.log("DataContext.tsx : handleEdit called with:", updatedData);

    const updatedDataList = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    console.log("DataContext.tsx : Updated data after edit:", updatedDataList);

    // Check if the data has actually changed before updating Firebase
    const hasChanged = JSON.stringify(data) !== JSON.stringify(updatedDataList);
    if (hasChanged) {
      console.log("DataContext.tsx : Data has changed, updating Firebase...");

      // Create a promise to wait for debounce to complete
      await new Promise<void>((resolve) => {
        debounceUpdateDataInFirebase(updatedDataList, resolve);
      });
    } else {
      console.log(
        "DataContext.tsx : Data has not changed, skipping Firebase update."
      );
    }

    setData(updatedDataList);
  };

  const debounceUpdateDataInFirebase = debounce((data, resolve) => {
    updateDataInFirebase(data).then(resolve);
  }, 300);

  const calculatePercentages = async () => {
    const totalWeight = data.reduce(
      (sum, entry) => sum + entry.personalWeight,
      0
    );

    const updatedData = data.map((entry) => {
      const finalPercentage = (
        (40 * entry.personalWeight) / totalWeight +
        entry.percentageEqualParts +
        entry.percentageRole
      ).toFixed(2);

      return {
        ...entry,
        finalPercentage: parseFloat(finalPercentage),
      };
    });

    setData(updatedData);

    // Save the updated data to Firebase in a single batch
    try {
      const updates = updatedData.reduce(
        (acc: { [key: string]: InputData }, entry) => {
          acc[`appData/${entry.id}`] = entry;
          return acc;
        },
        {}
      );

      await update(ref(database), updates);
      console.log("Successfully updated all entries in Firebase");
    } catch (error) {
      console.error("Error updating documents: ", error);
    }
  };

  const handleGeneratePDF = (notes: string) => {
    generatePDF(data, notes);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        handleAdd,
        handleDelete,
        handleEdit,
        handleGeneratePDF,
        loadData,
        calculatePercentages,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
