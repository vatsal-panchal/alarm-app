function toggleAlarm(checkbox, time) {
  document.querySelectorAll(".alarm input").forEach(inp => {
    if (inp !== checkbox) inp.checked = false;
  });

  let status = document.getElementById("status");

  if (checkbox.checked) {
    let now = new Date();
    let [hour, minute] = time.split(":");

    hour = parseInt(hour);
    minute = parseInt(minute);

    let alarmTime = new Date();
    alarmTime.setHours(hour, minute, 0, 0);

    if (alarmTime < now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    let diff = alarmTime - now;
    let hrs = Math.floor(diff / (1000 * 60 * 60));
    let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    status.innerText = `Alarm in ${hrs}h ${mins}m`;
  } else {
    status.innerText = "All alarms are off";
  }
}

function addAlarm() {
  let timeInput = document.getElementById("newAlarmTime");
  let timeValue = timeInput.value;

  if (!timeValue) {
    alert("Please select a time!");
    return;
  }

  let [hour, minute] = timeValue.split(":");
  let h = parseInt(hour);
  let ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  let displayTime = `${h}:${minute} ${ampm}`;

  let alarmList = document.getElementById("alarmList");

  let alarmDiv = document.createElement("div");
  alarmDiv.className = "alarm";
  alarmDiv.innerHTML = `
    <span>${displayTime}</span>
    <label class="switch">
      <input type="checkbox" onchange="toggleAlarm(this, '${hour}:${minute}')">
      <span class="slider"></span>
    </label>
  `;

  alarmList.appendChild(alarmDiv);
  timeInput.value = "";
}
