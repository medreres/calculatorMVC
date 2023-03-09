export default interface IObserver {
    observers: Map<string, Function[]>;
    on(evt: string, fn: Function): void;
    unsubscribe(evt: string, func: Function): void;
    notify(evt: string, data?: any): void;
    getInstance(): IObserver;
}