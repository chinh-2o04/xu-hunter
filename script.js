let kpiGoal = 250000;
let kpiLeft = parseInt(localStorage.getItem("kpiLeft")) || 250000;
let totalBonus = parseInt(localStorage.getItem("totalBonus")) || 0;
let workEntries = JSON.parse(localStorage.getItem("workEntries")) || [];

// Tự động set ngày hôm nay khi trang load
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dayInput').value = today;

  document.getElementById("kpiLeft").innerText = kpiLeft;
  document.getElementById("totalBonus").innerText = totalBonus;

  for (let entry of workEntries) {
    addRowToTable(entry);
  }
});

function addEntry() {
  let day = document.getElementById('dayInput').value;
  let gom = parseInt(document.getElementById('xuGomInput').value);
  let done = parseInt(document.getElementById('xuDoneInput').value);

  if (!day || isNaN(gom) || isNaN(done)) {
    alert("Vui lòng nhập đầy đủ thông tin ngày, xu gom và xu done.");
    return;
  }

  let bonus = 0;
  let total = gom + done;
  if (total > 11000) bonus = 1000;
  else if (total > 8000) bonus = 500;

  kpiLeft -= gom;
  totalBonus += bonus;

  let entry = { day, gom, done, bonus };
  workEntries.push(entry);

  addRowToTable(entry);
  document.getElementById("kpiLeft").innerText = kpiLeft;
  document.getElementById("totalBonus").innerText = totalBonus;

  localStorage.setItem("kpiLeft", kpiLeft);
  localStorage.setItem("totalBonus", totalBonus);
  localStorage.setItem("workEntries", JSON.stringify(workEntries));

  document.getElementById('xuGomInput').value = '';
  document.getElementById('xuDoneInput').value = '';
}

function addRowToTable(entry) {
  let row = `<tr><td>${entry.day}</td><td>${entry.gom}</td><td>${entry.done}</td><td>${entry.bonus}</td></tr>`;
  document.querySelector("#workTable tbody").innerHTML += row;
}

function resetData() {
  if (!confirm("Bạn chắc chắn muốn xóa toàn bộ dữ liệu không? Hành động này không thể hoàn tác.")) {
    return;
  }

  kpiLeft = kpiGoal;
  totalBonus = 0;
  workEntries = [];

  localStorage.setItem("kpiLeft", kpiLeft);
  localStorage.setItem("totalBonus", totalBonus);
  localStorage.setItem("workEntries", JSON.stringify(workEntries));

  document.getElementById("kpiLeft").innerText = kpiLeft;
  document.getElementById("totalBonus").innerText = totalBonus;
  document.querySelector("#workTable tbody").innerHTML = "";

  alert("Dữ liệu đã được xóa!");
}
