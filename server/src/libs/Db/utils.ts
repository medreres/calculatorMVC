export const renameProperty = (obj: object, old_key: string, new_key: string) => {
  if (old_key !== new_key) {
    Object.defineProperty(obj, new_key, Object.getOwnPropertyDescriptor(obj, old_key)!);
    delete obj[old_key as keyof typeof obj];
  }
};
