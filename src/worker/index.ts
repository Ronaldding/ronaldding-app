export interface Env {
  AI: any;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

interface ChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const body: ChatRequest = await request.json();
      
      if (!body.message || typeof body.message !== "string") {
        return new Response(
          JSON.stringify({ success: false, error: "Message is required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      // Prepare conversation context
      const messages: ChatMessage[] = [];
      
      // Add system message
      messages.push({
        role: "assistant",
        content: "You are Ronald Ding's AI assistant. You help users with various tasks and answer questions in a helpful, friendly manner. Keep responses concise and practical."
      });

      // Add conversation history if provided
      if (body.conversationHistory && Array.isArray(body.conversationHistory)) {
        messages.push(...body.conversationHistory.slice(-10)); // Keep last 10 messages for context
      }

      // Add current user message
      messages.push({
        role: "user",
        content: body.message
      });

      // Call Cloudflare AI
      const aiResponse = await env.AI.run("@cf/meta/llama-2-7b-chat-int8", {
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      });

      const response: ChatResponse = {
        success: true,
        response: aiResponse.response,
      };

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    } catch (error) {
      console.error("Chatbot error:", error);
      
      const response: ChatResponse = {
        success: false,
        error: "Internal server error",
      };

      return new Response(JSON.stringify(response), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
}; 