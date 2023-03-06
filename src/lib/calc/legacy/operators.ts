export interface IOperator {
  operate: (...args: number[]) => number;
  operands: number;
  priority: number;
}

const operators: {
  [key: string]: IOperator;
} = {
  "+": {
    operate: (num1: number, num2: number) => num1 + num2,
    operands: 2,
    priority: 1,
  },
  "-": {
    operate: (num1: number, num2: number) => num1 - num2,
    operands: 2,
    priority: 1,
  },
  "*": {
    operate: (num1: number, num2: number) => num1 * num2,
    operands: 2,
    priority: 2,
  },
  "/": {
    operate: (num1: number, num2: number) => num1 / num2,
    operands: 2,
    priority: 2,
  },
  "^": {
    operate: (num1: number, num2: number) => num1 ** num2,
    operands: 2,
    priority: 3,
  },
  lg: {
    operate: (num1: number) => Math.log10(num1),
    operands: 1,
    priority: 3,
  },
  ln: {
    operate: (num1: number) => Math.log(num1),
    operands: 1,
    priority: 3,
  },
  "!": {
    operate: (num1: number) => {
      function fact(n: number): number {
        if (n === 0 || n === 1) {
          return 1;
        } else return n * fact(n - 1);
      }

      return fact(num1);
    },
    operands: 1,
    priority: 3,
  },
  "(": {
    operate: () => 0,
    operands: 0,
    // priority is some big number to make algorithms respect priority
    priority: 0,
  },
  exp: {
    operate: (num: number) => Math.exp(num),
    operands: 1,
    priority: 3,
  },
  tan: {
    operate: (num: number) => Math.tan(num),
    operands: 1,
    priority: 3,
  },
};

export default operators;
