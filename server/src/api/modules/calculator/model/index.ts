import { GenericInterface } from "./../../../../libs/MongoDB/interfaces";
import MongoDB from "../../../../libs/MongoDB/MongoDB";

type ExpressionAttributes = {
  expression: GenericInterface<string>;
  result: GenericInterface<number>;
  createdAt: GenericInterface<Date>;
  updatedAt: GenericInterface<Date>;
};

const Expression = MongoDB.model<ExpressionAttributes>("Expression");

export default Expression;
