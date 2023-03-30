# Description

Simple implementation of calculator written on typescript using MVC pattern. Calculating occurs using either Shunting Yard Algorithm or Regular Expressions

# Usage

## Adding new operations

To add a new operation, define it via Operation class
and invoke addOperation() on controller.
Validity of operation being added is on developer's shoulders

Example

Adding via addNewOperation method

```ts
import { Notation } from "./lib/Calculator/Operation/interfaces";
import CalculatorController from "./controller/CalculatorController/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

const modula = new Operation("%", 3, Notation.INFIX, (a: number, b: number) => a % b);
controller.addNewOperation(modula);

document.body.appendChild(controller.getView());
```

or via config in `lib/Calculator/config.ts`

## Adding new constants

Adding via addNewConstant method

// TODO remove adding operations
```ts
import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";


const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

controller.addNewConstant('G', 9.81)
```

or via config in `lib/Calculator/config.ts`

# Technologies

- TypeScript
- Jest
- Webpack
- Bootstrap

# How to run

```
npm i
npm run dev
```

# Testing

To run the tests

```
npm test
```
