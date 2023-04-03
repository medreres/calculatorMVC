export interface ICreateButton {
  value?: string;
  onClick?: (e: MouseEvent) => void;
  classList?: string[];
  disabled?: boolean;
  innerHtml?: string;
}
