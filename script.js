function pasteAndFilter() {
    navigator.clipboard.readText().then((text) => {
        document.getElementById("inputEmails").value = text;
        filterEmails(); // Gọi luôn lọc sau khi dán
    });
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
        const toast = document.getElementById("toast");
        toast.innerText = `📧 Đã sao chép email ${index}`;
        toast.classList.remove("hidden");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
