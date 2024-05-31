// src/PointsClient.ts
import { PointsData, PointsResponse, Point, Campaign } from './types';

interface PointsClientParams {
  apiKey: string;
  campaignId: string;
}

export class PointsClient {
  private readonly apiKey: string;
  private readonly campaignId: string;
  private isValid: boolean | undefined;
  private campaign: Campaign | undefined;
  private readonly baseUrl: string;

  constructor({ apiKey, campaignId }: PointsClientParams) {
    this.apiKey = apiKey;
    this.campaignId = campaignId;
    this.baseUrl = "http://localhost:3000/api";
  }

  distribute = async (eventName: string, pointsData: PointsData): Promise<boolean> => {
    await this.verify();
    if (!this.isValid) throw new Error('Invalid API key');

    try {
      const response = await fetch(`${this.baseUrl}/points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': this.apiKey
        },
        body: JSON.stringify({
          eventName,
          points: pointsData.points,
          address: pointsData.address,
          campaignId: this.campaign?.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to distribute points');
      }

      await response.json();
      return true
    } catch (error) {
      console.error('Error distributing points:', error);
      throw new Error('Failed to distribute points');
    }
  }


  getPoints = async (address?: string): Promise<PointsResponse[]> => {
    await this.verify();
    if (!this.isValid) throw new Error('Invalid API key');

    try {
      let url = `${this.baseUrl}/points?campaign_id=${this.campaign?.id}`;
      if (address) {
        url += `&address=${address}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Api-Key': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch points');
      }

      const { points } = await response.json();
      return points.map((point: Point) => ({
        eventName: point.event_name,
        pointsData: {
          points: point.points,
          address: point.address
        }
      }));
    } catch (error) {
      console.error('Error getting points:', error);
      throw new Error('Failed to get points');
    }
  }

  getPointsByEvent = async (address: string, eventName: string): Promise<PointsResponse[]> => {
    await this.verify();
    if (!this.isValid) throw new Error('Invalid API key');

    try {
      const response = await fetch(`${this.baseUrl}/points?address=${address}&event_name=${eventName}&campaign_id=${this.campaign?.id}`, {
        method: 'GET',
        headers: {
          'Api-Key': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch points');
      }

      const { points } = await response.json();
      return points.map((point: Point) => ({
        eventName: point.event_name,
        pointsData: {
          points: point.points,
          address: point.address
        }
      }));
    } catch (error) {
      console.error('Error getting points by event:', error);
      throw new Error('Failed to get points by event');
    }
  }

  private verify = async (): Promise<void> => {
    if (this.isValid !== undefined) {
      return;
    }

    const headers = new Headers();
    headers.append("Api-Key", this.apiKey);

    try {
      const projectResponse = await fetch(`${this.baseUrl}/verify`, {
        method: "GET",
        headers
      });
      if (!projectResponse.ok) {
        throw new Error('Failed to verify API key');
      }
      const { project } = await projectResponse.json();
      const projectId = project.id;

      const campaignResponse = await fetch(`${this.baseUrl}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": this.apiKey
        },
        body: JSON.stringify({
          project_id: projectId,
          campaign_id: this.campaignId
        })
      });
      if (!campaignResponse.ok) {
        throw new Error('Failed to verify or create campaign');
      }
      const { campaign }: { campaign: Campaign } = await campaignResponse.json();
      this.campaign = campaign;
      this.isValid = true;
    } catch (error) {
      this.isValid = false;
      console.error('Verification error:', error);
      throw error;
    }
  }
}
