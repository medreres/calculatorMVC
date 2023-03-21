import { Events } from "./events";

export interface IObserver {
  on(event: Events, callback: Function): void;
  notify(events: Events, data?: any): void;
}

export interface IConstant {
  name: string;
  value: number;
}
