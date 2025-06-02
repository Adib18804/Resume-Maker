document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");
    const resumePreview = document.getElementById("resume-preview");
    const downloadBtn = document.getElementById("download-btn");

    if (!form || !resumePreview || !downloadBtn) {
        console.error("Required elements not found:", { form, resumePreview, downloadBtn });
        return;
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const address = document.getElementById("address")?.value.trim();
        const linkedin = document.getElementById("linkedin")?.value.trim();
        const github = document.getElementById("github")?.value.trim();
        const portfolio = document.getElementById("portfolio")?.value.trim();
        const experience = document.getElementById("experience")?.value.trim();
        const skills = document.getElementById("skills")?.value.trim();
        const education = document.getElementById("education")?.value.trim();
        const projects = document.getElementById("projects")?.value.trim();
        const languages = document.getElementById("languages")?.value.trim();
        const certifications = document.getElementById("certifications")?.value.trim();
        const achievements = document.getElementById("achievements")?.value.trim();
        const hobbies = document.getElementById("hobbies")?.value.trim();

        if (!name || !email || !phone || !address || !experience || !skills || !education) {
            console.log("Missing required fields:", { name, email, phone, address, experience, skills, education });
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
            ${projects ? `<p><strong>Projects:</strong> ${projects}</p>` : ""}
            ${languages ? `<p><strong>Languages:</strong> ${languages}</p>` : ""}
            ${certifications ? `<p><strong>Certifications:</strong> ${certifications}</p>` : ""}
            ${achievements ? `<p><strong>Achievements:</strong> ${achievements}</p>` : ""}
            ${hobbies ? `<p><strong>Hobbies:</strong> ${hobbies}</p>` : ""}
        `;

        resumePreview.innerHTML = resumeHTML;
        downloadBtn.style.display = "block";
        console.log("Resume preview updated");
    }

    function downloadResume() {
        if (!window.jspdf || !window.html2canvas) {
            console.error("Required libraries (jsPDF or html2canvas) not loaded");
            alert("PDF generation libraries are missing.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        html2canvas(resumePreview, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            doc.save("resume.pdf");
            console.log("PDF generated successfully");
        }).catch((error) => {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Check the console for details.");
        });
    }

    form.addEventListener("submit", handleFormSubmit);
    downloadBtn.addEventListener("click", downloadResume);
});
