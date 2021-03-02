
# Graceful shut down of RabbitMQ

Make sure `RabbitMQ` is running on port `5672`.

When ever `SIGINT` ot `SIGTERM` occurs channel stop to get message from rabbitmq and process consumed messages. 


## Installation

To start consumer
```bash
$> node server.js c <name>
```

To start producer
```bash
$> node server.js p
```
