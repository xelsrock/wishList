import { createHero } from "./createHero.js";
import { renderNavigation } from "./renderNavigation.js";


const app = document.querySelector('.app');

const handleHomePage = () => {
  app.textContent = '';
  renderNavigation();
  const section = createHero();
  app.append(section);
}


const init = () => {
  handleHomePage();
}

init();