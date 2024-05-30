// Type definitions used in the SDK
export interface PointsData {
  points: number;
  address: string;
}

export interface PointsResponse {
  eventName: string;
  pointsData: PointsData;
}

export interface Point {
  event_name?: string;
  points: number;
  address: string;
}

export interface Campaign {
  id: number,
  app_id: string,
  project_id: number
}