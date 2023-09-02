export interface ValidatorType {
  func: (val: any) => true | string;
}

export const validator: Record<string, ValidatorType> = {
  numberOnly: {
    func: (val: any) => (Number(val) ? true : "Only accepts numerical value"),
  },
  positiveNumberOnly: {
    func: (val: any) => (Number(val) && val > 0 ? true : "Only positive number"),
  },
  integerOnly: {
    func: (val: any) => (Number.isInteger(Number(val)) ? true : "Only accepts integer value"),
  },
  positiveIntegerOnly: {
    func: (val: any) => (Number.isInteger(Number(val)) && Number(val) > 0 ? true : "Only positive integer"),
  },
};
