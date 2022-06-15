import { useState } from "react";
import Form from "./Form";
import Table from "./Table";

export interface Asset {
  name: string;
  amount: number;
}

const App = (): JSX.Element => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  return (
    <div>
      <Form onSubmit={addAsset} />
      <Table assets={assets} />
    </div>
  );
};

export default App;
