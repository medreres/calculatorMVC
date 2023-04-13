type KeyType = string | number | symbol;

export default class Observer {
  private observers = new Map<KeyType, Function[]>();
  private static instance: Observer | null = null;

  static getInstance(): Observer {
    if (Observer.instance == null) {
      Observer.instance = new Observer();
    }

    return Observer.instance;
  }

  private constructor() {}

  on(event: KeyType, callback: Function): void {
    if (this.observers.has(event)) {
      this.observers.get(event)?.push(callback);
      return;
    }

    this.observers.set(event, [callback]);
  }

  notify(event: KeyType, data?: any): void {
    this.observers.get(event)?.forEach((subscription) => subscription(data));
  }

  unsubscribe(event: KeyType, func: Function) {
    if (this.observers.get(event))
      return this.observers.set(
        event,
        this.observers.get(event)!.filter((fn) => fn != func)
      );
  }
}
