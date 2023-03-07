/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/CalculatorController.ts":
/*!************************************************!*\
  !*** ./src/controller/CalculatorController.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst interface_1 = __importDefault(__webpack_require__(/*! ./interface */ \"./src/controller/interface.ts\"));\nclass CalculatorController extends interface_1.default {\n}\nexports[\"default\"] = CalculatorController;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/controller/CalculatorController.ts?");

/***/ }),

/***/ "./src/controller/interface.ts":
/*!*************************************!*\
  !*** ./src/controller/interface.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Observer_1 = __importDefault(__webpack_require__(/*! ../lib/Observer */ \"./src/lib/Observer/index.ts\"));\nclass CalculatorControllerBaseClass {\n    constructor(model, view) {\n        this.observer = new Observer_1.default();\n        this.model = model;\n        this.model.setObservers(this.observer);\n        this.view = view;\n        this.view.setObservers(this.observer);\n        // this.view.setModel(this.model);\n        // this.view.render();\n        // Attach event listeners to buttons\n        // this.view.buttons.forEach((button: HTMLButtonElement) => {\n        //   button.addEventListener(\"click\", (e: any) => {\n        //     // this.handleButtonClick(button.innerText);\n        //     if (e.target.innerText === \"=\") return this.observer.notify(\"calculate\");\n        //     this.observer.notify(\"btnClick\", button.innerHTML);\n        //   });\n        // });\n        // this.view.expressionInput.addEventListener(\"input\", (e: any) => {\n        //   // this.model.setExpression(this.view.expressionInput.value);\n        //   this.observer.notify(\"manualInput\", e.target.value);\n        //   // this.model.calculate();\n        //   // this.view.resultInput.value = this.model.result;\n        // });\n        // this.view.expressionInput.addEventListener(\"keypress\", (event: any) => {\n        //   // If the user presses the \"Enter\" key on the keyboard\n        //   if (event.key === \"Enter\") {\n        //     this.observer.notify(\"calculate\");\n        //   }\n        // });\n        // this.observer.on(\"btnClick\", (data: any) => {\n        //   // console.log(data);\n        //   const isNumber = !isNaN(data);\n        //   const expression = `${this.model.expression}${isNumber ? \"\" : \" \"}${data}${isNumber ? \"\" : \" \"}`;\n        //   this.model.setExpression(expression);\n        //   this.view.setExpression(expression);\n        // });\n        // this.observer.on(\"calculate\", () => {\n        //   this.model.calculate();\n        //   this.view.resultInput.value = this.model.result;\n        // });\n        // this.observer.on(\"manualInput\", (data: string) => {\n        //   this.model.expression = data;\n        //   this.view.expressionInput.value = data;\n        // });\n    }\n}\nexports[\"default\"] = CalculatorControllerBaseClass;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/controller/interface.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst CalculatorController_1 = __importDefault(__webpack_require__(/*! ./controller/CalculatorController */ \"./src/controller/CalculatorController.ts\"));\nconst CalculatorModel_1 = __importDefault(__webpack_require__(/*! ./model/CalculatorModel/CalculatorModel */ \"./src/model/CalculatorModel/CalculatorModel.ts\"));\nconst CalculatorView_1 = __importDefault(__webpack_require__(/*! ./view/CalculatorView */ \"./src/view/CalculatorView/index.ts\"));\nconst model = new CalculatorModel_1.default();\nconst view = new CalculatorView_1.default();\nconst controller = new CalculatorController_1.default(model, view);\ndocument.body.appendChild(view.container);\n\n\n//# sourceURL=webpack://calculator_mvc/./src/index.ts?");

/***/ }),

