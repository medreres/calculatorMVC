export enum GeneralEvents {
  CONNECTION_FAILED = "connectionFailed",
}
export interface IGeneralEvents {
  [GeneralEvents.CONNECTION_FAILED]: void;
}
