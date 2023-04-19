export { IAggregator } from "./Aggregator";
export * from "./Db";
export * from "./Document";

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
