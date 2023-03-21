export default interface IObserver {
  on(evt: string, fn: Function): void;
  unsubscribe(evt: string, func: Function): void;
  notify(evt: string, data?: any): void;
}
