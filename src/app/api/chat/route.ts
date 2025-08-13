export async function POST(request: Request) {
	try {
		const body = (await request.json()) as { message?: string; conversationHistory?: Array<{ role: string; content: string }>; };
		const message = body?.message ?? "";
		return new Response(JSON.stringify({ success: true, response: `Echo: ${message}` }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (e: any) {
		return new Response(JSON.stringify({ success: false, error: e?.message ?? "Unknown error" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
} 