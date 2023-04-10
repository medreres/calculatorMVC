import MongoDB, { GenericInterface } from "../../../../libs/MongoDB";

type ExpressionAttributes = {
  expression: GenericInterface<string>;
  result: GenericInterface<number>;
};

const Expression = MongoDB.model<ExpressionAttributes>("Expression");

// new Expression({
//   expression: "1",
//   result: 1,
// }).

export default Expression;
