// ================= PDF PAGINATION LOGIC =================

// how many items per page
const ITEMS_PER_PAGE = 4;

// split items into chunks
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

// create one invoice page
function createInvoicePage(data, itemsChunk, startSlNo) {
    const page = document.querySelector(".main-border").cloneNode(true);

    // fill static data
    page.querySelector(".name").innerText = data.name || "";
    page.querySelector(".address").innerText = data.address || "";
    page.querySelector(".order").innerText = data.order || "";
    page.querySelector(".o-date").innerText = data.oDate || "";
    page.querySelector(".c-date").innerText = data.cDate || "";

    const tbody = page.querySelector("tbody");
    tbody.innerHTML = "";

    //  Add actual items
    itemsChunk.forEach((item, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${startSlNo + i}</td>
            <td>${item.cap || ""} KG</td>
            <td>${item.qty || ""}</td>
            <td>${item.type || ""}</td>
        `;
        tbody.appendChild(tr);
    });

    //  Fill remaining rows with blanks
    const missingRows = ITEMS_PER_PAGE - itemsChunk.length;

    for (let i = 0; i < missingRows; i++) {
        const emptyTr = document.createElement("tr");
        emptyTr.innerHTML = `
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
        `;
        tbody.appendChild(emptyTr);
    }

    return page;
}


// MAIN PDF FUNCTION (called from button)
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const chunks = chunkArray(data.items, ITEMS_PER_PAGE);
    let slNo = 1;

    for (let i = 0; i < chunks.length; i++) {
        const page = createInvoicePage(data, chunks[i], slNo);
        slNo += chunks[i].length;

        // fixed-width wrapper (VERY IMPORTANT)
        const wrapper = document.createElement("div");
        wrapper.style.width = "794px"; // A4 width
        wrapper.style.background = "#fff";
        wrapper.appendChild(page);

        document.body.appendChild(wrapper);

        const canvas = await html2canvas(wrapper, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            windowWidth: 794,
            scrollX: 0,
            scrollY: 0
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = 210;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

        document.body.removeChild(wrapper);
    }

    pdf.save("invoice.pdf");
}
