import { JWT_TOKEN_KEY } from "./const.js";
import { createHero } from "./createHero.js";
import { getLogin } from "./getLogin.js";
import { renderNavigation } from "./renderNavigation.js";

export const router = Router();
const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};

const app = document.querySelector('.app');


const handleEditPageRoute = (id) => {

}

const handleEditProfileRoute = async (login) => {
  app.textContent = '';
  renderNavigation();
  app.append(await createWishList(login));
}

const handleUserRoute = (login) => {

}
  

const handleHomePage = () => {
  app.textContent = '';
  renderNavigation();
  app.append(createHero());
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

    if (auth.login) {
      router.setRoute(`/user/${auth.login}`);
    } else {
      router.setRoute('/');
    };
  };
};

init();