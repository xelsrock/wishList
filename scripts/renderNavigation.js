import { createElement } from "./helper.js";


const nav = document.querySelector('.nav');
// const burger = createBurgerMenu(nav);

export const renderNavigation = () => {
  nav.textContent = '';

  const buttonSingUp = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Зарегистрироваться',
  });

  buttonSingUp.addEventListener('click', () => {
    console.log('click');
  });

  const buttonLogin = createElement('button', {
    className: 'nav__btn btn',
    textContent: 'Войти',
  });

  buttonLogin.addEventListener('click', () => {
    console.log('click');
  });

  nav.append(buttonSingUp, buttonLogin);
};

