# Absinthe SDK Demo

This guide will walk you through testing the Absinthe SDK by registering for an API key and running a utility app to insert points to an address.

## 1. Register and Get API Key

To register and get an API key, you need to send a POST request to the registration endpoint.

### Registration Endpoint

**URL:** `https://absinthe-utility-app.vercel.app/api/register`

### Request

**Method:** POST

**Body:**

```json
{
  "name": "your-name"
}
```

### Example using cURL

```markdown
curl -X POST https://absinthe-utility-app.vercel.app/api/register \
-H "Content-Type: application/json" \
-d '{"name": "your-name"}'
```

### Response

The response will include an API key. Save this key as it will be used to initialize the PointsClient in the next step.

## 2. Run the Utility App to Insert Points

Next, set up the Next.js app and run the development server. You'll need to insert your API key and campaign ID in the PointsClient initialization.

### App Setup

1. Clone the repository (if not already done).

2. Install dependencies:

```markdown
npm install
```

3. Open the file app/components/PointsList.tsx.

4. On line number 30, initialize the PointsClient class like this:

```markdown
import PointsClient from "@devhuzaiffa/absinthe-sdk";

const pointsClient = new PointsClient({ 
  apiKey: "your-api-key",
  campaignId: "your-campaign-id" 
});
```

5. Replace "your-api-key" with the API key you received from the registration step.

6. Replace "your-campaign-id" with your campaign ID.

### Run the Development Server

Start the development server:

```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Using the Utility App

On the application page, you will find a form to send points to an address. Below the form, there is a list showing all the events, the points sent, and the addresses.

### Search Options

You can perform searches based on:

- eventName
- address

Enter the desired search criteria and view the filtered results.
