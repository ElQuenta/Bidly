export interface Category {
  id: string;
  name: string;
}

export interface AuctionState {
  id: string;
  name: string;
}

export interface BidType {
  id: string;
  name: string;
}

export interface PinAuction {
  id: string;
  userId: string;
  auctionId: string;
}

export interface Auction {
  id: string;
  product: {
    name: string;
    image: string;
    mainCategory: string;
    categories: string[]
  };
  state: string;
  endDate: string;
  bidType: string;
  price: number;
}

export interface AuctionBid {
  id: string;
  userId: string;
  auctionId: string;
  bid: number
}