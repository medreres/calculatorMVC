import { MongoDB } from "@/libs/Db";
import { DefaultProperties, FilterOptions, staticImplements, WithId } from "@/libs/Db/interfaces";
import { Filter, IStaticDocumentService, ReplaceAttributes } from "./interfaces";
// import { Filter, IStaticDocumentService, ReplaceAttributes } from "./interfaces";

type ExpressionAttributes = {
  expression: string;
  result: number;
};

const ExpressionModel = MongoDB.model<ExpressionAttributes>("Expression");

// const Expression: IStaticDocumentService<ExpressionAttributes> = {
//   findOne(params) {
//     return ExpressionModel.findOne(params);
//   },

//   updateOne(param, updateFields) {},

//   create: function (attributes: any) {
//     throw new Error("Function not implemented.");
//   },

//   findMany: function (attributes: any) {
//     throw new Error("Function not implemented.");
//   },

//   deleteMany: function (attributes: any) {
//     throw new Error("Function not implemented.");
//   },
// };

// export default Expression;

// TODO method evaluate move to this service
@staticImplements<IStaticDocumentService<ExpressionAttributes>>()
export default class Expression {
  // TODO too much dependency in types from mongodb
  // TODO query attributes support
  static findOne(params: Filter<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.findOne(params);
  }

  // TODO update field type combine and create one type for all
  static updateOne(
    params: Filter<WithId<ExpressionAttributes & DefaultProperties>>,
    updateFields: ReplaceAttributes<WithId<ExpressionAttributes & DefaultProperties>>
  ) {
    return ExpressionModel.updateOne(params, updateFields);
  }

  // TODO mongodb dependency
  static create(params: ExpressionAttributes) {
    const instance = new ExpressionModel(params);
    return ExpressionModel.create(instance.attributes);
  }
  // TODO types to mongodb get collection
  static findMany(params: FilterOptions<WithId<ExpressionAttributes & DefaultProperties>> = {}) {
    return ExpressionModel.findMany(params);
  }

  static deleteMany(params: FilterOptions<WithId<ExpressionAttributes & DefaultProperties>>) {
    return ExpressionModel.deleteMany(params);
  }

  static evaluate(expression: string) {}
}
