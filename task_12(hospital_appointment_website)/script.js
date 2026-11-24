const appointmentForm = document.getElementById("appointmentForm");
const confirmation = document.getElementById("confirmation");
const dateInput = document.getElementById("date");

const today = new Date().toISOString().split("T")[0];

dateInput.min = today;

appointmentForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const message = document.getElementById("message").value.trim();


    if (!name || !email || !phone || !doctor || !date || !time){
        alert("Please fill all required fields!");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)){
        alert("Please enter a valid 10 digit phone number!");
        return;
    }

    if (date < today){
        alert("Please select a valid future date!");
        return;
    }

    confirmation.innerHTML = `
        <h3>Appointment Booked Successfully! 🎉</h3>
        <p><strong>Patient Name:</strong> ${escapeHTML(name)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
        <p><strong>Doctor:</strong> ${escapeHTML(doctor)}</p>
        <p><strong>Date:</strong> ${escapeHTML(date)}</p>
        <p><strong>Time:</strong> ${escapeHTML(time)}</p>
        <p><strong>Message:</strong> ${escapeHTML(message || "No message")}</p>
    `;
    appointmentForm.reset();

    dateInput.min = today;

    confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

function escapeHTML(value){
    return value.replace(/[&<>"']/g, function(char){
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}
