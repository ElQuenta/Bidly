export interface PinAuctionRequest {
  userId: string;
  auctionId: string;
}

export interface AuctionBidRequest {
  userId: string;
  auctionId: string;
  bid: number
}

export interface AuctionRequest {
  product: {
    name: string;
    image: string;
    mainCategory: string;
    categories: string[];
    description: string;
  };
  state: string;
  endDate: Date;
  bidType: string;
  price: number;
}

export interface AuctionEditRequest {
  product: {
    name: string;
    image: string;
    mainCategory: string;
    categories: string[];
    description: string;
  };
  id:string;
  state: string;
  endDate: Date;
  bidType: string;
  price: number;
}