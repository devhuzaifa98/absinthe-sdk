// Type definitions used in the SDK
export interface PointsData {
  points: number;
  address: string;
}

export interface PointsResult {
  eventName: string;
  pointsData: PointsData;
}

export interface Point {
  eventName?: string;
  points: number;
  address: string;
}
