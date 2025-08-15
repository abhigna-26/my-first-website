window.onload = function() {
    alert("Welcome to the Skills Test!");
    loadSubmissions();
};

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Add student
document.getElementById("addStudent").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value.trim();
    const age = document.getElementById("ageInput").value.trim();
    const skill = document.getElementById("skillInput").value.trim();

    if (name && age && skill) {
        const table = document.getElementById("studentTable");
        const row = table.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = age;
        row.insertCell(2).textContent = skill;

        document.getElementById("studentCount").textContent = table.rows.length;
        
        document.getElementById("nameInput").value = "";
        document.getElementById("ageInput").value = "";
        document.getElementById("skillInput").value = "";
    }
});

// Contact form validation + localStorage
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Form submitted successfully!";
    formMessage.style.color = "green";

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push({ name, email, message });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    loadSubmissions();
    document.getElementById("contactForm").reset();
});

// Load submissions from localStorage
function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    const submissionsDiv = document.getElementById("submissions");
    submissionsDiv.innerHTML = "";
    submissions.forEach(sub => {
        const p = document.createElement("p");
        p.textContent = `${sub.name} (${sub.email}): ${sub.message}`;
        submissionsDiv.appendChild(p);
    });
}
