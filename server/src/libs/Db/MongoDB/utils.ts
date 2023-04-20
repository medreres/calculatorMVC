import { AttributeKeys, Document } from "../interfaces";
import { renameProperty } from "../utils";

export const preformatData = (params: Document) => {
  if (params && AttributeKeys.OR in params) {
    renameProperty(params, AttributeKeys.OR, "$or");
  }

  if (AttributeKeys.ID in params) {
    renameProperty(params, AttributeKeys.ID, "_id");
  }
  //TODO recursively { or:[ {expression: ['1+2','3'] }, {result: 1 ] }
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      params[key] = {
        $in: value,
      };
    }
  });
};

export const formatResponse = (params: object) => {
  if (params) {
    renameProperty(params, "_id", AttributeKeys.ID);
  }
};
