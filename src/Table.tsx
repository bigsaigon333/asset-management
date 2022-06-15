import {
  Table as UITable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
            <Th>자산명</Th>
            <Th>금액</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets.map(({ name, amount }) => (
            <Tr key={name}>
              <Td>{name}</Td>
              <Td isNumeric>{amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </UITable>
    </TableContainer>
  );
};

export default Table;
