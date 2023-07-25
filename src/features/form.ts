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

// const validate = (
//   // setter: React.Dispatch<React.SetStateAction<any>>, //
//   validator: (val: any) => true | string,
//   errorSetter: React.Dispatch<React.SetStateAction<string | null>>
// ): ((e: FormEvent<any>) => void) => {
//   return (event: FormEvent<HTMLInputElement>) => {
//     const val = event.currentTarget?.value;
//     if (val) {
//       const result = validator(val);
//       if (result === true) {
//         // setter(event);
//         errorSetter(null);
//       } else {
//         errorSetter(result);
//       }
//     }
//   };
// };
