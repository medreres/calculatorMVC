import CalculatorView from "../..";
import { Actions } from "../../config";
import history from "../../../../public/history.svg";
import { createButton } from "./keys";
import { HISTORY_SIZE } from "../../../../config";
import { removeSpaces } from "../../../../shared/utils";

export function createHistoryDropdown() {
  const svg = document.createElement("div");
  svg.classList.add("history-icon", "dropdown");
  svg.innerHTML = `
    <button class="btn text-white bg-dark pe-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${history}
    </button>
    
  `;

  const container = document.createElement("ul");
  container.classList.add("dropdown-menu", "px-2");

  const placeHolder = document.createElement("span");
  placeHolder.id = "placeholder";
  placeHolder.innerHTML = "History is empty";
  container.appendChild(placeHolder);

  svg.appendChild(container);

  return svg;
}

interface addHistory {
  expression: string;
  result: string;
  onClick?: (e: MouseEvent) => void;
}
export function addHistory(this: CalculatorView, { expression, result, onClick }: addHistory) {
  // if history already exists return immediately
  if (Array.from(document.querySelectorAll(".history-btn")).some((btn) => btn.innerHTML === expression)) {
    return;
  }

  const historyContainer = getHistoryContainer();

  const placeHolder = document.querySelector("#placeholder");
  if (placeHolder) {
    console.log(placeHolder);
    historyContainer.removeChild(placeHolder);
  }

  const btn = createHistoryButton({ expression, result, onClick });

  if (historyContainer.childNodes.length >= HISTORY_SIZE) {
    historyContainer.removeChild(historyContainer.childNodes[historyContainer.childNodes.length - 1]);
  }

  historyContainer.insertBefore(btn, historyContainer.firstChild);
}

export function getHistoryContainer() {
  return document.querySelector(".dropdown-menu")!;
}

export function cleanHistory() {
  getHistoryContainer().innerHTML = "";
}

interface ICreateHistoryButton {
  expression: string;
  result: string;
  onClick?: (e: MouseEvent) => void;
}
export function createHistoryButton(params: ICreateHistoryButton) {
  const { expression, result, onClick } = params;

  const classList = ["btn", "h-25", "btn-outline-secondary", "m-1", "history-btn"];

  const exprBtn = createButton({
    value: removeSpaces(expression),
    innerHtml: expression,
    classList,
    onClick,
  });

  const resultBtn = createButton({
    value: removeSpaces(result),
    innerHtml: result,
    classList,
    onClick,
  });

  const equalSign = document.createElement("span");
  equalSign.classList.add("text-secondary", "mx-1");
  equalSign.innerHTML = Actions.CALCULATE;

  const wrapper = document.createElement("li");
  wrapper.classList.add("d-flex", "justify-content-start", "align-items-center");
  wrapper.appendChild(exprBtn);
  wrapper.appendChild(equalSign);
  wrapper.appendChild(resultBtn);

  return wrapper;
}
