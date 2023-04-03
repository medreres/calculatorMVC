import MongoDB from "../MongoDB/Mongo";

type Expression = {
  expression: string;
  result: number;
};

const Expression = MongoDB.model<Expression>("Expression");

export default Expression;
