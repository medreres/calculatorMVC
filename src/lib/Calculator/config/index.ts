export { Operations, defaultConstants, defaultOperations } from "./dataManipulation";

import calculatingAlgorithms, { RegularExpression } from "../CalculatingAlgorithms";

import projectConfig from "../../../config/project.config";

export { calculatingAlgorithms };

export * from "./regex";

export const evaluatingAlgorithm = projectConfig.evaluatingAlgorithm || RegularExpression;
