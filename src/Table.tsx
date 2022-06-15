import {
  Table as UITable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatDate } from "./utils";
import type { Asset } from "./App";

interface TableProps {
  assets: Asset[];
}

const Table = ({ assets }: TableProps): JSX.Element => {
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
          </Tr>
        </Thead>
        <Tbody>
          {assets.map(({ name, amount, purchaseDate }) => (
            <Tr key={name}>
              <Td>{name}</Td>
              <Td>{formatDate(purchaseDate)}</Td>
              <Td isNumeric>{amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </UITable>
    </TableContainer>
  );
};

export default Table;
