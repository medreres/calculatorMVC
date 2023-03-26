import { Operations } from "./dataManipulation";

const parenthesesRegexRaw = new RegExp(
  `\\${Operations.LEFT_PARENTHESIS}(?!.*\\${Operations.LEFT_PARENTHESIS})([^${Operations.RIGHT_PARENTHESIS}]*)\\${Operations.RIGHT_PARENTHESIS}`
);
/**
 * @description
 * \\${Operations.LEFT_PARENTHESIS} - matches starting parentheses
 *
 * (?!.*\\${Operations.LEFT_PARENTHESIS}) - negative lookahead that
 * ensures it matches last opening parentheses in string
 *
 * ([^${Operations.RIGHT_PARENTHESIS}]*) - matching group that includes everything
 * except from ending parentheses, otherwise it will match to the end of the string
 *
 * \\${Operations.RIGHT_PARENTHESIS} - matches ending parentheses
 */
export const parenthesesGroupRegex = new RegExp(parenthesesRegexRaw);

/**
 * @description
 * [\\-]? - allows numbers to be negative, for example -1
 *
 * \\d*\\.?\\d+ - allows floating point numbers, for example 1.5
 *
 * (?:[Ee][\\+\\-]?\\d+)? - allows scientific notation numbers, for example 2e+10
 */
export const numberRegexRaw = `([\\-]?\\d\\.?\\d+(?:[Ee][\\+\\-]?\\d+)?)`;

/**
 * [a-zA-Z] - set of letters that are used to define function name
 */
export const functionRegex = /[a-zA-Z]/;
