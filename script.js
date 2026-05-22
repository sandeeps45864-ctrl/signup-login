console.log("JS Loaded");

document.querySelector('#contactForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    console.log("Button Clicked");

    const name = document.querySelector('#fname').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    try {

        const response = await fetch("https://netlify-website-74pi.onrender.com/send", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                email,
                message
            })

        });

        const data = await response.text();

        console.log(data);

        alert(data);

    } catch (error) {

        console.log("FRONTEND ERROR:", error);

        alert("Error sending message");

    }

});



console.log("JS Loaded");

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    console.log("Form Submitted");

    const name = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch("https://netlify-website-74pi.onrender.com/send", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                email,
                message
            })

        });

        const data = await response.text();

        console.log("SERVER RESPONSE:", data);

        alert(data);

    } catch (error) {

        console.log("ERROR:", error);

        alert("Message Failed");

    }

});