/***/ "./src/lib/Calc/Calc.ts":
/*!******************************!*\
  !*** ./src/lib/Calc/Calc.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar _ExpressionEvaluator_instances, _ExpressionEvaluator_getOperation, _ExpressionEvaluator_performLastOperation, _ExpressionEvaluator_performOperation, _ExpressionEvaluator_handleParentesis, _ExpressionEvaluator_evaluateExpression, _ExpressionEvaluator_performResidualOperations, _ExpressionEvaluator_parseExpression;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Operation_1 = __importDefault(__webpack_require__(/*! ./Operation */ \"./src/lib/Calc/Operation.ts\"));\n/**\n * @description  Shunting Yard Algorithm, parses expression, splits it into operands\n * and operators and returns result of evaluation, support extending with new operations via method\n * add addNewOperation\n * @returns {number} result of evaluation\n */\nclass ExpressionEvaluator {\n    constructor() {\n        _ExpressionEvaluator_instances.add(this);\n        this.numberStack = [];\n        this.operatorStack = [];\n        this.operations = [\n            new Operation_1.default(\"+\", 1, (a, b) => a + b),\n            new Operation_1.default(\"-\", 1, (a, b) => a - b),\n            new Operation_1.default(\"*\", 2, (a, b) => a * b),\n            new Operation_1.default(\"/\", 2, (a, b) => a / b),\n            new Operation_1.default(\"^\", 3, (a, b) => Math.pow(a, b)),\n            new Operation_1.default(\"lg\", 3, (a) => Math.log10(a)),\n            new Operation_1.default(\"ln\", 3, (a) => Math.log(a)),\n            new Operation_1.default(\"exp\", 3, (a) => Math.exp(a)),\n            new Operation_1.default(\"tan\", 3, (a) => Math.tan(a)),\n            new Operation_1.default(\"(\", 0, () => 0),\n            new Operation_1.default(\")\", 0, () => 0),\n        ];\n    }\n    /**\n     * @description adds new operation to the class\n     * @param {Operation} operation  add\n     */\n    addNewOperation(operation) {\n        if (this.operations.find((op) => op.symbol === operation.symbol))\n            throw new Error(`Operation \"${operation.symbol} already exists`);\n        this.operations.push(operation);\n    }\n    evaluate(expression) {\n        var _a;\n        // const tokens = expression.split(\" \");\n        const tokens = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_parseExpression).call(this, expression);\n        // console.log(tokens);\n        tokens.forEach((ch, index) => {\n            if (!isNaN(+ch))\n                return this.numberStack.push(Number(ch));\n            // ? can be better?\n            // perform same comparision twice\n            if (ch === \"(\" || ch === \")\")\n                return __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_handleParentesis).call(this, ch);\n            const operation = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_getOperation).call(this, ch);\n            if (operation)\n                return __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_evaluateExpression).call(this, operation);\n            throw new Error(`Invalid character ${ch} at position ${index}`);\n        });\n        __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_performResidualOperations).call(this);\n        return (_a = this.numberStack.pop()) !== null && _a !== void 0 ? _a : 0;\n    }\n}\n_ExpressionEvaluator_instances = new WeakSet(), _ExpressionEvaluator_getOperation = function _ExpressionEvaluator_getOperation(operationSymbol) {\n    return this.operations.find((operation) => operation.symbol === operationSymbol);\n}, _ExpressionEvaluator_performLastOperation = function _ExpressionEvaluator_performLastOperation() {\n    const lastOperationSymbol = this.operatorStack.pop();\n    const lastOperation = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_getOperation).call(this, lastOperationSymbol);\n    if (lastOperationSymbol === \"(\")\n        throw new Error(\"Invald expression\");\n    const result = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_performOperation).call(this, lastOperation);\n    this.numberStack.push(result);\n    return lastOperationSymbol;\n}, _ExpressionEvaluator_performOperation = function _ExpressionEvaluator_performOperation(operation) {\n    const operands = [];\n    for (let i = 0; i < operation.operation.length; i++) {\n        const number = this.numberStack.pop();\n        if (isNaN(number))\n            throw new Error(\"Invalid expression\");\n        operands.push(number);\n    }\n    // reverse beacuse operands come in reverse order\n    return operation.operation(...operands.reverse());\n}, _ExpressionEvaluator_handleParentesis = function _ExpressionEvaluator_handleParentesis(symbol) {\n    if (symbol === \"(\") {\n        // just push to the operators stack and wait unitl closing parenthesis occurs\n        return this.operatorStack.push(symbol);\n    }\n    // perform all operations available in stack unitl opening parenthesis\n    // let operator;\n    do {\n        __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_performLastOperation).call(this);\n        symbol = this.operatorStack[this.operatorStack.length - 1];\n        // console.log(symbol);\n    } while (symbol !== \"(\");\n    this.operatorStack.pop();\n    // let operator = operatorStack.pop();\n    // while (operator !== \"(\") {\n    //   const result = performOperation(numberStack, operators[operator as keyof typeof operators]);\n    //   numberStack.push(result);\n    //   operator = operatorStack.pop();\n    // }\n}, _ExpressionEvaluator_evaluateExpression = function _ExpressionEvaluator_evaluateExpression(operation) {\n    if (this.operatorStack.length === 0) {\n        return this.operatorStack.push(operation.symbol);\n    }\n    // const currentOperation = this.#getOperation(operation) as Operation;\n    const prevOperation = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_getOperation).call(this, this.operatorStack[this.operatorStack.length - 1]);\n    if (operation.precedence <= prevOperation.precedence) {\n        __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_performLastOperation).call(this);\n    }\n    this.operatorStack.push(operation.symbol);\n}, _ExpressionEvaluator_performResidualOperations = function _ExpressionEvaluator_performResidualOperations() {\n    while (this.operatorStack.length > 0) {\n        const symbol = this.operatorStack.pop();\n        if (symbol === \"(\")\n            throw new Error(\"Invalid expression\");\n        const operator = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_getOperation).call(this, symbol);\n        const result = __classPrivateFieldGet(this, _ExpressionEvaluator_instances, \"m\", _ExpressionEvaluator_performOperation).call(this, operator);\n        this.numberStack.push(result);\n    }\n}, _ExpressionEvaluator_parseExpression = function _ExpressionEvaluator_parseExpression(expr) {\n    const tokens = [];\n    let currentToken = \"\";\n    const regexRaw = `[${this.operations\n        .filter((operation) => operation.symbol.length === 1)\n        .map((operation) => `\\\\${operation.symbol}`)}]`;\n    const regex = new RegExp(regexRaw);\n    // const tokens = [];\n    // let currentToken = \"\";\n    for (let i = 0; i < expr.length; i++) {\n        const char = expr.charAt(i);\n        if (char === \" \") {\n            // ignore whitespace\n            continue;\n        }\n        else if (/\\d/.test(char) || char === \".\" || (char === \"-\" && currentToken.length === 0)) {\n            // append digits and decimal points to current token\n            currentToken += char;\n        }\n        else if (regex.test(char)) {\n            // push current token and operator to tokens array\n            if (currentToken !== \"\") {\n                tokens.push(currentToken);\n                currentToken = \"\";\n            }\n            tokens.push(char);\n        }\n        else if (/[a-zA-Z]/.test(char)) {\n            // parse function name and push to tokens array\n            let functionName = char;\n            i++;\n            while (i < expr.length && /[a-zA-Z]/.test(expr.charAt(i))) {\n                functionName += expr.charAt(i);\n                i++;\n            }\n            if (currentToken !== \"\") {\n                tokens.push(currentToken);\n                currentToken = \"\";\n            }\n            tokens.push(functionName);\n            i--;\n        }\n        else if (char === \"-\" && (i === 0 || /[^\\d\\.]/.test(expr.charAt(i - 1)))) {\n            // handle negative numbers\n            currentToken = \"-\";\n        }\n        else {\n            // invalid character\n            throw new Error(`Invalid character '${char}' at position ${i}`);\n        }\n    }\n    // push last token to array (if it exists)\n    if (currentToken !== \"\") {\n        tokens.push(currentToken);\n    }\n    if (tokens[0] === \"-\") {\n        tokens.shift();\n        tokens[0] = -tokens[0];\n    }\n    return tokens;\n    // // console.log(regexRaw);\n    // for (let i = 0; i < expr.length; i++) {\n    //   const char = expr.charAt(i);\n    //   if (char === \" \") {\n    //     // ignore whitespace\n    //     continue;\n    //   } else if (/\\-?\\d/.test(char) || char === \".\") {\n    //     // append digits and decimal points to current token\n    //     currentToken += char;\n    //   } else if (regex.test(char)) {\n    //     // push current token and operator to tokens array\n    //     if (currentToken !== \"\") {\n    //       tokens.push(currentToken);\n    //       currentToken = \"\";\n    //     }\n    //     tokens.push(char);\n    //   } else if (/[a-zA-Z]/.test(char)) {\n    //     // parse function name and push to tokens array\n    //     let functionName = char;\n    //     i++;\n    //     while (i < expr.length && /[a-zA-Z]/.test(expr.charAt(i))) {\n    //       functionName += expr.charAt(i);\n    //       i++;\n    //     }\n    //     if (currentToken !== \"\") {\n    //       tokens.push(currentToken);\n    //       currentToken = \"\";\n    //     }\n    //     tokens.push(functionName);\n    //     i--;\n    //   } else {\n    //     // invalid character\n    //     throw new Error(`Invalid character '${char}' at position ${i}`);\n    //   }\n    // }\n    // // push last token to array (if it exists)\n    // if (currentToken !== \"\") {\n    //   tokens.push(currentToken);\n    // }\n    // console.log(tokens)\n    // return tokens;\n};\nexports[\"default\"] = ExpressionEvaluator;\nconst exp = \"-2 - 3 - 5\";\nconst calc = new ExpressionEvaluator();\nconst res = calc.evaluate(exp);\n// console.log(res);\n\n\n//# sourceURL=webpack://calculator_mvc/./src/lib/Calc/Calc.ts?");

