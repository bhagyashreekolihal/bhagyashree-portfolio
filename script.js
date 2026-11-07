// ======================================
// LOAD PORTFOLIO DATA USING FETCH API
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    loadPortfolioData();

});


async function loadPortfolioData() {

    const loading = document.getElementById("loading");

    const portfolio = document.getElementById("portfolioContent");

    const errorMessage = document.getElementById("errorMessage");

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load JSON data");
        }

        const data = await response.json();

        // Display website
        portfolio.classList.remove("d-none");

        // Load all sections
        loadPersonalDetails(data.personal);

        loadAbout(data.about);

        loadSkills(data.skills);

        loadProjects(data.projects);

        loadEducation(data.education);

        loadCertifications(data.certifications);

        loadContact(data.personal);

        loadSocialLinks(data.social);

        loadFooter(data.personal);

        // Contact form
        setupContactForm();

        // Smooth navigation
        setupNavbar();

    }

    catch (error) {

        console.error("Portfolio Loading Error:", error);

        errorMessage.classList.remove("d-none");

    }

    finally {

        loading.style.display = "none";

    }

}


// ======================================
// PERSONAL DETAILS
// ======================================

function loadPersonalDetails(personal) {

    document.title = personal.name + " | Portfolio";

    document.getElementById("brandName").textContent =
        personal.name;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("studentIntro").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("resumeButton").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("footerText").textContent =
        personal.footerText;

    const details = document.getElementById("personalDetails");

    details.innerHTML = `
        <div class="detail-item">
            <strong>Email:</strong> ${escapeHTML(personal.email)}
        </div>

        <div class="detail-item">
            <strong>Phone:</strong> ${escapeHTML(personal.phone)}
        </div>

        <div class="detail-item">
            <strong>Location:</strong> ${escapeHTML(personal.location)}
        </div>
    `;

}


// ======================================
// ABOUT SECTION
// ======================================

function loadAbout(about) {

    document.getElementById("aboutTitle").textContent =
        about.title;

    document.getElementById("aboutDescription").textContent =
        about.description;

}


// ======================================
// SKILLS SECTION
// ======================================

function loadSkills(skills) {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const percentage = Math.min(
            100,
            Math.max(0, Number(skill.level) || 0)
        );

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="skill-card">

                <div class="skill-icon">
                    <i class="${escapeHTML(skill.icon)}"></i>
                </div>

                <h5>${escapeHTML(skill.name)}</h5>

                <div class="skill-progress">

                    <div class="skill-progress-bar"
                         style="width: ${percentage}%">
                    </div>

                </div>

                <span class="skill-percentage">
                    ${percentage}% Learning Progress
                </span>

            </div>

        `;

        container.appendChild(card);

    });

}


// ======================================
// PROJECTS SECTION
// ======================================

function loadProjects(projects) {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const technologies = project.technologies
            .map(tech =>
                `<span class="tech-badge">${escapeHTML(tech)}</span>`
            )
            .join("");

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="project-card">

                <div class="project-image-wrapper">

                    <img src="${escapeHTML(project.image)}"
                         alt="${escapeHTML(project.name)}"
                         loading="lazy">

                </div>

                <div class="project-info">

                    <h4>${escapeHTML(project.name)}</h4>

                    <p>${escapeHTML(project.description)}</p>

                    <div>
                        ${technologies}
                    </div>

                    <a href="${safeURL(project.link)}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="project-link">

                        View Project
                        <i class="bi bi-arrow-up-right"></i>

                    </a>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

}


// ======================================
// EDUCATION SECTION
// ======================================

function loadEducation(education) {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const card = document.createElement("div");

        card.className = "education-card";

        card.innerHTML = `

            <h4>${escapeHTML(item.course)}</h4>

            <p>
                <strong>College:</strong>
                ${escapeHTML(item.college)}
            </p>

            <p>
                <strong>Semester:</strong>
                ${escapeHTML(item.semester)}
            </p>

            <p>
                <strong>Academic Year:</strong>
                ${escapeHTML(item.year)}
            </p>

            <p>
                <strong>Status:</strong>
                ${escapeHTML(item.status)}
            </p>

        `;

        container.appendChild(card);

    });

}


// ======================================
// CERTIFICATIONS SECTION
// ======================================

function loadCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="certificate-card">

                <i class="bi bi-award-fill"></i>

                <h5>${escapeHTML(certificate.name)}</h5>

                <p>${escapeHTML(certificate.organization)}</p>

                <small class="text-secondary">
                    ${escapeHTML(certificate.year)}
                </small>

            </div>

        `;

        container.appendChild(card);

    });

}


// ======================================
// SOCIAL MEDIA LINKS
// ======================================

function loadSocialLinks(social) {

    const heroSocials =
        document.getElementById("heroSocials");

    const footerSocials =
        document.getElementById("footerSocials");

    let html = "";

    social.forEach(item => {

        html += `

            <a href="${safeURL(item.link)}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${escapeHTML(item.name)}">

                <i class="${escapeHTML(item.icon)}"></i>

            </a>

        `;

    });

    heroSocials.innerHTML = html;

    footerSocials.innerHTML = html;

}


// ======================================
// CONTACT DETAILS
// ======================================

function loadContact(personal) {

    const container =
        document.getElementById("contactDetails");

    container.innerHTML = `

        <div class="contact-item">

            <i class="bi bi-envelope"></i>

            <strong>Email Address</strong>

            <p>${escapeHTML(personal.email)}</p>

        </div>

        <div class="contact-item">

            <i class="bi bi-telephone"></i>

            <strong>Phone Number</strong>

            <p>${escapeHTML(personal.phone)}</p>

        </div>

        <div class="contact-item">

            <i class="bi bi-geo-alt"></i>

            <strong>Location</strong>

            <p>${escapeHTML(personal.location)}</p>

        </div>

    `;

}


// ======================================
// FOOTER
// ======================================

function loadFooter(personal) {

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

}


// ======================================
// CONTACT FORM VALIDATION
// ======================================

function setupContactForm() {

    const form = document.getElementById("contactForm");

    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Please fill in all fields.",
                "danger"
            );

            return;

        }

        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "danger"
            );

            return;

        }

        if (message.length < 10) {

            showFormMessage(
                "Message must contain at least 10 characters.",
                "danger"
            );

            return;

        }

        showFormMessage(
            "Your form is valid! Connect an email service or backend to send your message.",
            "success"
        );

        form.reset();

    });

}


function showFormMessage(message, type) {

    const formMessage =
        document.getElementById("formMessage");

    formMessage.className = `alert alert-${type} mt-3`;

    formMessage.textContent = message;

}


// ======================================
// NAVBAR
// ======================================

function setupNavbar() {

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(item =>
                item.classList.remove("active")
            );

            this.classList.add("active");

            // Close mobile navbar after selection
            const navbar =
                document.getElementById("navbarMenu");

            const collapse =
                bootstrap.Collapse.getInstance(navbar);

            if (collapse) {
                collapse.hide();
            }

        });

    });

}


// ======================================
// BASIC HTML AND URL SAFETY
// ======================================

function escapeHTML(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]
    );

}


function safeURL(value) {

    try {

        const url = new URL(value, window.location.href);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:"
        ) {
            return url.href;
        }

    } catch (error) {

        console.error("Invalid URL:", value);

    }

    return "#";

}