const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        category: "Frontend",
        location: "Remote",
        salary: "₹25,000/month",
        type: "Full Time",
        description: "Build responsive and user-friendly websites using HTML, CSS, JavaScript and React."
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Microsoft",
        category: "Backend",
        location: "Ahmedabad",
        salary: "₹30,000/month",
        type: "Full Time",
        description: "Develop server-side applications, APIs and database systems."
    },
    {
        id: 3,
        title: "Python Developer",
        company: "Infosys",
        category: "Python",
        location: "Remote",
        salary: "₹20,000/month",
        type: "Internship",
        description: "Work on Python programming, automation and application development."
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Adobe",
        category: "UI/UX",
        location: "Rajkot",
        salary: "₹18,000/month",
        type: "Internship",
        description: "Create attractive user interfaces and improve user experiences."
    },
    {
        id: 5,
        title: "React Developer",
        company: "Amazon",
        category: "Frontend",
        location: "Ahmedabad",
        salary: "₹28,000/month",
        type: "Full Time",
        description: "Develop modern web applications using React.js."
    },
    {
        id: 6,
        title: "Python Intern",
        company: "TCS",
        category: "Python",
        location: "Rajkot",
        salary: "₹12,000/month",
        type: "Internship",
        description: "Learn and implement Python programming in real-world projects."
    }
];

const container = document.getElementById("jobContainer");

function displayJobs(data){
    container.innerHTML = "";

    if (data.length === 0){
        container.innerHTML =
            `<h3 class="no-jobs">No jobs found!</h3>`;
        return;
    }

    data.forEach(job =>{
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p>🏢 ${job.company}</p>
                <p>📂 ${job.category}</p>
                <p>📍 ${job.location}</p>
                <p>💼 ${job.type}</p>
                <p class="salary">💰 ${job.salary}</p>
                <button class="view-btn"
                    onclick="viewJob(${job.id})">
                    View Details
                </button>
            </div>
        `;
    });
}

function filterJobs(){
    const search = document.getElementById("searchInput").value.toLowerCase();

    const category = document.getElementById("categoryFilter").value;
    const location = document.getElementById("locationFilter").value;

    const filtered = jobs.filter(job =>{
        return (
            (job.title.toLowerCase().includes(search) ||
             job.company.toLowerCase().includes(search)) &&
            (category === "" || job.category === category) &&
            (location === "" || job.location === location)
        );
    });

    displayJobs(filtered);
}

function viewJob(id){
    const job = jobs.find(j => j.id === id);

    document.getElementById("jobDetails").innerHTML = `
        <h2>${job.title}</h2>
        <br>
        <p><b>Company:</b> ${job.company}</p>
        <p><b>Category:</b> ${job.category}</p>
        <p><b>Location:</b> ${job.location}</p>
        <p><b>Job Type:</b> ${job.type}</p>
        <p><b>Salary:</b> ${job.salary}</p>
        <br>
        <p>${job.description}</p>
        <br>
        <button onclick="applyJob('${job.title}')">
            Apply Now
        </button>
    `;

    document.getElementById("jobModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("jobModal").style.display = "none";
}

function applyJob(title){
    alert("Thank you for your interest in " + title + "!");
    closeModal();
}

displayJobs(jobs);
