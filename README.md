# Absinthe SDK

The Absinthe SDK allows projects to easily interact with the Absinthe Platform to manage and distribute points for their users. This SDK facilitates several functionalities, including the distribution of points, retrieval of points associated with an address, and filtering of points based on event names.

## Features

- **Distribute Points**: Assign points to a user based on an event on their EVM-based address.
- **Get Points**: Retrieve the total points for a specific address.
- **Get Points by Event**: Retrieve points for a specific address filtered by event name.

## Installation

Install the SDK using npm:

`npm install @devhuzaiffa/absinthe-sdk`


## Usage

### Initialization

To use the SDK, you need to initialize it with your API key and campaign ID:

```markdown
import PointsClient from "@devhuzaiffa/absinthe-sdk";

const pointsClient = new PointsClient({ 
  apiKey: "your-api-key",
  campaignId: "your-campaign-id" 
});
```

### Distribute Points

To distribute points to an address based on an event:

```markdown
try {
  const response = await pointsClient.distribute("event_name", {
    points: 100,
    address: "0x123...",
  });
  console.log("Points distributed successfully");
} catch (error) {
  console.error("Error distributing points:", error);
}
```

### Get Points

To retrieve the total points for a specific address:

```markdown
try {
  const points = await client.getPoints("0x123...");
  console.log("Points:", points);
} catch (error) {
  console.error("Error fetching points:", error);
}
```

### Get Points by Event

To retrieve points for a specific address filtered by event name:

```markdown
try {
  const points = await client.getPointsByEvent("0x123...", "event_name");
  console.log("Points by event:", points);
} catch (error) {
  console.error("Error fetching points by event:", error);
}
```


