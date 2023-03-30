import { AdditionalOperations, MainOperations } from "../config";

/**
 * \w allows letters to be present
 * \s checks for whitespace
 *  LEFT_PARENTHESES, RIGHT_PARENTHESES,ADDITION,
 *  MULTIPLICATION, DIVISION, MODULA, SUBTRACTION represent symbol of the operation
 * they describe
 * ^ means to match anything that not in the set
 */
const { LEFT_PARENTHESES, RIGHT_PARENTHESES } = AdditionalOperations;
const { ADDITION, MULTIPLICATION, DIVISION, MODULA, SUBTRACTION } = MainOperations;
const simpleValidityRegexRaw = `[^\\w\\s.${LEFT_PARENTHESES}${RIGHT_PARENTHESES}${ADDITION}${MULTIPLICATION}\\${DIVISION}${MODULA}${SUBTRACTION}]`;
export const simpleValidityRegex = new RegExp(simpleValidityRegexRaw);
