import {
  Table as UITable,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { Asset } from "./App";
import AssetTr from "./AssetTr";

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
            <Th>
              <Text align="right">현재금액</Text>
            </Th>
            <Th>
              <Text align="right">수익률</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets.map((asset) => (
            <AssetTr key={asset.name} {...asset} />
          ))}
        </Tbody>
      </UITable>
    </TableContainer>
  );
};

export default Table;