/***/ }),

/***/ "./src/lib/Calc/Operation.ts":
/*!***********************************!*\
  !*** ./src/lib/Calc/Operation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Operation {\n    constructor(symbol, precedence, operation) {\n        this.symbol = symbol;\n        this.precedence = precedence;\n        this.operation = operation;\n    }\n}\nexports[\"default\"] = Operation;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/lib/Calc/Operation.ts?");

/***/ }),

/***/ "./src/lib/Calc/index.ts":
/*!*******************************!*\
  !*** ./src/lib/Calc/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Operation = exports[\"default\"] = void 0;\nvar Calc_1 = __webpack_require__(/*! ./Calc */ \"./src/lib/Calc/Calc.ts\");\nObject.defineProperty(exports, \"default\", ({ enumerable: true, get: function () { return __importDefault(Calc_1).default; } }));\nvar Operation_1 = __webpack_require__(/*! ./Operation */ \"./src/lib/Calc/Operation.ts\");\nObject.defineProperty(exports, \"Operation\", ({ enumerable: true, get: function () { return __importDefault(Operation_1).default; } }));\n\n\n//# sourceURL=webpack://calculator_mvc/./src/lib/Calc/index.ts?");

/***/ }),

/***/ "./src/lib/Observer/Observer.ts":
/*!**************************************!*\
  !*** ./src/lib/Observer/Observer.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Observer {\n    constructor() {\n        this.observers = new Map();\n    }\n    on(evt, fn) {\n        var _a;\n        if (this.observers.has(evt))\n            return (_a = this.observers.get(evt)) === null || _a === void 0 ? void 0 : _a.push(fn);\n        this.observers.set(evt, [fn]);\n    }\n    // subscribe(func: any) {\n    //   this.observers.push(func);\n    // }\n    unsubscribe(evt, func) {\n        if (this.observers.get(evt))\n            return this.observers.set(evt, this.observers.get(evt).filter((fn) => fn != func));\n    }\n    notify(evt, data) {\n        var _a;\n        (_a = this.observers.get(evt)) === null || _a === void 0 ? void 0 : _a.forEach((subscription) => subscription(data));\n    }\n}\nexports[\"default\"] = Observer;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/lib/Observer/Observer.ts?");

/***/ }),

