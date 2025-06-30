import type { Auction, AuctionState, BidType, Category, PinAuction } from "../../interfaces/auctionInterface";

export interface AuctionStoreInterface {
  auctions: Auction[];
  pinnedAuctions: PinAuction[];
  auctionsHistory: Auction[];
  categories: Category[];
  auctionsStates: AuctionState[];
  bidTypes: BidType[];

  isLoading: boolean;
  error: string | null;

  fetchData: (userId: string) => void;
  savePin: (userId: string, auctionId: string) => void;
  removePin: (pinAuctionId: string) => void;
}