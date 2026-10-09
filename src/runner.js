export async function run({ totalRequests, concurrency, task }) {
	const results = new Array(totalRequests);

	let nextRequest = 0;
	async function worker() {
		while (true) {
			const requestNumber = nextRequest++;
			if (requestNumber >= totalRequests) return;

			try {
				results[requestNumber] = await task(requestNumber);
			} catch (error) {
				results[requestNumber] = {
					ok: false,
					error: error.message,
				};
			}
		}
	}

	const simultaneousWorkers = Math.min(totalRequests, concurrency);
	await Promise.all(
		Array.from({ length: simultaneousWorkers }, () => worker()),
	);

	return results;
}
