async function downloadPDF() {
    const { jsPDF } = window.jspdf;

    // Select the invoice card
    const invoice = document.querySelector(".main-border");

    // Capture with html2canvas
    const canvas = await html2canvas(invoice, {
        scale: 2,           // Higher = better quality
        useCORS: true,
        allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF (A4 size)
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Extra pages if content overflows
    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
    }

    pdf.save("Invoice.pdf");
}
