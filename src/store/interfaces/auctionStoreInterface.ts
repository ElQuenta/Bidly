import type { Auction, AuctionState, BidType, Category, PinAuction } from "../../interfaces/auctionInterface";
import type { AuctionEditRequest, AuctionRequest } from "../../services/models/auctionModels";

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

  publishAuction: (auction: AuctionRequest) => Promise<void>;
  editAuction: (auction: AuctionEditRequest) => Promise<void>;
  deleteAuction: (auctionId: string) => Promise<void>;
  closeAuction: (auctionId: string) => Promise<void>;
}