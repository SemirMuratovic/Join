/**
 * This function checks if a user is logged in or if the user has
 * guest status.
 * @returns - The function returns the user's data if a user is logged in.
 */
async function checkUser() {
  let userLogin = localStorage.getItem("userLogin");
  if (userLogin == "true") {
    let userEmail = localStorage.getItem("userEmail");
    userEmail = userEmail.replace(/"/g, "");
    let users = JSON.parse(await getItem("users"));
    let user = users.find((u) => u.email == userEmail).id;
    return user;
  }
}

/**
 * This function gets the tasks array from the external server.
 */
async function loadTasksUserOrGuest() {
  let user = await checkUser();
  let currentURL = window.location.href;
  if (user && currentURL.includes("summary")) {
    tasks = JSON.parse(await getItem(`${user}_tasks`));
  } else if (user && currentURL.includes("board")) {
    tasks = JSON.parse(await getItem(`${user.id}_tasks`));
  } else {
    tasks = JSON.parse(await getItem("guestTasks"));
  }
}

/**
 * This function gets the contacts array from the external server.
 */
async function loadContactsUserOrGuest() {
  let user = await checkUser();
  let currentURL = window.location.href;
  if (user && currentURL.includes("summary")) {
    contacts = JSON.parse(await getItem(`${user}_contacts`));
  } else if (user && currentURL.includes("board" || "add_task")) {
    contacts = JSON.parse(await getItem(`${user.id}_contacts`));
  } else {
    contacts = JSON.parse(await getItem("guestContacts"));
  }
}

/**
 * This function get the categories array from the external server.
 */
async function loadCategoriesUserOrGuest() {
  let user = await checkUser();
  let currentURL = window.location.href;
  if (user && currentURL.includes("summary")) {
    categories = JSON.parse(await getItem(`${user}_categories`));
  } else if (user && currentURL.includes("board" || "add_task")) {
    categories = JSON.parse(await getItem(`${user.id}_categories`));
  } else {
    categories = JSON.parse(await getItem("guestCategories"));
  }
}

/**
 * This function sends the tasks array to the external server after
 * changes have been made to it.
 */
async function sendTasksToServer() {
  let user = await checkUser();
  if (user) {
    await setItem(`${user.id}_tasks`, JSON.stringify(tasks));
  } else {
    await setItem("guestTasks", JSON.stringify(tasks));
  }
  initBoard();
}
