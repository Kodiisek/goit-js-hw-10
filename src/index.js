import axios from "axios";
import SlimSelect from 'slim-select';

axios.defaults.headers.common["x-api-key"] = "live_TIuotm3QGcS5MeYpv1Ndh87Jzoj104tKUjieQJYLo3Klj8MCXCkG4YbPiDaVxugB";


  const selectBreed = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');
  let slim;

  async function fetchBreeds() {
    try {
      loader.style.display = 'block';
      selectBreed.style.display = 'none';
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      const breeds = response.data;     
      loader.style.display = 'none';
      selectBreed.style.display = 'block';
      selectBreed.innerHTML = '';
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selectBreed.appendChild(option);
      });

      slim = new SlimSelect({
        select: '.breed-select'
      });

    } catch (error) {
      console.error(error);
      loader.style.display = 'none';
      showError();
    }
  }
  async function fetchCatByBreed(breedId) {
    try {
      loader.style.display = 'block';
      catInfo.style.display = 'none';
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
      const cat = response.data[0];      
      loader.style.display = 'none';
      catInfo.style.display = 'flex';

      displayCatInfo(cat);
    } catch (error) {
      console.error(error);
      loader.style.display = 'none';
      showError();
    }
  }

  function displayCatInfo(cat) {
    catInfo.innerHTML = `
      <img src="${cat.url}" alt="Cat image">
      <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
      <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    `;
  }

  function showError() {
    error.style.display = 'block';
  }

  selectBreed.addEventListener('change', (event) => {
    const selectedBreedId = event.target.value;
    fetchCatByBreed(selectedBreedId);
  });

  fetchBreeds();