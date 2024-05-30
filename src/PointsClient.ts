// src/PointsClient.ts
import { PointsData, PointsResult } from './types';

export class PointsClient {
  private apiKey: string;
  private campaignId: string;
  private isValid: boolean;
  private campaign: any;

  constructor(apiKey: string, campaignId: string) {
    this.apiKey = apiKey;
    this.campaignId = campaignId;
  }

  public async distribute(eventName: string, pointsData: PointsData): Promise<void> {
    const isValidApiKey = await this.validateApiKey(this.apiKey);
    if (!isValidApiKey) {
      throw new Error('Invalid API key');
    }

    // Check if campaign_id exists, if not create one
    const isValidCampaignId = await this.validateCampaignId(this.campaignId);
    if (!isValidCampaignId) {
      this.campaignId = await this.createCampaignId();
    }

    try {
      // await createPoint(eventName, pointsData);
      console.log('Points distributed successfully');
    } catch (error) {
      console.error('Error distributing points:', error);
      throw new Error('Failed to distribute points');
    }
  }

  public async getPoints(address: string): Promise<PointsResult[]> {
    if (!this.apiKey) {
      throw new Error('Client not initialized with API key');
    }

    try {
      // const points = await getPointsData(address);
      return points;
    } catch (error) {
      console.error('Error getting points:', error);
      throw new Error('Failed to get points');
    }
  }

  public async getPointsByEvent(address: string, eventName: string): Promise<PointsResult[]> {
    if (!this.apiKey) {
      throw new Error('Client not initialized with API key');
    }

    try {
      // const points = await getPointsByEventName(address, eventName);
      return points;
    } catch (error) {
      console.error('Error getting points by event:', error);
      throw new Error('Failed to get points by event');
    }
  }

  private async verify(): Promise<boolean> {
    const myHeaders = new Headers();
    myHeaders.append("Api-Key", this.apiKey);

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    try {
      const response = await fetch("http://localhost:3000/api/verify", requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      this.isValid = false;
      console.error(error);
    }

    return this.isValid
  }
}
