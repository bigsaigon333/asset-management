import { ChangeEventHandler, FormEventHandler, useState } from "react";
import type { Asset } from "./App";

interface FormProps {
  onSubmit: (asset: Asset) => void;
}

const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [asset, setAsset] = useState<Asset>({ name: "", amount: 0 });
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAsset((prev) => ({
      ...prev,
      [event.target.id]:
        event.target.id === "amount"
          ? event.target.valueAsNumber || 0
          : event.target.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit(asset);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">자산명</label>
        <input id="name" type="text" value={asset.name} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="amount">투자금액</label>
        <input
          id="amount"
          type="number"
          value={asset.amount || ""}
          onChange={onChange}
        />
      </div>
      <button type="submit">추가</button>
    </form>
  );
};

export default Form;
