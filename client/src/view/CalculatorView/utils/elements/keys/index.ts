import { MainOperations, Actions } from "../../../config";
import { ICreateButton } from "./interface";

export * from "../../handlers";
export * from "./interface";
export * from "./services";

export const createButton = (params: ICreateButton) => {
  const button = document.createElement("button");

  const { classList, disabled, innerHtml, onClick, value } = params;

  if (value != null) {
    button.value = value;
  }

  if (classList) {
    button.classList.add(...classList);
  }
  if (onClick) {
    button.addEventListener("click", onClick);
  }

  if (innerHtml != null) {
    button.innerHTML = innerHtml;
  }

  if (disabled) {
    button.disabled = disabled;
  }

  return button;
};

export function getInnerHtml(btnValue: string) {
  let innerHtml;
  switch (btnValue) {
    case MainOperations.MULTIPLICATION:
      innerHtml = "&times;";
      break;

    case MainOperations.DIVISION:
      innerHtml = "&divide";
      break;

    default:
      innerHtml = btnValue;
  }

  return innerHtml;
}

export function getButtonClasses(btnValue: string) {
  const classList = [];
  switch (btnValue) {
    case Actions.DOT:
      classList.push("calc-btn", "decimal", "function", "btn", "btn-secondary");
      break;

    case Actions.CLEAR_INPUT:
      classList.push("calc-btn", "all-clear", "function", "btn", "btn-danger", "btn-sm");
      break;

    case Actions.CALCULATE:
      classList.push("calc-btn", "equal-sign", "operator", "btn", "btn-light");
      break;

    case Actions.REMOVE_SYMBOL:
      classList.push("calc-btn", "operator", "btn", "btn-info", "remove-btn");
      break;

    case "0":
      classList.push("calc-btn", "operator", "btn", "btn-info", "zero-btn");
      break;
  }

  if (classList.length === 0) classList.push("calc-btn", "operator", "btn", "btn-info");

  if (!isNaN(+btnValue)) classList.push("btn", "btn-light", "waves-effect");

  return classList;
}

export function createToggleScientificViewButton() {
  const scientificView = document.createElement("button");
  scientificView.innerHTML = "Scientific";
  scientificView.style.marginLeft = "auto";
  scientificView.classList.add("btn", "btn-info");
  scientificView.style.marginRight = "auto";
  scientificView.onclick = (e) => {
    const container = document.querySelector("#operations-keys") as HTMLDivElement;
    const currentStyle = container.style.display;
    if (currentStyle === "none") {
      container.style.display = "grid";
      (e.target as HTMLButtonElement).innerHTML = "Regular";
    } else {
      container.style.display = "none";
      (e.target as HTMLButtonElement).innerHTML = "Scientific";
    }
  };

  return scientificView;
}
