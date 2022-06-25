export interface Asset {
  name: string;
  purchaseAmount: number;
  purchaseDate: Date;
}

export interface PostedAsset extends Asset {
  key: string;
}
