import { create } from "zustand";
import type { auctionRoomStoreInterface } from "./interfaces/auctionRoomStoreInterface";
import type { Auction } from "../interfaces/auctionInterface";
import type { AuctionBidRequest } from "../services/models/auctionModels"
import { getAuctionBidById, getAuctionById, saveAuctionBid } from "../services/auctionService";

export const useAuctionRoomStore = create<auctionRoomStoreInterface>((set) => ({
  auction: {} as Auction,
  bids: [],

  isLoading: false,
  error: null,

  fetchData: async (auctionId: string) => {
    try {
      set({ isLoading: true });
      const [
        auctionResponse,
        bidsResponseRaw
      ] = await Promise.all([
        getAuctionById(auctionId),
        getAuctionBidById(auctionId)
      ]);
      const bidsResponse = bidsResponseRaw.sort((a, b) => b.bid - a.bid);
      set({ auction: auctionResponse, bids: bidsResponse });
      set({ auction: auctionResponse, bids: bidsResponse })
    }
    catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    }
    finally {
      set({ isLoading: false });
    }
  },

  publishBid: async ({ auctionId, bid, userId }: AuctionBidRequest) => {
    try {
      set({ isLoading: true });
      const bidResponse = await saveAuctionBid({ auctionId, bid, userId })
      if (!bidResponse) {
        throw new Error("Error Creating pin auction")
      }
      set((state) => ({
        bids: [ bidResponse, ...state.bids],
        error: null
      }))
    }
    catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    }
    finally {
      set({ isLoading: false });
    }
  }
}))