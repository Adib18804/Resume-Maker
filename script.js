const form = document.getElementById("resume-form");
const resumePreview = document.getElementById("resume-preview");
const downloadBtn = document.getElementById("download-btn");

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();
    const github = document.getElementById("github").value.trim();
    const portfolio = document.getElementById("portfolio").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const education = document.getElementById("education").value.trim();
    const projects = document.getElementById("projects").value.trim();
    const languages = document.getElementById("languages").value.trim();
    const certifications = document.getElementById("certifications").value.trim();
    const achievements = document.getElementById("achievements").value.trim();
    const hobbies = document.getElementById("hobbies").value.trim();

    if (!name || !email || !phone || !address || !experience || !skills || !education) {
        alert("Please fill out all required fields.");
        return;
    }

    const resumeHTML = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ""}
        ${github ? `<p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>` : ""}
        ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>` : ""}
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Projects:</strong> ${projects}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Certifications:</strong> ${certifications}</p>
        <p><strong>Achievements:</strong> ${achievements}</p>
        <p><strong>Hobbies:</strong> ${hobbies}</p>
    `;

    resumePreview.innerHTML = resumeHTML;
    downloadBtn.style.display = "block";
}

function downloadResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Use html2canvas to capture the resume preview as an image
    html2canvas(resumePreview).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 size in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        doc.save("resume.pdf");
    });
}

form.addEventListener("submit", handleFormSubmit);
downloadBtn.addEventListener("click", downloadResume);