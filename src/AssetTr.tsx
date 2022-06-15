import { NumberInput, NumberInputField, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import type { Asset } from "./App";
import { formatDate, formatRate } from "./utils";

interface AssetTrProps extends Asset {}

const AssetTr = ({
  name,
  purchaseAmount,
  purchaseDate,
}: AssetTrProps): JSX.Element => {
  const [currentAmount, setCurrentAmount] = useState(purchaseAmount);

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{formatDate(purchaseDate)}</Td>
      <Td isNumeric>{purchaseAmount}</Td>
      <Td isNumeric>
        <NumberInput
          id="currentAmount"
          value={currentAmount}
          onChange={(valueString) => setCurrentAmount(Number(valueString))}
        >
          <NumberInputField />
        </NumberInput>
      </Td>
      <Td isNumeric>
        {formatRate((currentAmount - purchaseAmount) / purchaseAmount)}
      </Td>
    </Tr>
  );
};

export default AssetTr;
