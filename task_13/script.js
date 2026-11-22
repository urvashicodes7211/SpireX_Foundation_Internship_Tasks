function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}
const departments = [
    {
        name: "Computer Engineering",
        icon: "💻",
        description: "Learn programming and software development."
    },
    {
        name: "Information Technology",
        icon: "🌐",
        description: "Explore networking and modern technologies."
    },
    {
        name: "Mechanical Engineering",
        icon: "⚙️",
        description: "Learn machines and mechanical systems."
    },
    {
        name: "Civil Engineering",
        icon: "🏗️",
        description: "Build and design infrastructure."
    },
    {
        name: "Electrical Engineering",
        icon: "⚡",
        description: "Explore electrical systems and circuits."
    },
    {
        name: "Management",
        icon: "📊",
        description: "Develop business and management skills."
    }
];
const courses = [
    {
        name: "B.Tech",
        duration: "4 Years",
        description: "Bachelor of Technology"
    },
    {
        name: "M.Tech",
        duration: "2 Years",
        description: "Master of Technology"
    },
    {
        name: "BCA",
        duration: "3 Years",
        description: "Bachelor of Computer Applications"
    },
    {
        name: "MCA",
        duration: "2 Years",
        description: "Master of Computer Applications"
    },
    {
        name: "MBA",
        duration: "2 Years",
        description: "Master of Business Administration"
    },
    {
        name: "Diploma",
        duration: "3 Years",
        description: "Diploma Engineering"
    }
];
const faculty = [
    {
        name: "Dr. Rahul Sharma",
        subject: "Computer Engineering",
        icon: "👨‍🏫"
    },
    {
        name: "Prof. Priya Patel",
        subject: "Information Technology",
        icon: "👩‍🏫"
    },
    {
        name: "Dr. Amit Shah",
        subject: "Mechanical Engineering",
        icon: "👨‍🏫"
    },
    {
        name: "Prof. Neha Desai",
        subject: "Civil Engineering",
        icon: "👩‍🏫"
    }
];
const events = [
    {
        name: "Annual Function",
        date: "15 December 2026",
        description: "Celebrate talent and creativity."
    },
    {
        name: "Technical Fest",
        date: "20 December 2026",
        description: "Explore technology and innovation."
    },
    {
        name: "Sports Day",
        date: "10 January 2027",
        description: "Show your sports skills and teamwork."
    },
    {
        name: "Workshop",
        date: "25 January 2027",
        description: "Learn new skills from experts."
    }
];
const departmentList = document.getElementById("departmentList");

departmentList.innerHTML = departments.map(department => `
    <div class="card">
        <span class="emoji">${department.icon}</span>
        <h3>${department.name}</h3>
        <p>${department.description}</p>
    </div>
`).join("");
const courseList = document.getElementById("courseList");

courseList.innerHTML = courses.map(course => `
    <div class="card">
        <span class="emoji">📚</span>
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
    </div>
`).join("");
const facultyList = document.getElementById("facultyList");

facultyList.innerHTML = faculty.map(member => `
    <div class="card">
        <span class="emoji">${member.icon}</span>
        <h3>${member.name}</h3>
        <p>${member.subject}</p>
        <p>Faculty Member</p>
    </div>
`).join("");
const eventList = document.getElementById("eventList");

eventList.innerHTML = events.map(event => `
    <div class="card">
        <span class="emoji">🎉</span>
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.description}</p>
    </div>
`).join("");
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    document.getElementById("formMessage").textContent =
        `Thank you ${name}! Your message has been submitted successfully.`;

    contactForm.reset();
});
