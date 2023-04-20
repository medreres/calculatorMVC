import { Document } from "./interfaces";

export const renameProperty = (obj: Document, old_key: string, new_key: string) => {
  if (old_key !== new_key && old_key in obj) {
    Object.defineProperty(obj, new_key, Object.getOwnPropertyDescriptor(obj, old_key)!);
    delete obj[old_key];
  }
};
