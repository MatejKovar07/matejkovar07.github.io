const jokeBox = document.getElementById("jokeBox");
const btn = document.getElementById("getJoke");

// volitelné prvky (můžou být null)
const languageSelect = document.getElementById("language");
const typeSelect = document.getElementById("type");
const safeModeCheckbox = document.getElementById("safeMode");

const categoryCheckboxes = document.querySelectorAll(".cat");
const flagCheckboxes = document.querySelectorAll(".flag");

let lastJoke = "";

function buildURL() {
  // kategorie
  const selectedCategories = [...categoryCheckboxes]
    .filter(c => c.checked)
    .map(c => c.value);

  const category =
    selectedCategories.length > 0
      ? selectedCategories.join(",")
      : "Any";

  let url = `https://v2.jokeapi.dev/joke/${category}`;

  // jazyk (pokud existuje)
  if (languageSelect) {
    url += `?lang=${languageSelect.value}`;
  } else {
    url += "?lang=en";
  }

  // typ
  if (typeSelect && typeSelect.value) {
    url += `&type=${typeSelect.value}`;
  }

  // blacklist flags
  const flags = [...flagCheckboxes]
    .filter(f => f.checked)
    .map(f => f.value);

  if (flags.length > 0) {
    url += `&blacklistFlags=${flags.join(",")}`;
  }

  // safe mode
  if (safeModeCheckbox && safeModeCheckbox.checked) {
    url += "&safe-mode";
  }

  return url;
}

async function getJoke() {
  jokeBox.textContent = "Loading...";

  try {
    const url = buildURL();
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      jokeBox.textContent = "No joke found 😕";
      return;
    }

    const currentJoke =
      data.type === "single"
        ? data.joke
        : `${data.setup} ${data.delivery}`;

    if (currentJoke === lastJoke) {
      getJoke();
      return;
    }

    lastJoke = currentJoke;

    if (data.type === "single") {
      jokeBox.textContent = data.joke;
    } else {
      jokeBox.innerHTML = `
        <p>${data.setup}</p>
        <strong>${data.delivery}</strong>
      `;
    }

  } catch (err) {
    jokeBox.textContent = "Error loading joke 😬";
    console.error(err);
  }
}

btn.addEventListener("click", getJoke);
