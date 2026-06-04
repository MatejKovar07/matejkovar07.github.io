console.log("JS loaded")
const jokeBox = document.getElementById("jokeBox");
const btn = document.getElementById("getJoke");
const category = document.getElementById("category");
const language = document.getElementById("language");

async function getJoke() {
  jokeBox.textContent = "Loading...";

  try {
    const url = `https://v2.jokeapi.dev/joke/${category.value}?lang=${language.value}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      jokeBox.textContent = "Something went wrong";
      return;
    }

    if (data.type === "single") {
      jokeBox.textContent = data.joke;
    } else {
      jokeBox.innerHTML = `
        <p>${data.setup}</p>
        <strong>${data.delivery}</strong>
      `;
    }
  } catch (err) {
    jokeBox.textContent = "Failed to load joke";
  }
}

btn.addEventListener("click", getJoke);
