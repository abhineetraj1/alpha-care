const dropArea = document.getElementById("dv");
const fileInput = document.querySelector("#lb input");

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("dragover");

  const files = event.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  let totalFileSize = 0;
  const validFiles = [];
  for (const file of files) {
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    totalFileSize += file.size;
    if (totalFileSize > 25 * 1024 * 1024) { // 25 MB limit
      alert("Total file size exceeds 25MB.");
      return;
    }
    validFiles.push(file);
  }
  // Assuming a form with ID "myForm" exists for submission
  const formData = new FormData(document.getElementById("myForm"));
  for (const file of validFiles) {
    formData.append("files", file);
  }
  fetch("/sub", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error during upload:", error);
    });
}
