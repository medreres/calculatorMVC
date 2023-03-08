class Observer {
  observers: Map<string, Function[]>;
  constructor() {
    this.observers = new Map<string, Function[]>();
  }

  on(evt: string, fn: Function) {
    if (this.observers.has(evt)) return this.observers.get(evt)?.push(fn);

    this.observers.set(evt, [fn]);
  }

  unsubscribe(evt: string, func: Function) {
    if (this.observers.get(evt))
      return this.observers.set(
        evt,
        this.observers.get(evt)!.filter((fn) => fn != func)
      );
  }

  notify(evt: string, data?: any) {
    this.observers.get(evt)?.forEach((subscription) => subscription(data));
  }
}

export default Observer;