/***/ "./src/lib/Observer/index.ts":
/*!***********************************!*\
  !*** ./src/lib/Observer/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = void 0;\nvar Observer_1 = __webpack_require__(/*! ./Observer */ \"./src/lib/Observer/Observer.ts\");\nObject.defineProperty(exports, \"default\", ({ enumerable: true, get: function () { return __importDefault(Observer_1).default; } }));\n\n\n//# sourceURL=webpack://calculator_mvc/./src/lib/Observer/index.ts?");

/***/ }),

/***/ "./src/model/CalculatorModel/CalculatorModel.ts":
/*!******************************************************!*\
  !*** ./src/model/CalculatorModel/CalculatorModel.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Calc_1 = __importDefault(__webpack_require__(/*! ../../lib/Calc */ \"./src/lib/Calc/index.ts\"));\nconst interface_1 = __importDefault(__webpack_require__(/*! ../interface */ \"./src/model/interface.ts\"));\nclass CalculatorModel extends interface_1.default {\n    constructor() {\n        super(...arguments);\n        this.calculator = new Calc_1.default();\n    }\n    calculate() {\n        try {\n            const result = this.calculator.evaluate(this.expression);\n            this.setResult(result);\n            return result;\n        }\n        catch (error) {\n            const errorMsg = error.message;\n            this.setResult(errorMsg);\n            // console.log(error);\n            return errorMsg;\n            // throw new Error(errorMsg);\n        }\n    }\n    setObservers(observer) {\n        observer.on(\"calculate\", () => {\n            const result = this.calculate();\n            observer.notify(\"calculated\", result);\n        });\n        observer.on(\"expressionInputChange\", (data) => {\n            // const isNumber = !isNaN(+data);\n            // const expression = `${this.expression}${isNumber ? \"\" : \" \"}${data}${isNumber ? \"\" : \" \"}`;\n            this.setExpression(data);\n        });\n        observer.on(\"clearExpressionInput\", () => {\n            this.setExpression(\"\");\n            this.setResult(\"\");\n        });\n    }\n}\nexports[\"default\"] = CalculatorModel;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/model/CalculatorModel/CalculatorModel.ts?");

