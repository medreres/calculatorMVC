import { MainOperations } from "../../../../shared/operations";
import { Actions } from "../../config";
import { ICreateButton } from "./interface";

export * from "../../utils/handlers";
export * from "./interface";
export * from "./services";

export const createButton = (params: ICreateButton) => {
  const button = document.createElement("button");

  const { classList, disabled, innerHtml, onClick, value, id } = params;

  // calculator can't deal with infinity, so disable it
  if (value?.includes(Infinity.toString()) || innerHtml?.includes(Infinity.toString())) {
    button.disabled = true;
  }

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

  if (id) {
    button.id = id;
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
      classList.push("calc-btn", "equal-sign", "btn", "btn-light");
      break;

    case Actions.REMOVE_SYMBOL:
      classList.push("calc-btn", "btn", "btn-info", "remove-btn");
      break;

    case "0":
      classList.push("calc-btn", "btn", "btn-info", "zero-btn");
      break;
  }

  if (classList.length === 0) classList.push("calc-btn", "btn", "btn-info");

  if (!isNaN(+btnValue)) classList.push("btn", "btn-light", "waves-effect");

  return classList;
}

export function createScientificViewButton() {
  const onClick = (e: Event) => {
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

  const scientificView = createButton({
    onClick,
    classList: ["btn", "btn-info", "mx-auto"],
    innerHtml: "Scientific",
    id: "scientificView",
  });

  return scientificView;
}