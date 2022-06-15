import { useState } from "react";
import "./App.css";
import Form from "./Form";

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
      {assets.map(({ name, amount }) => (
        <p>
          <span>{name}</span>
          <span>{amount}</span>
        </p>
      ))}
    </div>
  );
};

export default App;
