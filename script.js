let hasPasted = false;

document.body.addEventListener('click', async () => {
  if (!hasPasted) {
    hasPasted = true;
    alert('Đã cấp quyền clipboard. Nhấn lần nữa để dán!');
    return;
  }

  try {
    const text = await navigator.clipboard.readText();
    const emails = extractEmails(text);

    const list = document.getElementById('email-list');
    list.innerHTML = '';

    emails.forEach((email, index) => {
      const div = document.createElement('div');
      div.className = 'email-item';
      div.textContent = `Mail ${index + 1}`;
      div.dataset.value = email;
      div.addEventListener('click', () => copyEmail(email, index + 1));
      list.appendChild(div);
    });

    if (emails.length === 0) {
      alert('Không tìm thấy mail!');
    }

  } catch (err) {
    alert('Không thể đọc clipboard!');
  }
});

function extractEmails(text) {
  const lines = text.split(/\n|<br>|,/);
  const emails = [];

  lines.forEach(line => {
    let parts = line.trim().split(/[\s|]+/); // ngăn cách bằng khoảng trắng hoặc dấu |
    if (parts[0] && parts[0].includes('@')) {
      emails.push(parts[0]);
    }
  });

  return emails;
}

function copyEmail(email, index) {
  navigator.clipboard.writeText(email).then(() => {
    const alertBox = document.getElementById('copied-alert');
    alertBox.textContent = `Đã sao chép Mail ${index}`;
    alertBox.style.display = 'block';
  });
}
