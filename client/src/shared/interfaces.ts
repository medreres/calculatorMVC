import { IGeneralEvents, IModelEvents, IViewEvents } from "./events";

type GenericEventType = IViewEvents | IModelEvents | IGeneralEvents;

export interface IObserver {
  notify<EventName extends keyof GenericEventType>(event: EventName, data: GenericEventType[EventName]): void;
  on<EventName extends keyof GenericEventType>(
    event: EventName,
    callback: (arg: GenericEventType[EventName]) => void
  ): void;
}

export interface IConstant {
  key: string;
  value: number;
}

export interface IOperation {
  result: string;
  expression: string;
}
