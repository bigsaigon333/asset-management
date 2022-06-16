import { Box, Button, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { signIn } from "./firebase";
import Form from "./Form";
import { useKey } from "./hooks";
import Table from "./Table";

export interface Asset {
  name: string;
  purchaseAmount: number;
  purchaseDate: Date;
}

const App = (): JSX.Element => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [formKey, formKeyNext] = useKey();
  const [tableKey, tableKeyNext] = useKey();

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
    formKeyNext();
    tableKeyNext();
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button type="button" onClick={signIn}>
          로그인
        </Button>
      </Box>
      <Form key={formKey} onSubmit={addAsset} />
      <Divider margin="8" />
      <Table key={tableKey} assets={assets} />
    </>
  );
};

export default App;
