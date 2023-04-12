import { WithoutId } from "mongodb";
import MongoDB, {
  AggregationAttributes,
  GenericInterface,
  QueryAttributes,
  ReplaceAttributes,
  WithId,
} from "@/libs/MongoDB";

type ExpressionAttributes = {
  expression: GenericInterface<string>;
  result: GenericInterface<number>;
};

const ExpressionModel = MongoDB.model<ExpressionAttributes>("Expression");

export default class Expression implements ExpressionAttributes {
  expression: string;
  result: number;
  constructor(expression: string, result: number) {
    this.expression = expression;
    this.result = result;
  }

  static findOne(params: QueryAttributes<WithId<ExpressionAttributes>>) {
    return ExpressionModel.findOne(params);
  }

  static updateOne(
    params: QueryAttributes<WithId<ExpressionAttributes>>,
    updateFields: ReplaceAttributes<WithId<ExpressionAttributes>>
  ) {
    return ExpressionModel.updateOne(params, updateFields);
  }

  static create(params: WithoutId<ExpressionAttributes>) {
    return ExpressionModel.create(params);
  }

  static findMany(
    params?: QueryAttributes<WithId<ExpressionAttributes>>,
    aggregationAttributes?: AggregationAttributes<WithoutId<ExpressionAttributes>>
  ) {
    return ExpressionModel.findMany(params, aggregationAttributes);
  }

  static deleteMany(params: QueryAttributes<WithId<ExpressionAttributes>>) {
    return ExpressionModel.deleteMany(params);
  }
}
