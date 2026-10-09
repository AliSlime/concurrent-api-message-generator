export async function run({ totalRequests, concurrency, task }) {
	const results = new Array(totalRequests);

	let requestNumber = 0;
	async function worker() {
		results[requestNumber++] = await task();
	}

	await Promise.all(Array.from({ length: totalRequests }, () => worker()));

	return results;
}
