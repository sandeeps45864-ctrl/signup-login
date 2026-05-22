alert("SCRIPT RUNNING");

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    alert("FORM WORKING");

});