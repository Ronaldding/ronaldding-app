# Cloudflare Worker Chatbot Setup

This project uses a Cloudflare Worker for the chatbot API instead of a local Next.js API route.

## Setup Instructions

### 1. Install Wrangler
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Configure the Worker
Update the `wrangler.json` file with your desired worker name and settings.

### 4. Deploy the Worker
```bash
npm run worker:deploy
```

### 5. Update the Chatbot URL
After deployment, update the URL in `src/app/chatbot/page.tsx`:
```typescript
const response = await fetch("https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev", {
  // ... rest of the code
});
```

## Worker Features

- **AI Integration**: Uses Cloudflare AI with Llama 2 7B model
- **Conversation Context**: Maintains conversation history for better responses
- **CORS Support**: Handles cross-origin requests
- **Error Handling**: Comprehensive error handling and logging
- **TypeScript**: Full TypeScript support with proper types

## Development

To test the worker locally:
```bash
npm run worker:dev
```

## Environment Variables

The worker requires:
- `AI` binding: Cloudflare AI service binding

## API Endpoints

- **POST** `/`: Chat endpoint that accepts:
  ```json
  {
    "message": "User message",
    "conversationHistory": [
      {"role": "user", "content": "Previous message"},
      {"role": "assistant", "content": "Previous response"}
    ]
  }
  ```

Returns:
```json
{
  "success": true,
  "response": "AI response"
}
```

## Troubleshooting

1. **Worker not responding**: Check if the worker is deployed and the URL is correct
2. **AI errors**: Verify the AI binding is configured in Cloudflare
3. **CORS issues**: Ensure the worker is accessible from your domain 