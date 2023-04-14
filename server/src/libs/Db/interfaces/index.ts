export { IAggregator } from "./Aggregator";
export * from "./Db";
export * from "./Document";

// export type StaticImplements<I extends new (...args: any[]) => any> = InstanceType<I>;

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
