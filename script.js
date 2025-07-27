const input = document.getElementById("input");
const emailList = document.getElementById("emailList");
const copyAlert = document.getElementById("copyAlert");

input.addEventListener("paste", function () {
  setTimeout(() => {
    const text = input.value;
    const emails = extractEmails(text);
    renderEmails(emails);
  }, 100);
});

function extractEmails(text) {
  const lines = text.split(/[\n\r]+/);
  const emails = [];

  for (const line of lines) {
    const emailMatch = line.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      emails.push(emailMatch[1]);
    }
  }

  return [...new Set(emails)]; // loại bỏ trùng lặp
}

function renderEmails(emails) {
  emailList.innerHTML = "";
  emails.forEach((email, index) => {
    const item = document.createElement("div");
    item.className = "email-item";

    const span = document.createElement("span");
    span.textContent = email;

    const button = document.createElement("button");
    button.className = "copy-btn";
    button.textContent = "Sao chép";
    button.onclick = () => {
      navigator.clipboard.writeText(email);
      showCopyAlert(`Đã sao chép mail ${index + 1}`);
    };

    item.appendChild(span);
    item.appendChild(button);
    emailList.appendChild(item);
  });
}

function showCopyAlert(message) {
  copyAlert.textContent = message;
  copyAlert.style.display = "block";
}

