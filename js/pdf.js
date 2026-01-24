// PDF
const downloadBtn = document.querySelector(".download-btn");
const width = window.innerWidth;
// mobile condition
if (width <= 768) {
    downloadBtn.addEventListener("click", () => {
        const element = document.querySelector(".main-border");

        const opt = {
            margin: 0,
            filename: "invoice.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: {
                scrollX: -20,
                scale: 3,
                windowWidth: element.scrollWidth,
                backgroundColor: "#ffffff"
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf().set(opt).from(element).save();
    });
} else { // for web 
    downloadBtn.addEventListener("click", () => {
        const element = document.querySelector(".main-border");

        const opt = {
            margin: 0,
            filename: "invoice.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: {
                scrollX: 225.5,
                scale: 3,
                windowWidth: element.scrollWidth,
                backgroundColor: "#ffffff"
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf().set(opt).from(element).save();
    })
};