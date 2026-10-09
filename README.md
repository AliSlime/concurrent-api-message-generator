# Message Generator

A CLI tool built with Node.js for sending concurrent HTTP POST requests to a local API.

Message Generator is designed for API testing and load testing. It generates JSON payloads of any size, authenticates requests using an API key, and allows you to control the total number of requests and maximum concurrency.

## Requirements

- [Node.js](https://nodejs.org/) 18 or later.
- A local API.

## Installation

Clone the repository:

```bash
git clone https://github.com/AliSlime/concurrent-api-message-generator.git
cd message-generator
```

No additional dependencies are required.

## Usage

run with `node src/index.js`

To display all available options:

```bash
node src/index.js --help
```

### Basic example

```bash
node src/index.js \
  --port 3000 \
  --endpoint /messages \
  --concurrency 10 \
  --requests 100 \
  --api-key "your-api-key"
```

This command sends 100 HTTP POST requests to `http://localhost:3000/messages`, with a maximum of 10 concurrent requests.

### Command-line options

| Option          | Required | Description                                                          | Default |
| --------------- | -------- | -------------------------------------------------------------------- | ------- |
| `--help`        | No       | Display usage instructions.                                          | -       |
| `--api-key`     | Yes      | API key included in each request.                                    | -       |
| `--endpoint`    | Yes      | API endpoint path, such as `/messages`.                              | -       |
| `--port`        | No       | Port where the target API is running.                                | 3000    |
| `--concurrency` | No       | Maximum number of concurrent requests. Accepts values from 1 to 500. | 1       |
| `--requests`    | No       | Total number of requests to send. Must be a positive integer.        | 1       |
| `--payload`     | No       | Payload size in bytes.                                               | 1024    |

### Examples

**Send 100 requests, one at a time:**

```bash
node src/index.js \
  --port 3000 \
  --endpoint /messages \
  --concurrency 1 \
  --requests 100 \
  --api-key "your-api-key"
```

**Send 1,000 requests with up to 100 concurrent requests:**

```bash
node src/index.js \
  --port 3000 \
  --endpoint /messages \
  --concurrency 100 \
  --requests 1000 \
  --api-key "your-api-key"
```

**Send 5,000 requests of size 10KB with up to 500 concurrent requests:**

```bash
node src/index.js \
  --port 3000 \
  --endpoint /messages \
  --concurrency 500 \
  --requests 5000 \
  --payload 10240 \
  --api-key "your-api-key"
```

## Payload Format

Each request contains a JSON payload similar to the following:

```json
{
	"messageId": "550e8400-e29b-41d4-a716-446655440000",
	"type": "test-message",
	"category": "load-test",
	"sequence": 42,
	"timestamp": "2026-10-09T15:00:00.000Z",
	"source": "message-generator",
	"metadata": {
		"environment": "test",
		"generator": "message-generator",
		"version": "1.0.0"
	},
	"content": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."
}
```

The `type` and `category` fields provide message classification.

## Output

After execution, the program displays a summary similar to this:

```text
Message Generator
-------------------------------
Target:       http://localhost:3000/messages
Requests:     1000
Concurrency:  100
Payload:      ~1024 bytes

Results
-------------------------------
Successful:   987
Failed:       13
Duration:     4.82s
Average:      412.00ms

HTTP Statuses
-------------------------------
200:          987
500:          13
```
