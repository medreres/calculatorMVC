export interface IObserver {
  on(event: string, callback: Function): void;
  notify(event: string, data?: any): void;
}
