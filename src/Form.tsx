import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import type { Asset } from "./App";

interface FormProps {
  onSubmit: (asset: Asset) => void;
}

const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [asset, setAsset] = useState<Asset>({ name: "", amount: 0 });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(asset);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="name">자산명</FormLabel>
        <Input
          id="name"
          type="text"
          value={asset.name}
          onChange={(event) =>
            setAsset((prev) => ({ ...prev, name: event.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="amount">투자금액</FormLabel>
        <NumberInput
          id="amount"
          value={asset.amount || ""}
          onChange={(valueString) =>
            setAsset({ ...asset, amount: Number(valueString) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button type="submit" colorScheme="yellow" variant="outline">
        추가
      </Button>
    </form>
  );
};

export default Form;
