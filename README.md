# Description

Simple implementation of calculator written on typescript using MVC pattern. Calculating occurs using either Shunting Yard Algorithm or Regular Expressions

# Usage

## Adding new operations

To add a new operation, define it via Operation class
and invoke addOperation() on controller.
Validity of operation being added is on developer's shoulders

Example

```
import { Notation } from "./lib/Calculator/Operation/interfaces";
import CalculatorController from "./controller/CalculatorController/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

const modula = new Operation("%", 3, Notation.INFIX, (a: number, b: number) => a % b);
controller.addOperation(modula);

document.body.appendChild(controller.getView());
```

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
