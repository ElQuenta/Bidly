import type { Auction, AuctionBid } from "../../interfaces/auctionInterface";
import type { AuctionBidRequest } from "../../services/models/auctionModels";

export interface auctionRoomStoreInterface {
  auction: Auction;
  bids: AuctionBid[];

  isLoading: boolean;
  error: string | null;

  fetchData: (auctionId: string) => void;
  publishBid: ({ auctionId, bid, userId }: AuctionBidRequest) => void;
}