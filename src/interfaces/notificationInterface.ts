export interface Notification {
  id: string,
  userId: string,
  message: string
  auction: string,
  readed: boolean
  type: "BidWon" | "NearEnd" | "LostBid" | "BidPlaced",
}