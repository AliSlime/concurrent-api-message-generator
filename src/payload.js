function createBasePayload(requestNumber) {
	return {
		messageId: crypto.randomUUID(),
		type: "test-message",
		category: "load-test",
		sequence: requestNumber,
		timestamp: new Date().toISOString(),
		source: "message-generator",
		metadata: {
			environment: "test",
			generator: "message-generator",
			version: "1.0.0",
		},
		content: "",
	};
}

export function getPayloadSize(payload) {
	return Buffer.byteLength(JSON.stringify(payload), "utf8");
}

export function createPayload(requestNumber, size) {
	const payload = createBasePayload(requestNumber);
	const baseSize = getPayloadSize(payload);
	const contentSize = Math.max(0, size - baseSize - 2);

	payload.content = "x".repeat(contentSize);

	return payload;
}
