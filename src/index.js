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

function main() {
	try {
		const options = parseArgs(process.argv.slice(2));
	} catch (error) {
		console.log(error);
	}
}

main();
