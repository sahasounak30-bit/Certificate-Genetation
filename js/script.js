let body = document.querySelector("body");
let pre = document.querySelector(".preview-btn");


// add more items function
let add = document.querySelector(".add-items");

add.addEventListener("click", () => {
    let items = document.querySelector(".invoice-items-container");
    const box = document.createElement("div");
    box.className = "input-box";
    box.innerHTML = `
            <div class="items-container">
                <div class="item-field row">
                    <label>Capacity</label>
                    <input type="text" class="cap" placeholder="Capacity">
                </div>
                <div class="item-field row">
                    <label>Type</label>
                    <input type="text" class="type" placeholder="Type">
                </div>
                <div class="delete-items">X</div>
            </div>
                    `;
    items.appendChild(box);
});

// remove function
document.querySelector(".invoice-items-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-items")) {
        e.target.closest(".items-container").remove();
    }
});


// localStorage
function goToPreview() {
    let items = [];

    document.querySelectorAll(".items-container").forEach(row => {
        let cap = row.querySelector(".cap")?.value.trim();
        let type = row.querySelector(".type")?.value.trim();

        if (cap || type) {
            items.push({ cap, type });
        }
    });

    const invoiceData = {
        name: document.querySelector(".name")?.value || "",
        cEmail: document.querySelector(".cEmail")?.value || "",
        address: document.querySelector(".address")?.value || "",
        order: document.querySelector("select[name='order']")?.value || "",
        issueDate: document.querySelector(".issueDate")?.value || "",
        oDate: document.querySelector(".oDate")?.value || "",
        cDate: document.querySelector(".cDate")?.value || "",
        certificatNo: document.querySelector(".certificatNo")?.value || "",
        items
    };

    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    window.location.href = "../html/preview-gen.html";
}


// ---- Cookie helpers ----
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length);
        }
    }
    return null;
}

// ---- Intro logic ----
const introOverlay = document.getElementById("introOverlay");
const closeIntro = document.getElementById("closeIntro");

// Check cookie
if (getCookie("introSeen") === "true") {
    introOverlay.style.display = "none";
}

// Close button
closeIntro.addEventListener("click", () => {
    introOverlay.style.display = "none";
    setCookie("introSeen", "true", 1);
});
