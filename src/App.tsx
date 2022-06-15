import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import Form from "./Form";
import Table from "./Table";

export interface Asset {
  name: string;
  purchaseAmount: number;
  purchaseDate: Date;
}

const App = (): JSX.Element => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  return (
    <div>
      <Form onSubmit={addAsset} />
      <Divider margin="8" />
      <Table assets={assets} />
    </div>
  );
};

export default App;
