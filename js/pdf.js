async function downloadPDF() {

    const pdfWrapper = document.querySelector(".pdf-wrapper");

    /* --------- HARD LOCK LAYOUT (CRITICAL) ---------- */
    pdfWrapper.style.width = "900px";
    pdfWrapper.style.maxWidth = "900px";
    pdfWrapper.style.transform = "none";

    const canvas = await html2canvas(pdfWrapper, {
        scale: 3,                     // High quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 900,             // FORCE DESKTOP WIDTH
        windowHeight: pdfWrapper.scrollHeight
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    /* --------- MULTI-PAGE SUPPORT ---------- */
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
    }

    pdf.save("invoice.pdf");
}
