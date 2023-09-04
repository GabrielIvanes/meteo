const apiKey = "apiKey";

// Auto-completion with google maps API
document.getElementById("citieList").addEventListener("input", function () {
  let searchBox = new google.maps.places.Autocomplete(
    document.querySelector("#citieList")
  );
  let local = searchBox.getPlace();
});

const error404 = document.querySelector(".error-404");
const recherche = document.querySelector(".search-box button");

// When the seach button is cliked
recherche.addEventListener("click", function () {
  //Recover the value enter in the input
  const localisation = document.querySelector(".search-box input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localisation}&units=metric&appid=${apiKey}&lang=fr`
  )
    .then((reponse) => reponse.json())
    .then((rep) => {
      // If error cod is 404, display error404
      if (rep.cod === "404") {
        error404.style.display = "flex";
        error404.style.flexDirection = "column";
        error404.style.alignItems = "center";
        document.querySelector(".box-description").style.display = "none";
        document.querySelector(".temperature").style.display = "none";
        document.querySelector(".lever-coucher").style.display = "none";
        document.querySelector(".box-image").style.display = "none";
        document.querySelector(".details").style.display = "none";
        document.querySelector(".nom-localisation").style.display = "none";
        document.querySelector(".heure-local").style.display = "none";
        error404.classList.add("fadeIn");
        document.querySelector(".main-wrapper").style.height = "550px";
        return;
      }

      const description = document.querySelector(".box-description");
      const tempReelle = document.querySelector(".reelle .chiffre");
      const tempRessentie = document.querySelector(".ressentie .chiffre");
      const image = document.querySelector(".box-image img");
      const leveSoleil = document.querySelector(".lever .heure");
      const coucheSoleil = document.querySelector(".coucher .heure");
      const imageVent = document.querySelector(".vent img");
      const vitesseVent = document.querySelector(".vitesse");
      const humidite = document.querySelector(".pourcentage");
      const nomLocalisation = document.querySelector(".nom-localisation");
      const heure = document.querySelector(".heure-local");

      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      description.style.display = "flex";
      document.querySelector(".temperature").style.display = "flex";
      document.querySelector(".lever-coucher").style.display = "flex";
      document.querySelector(".box-image").style.display = "flex";
      document.querySelector(".details").style.display = "flex";
      nomLocalisation.style.display = "flex";
      heure.style.display = "flex";
      description.classList.add("fadeIn");
      document.querySelector(".details").classList.add("fadeIn");
      document.querySelector(".temperature").classList.add("fadeIn");
      document.querySelector(".lever-coucher").classList.add("fadeIn");
      document.querySelector(".box-image").classList.add("fadeIn");
      nomLocalisation.classList.add("fadeIn");
      heure.classList.add("fadeIn");
      document.querySelector(".main-wrapper").style.height = "550px";

      // Acording to the wind direction, we show a different image
      if (
        (rep.wind.deg >= 0 && rep.wind.deg <= 11.25) ||
        (rep.wind.deg <= 360 && rep.wind.deg >= 348.75)
      ) {
        imageVent.alt = "direction Nord";
        imageVent.src = "images/nord.png";
      } else if (rep.wind.deg > 11.25 && rep.wind.deg < 78.5) {
        imageVent.alt = "direction Nord Est";
        imageVent.src = "images/nord-est.png";
      } else if (rep.wind.deg >= 78.5 && rep.wind.deg <= 101.25) {
        imageVent.alt = "direction Est";
        imageVent.src = "images/est.png";
      } else if (rep.wind.deg > 101.25 && rep.wind.deg < 168.75) {
        imageVent.alt = "direction Sud Est";
        imageVent.src = "images/sud-est.png";
      } else if (rep.wind.deg >= 168.75 && rep.wind.deg <= 191.25) {
        imageVent.alt = "direction Sud";
        imageVent.src = "images/sud.png";
      } else if (rep.wind.deg > 191.25 && rep.wind.deg < 258.75) {
        imageVent.alt = "direction Sud Ouest";
        imageVent.src = "images/sud-ouest.png";
      } else if (rep.wind.deg >= 258.75 && rep.wind.deg <= 281.25) {
        imageVent.alt = "direction Ouest";
        imageVent.src = "images/ouest.png";
      } else if (rep.wind.deg > 281.25 && rep.wind.deg < 348.75) {
        imageVent.alt = "direction Nord Ouest";
        imageVent.src = "images/nord-ouest.png";
      }

      image.alt = rep.weather[0].description;
      image.src = `http://openweathermap.org/img/wn/${rep.weather[0].icon}@2x.png`;

      tempReelle.innerHTML = `${parseInt(rep.main.temp)}<span>°C</span>`;

      tempRessentie.innerHTML = `${parseInt(
        rep.main.feels_like
      )}<span>°C</span>`;

      vitesseVent.innerHTML = `${parseInt(rep.wind.speed)} m/s`;

      humidite.innerHTML = `${rep.main.humidity}%`;

      description.innerHTML = `${rep.weather[0].description}`;

      nomLocalisation.innerHTML = `${rep.name}, ${rep.sys.country}`;

      const optionsDate = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
      };

      const optionsDateSoleil = {
        hour: "numeric",
        minute: "numeric",
      };

      // Allows us to have the local time of the city, the contry searched
      const timezone = rep.timezone;
      const heureLocal = new Date(
        Date.now() + (timezone - new Date().getTimezoneOffset() * -60) * 1000
      ).toLocaleString("fr-FR", optionsDate);

      const currentTimeUtc = new Date();

      const sunriseUtc = new Date((rep.sys.sunrise + timezone) * 1000);
      const sunsetUtc = new Date((rep.sys.sunset + timezone) * 1000);

      // Convert the sunrise and sunset times to the local time of the city
      const sunriseLocal = new Date(
        sunriseUtc.getTime() + currentTimeUtc.getTimezoneOffset() * 60000
      ).toLocaleString("fr-FR", optionsDateSoleil);

      const sunsetLocal = new Date(
        sunsetUtc.getTime() + currentTimeUtc.getTimezoneOffset() * 60000
      ).toLocaleString("fr-FR", optionsDateSoleil);

      heure.innerHTML = heureLocal;

      leveSoleil.innerHTML = sunriseLocal;

      coucheSoleil.innerHTML = sunsetLocal;
    });
});
