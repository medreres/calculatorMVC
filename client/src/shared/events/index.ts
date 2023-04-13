import { ModelEvents as ModelEvt, IModelEvents as ModelEvtTypes } from "./model";
import { ViewEvents as ViewEvt, IViewEvents as ViewEvtTypes } from "./view";

export enum GeneralEvents {
  CONNECTION_FAILED = "connectionFailed",
}
export interface IGeneralEvents {
  [GeneralEvents.CONNECTION_FAILED]: void;
}

export type IViewEvents = ViewEvtTypes & IGeneralEvents;
export const ViewEvents = {
  ...ViewEvt,
  ...GeneralEvents,
};

export type IModelEvents = ModelEvtTypes & IGeneralEvents;
export const ModelEvents = {
  ...ModelEvt,
  ...GeneralEvents,
};

export type EventTypes = ModelEvtTypes & ViewEvtTypes & IGeneralEvents;
export const Events = {
  ...ModelEvt,
  ...ViewEvt,
  ...GeneralEvents,
};

// export type IViewEvents = ViewEvtTypes & GeneralEventsTypes;

// export type ModelEventTypes = ModelEvtTypes & GeneralEventsTypes;
