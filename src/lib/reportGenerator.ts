import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from an HTML element and triggers a download.
 * @param element The HTML element to capture.
 * @param fileName The name of the file to be downloaded.
 */
export const generatePdfReport = async (element: HTMLElement, fileName: string = 'report.pdf'): Promise<void> => {
  if (!element) {
    throw new Error("PDF generation failed: The provided element is invalid.");
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Use a higher scale for better resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff', // Ensure a white background for the capture
    });

    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    
    let finalImgWidth = pdfWidth - 20; // A4 width with 10mm margin on each side
    let finalImgHeight = finalImgWidth / ratio;

    // Add a header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.text('Investment Growth Report', 14, 22);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 28);

    // Add the captured image, leaving margin at the top for the header
    pdf.addImage(imgData, 'PNG', 10, 40, finalImgWidth, finalImgHeight);

    // Add a footer
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(`Akkay SIP Calculator - Financial projections are estimates based on input values.`, 14, pdfHeight - 10);


    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Re-throw to be caught by the caller
  }
};
