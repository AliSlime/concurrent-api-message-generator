export async function run({ totalRequests, concurrency, task }) {
	const results = new Array(totalRequests);

	let requestNumber = 0;
	async function worker() {
		while (true) {
			if (requestNumber >= totalRequests) return;
			results[requestNumber++] = await task();
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(totalRequests, concurrency) }, () =>
			worker(),
		),
	);

	return results;
}
