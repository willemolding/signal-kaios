const init = () => {
  const firstElement = getAllElements()[0];
  firstElement.setAttribute("nav-selected", "true");
  firstElement.setAttribute("nav-index", "0");
  firstElement.focus();
};

const getAllElements = () => document.querySelectorAll('[nav-selectable]');

const getCurrentElement = () => document.querySelector('[nav-selected=true]');

const getTheIndexOfTheSelectedElement = current => {
  const currentElement = current || getCurrentElement();
  return currentElement ? parseInt(currentElement.getAttribute('nav-index')) : 0;
}

const getCurrentItem = () => {
  const item = getCurrentElement();
  const index = getTheIndexOfTheSelectedElement(item);
  return [item, index];
}

const selectElement = selectElement => {
  [].forEach.call(getAllElements(), (element, index) => {
    const selectThisElement = element === selectElement;
    element.setAttribute("nav-selected", selectThisElement);
    element.setAttribute("nav-index", index);
    if (element.nodeName === 'INPUT') {
      selectThisElement ? element.focus() : element.blur();
    }
  });
}

const Down = () => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToFirstElement = currentIndex + 1 > allElements.length - 1;
  const setIndex = goToFirstElement ? 0 : currentIndex + 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

const Up = () => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToLastElement = currentIndex === 0;
  const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

export default { init, Up, Down, getCurrentItem };
