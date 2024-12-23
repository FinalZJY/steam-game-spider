import SteamAPI from 'steamapi';
import {readJSON, writeJSON} from './file.js';
import {dataDir, steamToken} from './config.js';
import path from 'path';

const filename = path.join(dataDir, 'city.json');

const steam = new SteamAPI(steamToken);
const failed = [];

async function update() {
  let countries = readJSON(filename, []);
  if (!countries.length) {
    countries =  await steam.getCountries();
  }

  await Promise.all(countries.map(country => getStates(country)));

  writeJSON(filename, countries);
  console.log('Failed:', failed);
}

async function getStates(country) {
  if (country.hasstates) {
    try {
      if (!country.states) {
        console.debug(`fetching ${country.countrycode}`);
        country.states = await steam.getStates(country.countrycode);
      }
      await Promise.all(
        country.states.map(state => getCities(state))
      );
    } catch (err) {
      failed.push(country.countrycode);
    }
  }
}

async function getCities(state) {
  if (!state.cities) {
    try {
      console.debug(`fetching ${state.countrycode}-${state.statecode}`);
      state.cities = await steam.getCities(state.countrycode, state.statecode);
    } catch (err) {
      if (err.message === 'null') {
        state.cities = [];
      } else {
        failed.push(`${state.countrycode}-${state.statecode}`);
      }
    }
  }
}

await update();
