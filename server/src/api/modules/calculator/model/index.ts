import MongoDB, { GenericInterface } from "../../../../libs/MongoDB";

type ExpressionAttributes = {
  expression: GenericInterface<string>;
  result: GenericInterface<number>;
};

const Expression = MongoDB.model<ExpressionAttributes>("Expression");

export default Expression;
