import { TextField } from "@mui/material";
import { ValidatorType } from "../../../features/form";
import { FormEvent, useState } from "react";

// TODO: update this; refer to text-field-with-slider
export const FormTextField: React.FC<{
  defaultValue: string;
  validator: ValidatorType;
}> = ({ defaultValue, validator }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: FormEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const val = event.currentTarget?.value;
    const result = validator.func(val);
    if (result === true) {
      // TODO: update redux store - shape properties of the selected shape
      console.log("set to store");
      setError(null);
    } else {
      setError(result);
    }
  };

  return <TextField variant="outlined" size="small" label="Colour" defaultValue={defaultValue} onChange={handleChange} error={!!error} helperText={error} />;
};
