import { ModelEvents } from "./model";
import { ViewEvents } from "./view";

enum GeneralEvents {
  CONNECTION_FAILED = "connectionFailed",
}

export const Events = {
  ...ViewEvents,
  ...ModelEvents,
  ...GeneralEvents,
};

export type Events = ModelEvents | ViewEvents | GeneralEvents;
