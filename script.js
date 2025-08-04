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
    item.onclick = (e) => {
      e.stopPropagation(); // để không gọi lại handlePaste khi nhấn mail
      navigator.clipboard.writeText(email);
      alert(`Đã sao chép: ${email}`);
    };
    mailList.appendChild(item);
  });
}

let hasPasted = false;

function handlePaste() {
  if (hasPasted) return; // chỉ dán 1 lần
  hasPasted = true;

  navigator.clipboard.readText()
    .then(text => {
      const emails = filterEmails(text);
      renderMails(emails);
    })
    .catch(() => {
      alert("Không thể dán nội dung. Hãy đảm bảo bạn đã sao chép nội dung trước.");
    });
}
