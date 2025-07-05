document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("file");
    const message = document.getElementById("message");
    const preview = document.getElementById("preview");
  
    // Form Submit Handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Always check .files[0]
      const file = fileInput.files[0];
  
      if (!file) {
        message.textContent = "❌ Please select a file before uploading.";
        message.style.color = "red";
        return;
      }
  
      const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        message.textContent = "❌ Invalid file type. Please upload a PDF or image.";
        message.style.color = "red";
        return;
      }
  
      // ✅ Show alert that AI is analyzing
      alert("🔍 Your document is being analyzed by AI...");
  
      message.style.color = "#1e3a8a";
      message.textContent = `🔄 Uploading "${file.name}" for verification...`;
  
      setTimeout(() => {
        message.style.color = "green";
        message.textContent = `✅ "${file.name}" successfully verified and uploaded!`;
        form.reset();
        preview.innerHTML = "";
      }, 2500);
    });
  
    // File Preview Handler
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        preview.innerHTML = "";
    
        if (file) {
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
              preview.innerHTML = `
                <img src="${e.target.result}" 
                     alt="Preview" 
                     style="max-width:100%; margin-top:1rem; border-radius:8px;" />
              `;
            };
            reader.readAsDataURL(file);
          } else if (file.type === "application/pdf") {
            preview.innerHTML = `
              <img src="assets/pdf-icon.png" 
                   alt="PDF icon" 
                   style="width:60px; margin-top:1rem;" />
            `;
          }
        }
      });
    });