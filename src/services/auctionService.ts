import { v4 as uuidv4 } from "uuid";

import jsonServerInstance from "../api/jsonServerInstance";
import type { Auction, AuctionBid, AuctionState, BidType, Category, PinAuction } from "../interfaces/auctionInterface";
import type { AuctionRequest, AuctionBidRequest, PinAuctionRequest } from "./models/auctionModels"

const CATEGORY_PATH = "categories";
const AUCTION_STATE_PATH = "auctionState";
const BID_TYPE_PATH = "bidType";
const PIN_AUCTION_PATH = "pinAuction";
const AUCTION_PATH = "auction";
const AUCTION_BID_PATH = "auctionBid";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await jsonServerInstance.get<Category[]>(CATEGORY_PATH)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching Categories ${err.message}`);
    }
    throw err
  }
}

export const fetchBidType = async (): Promise<BidType[]> => {
  try {
    const { data } = await jsonServerInstance.get<BidType[]>(BID_TYPE_PATH)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching Bid Types ${err.message}`);
    }
    throw err
  }
}

export const fetchAuctionState = async (): Promise<AuctionState[]> => {
  try {
    const { data } = await jsonServerInstance.get<AuctionState[]>(AUCTION_STATE_PATH)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching Aution States ${err.message}`);
    }
    throw err
  }
}

export const fetchAuction = async (): Promise<Auction[]> => {
  try {
    const { data } = await jsonServerInstance.get<Auction[]>(AUCTION_PATH)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching Auctions ${err.message}`);
    }
    throw err
  }
}

export const getAuctionById = async (userId: string): Promise<Auction[]> => {
  try {
    const { data: bids } = await jsonServerInstance.get<AuctionBid[]>(AUCTION_BID_PATH, { params: { userId: userId } })
    const auctionIds = [...new Set(bids.map(bid => bid.auctionId))];

    if (auctionIds.length === 0) return [];

    const queryParams = auctionIds.map(id => `id=${id}`).join('&');
    const { data } = await jsonServerInstance.get<Auction[]>(`${AUCTION_PATH}?${queryParams}`);

    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching Auctions ${err.message}`);
    }
    throw err
  }
}

export const publishAuction = async ({ bidType, endDate, price, product, state }: AuctionRequest): Promise<Auction> => {
  try {
    const auction: Auction = {
      id: uuidv4(),
      bidType,
      endDate: endDate.toISOString(),
      price,
      product,
      state
    }
    const { data } = await jsonServerInstance.post<Auction>(AUCTION_PATH, auction)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Creating Auctions ${err.message}`);
    }
    throw err
  }
}

export const closeAuction = async (auctionId: string): Promise<Auction> => {
  try {
    let state = "sealed bid auction";
    const { data: bids } = await jsonServerInstance.get(AUCTION_BID_PATH)
    if (bids.length === 0) {
      state = "ended"
    }
    const { data } = await jsonServerInstance.patch<Auction>(`${AUCTION_PATH}/${auctionId}`, { state: state })
    return data;
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Closing Auctions ${err.message}`);
    }
    throw err
  }
}

export const getPinAuctionById = async (userId: string): Promise<PinAuction[]> => {
  try {
    const { data } = await jsonServerInstance.get<PinAuction[]>(PIN_AUCTION_PATH, { params: { userId: userId } })
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching pined Auctions ${err.message}`);
    }
    throw err
  }
}

export const savePinAuction = async ({ userId, auctionId }: PinAuctionRequest): Promise<PinAuction> => {
  try {
    const pinAuction: PinAuction = {
      id: uuidv4(),
      userId,
      auctionId
    }
    const { data } = await jsonServerInstance.post<PinAuction>(PIN_AUCTION_PATH, pinAuction)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Creating pined Auctions ${err.message}`);
    }
    throw err
  }
}

export const removePinAuction = async ( pinAuctionId: string): Promise<void> => {
  try {
    await jsonServerInstance.delete(`${PIN_AUCTION_PATH}/${pinAuctionId}`)
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Deleting pined Auctions ${err.message}`);
    }
    throw err
  }
}

export const getAuctionBidById = async (auctionId: string): Promise<AuctionBid[]> => {
  try {
    const { data } = await jsonServerInstance.get<AuctionBid[]>(AUCTION_BID_PATH, { params: { auctionId: auctionId } })
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Fetching bid Auctions ${err.message}`);
    }
    throw err
  }
}

export const saveAuctionBid = async ({ userId, auctionId, bid }: AuctionBidRequest): Promise<AuctionBid> => {
  try {
    const pinAuction: AuctionBid = {
      id: uuidv4(),
      userId,
      auctionId,
      bid
    }
    const { data } = await jsonServerInstance.post<AuctionBid>(PIN_AUCTION_PATH, pinAuction)
    return data
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Errror Creating bid Auctions ${err.message}`);
    }
    throw err
  }
}