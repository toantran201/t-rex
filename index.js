const BASE_URL = '/t-rex'

// Router config
const urlRoutes = {
  '/': {
    template: "/views/welcome.html",
    title: "Welcome to T-Rex",
    description: "Welcome",
  },
  '/home': {
    template: "/views/home.html",
    title: "Game",
    description: "Game",
  },
};

//
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      urlRoute(e)
    }
  });
});
const urlRoute = (event) => {
  debugger
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlRouterHandler();
};

const urlRouterHandler = async () => {
  debugger
  let location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }
  const route = urlRoutes[location];
  document.getElementById("app").innerHTML = await fetch(route.template).then((response) => response.text());
  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

const navigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + `${pathname}`
  )
  urlRouterHandler();
}

// form handler
const welcomeSubmit = (event) => {
  event.preventDefault()
  const username = event.target?.elements?.username?.value
  localStorage.setItem('USER_NAME', username)
  navigate('/home')
}

// find a match
const findAMatch = (event) => {
  event.target.disabled = true
  const loadingIcon = document.getElementById('find-match-loading')
  if(loadingIcon) {
    loadingIcon.style.display = 'inline-block'
  }
}

// Invite
const showInvite = (event) => {
  const invitePopup = document.getElementById('invite-modal')
  if(invitePopup) {
    invitePopup.style.display = 'block'
  }
}

const hideInvite = (event) => {
  const invitePopup = document.getElementById('invite-modal')
  if(invitePopup) {
    invitePopup.style.display = 'none'
  }
}


window.onpopstate = urlRouterHandler;
window.route = urlRoute;
urlRouterHandler();