let kpiGoal = 250000;
let kpiLeft = localStorage.getItem("kpiLeft") || 250000;
let totalBonus = localStorage.getItem("totalBonus") || 0;

// Khởi tạo UI ban đầu
document.getElementById("kpiLeft").innerText = kpiLeft;
document.getElementById("totalBonus").innerText = totalBonus;

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
  totalBonus = parseInt(totalBonus) + bonus;

  // Cập nhật bảng
  let row = `<tr><td>${day}</td><td>${gom}</td><td>${done}</td><td>${bonus}</td></tr>`;
  document.querySelector("#workTable tbody").innerHTML += row;

  // Cập nhật KPI & thưởng
  document.getElementById("kpiLeft").innerText = kpiLeft;
  document.getElementById("totalBonus").innerText = totalBonus;

  // Lưu vào localStorage
  localStorage.setItem("kpiLeft", kpiLeft);
  localStorage.setItem("totalBonus", totalBonus);

  // Reset form
  document.getElementById('xuGomInput').value = '';
  document.getElementById('xuDoneInput').value = '';
}
