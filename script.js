async function pasteAndFilter() {
    try {
        const text = await navigator.clipboard.readText();
        if (!text) {
            showToast("⚠️ Không có nội dung clipboard để dán.");
            return;
        }
        document.getElementById("inputEmails").value = text;
        filterEmails();
    } catch (err) {
        showToast("⚠️ Trình duyệt không cho phép truy cập clipboard. Hãy dán thủ công.");
        console.error("Lỗi dán clipboard:", err);
    }
}

function filterEmails() {
    const input = document.getElementById("inputEmails").value.trim();
    const lines = input.split(/\r?\n/);
    const emails = [];

    lines.forEach((line, index) => {
        const cleaned = line.replace(/\|/g, " ").trim();
        const parts = cleaned.split(/\s+/);
        if (parts.length >= 1 && validateEmail(parts[0])) {
            emails.push({ stt: index + 1, email: parts[0] });
        }
    });

    displayEmails(emails);
}

function displayEmails(emails) {
    let html = `<table>
                  <tr>
                    <th>STT</th>
                    <th>Sao chép</th>
                    <th>Email</th>
                  </tr>`;

    emails.forEach(item => {
        html += `<tr>
                   <td>${item.stt}</td>
                   <td><button class="copy-btn" onclick="copyEmail('${item.email}', ${item.stt})">📋</button></td>
                   <td>${item.email}</td>
                 </tr>`;
    });

    html += `</table>`;
    document.getElementById("outputTable").innerHTML = html;
}

function copyEmail(email, index) {
    navigator.clipboard.writeText(email).then(() => {
        showToast(`📧 Đã sao chép email ${index}`);
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}
