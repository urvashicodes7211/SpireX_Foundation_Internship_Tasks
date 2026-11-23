
const internships = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        category: "Web Development",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹8,000/month"
    },
    {
        id: 2,
        title: "Python Developer",
        company: "CodeCraft",
        category: "Python",
        location: "Work From Home",
        duration: "3 Months",
        stipend: "₹10,000/month"
    },
    {
        id: 3,
        title: "AI/ML Intern",
        company: "Future AI",
        category: "AI/ML",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹12,000/month"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Creative Studio",
        category: "Design",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹7,000/month"
    },
    {
        id: 5,
        title: "React Developer",
        company: "Web Innovators",
        category: "Web Development",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹9,000/month"
    },
    {
        id: 6,
        title: "Python AI Intern",
        company: "Smart Technologies",
        category: "Python",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹11,000/month"
    }
];

let applications = JSON.parse(
    localStorage.getItem("internHubApplications")
) || [];

const container = document.getElementById("internshipContainer");
const applicationList = document.getElementById("applicationList");

function displayInternships(data) {
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No internships found.</p>";
        return;
    }

    data.forEach(job => {
        const applied = applications.some(
            app => app.id === job.id
        );

        container.innerHTML += `
            <div class="card">
                <span class="category">${job.category}</span>
                <h3>${job.title}</h3>
                <p><b>Company:</b> ${job.company}</p>
                <p><b>Location:</b> ${job.location}</p>
                <p><b>Duration:</b> ${job.duration}</p>
                <p><b>Stipend:</b> ${job.stipend}</p>

                <button class="apply-btn"
                    onclick="applyInternship(${job.id})"
                    ${applied ? "disabled" : ""}>
                    ${applied ? "Already Applied" : "Apply Now"}
                </button>
            </div>
        `;
    });
}

function applyInternship(id) {
    const job = internships.find(job => job.id === id);

    if (applications.some(app => app.id === id)) {
        alert("You have already applied!");
        return;
    }

    applications.push({
        ...job,
        status: "Pending"
    });

    localStorage.setItem(
        "internHubApplications", JSON.stringify(applications)
    );

    alert("Application submitted successfully!");

    updateDashboard();
    displayInternships(filteredInternships());
    displayApplications();
}

function displayApplications() {
    applicationList.innerHTML = "";

    if (applications.length === 0) {
        applicationList.innerHTML =
            '<p class="empty">No applications yet.</p>';
        return;
    }

    applications.forEach(app => {
        applicationList.innerHTML += `
            <div class="application-item">
                <div>
                    <h3>${app.title}</h3>
                    <p>${app.company}</p>
                </div>

                <span class="status">${app.status}</span>
            </div>
        `;
    });
}

function updateDashboard() {
    document.getElementById("totalJobs").innerText =
        internships.length;

    document.getElementById("totalApplied").innerText =
        applications.length;

    document.getElementById("totalPending").innerText =
        applications.filter(
            app => app.status === "Pending"
        ).length;
}

function filteredInternships() {
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("categoryFilter")
        .value;

    return internships.filter(job => {
        const matchSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search);

        const matchCategory =
            category === "All" || job.category === category;

        return matchSearch && matchCategory;
    });
}

document.getElementById("searchInput").addEventListener(
    "input", () => {
        displayInternships(filteredInternships());
    }
);

document.getElementById("categoryFilter").addEventListener(
    "change", () => {
        displayInternships(filteredInternships());
    }
);

// Initial Display
displayInternships(internships);
displayApplications();
updateDashboard();
