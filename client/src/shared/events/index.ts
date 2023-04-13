import { GeneralEvents, IGeneralEvents } from "./general";
import { ModelEvents, IModelEvents as IME } from "./model";
import { ViewEvents, IViewEvents as IVE } from "./view";

export { ViewEvents };
export type IViewEvents = IVE & IGeneralEvents; // add support for general events

export { ModelEvents };
export type IModelEvents = IME & IGeneralEvents; // add support for general events

// combine all types for controller to be able to handle all events
export type EventTypes = IModelEvents & IViewEvents & IGeneralEvents;
export const Events = {
  ...ViewEvents,
  ...ModelEvents,
  ...GeneralEvents,
};

export { GeneralEvents, IGeneralEvents };
