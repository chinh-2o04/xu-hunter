function pasteAndFilter() {
  navigator.clipboard.readText().then(text => {
    document.getElementById('inputArea').value = text;
    renderMails(filterEmails(text));
  }).catch(err => {
    alert("Không thể dán từ clipboard: " + err);
  });
}

function filterEmails(text) {
  const lines = text.split('\n').map(line => line.trim());
  const emails = [];

  for (const line of lines) {
    const match = line.match(/^([^\s|]+@[^\s|]+)(?:[\s|]+.*)?$/);
    if (match) {
      emails.push(match[1]);
    }
  }
  return emails;
}

function renderMails(emails) {
  const grid = document.getElementById('mailGrid');
  grid.innerHTML = '';

  emails.forEach((email, index) => {
    const item = document.createElement('div');
    item.className = 'mail-item';
    item.onclick = () => copyEmail(email, index + 1);

    const icon = document.createElement('div');
    icon.className = 'mail-icon';
    icon.innerHTML = '✉️';

    const label = document.createElement('div');
    label.className = 'mail-label';
    label.textContent = `Mail ${index + 1}`;

    item.appendChild(icon);
    item.appendChild(label);
    grid.appendChild(item);
  });
}

function copyEmail(email, index) {
  navigator.clipboard.writeText(email).then(() => {
    showAlert(`Đã sao chép mail ${index}`);
  });
}

function showAlert(message) {
  const alertBox = document.getElementById('copyAlert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';
}
