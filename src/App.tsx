import { Box, Button, Divider } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import { useKey } from "./hooks";
import Table from "./Table";
import { useAuth } from "./context/auth";
import { Asset, PostedAsset } from "./type";
import { postAsset, readAssets } from "./firebase";

const App = (): JSX.Element => {
  const { isSignIn, signIn, signOut } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [formKey, formKeyNext] = useKey();
  const [tableKey, tableKeyNext] = useKey();

  const sync = useCallback(async () => {
    return readAssets().then((values) => {
      if (values == null) {
        return;
      }

      setAssets(
        values.sort(
          (a, b) => a.purchaseDate.getUTCDate() - b.purchaseDate.getUTCDate()
        )
      );
    });
  }, [setAssets]);

  useEffect(() => {
    if (isSignIn) {
      sync().then(tableKeyNext);
    }
  }, [isSignIn, sync, tableKeyNext]);

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
    formKeyNext();
    tableKeyNext();

    postAsset(asset);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        {isSignIn ? (
          <Button type="button" onClick={signOut} width={"5rem"}>
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
      {isSignIn && (
        <Table
          key={tableKey}
          assets={assets as PostedAsset[]}
          onDelete={sync}
        />
      )}
    </>
  );
};

export default App;
