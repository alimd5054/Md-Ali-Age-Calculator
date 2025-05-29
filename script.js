// Set today's date as default for current date input
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  document.getElementById("currentdate").value = formattedDate;

  // Set initial value for current date display
  document.getElementById(
    "currentDateDisplay"
  ).innerHTML = `📅 ${today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  // Prevent form submission (which might cause page refresh)
  document
    .getElementById("calculatorForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      calculateDuration();
    });
});

function calculateDuration() {
  const birthInput = new Date(document.getElementById("birthdate").value);
  const currentInput = new Date(document.getElementById("currentdate").value);
  const output = document.getElementById("output");
  const resultSummary = document.getElementById("resultSummary");
  const birthDateDisplay = document.getElementById("birthDateDisplay");
  const currentDateDisplay = document.getElementById("currentDateDisplay");

  output.innerHTML = "";
  resultSummary.innerHTML = "";

  if (birthInput > currentInput) {
    output.innerHTML = `
          <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <div>
              <strong>Invalid Date Range</strong>
              <p>Birthdate cannot be after the current date.</p>
            </div>
          </div>
        `;
    return;
  }

  // Calculate years
  let years = currentInput.getFullYear() - birthInput.getFullYear();
  if (
    currentInput.getMonth() < birthInput.getMonth() ||
    (currentInput.getMonth() === birthInput.getMonth() &&
      currentInput.getDate() < birthInput.getDate())
  ) {
    years--;
  }

  const diffMs = currentInput - birthInput;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Calculate months correctly
  let temp = new Date(birthInput);
  let months = 0;

  // Adjust the base date for month calculations
  while (true) {
    const nextMonthDate = new Date(temp);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    if (nextMonthDate <= currentInput) {
      months++;
      temp = nextMonthDate;
    } else {
      break;
    }
  }

  // Calculate remaining days
  const daysRemaining = Math.floor(
    (currentInput - temp) / (1000 * 60 * 60 * 24)
  );
  const weeks = Math.floor(totalDays / 7);

  // Calculate months and days for display
  const displayMonths = months % 12;

  // Display result summary
  resultSummary.innerHTML = `
        <div class="result-summary">
          <i class="fas fa-birthday-cake"></i>
          <div class="result-text">
            <h3>${years} years, ${displayMonths} months, and ${daysRemaining} days old</h3>
            <p>✨ That's ${totalDays.toLocaleString()} days of life experience!</p>
          </div>
        </div>
      `;

  // Display detailed results
  output.innerHTML = `
        <div class="time-card">
          <h3>${years}</h3>
          <p>🗓️ Years</p>
        </div>
        <div class="time-card">
          <h3>${months}</h3>
          <p>🗓️ Months</p>
        </div>
        <div class="time-card">
          <h3>${weeks}</h3>
          <p>📆 Weeks</p>
        </div>
        <div class="time-card">
          <h3>${totalDays.toLocaleString()}</h3>
          <p>📆 Days</p>
        </div>
        <div class="time-card">
          <h3>${totalHours.toLocaleString()}</h3>
          <p>🕘 Hours</p>
        </div>
        <div class="time-card">
          <h3>${totalMinutes.toLocaleString()}</h3>
          <p>⏱️ Minutes</p>
        </div>
      `;

  // Update calendar displays with Tailwind styling
  birthDateDisplay.innerHTML = `👶🏻 ${birthInput.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  currentDateDisplay.innerHTML = `📅 ${currentInput.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )}`;
}
