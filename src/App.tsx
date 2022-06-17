import { Box, Button, Divider } from "@chakra-ui/react";
import { useState } from "react";
import Form from "./Form";
import { useKey } from "./hooks";
import Table from "./Table";
import { useAuth } from "./context/auth";

export interface Asset {
  name: string;
  purchaseAmount: number;
  purchaseDate: Date;
}

const App = (): JSX.Element => {
  const { isSignIn, signIn } = useAuth();
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
        {isSignIn ? (
          <Button type="button" width={"5rem"}>
            로그아웃
          </Button>
        ) : (
          <Button type="button" onClick={signIn} width={"5rem"}>
            로그인
          </Button>
        )}
      </Box>
      <Form key={formKey} onSubmit={addAsset} />
      <Divider margin="8" />
      <Table key={tableKey} assets={assets} />
    </>
  );
};

export default App;
