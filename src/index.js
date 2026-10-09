function printHelp() {
	console.log(`
Message Generator

Usage:
  node src/index.js [options]

Example:
  node src/index.js \\
    --port 3000 \\
    --endpoint /messages \\
    --concurrency 100 \\
    --requests 1000 \\
    --payload 1024 \\
    --api-key "abc123"
`);
}
function parseArgs(args) {
	const options = {};

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		if (arg === "--help" || arg === "-h") {
			printHelp();
			process.exit(0);
		}

		if (!arg.startsWith("--")) {
			throw new Error(`Unknown argument ${arg}`);
		}

		const key = arg.slice(2);
		const value = args[++i];

		if (value.startsWith("--")) {
			throw new Error(`Missing value for --${key}`);
		}

		options[key] = value;
	}

	return options;
}

function validateArgs(options) {
	// required stuff :3
	const required = ["endpoint", "api-key"];

	for (const option of required) {
		if (!options[option]) {
			throw new Error(`Missing required option: --${option}`);
		}
	}

	// I think I can default this
	const recomended = {
		requests: 1,
		concurrency: 1,
		port: 4000,
		payload: 1024,
	};

	for (const option in recomended) {
		const val = recomended[option];
		if (!options[option]) {
			console.warn(
				`Warning: Recommended option --${option} missing. Default value: ${val}`,
			);
			options[option] = val;
		}
	}

	// check it doesn't have typos
	const port = Number(options.port);
	const requests = Number(options.requests);
	const concurrency = Number(options.concurrency);
	const payload = Number(options.payload);

	//port
	if (!Number.isInteger(port) || port < 1 || port > 65535) {
		throw new Error("Port must be an integer between 1 and 65535");
	}

	//requests
	if (!Number.isInteger(requests) || requests < 1) {
		throw new Error("Requests must be a positive number");
	}

	//concurrency
	if (
		!Number.isInteger(concurrency) ||
		concurrency < 1 ||
		concurrency > 500
	) {
		throw new Error("Concurrency must be an integer between 1 and 500");
	}

	//payload
	if (!Number.isInteger(payload)) {
		throw new Error("Payload size must be an integer");
	}

	//endpoint
	if (!options.endpoint.startsWith("/")) {
		throw new Error("I think endpoints start with '/'");
	}

	return {
		port,
		endpoint: options.endpoint,
		requests,
		concurrency,
		payload,
		apiKey: options["api-key"],
	};
}

function main() {
	try {
		const options = parseArgs(process.argv.slice(2));
		const config = validateArgs(options);
		console.log(config);
	} catch (error) {
		console.log(error);
	}
}

main();