/***/ }),

/***/ "./src/model/interface.ts":
/*!********************************!*\
  !*** ./src/model/interface.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass CalculatorModelBaseClass {\n    constructor() {\n        this.expression = \"\";\n        this.result = \"\";\n    }\n    setExpression(expression) {\n        this.expression = expression;\n    }\n    setResult(result) {\n        this.result = result;\n    }\n    getResult() {\n        return this.result;\n    }\n}\nexports[\"default\"] = CalculatorModelBaseClass;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/model/interface.ts?");

/***/ }),

/***/ "./src/view/CalculatorView/CalculatorView.ts":
/*!***************************************************!*\
  !*** ./src/view/CalculatorView/CalculatorView.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst interface_1 = __importDefault(__webpack_require__(/*! ../interface */ \"./src/view/interface.ts\"));\nconst elements_1 = __webpack_require__(/*! ./utils/elements */ \"./src/view/CalculatorView/utils/elements.ts\");\nclass CalculatorView extends interface_1.default {\n    constructor() {\n        super();\n        // this.model = null;\n        this.container = document.createElement(\"div\");\n        this.container.classList.add(\"calculator\", \"d-flex\", \"flex-column\", \"my-5\");\n        const inputContainer = document.createElement(\"div\");\n        inputContainer.classList.add(\"d-flex\", \"flex-column\", \"align-items-center\");\n        this.container.appendChild(inputContainer);\n        // attach input from keyboard\n        this.expressionInput = new elements_1.ExpressionInput(inputContainer).expressionInput;\n        // Create the result input field\n        this.resultInput = new elements_1.ResultInput(inputContainer).resultInput;\n        // Create the button container\n        const buttonContainer = new elements_1.ButtonContainer();\n        this.buttons = buttonContainer.buttons;\n        // Create the buttons\n        // example text\n        const example = document.createElement(\"p\");\n        example.innerHTML = \"Example of expression: ( 1 + 2 ) * 3. Use parentheses to get the priorities right\";\n        example.classList.add(\"text-center\", \"mt-5\");\n        this.container.appendChild(buttonContainer.buttonContainer);\n        this.container.appendChild(example);\n    }\n    setExpression(expression) {\n        this.expressionInput.value = expression;\n    }\n    getExpression() {\n        return this.expressionInput.value;\n    }\n    setResult(result) {\n        this.resultInput.value = result;\n    }\n    setObservers(observer) {\n        // set event broadcasting for button clicks\n        this.buttons.forEach((button) => {\n            let clickHandler;\n            if (button.innerHTML === \"=\")\n                clickHandler = () => {\n                    observer.notify(\"calculate\", button.innerHTML);\n                };\n            else if (button.innerHTML == \"C\")\n                clickHandler = () => {\n                    observer.notify(\"clearExpressionInput\");\n                    this.setExpression(\"\");\n                    this.setResult(\"\");\n                };\n            else {\n                clickHandler = (e) => {\n                    const data = e.target.innerHTML;\n                    const isNumber = !isNaN(+data);\n                    const expression = `${this.expressionInput.value}${isNumber ? \"\" : \" \"}${data}${isNumber ? \"\" : \" \"}`;\n                    this.setExpression(expression);\n                    observer.notify(\"expressionInputChange\", expression);\n                };\n            }\n            button.addEventListener(\"click\", clickHandler);\n        });\n        // set event broadcasting for input\n        this.expressionInput.addEventListener(\"input\", (e) => {\n            observer.notify(\"expressionInputChange\", e.target.value);\n        });\n        // evaluate event\n        this.expressionInput.addEventListener(\"keypress\", (event) => {\n            // If the user presses the \"Enter\" key on the keyboard\n            if (event.key === \"Enter\") {\n                observer.notify(\"calculate\");\n            }\n        });\n        observer.on(\"calculated\", (data) => {\n            this.setResult(data);\n        });\n    }\n}\nexports[\"default\"] = CalculatorView;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/view/CalculatorView/CalculatorView.ts?");

