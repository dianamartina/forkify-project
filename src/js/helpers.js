import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([(fetchPro, timeout(TIMEOUT_SEC))]); // va rula cea care castiga, preluara datelor sau eroarea
    const data = await res.json();
    // aici preia eroarea daca exista
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // am trimis eroarea catre model.js
  }
};
