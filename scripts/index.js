import { createHero } from "./createHero.js";
import { renderNavigation } from "./renderNavigation.js";

export const router = Router();

const app = document.querySelector('.app');


const handleEditPageRoute = (id) => {

}

const handleEditProfileRoute = (login) => {

}

const handleUserRoute = (login) => {

}
  

const handleHomePage = () => {
  app.textContent = '';
  renderNavigation();

  const section = createHero();
  app.append(section);
}


const init = () => {
  let isMainPage = true;
  
  router.on('/', handleHomePage);
  router.on('/editwish/newwish', handleEditPageRoute);
  router.on('/editwish/:id', handleEditPageRoute);
  router.on('/editprofile/:login', handleEditProfileRoute);
  router.on('/user/:login', handleUserRoute);
  
  router.init();

  if (isMainPage) {
    isMainPage = false;
    router.setRoute('/');
  }
}

init();