import { z } from "zod";
import { DefaultProperties, WithId } from "@/libs/Db/interfaces";
import { DB } from "@/config";
import logger from "@/logger";
import { calculator } from "./services";
import { Filter, ReplaceAttributes } from "./interfaces";

const expressionSchema = z.object({
  expression: z.string(),
  result: z.number(),
});

type ExpressionAttributes = z.infer<typeof expressionSchema>;

const ExpressionModel = DB.model("Expression", expressionSchema);

export default class Expression {
  // TODO too much dependency in types from mongodb
  // TODO query attributes support
  static findOne(params: Filter<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.findOne(params);
  }

  static updateOne(
    params: Partial<WithId<ExpressionAttributes & DefaultProperties>>,
    updateFields: ReplaceAttributes<WithId<ExpressionAttributes & DefaultProperties>>
  ) {
    return ExpressionModel.updateOne(params, updateFields);
  }

  // TODO mongodb dependency
  static create(params: ExpressionAttributes) {
    const instance = new ExpressionModel(params);
    return ExpressionModel.insertOne(instance.attributes);
  }

  // TODO types to mongodb get collection
  static findMany(params: Partial<WithId<ExpressionAttributes & DefaultProperties>> = {}) {
    return ExpressionModel.findMany(params);
  }

  static deleteMany(params: Partial<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.deleteMany(params);
  }

  // TODO make do with id
  static evaluate(expression: string): Promise<string> {
    expression = expression.replaceAll(" ", "");
    // find this expression in db, if exists - return result
    return Expression.findOne({ expression }).then((history) => {
      if (history) {
        logger.info("Fetched expression from db\n" + JSON.stringify(history));

        return Expression.updateOne({ expression }, { updatedAt: new Date() }).then(() => {
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
}
