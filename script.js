document.querySelector('.signup-btn').addEventListener('click', async (e) => {

    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    console.log("Button Clicked");

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