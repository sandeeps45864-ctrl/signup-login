document.querySelector('.btn-submit').addEventListener('click', async (e) => {

  e.preventDefault();

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
        message,
      }),
    });

    const data = await response.text();

    alert(data);

  } catch (error) {
    console.log(error);
    alert("Error sending message");
  }

});