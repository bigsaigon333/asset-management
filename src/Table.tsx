import {
  IconButton,
  NumberInput,
  NumberInputField,
  Table as UITable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { add, formatDate, formatRate } from "./utils";
import { Asset } from "./type";

interface TableProps {
  assets: Asset[];
}

const Table = ({ assets }: TableProps): JSX.Element => {
  const [currentAmounts, setCurrentAmounts] = useState<number[]>(
    assets.map(({ purchaseAmount }) => purchaseAmount)
  );

  const totalPurchaseAmount = assets
    .map(({ purchaseAmount }) => purchaseAmount)
    .reduce(add, 0);
  const totalCurrentAmount = currentAmounts.reduce(add, 0);

  return (
    <TableContainer>
      <UITable variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Text align="left">자산명</Text>
            </Th>
            <Th>
              <Text align="left">매입일시</Text>
            </Th>
            <Th>
              <Text align="right">매입금액</Text>
            </Th>
            <Th>
              <Text align="right">현재금액</Text>
            </Th>
            <Th>
              <Text align="right">수익률</Text>
            </Th>
            <Th>
              <Text align="left">비고</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets
            .map((asset, index) => ({
              ...asset,
              currentAmount: currentAmounts[index],
              setCurrentAmount: (newAmount: number) =>
                setCurrentAmounts((prev) => [
                  ...prev.slice(0, index),
                  newAmount,
                  ...prev.slice(index + 1),
                ]),
            }))
            .map(
              ({
                name,
                purchaseAmount,
                purchaseDate,
                currentAmount,
                setCurrentAmount,
              }) => (
                <Tr key={name}>
                  <Td>{name}</Td>
                  <Td>{formatDate(purchaseDate)}</Td>
                  <Td isNumeric>{purchaseAmount}</Td>
                  <Td isNumeric>
                    <NumberInput
                      id="currentAmount"
                      value={currentAmount}
                      onChange={(valueString) =>
                        setCurrentAmount(Number(valueString))
                      }
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td isNumeric>
                    {formatRate(
                      (currentAmount - purchaseAmount) / purchaseAmount
                    )}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label={"삭제"}
                      icon={<i style={{ fontStyle: "normal" }}>🗑</i>}
                      onClick={() => window.alert("Hello, world")}
                    />
                  </Td>
                </Tr>
              )
            )}
          {assets.length > 0 && (
            <Tr>
              <Td>
                <Text fontWeight="bold">합계</Text>
              </Td>
              <Td>-</Td>
              <Td isNumeric>
                <Text fontWeight="bold">{totalPurchaseAmount}</Text>
              </Td>
              <Td isNumeric>
                <Text fontWeight="bold">{totalCurrentAmount}</Text>
              </Td>
              <Td isNumeric>
                <Text fontWeight="bold">
                  {formatRate(
                    (totalCurrentAmount - totalPurchaseAmount) /
                      totalPurchaseAmount
                  )}
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </UITable>
    </TableContainer>
  );
};

export default Table;
