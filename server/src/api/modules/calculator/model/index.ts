import MongoDB from "../libs/MongoDB/Mongo";

type Expression = {
  expression: string;
  result: number;
  timestamp: Date;
};

const Expression = MongoDB.model<Expression>("Expression");

export default Expression;
