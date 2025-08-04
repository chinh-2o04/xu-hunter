function filterEmails(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const found = text.match(emailRegex);
  return found ? [...new Set(found)] : [];
}

function renderMails(emails) {
  const mailList = document.getElementById("mailList");
  mailList.innerHTML = "";

  if (emails.length === 0) {
    mailList.innerHTML = "<p>Không tìm thấy email nào.</p>";
    return;
  }

  emails.forEach((email, index) => {
    const item = document.createElement("div");
    item.className = "mail-item";
    item.textContent = `Mail ${index + 1}: ${email}`;
    item.onclick = () => {
      navigator.clipboard.writeText(email);
      alert(`Đã sao chép: ${email}`);
    };
    mailList.appendChild(item);
  });
}

function autoPaste() {
  navigator.clipboard.readText()
    .then(text => {
      const emails = filterEmails(text);
      renderMails(emails);
      document.getElementById("autoPasteBox").style.display = "none";
    })
    .catch(() => {
      alert("Không thể truy cập clipboard. Hãy thử dán thủ công.");
    });
}
