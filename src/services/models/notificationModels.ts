export interface sendNotificationsRequest {
  type: "BidWon" | "NearEnd" | "LostBid" | "BidPlaced";
  message: string;
  auction: string;
}