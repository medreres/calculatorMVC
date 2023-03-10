import { Operation } from "../lib/Calculator";

export const isValidOperation = (operation: Operation) => {
    try {
      const operationBody = operation.operation;
      const args = [];
      for (let i = 0; i < operationBody.length; i++) {
        args.push(Math.random() * 100);
      }
  
      // check for validity
      const res = operationBody(...args);
  
      if (!isNaN(res)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  