/***/ }),

/***/ "./src/view/CalculatorView/index.ts":
/*!******************************************!*\
  !*** ./src/view/CalculatorView/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = void 0;\nvar CalculatorView_1 = __webpack_require__(/*! ./CalculatorView */ \"./src/view/CalculatorView/CalculatorView.ts\");\nObject.defineProperty(exports, \"default\", ({ enumerable: true, get: function () { return __importDefault(CalculatorView_1).default; } }));\n\n\n//# sourceURL=webpack://calculator_mvc/./src/view/CalculatorView/index.ts?");

/***/ }),

/***/ "./src/view/CalculatorView/utils/elements.ts":
/*!***************************************************!*\
  !*** ./src/view/CalculatorView/utils/elements.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ButtonContainer = exports.ResultInput = exports.ExpressionInput = void 0;\nclass ExpressionInput {\n    constructor(inputContainer) {\n        // Create the expression input field\n        const expressionInputContainer = document.createElement(\"div\");\n        expressionInputContainer.classList.add(\"input-group\", \"input-group-sm\", \"mb-3\", \"w-25\");\n        expressionInputContainer.innerHTML = `\n  <div class=\"input-group-prepend\">\n    <span class=\"input-group-text\" id=\"expressionInput\">Expression</span>\n  </div>\n  \n  `;\n        this.expressionInput = document.createElement(\"input\");\n        this.expressionInput.classList.add(\"form-control\");\n        this.expressionInput.id = \"expressionInput\";\n        this.expressionInput.type = \"text\";\n        this.expressionInput.autofocus = true;\n        expressionInputContainer.appendChild(this.expressionInput);\n        inputContainer.appendChild(expressionInputContainer);\n    }\n}\nexports.ExpressionInput = ExpressionInput;\nclass ResultInput {\n    constructor(inputContainer) {\n        const resultContainer = document.createElement(\"div\");\n        resultContainer.classList.add(\"input-group\", \"input-group-sm\", \"mb-3\", \"d-flex\", \"justify-content-center\");\n        resultContainer.innerHTML = `\n    <div class=\"input-group-prepend\">\n      <span class=\"input-group-text\" id=\"resultInput\">Result</span>\n    </div>`;\n        this.resultInput = document.createElement(\"input\");\n        this.resultInput.id = \"resultInput\";\n        this.resultInput.classList.add('form-control\"');\n        this.resultInput.type = \"text\";\n        this.resultInput.disabled = true;\n        resultContainer.appendChild(this.resultInput);\n        inputContainer.appendChild(resultContainer);\n    }\n}\nexports.ResultInput = ResultInput;\nclass ButtonContainer {\n    constructor() {\n        this.buttons = [];\n        this.buttonContainer = document.createElement(\"div\");\n        this.buttonContainer.classList.add(\"buttons\", \"container\", \"text-center\", \"w-25\");\n        const buttonValues = [\n            [\"7\", \"8\", \"9\", \"+\"],\n            [\"4\", \"5\", \"6\", \"-\"],\n            [\"1\", \"2\", \"3\", \"*\"],\n            [\"C\", \"0\", \"=\", \"/\"],\n        ];\n        buttonValues.forEach((row) => {\n            const buttonRow = document.createElement(\"div\");\n            buttonRow.classList.add(\"button-row\", \"row\");\n            row.forEach((buttonValue) => {\n                const button = document.createElement(\"button\");\n                button.classList.add(\"col\", \"m-1\", \"btn\", \"btn-outline-primary\");\n                if (buttonValue === \"0\")\n                    button.classList.add(\"w-200\");\n                button.innerText = buttonValue;\n                buttonRow.appendChild(button);\n                this.buttons.push(button);\n            });\n            this.buttonContainer.appendChild(buttonRow);\n        });\n    }\n}\nexports.ButtonContainer = ButtonContainer;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/view/CalculatorView/utils/elements.ts?");

/***/ }),

/***/ "./src/view/interface.ts":
/*!*******************************!*\
  !*** ./src/view/interface.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass CalculatorViewBaseClass {\n}\nexports[\"default\"] = CalculatorViewBaseClass;\n\n\n//# sourceURL=webpack://calculator_mvc/./src/view/interface.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;