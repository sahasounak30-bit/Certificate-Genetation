let edit = document.querySelector(".edit-btn");

edit.addEventListener("click", () => {
    window.history.back();
});

const data = JSON.parse(localStorage.getItem("invoiceData"));

if (!data) {
    alert("No invoice data found!");
    window.location.href = "../html/index.html";
}

// Fill client details
document.querySelector(".name").innerText = data.name || "";
document.querySelector(".address").innerText = data.address || "";

// fill opneing date and closing date
document.querySelector(".c-date").innerText = data.cDate || "";
document.querySelector(".o-date").innerText = data.oDate || "";

// fill order
document.querySelector(".order").innerText = data.order || "Extinguisher Refilled";

// Table body (IMPORTANT)
const tbody = document.querySelector(".items-table tbody");

// Clear old rows (safe)
tbody.innerHTML = "";

// Insert items
data.items.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.cap}</td>
        <td>${item.type}</td>
    `;
    tbody.appendChild(tr);
});


