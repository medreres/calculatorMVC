import { z } from "zod";

import { Filter, IGetExpressions, ReplaceAttributes, SortingValue } from "./interfaces";
import { calculator } from "./services";

import { DB } from "@/config";
import { DefaultProperties, WithId } from "@/libs/Db/interfaces";
import { InferType } from "@/libs/Db/PostgresDB/utils";
import logger from "@/logger";

const expressionSchema = z.object({
  expression: z.string(),
  result: z.number(),
});

type ExpressionAttributes = InferType<typeof expressionSchema>;

const ExpressionModel = DB.model("Expression", expressionSchema);

export default class Expression {
  static findOne(params: Filter<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.findOne(params);
  }

  static updateOne(
    params: Partial<WithId<ExpressionAttributes & DefaultProperties>>,
    updateFields: ReplaceAttributes<WithId<ExpressionAttributes & DefaultProperties>>
  ) {
    return ExpressionModel.updateOne(params, updateFields);
  }

  static create(params: ExpressionAttributes) {
    const instance = new ExpressionModel(params);
    return instance.save();
  }

  static findMany(params: Filter<WithId<ExpressionAttributes & DefaultProperties>> = {}) {
    return ExpressionModel.findMany(params);
  }

  static deleteMany(params: Filter<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.deleteMany(params);
  }

  static evaluate(expression: string): Promise<string> {
    expression = expression.replaceAll(" ", "");
    // find this expression in db, if exists - return result
    return Expression.findOne({ expression }).then((history) => {
      if (history) {
        logger.info("Fetched expression from db\n" + JSON.stringify(history));

        return Expression.updateOne({ id: history.id }, { updatedAt: new Date() }).then(() => {
          return history.result.toString();
        });
      }

      logger.info("Expression not found. Calculating...");

      if (!calculator.isExpressionValid(expression)) {
        return Promise.reject(`Invalid expression ${expression}`);
      }

      let result: number;

      try {
        result = calculator.evaluate(expression);
      } catch (error) {
        return Promise.reject(error);
      }

      logger.info(`Calculated. Result: ${result}`);

      // save expression to db
      return Expression.create({
        expression,
        result,
      }).then(() => {
        return result.toString();
      });
    });
  }

  static getOperationSymbols() {
    const operations = calculator.getOperations();
    const operationsSymbols = operations.map((operation) => operation.symbol);
    return operationsSymbols;
  }

  static getConstants() {
    const constants = calculator.getConstants();
    return constants;
  }

  static async getExpressions({ skip, sort, limit }: IGetExpressions) {
    let property = "updatedAt";
    let order: SortingValue = "desc";

    const request = Expression.findMany({});

    if (typeof sort === "string") {
      [property, order] = sort.split(":") as [string, SortingValue];
      request.sort({
        [property]: order,
      });
    }

    if (limit) {
      request.limit(limit);
    }

    if (skip) {
      request.skip(skip);
    }

    try {
      return request.exec().then((result) => {
        const dataSerialized = result.map((result) => {
          return {
            ...result,
            result: result.result.toString(),
          };
        });

        return dataSerialized;
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
