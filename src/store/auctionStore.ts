import { create } from "zustand";

import type { AuctionStoreInterface } from "./interfaces/auctionStoreInterface"
import { closeAuction, deleteAuction, editAuction, fetchAuction, fetchAuctionState, fetchBidType, fetchCategories, getAuctionHistory, getPinAuctionById, publishAuction, removePinAuction, savePinAuction } from "../services/auctionService";

export const useAuctionsCatalogStore = create<AuctionStoreInterface>((set) => ({
  auctions: [],
  auctionsHistory: [],
  pinnedAuctions: [],

  auctionsStates: [],
  categories: [],
  bidTypes: [],

  isLoading: false,
  error: null,

  fetchData: async (userId: string) => {
    try {
      set({ isLoading: true });

      const [
        auctionsResponse,
        auctionsHistoryResponse,
        pinnedAuctionsResponse,
        auctionsStatesResponse,
        categoriesResponse,
        bidTypesResponse
      ] = await Promise.all([
        fetchAuction(),
        getAuctionHistory(userId),
        getPinAuctionById(userId),
        fetchAuctionState(),
        fetchCategories(),
        fetchBidType()
      ]);
      const endedCatalog = auctionsResponse.filter((auction) => auction.state === "ended")
      const sealedCatalog = auctionsResponse.filter((auction) => auction.state === "sealed bid auction")
      const currentCatalog = auctionsResponse.filter((auction) => auction.state === "current bid")
      set({
        auctions: [...currentCatalog, ...sealedCatalog, ...endedCatalog],
        auctionsHistory: auctionsHistoryResponse,
        pinnedAuctions: pinnedAuctionsResponse,
        auctionsStates: auctionsStatesResponse,
        bidTypes: bidTypesResponse,
        categories: categoriesResponse
      })
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

  savePin: async (userId: string, auctionId: string) => {
    try {
      set({ isLoading: true });
      const pinAuction = await savePinAuction({ userId, auctionId })
      if (!pinAuction) {
        throw new Error("Error Creating pin auction")
      }
      set((state) => ({
        pinnedAuctions: [...state.pinnedAuctions, pinAuction],
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
  },
  removePin: async (pinAuctionId: string) => {
    try {
      set({ isLoading: true });
      await removePinAuction(pinAuctionId)
      set((state) => ({
        pinnedAuctions: state.pinnedAuctions.filter((auction) => auction.id !== pinAuctionId),
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
  },
    publishAuction: async (auctionRequest) => {
    try {
      set({ isLoading: true });
      const newAuction = await publishAuction(auctionRequest);
      set((state) => ({
        auctions: [...state.auctions, newAuction],
        error: null
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  editAuction: async (auctionEdit) => {
    try {
      set({ isLoading: true });
      const updatedAuction = await editAuction(auctionEdit);
      set((state) => ({
        auctions: state.auctions.map((a) => a.id === updatedAuction.id ? updatedAuction : a),
        error: null
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAuction: async (auctionId) => {
    try {
      set({ isLoading: true });
      await deleteAuction(auctionId);
      set((state) => ({
        auctions: state.auctions.filter((a) => a.id !== auctionId),
        error: null
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  closeAuction: async (auctionId) => {
    try {
      set({ isLoading: true });
      const closedAuction = await closeAuction(auctionId);
      set((state) => ({
        auctions: state.auctions.map((a) => a.id === closedAuction.id ? closedAuction : a),
        error: null
      }));
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ isLoading: false });
    }
  }

}))