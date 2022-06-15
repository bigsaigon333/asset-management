import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import type { Asset } from "./App";
import { formatDate } from "./utils";

interface FormProps {
  onSubmit: (asset: Asset) => void;
}

const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [value, setValue] = useState<Asset>({
    name: "",
    purchaseAmount: 0,
    purchaseDate: new Date(Date.now()),
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid rowGap={4}>
        <FormControl>
          <FormLabel htmlFor="name">자산명</FormLabel>
          <Input
            id="name"
            type="text"
            value={value.name}
            onChange={(event) =>
              setValue((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="purchaseDate">매입일시</FormLabel>
          <Input
            id="purchaseDate"
            type="date"
            value={formatDate(value.purchaseDate)}
            onChange={(event) => {
              setValue((prev) => ({
                ...prev,
                purchaseDate: new Date(event.target.value),
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="purchaseAmount">투자금액</FormLabel>
          <NumberInput
            id="purchaseAmount"
            value={value.purchaseAmount || ""}
            onChange={(valueString) =>
              setValue({ ...value, purchaseAmount: Number(valueString) })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button
          type="submit"
          colorScheme="yellow"
          variant="outline"
          width="full"
        >
          추가
        </Button>
      </Grid>
    </form>
  );
};

export default Form;
