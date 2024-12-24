// const STORAGE_TOKEN = 'K8DKOORIIO304VS778VU7VAC7XDQ0B7PI3KSLV8S';
// const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_URL = "https://join-ee657-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 *
 * @param {String} key - This key is stored on the server to retrieve arrays from the server in the future
 * @param {Array} value - This value contains an array, either with users, contacts, or tasks, to be saved on the server
 */
async function setItem(key, value) {
  //   const payload = { key, value, token: STORAGE_TOKEN };
  const payload = { key, value };
  return fetch(STORAGE_URL + key + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 *
 * @param {String} key - This is the name of the key we previously stored on the server to be able to save arrays on the server
 * @returns {Response} - The server's response
 */
async function getItem(key) {
  //   const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  const url = `${STORAGE_URL}` + key + ".json";
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      throw "key not found!";
    });
}
