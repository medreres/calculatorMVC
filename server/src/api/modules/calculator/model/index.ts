import { GenericInterface } from "./../../../../libs/MongoDB/interfaces";
import MongoDB from "../../../../libs/MongoDB/Mongo";

type Expression = {
  expression: GenericInterface<string>;
  result: GenericInterface<number>;
  timestamp: GenericInterface<Date>;
};

const Expression = MongoDB.model<Expression>("Expression");

export default Expression;
