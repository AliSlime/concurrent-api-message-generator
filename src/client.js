const TIMEOUT_MS = 10_000;

export async function sendRequest({ url, apiKey, payload }) {
	const startTime = performance.now();

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-Key": apiKey,
			},
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});

		const durationTime = performance.now() - startTime;

		return {
			ok: response.ok,
			status: response.status,
			durationTime,
			error: null,
		};
	} catch (error) {
		const durationTime = performance.now() - startTime;

		return {
			ok: false,
			status: null,
			durationTime,
			error: error.message,
		};
	}
}
