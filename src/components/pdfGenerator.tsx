import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export const generatePDF = async (data: InputData[], notes?: string) => {
  // Initialize PDF with Italian font support
  const doc = new jsPDF();
  const margin = 15;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const increasedMargin = margin + 5;
  let y = margin;

  // Enhanced color palette
  const primaryRed = [180, 30, 30] as const;
  const lightRed = [255, 240, 240] as const;
  const darkRed = [120, 20, 20] as const;

  // Add subtle background pattern
  const addBackgroundPattern = () => {
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.1);
    for (let i = 0; i < pageHeight; i += 10) {
      doc.line(0, i, pageWidth, i);
    }
  };

  // Add header design
  const addHeaderDesign = async () => {
    // Header bar
    doc.setFillColor(...primaryRed);
    doc.rect(0, 0, pageWidth, 35, "F");

    // Header text with enhanced styling
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("Report Distribuzione Proventi", margin, 15);

    // Metadata with enhanced styling
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    const metadata = [
      `Generated on: ${new Date().toLocaleString()}`,
      "Reparto di Radiologia Humanitas San Pio X",
    ];
    doc.text(metadata, margin, 22);
  };

  // Helper function to check page break and add new page if needed
  const checkPageBreak = (requiredSpace: number): number => {
    if (y + requiredSpace > pageHeight) {
      doc.addPage();
      addBackgroundPattern();
      addHeaderDesign();
      y = 45; // Start below header
    }
    return y;
  };

  // Format data strings
  const formatDataString = (data: InputData[], key: keyof InputData) =>
    data.map((entry) => `${entry.id}: ${entry[key]}%`).join(", ");

  // Enhanced section headers
  const addSection = (title: string, yPos: number): number => {
    yPos = checkPageBreak(20);

    // Section background
    doc.setFillColor(...lightRed);
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 12, 2, 2, "F");

    // Section title
    doc.setTextColor(...darkRed);
    doc.setFontSize(12);
    doc.text(title, margin + 5, yPos + 8);

    return yPos + 18;
  };

  // Initialize document design
  addBackgroundPattern();
  addHeaderDesign();

  // Start content from below header
  y = 40;

  // Table Section
  y = addSection("Tabella Esami", y);

  // Coefficients info
  y = checkPageBreak(20);
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Coefficienti:", increasedMargin, y);
  doc.text(
    ["• RX = 0.8", "• TC/RM/ECO/TLX/VIS/VARIC/EMBO = 6"],
    increasedMargin + 5,
    y + 5
  );
  y += 12;

  // Table configuration
  const tableColumns = [
    { header: "Nome", dataKey: "name" },
    { header: "ID", dataKey: "id" },
    { header: "RX", dataKey: "smallExam" },
    { header: "TC RM ECO TLX", dataKey: "bigExam" },
    { header: "Peso", dataKey: "personalWeight" },
    { header: "% Finale", dataKey: "finalPercentage" },
  ];

  const tableRows = data.map((entry) => ({
    name: entry.name,
    id: entry.id,
    smallExam: entry.smallExam,
    bigExam: entry.bigExam,
    personalWeight: entry.personalWeight,
    finalPercentage: entry.finalPercentage ?? "N/A",
  }));

  autoTable(doc, {
    head: [tableColumns.map((col) => col.header)],
    body: tableRows.map((row) =>
      tableColumns.map((col) => row[col.dataKey as keyof typeof row])
    ),
    startY: y,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 4,
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [...primaryRed],
      textColor: 255,
      fontStyle: "bold",
      lineWidth: 0.5,
    },
    alternateRowStyles: {
      fillColor: [...lightRed],
    },
    columnStyles: {
      0: { fontStyle: "bold" },
      5: { textColor: [...darkRed] },
    },
    margin: { left: margin, right: margin },
    didDrawPage: (data) => {
      if (data.cursor) {
        y = data.cursor.y + 5;
      }
    },
  });

  // Distribution sections
  y = addSection("Suddivisione Surplus attività radiologica", y);

  // Distribution details
  const distributions = [
    {
      title: "34% Suddiviso in parti uguali tempo equivalenti:",
      data: formatDataString(data, "percentageEqualParts"),
    },
    {
      title:
        "40% Suddiviso proporzionalmente ai minuti equivalenti di refertazione",
      data: "",
    },
    {
      title: "26% Ruolo:",
      data: formatDataString(data, "percentageRole"),
    },
  ];

  distributions.forEach((dist) => {
    y = checkPageBreak(18);
    doc.setFontSize(12);
    doc.setTextColor(...darkRed);
    doc.text(dist.title, increasedMargin, y);
    y += 5;

    if (dist.data) {
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(dist.data, increasedMargin + 5, y);
      y += dist.data.split("\n").length * 6 + 2;
    }
  });

  // Additional criteria
  y = checkPageBreak(25);
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(
    [
      "• 15% Proporzionato all'anzianità / Expertise (6,4,3,2)",
      "• 5% in base a attività congressuale / scientifica",
    ],
    increasedMargin + 5,
    y
  );
  y += 10;

  // Conclusions
  y = addSection("Conclusioni", y);
  y = checkPageBreak(45);

  // Add calculation formulas explanation
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text("Formule di calcolo:", increasedMargin, y);
  y += 5;
  doc.text(
    [
      "1. Peso Personale = (RX × 0.8) + (TC/RM/ECO × 6)",
      "2. Peso Totale = Somma di tutti i Pesi Personali",
      "3. Percentuale Finale = (40 × Peso Personale ÷ Peso Totale) + % Parti Uguali + % Ruolo",
    ],
    increasedMargin + 5,
    y
  );
  y += 12;

  // Add divider before final percentages
  doc.setLineWidth(0.5);
  doc.setDrawColor(...primaryRed);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Final percentages
  doc.setFontSize(11);
  doc.text(formatDataString(data, "finalPercentage"), increasedMargin, y);
  y += 10;

  // Add Notes section if notes are provided
  if (notes && notes.trim()) {
    y = checkPageBreak(40);
    y = addSection("Note", y);

    // Add notes content
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);

    // Split notes into lines to handle word wrap
    const maxWidth = pageWidth - 2 * increasedMargin;
    const lines = doc.splitTextToSize(notes, maxWidth);

    doc.text(lines, increasedMargin, y);
    y += lines.length * 6 + 5;
  }

  // Add footer to each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Add footer decoration
    doc.setFillColor(...primaryRed);
    doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

    // Add page numbers
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin - 20,
      pageHeight - 4
    );
  }

  doc.save(`export.pdf`);
};
