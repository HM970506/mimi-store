export const requiredRule = (value: string) => {
  return [{ required: true, message: `${value} is empty` }];
};
