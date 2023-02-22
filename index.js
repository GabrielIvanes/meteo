const apiKey = "d03d742b9fcb21f913d13177a9eeb2a6";

const error404 = document.querySelector(".error-404");
const recherche = document.querySelector(".search-box button");

recherche.addEventListener("click", function () {
  const localisation = document.querySelector(".search-box input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localisation}&units=metric&appid=${apiKey}&lang=fr`
  )
    .then((reponse) => reponse.json())
    .then((rep) => {
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

      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      description.style.display = "flex";
      document.querySelector(".temperature").style.display = "flex";
      document.querySelector(".lever-coucher").style.display = "flex";
      document.querySelector(".box-image").style.display = "flex";
      document.querySelector(".details").style.display = "flex";
      nomLocalisation.style.display = "flex";
      description.classList.add("fadeIn");
      document.querySelector(".details").classList.add("fadeIn");
      document.querySelector(".temperature").classList.add("fadeIn");
      document.querySelector(".lever-coucher").classList.add("fadeIn");
      document.querySelector(".box-image").classList.add("fadeIn");
      nomLocalisation.classList.add("fadeIn");
      document.querySelector(".main-wrapper").style.height = "550px";

      if (rep.wind.deg === 0 || rep.wind.deg === 360) {
        imageVent.alt = "direction Nord";
        imageVent.src = "images/nord.png";
      } else if (rep.wind.deg === 90) {
        imageVent.alt = "direction Est";
        imageVent.src = "images/est.png";
      } else if (rep.wind.deg > 0 && rep.wind.deg < 90) {
        imageVent.alt = "direction Nord Est";
        imageVent.src = "images/nord-est.png";
      } else if (rep.wind.deg === 180) {
        imageVent.alt = "direction Sud";
        imageVent.src = "images/sud.png";
      } else if (rep.wind.deg > 90 && rep.wind.deg < 180) {
        imageVent.alt = "direction Sud Est";
        imageVent.src = "images/sud-est.png";
      } else if (rep.wind.deg === 270) {
        imageVent.alt = "direction Ouest";
        imageVent.src = "images/ouest.png";
      } else if (rep.wind.deg > 180 && rep.wind.deg < 270) {
        imageVent.alt = "direction Sud Ouest";
        imageVent.src = "images/sud-ouest.png";
      } else if (rep.wind.deg > 270 && rep.wind.deg < 360) {
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

      const sunrise = rep.sys.sunrise;
      var date = new Date(sunrise * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();

      leveSoleil.innerHTML = hours + ":" + minutes.substr(-2);

      const sunset = rep.sys.sunset;
      date = new Date(sunset * 1000);
      hours = date.getHours();
      minutes = "0" + date.getMinutes();

      coucheSoleil.innerHTML = hours + ":" + minutes.substr(-2);
    });
});
