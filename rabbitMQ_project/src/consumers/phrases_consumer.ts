import { connectToRabbitMQ } from '../config';

const consumeMessages = async (exchange: string, queue: string) => {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  
  await channel.assertExchange(exchange, 'direct', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, queue);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log(`Message reçu par ${exchange} via ${queue}: ${msg.content.toString()}`);
      channel.ack(msg);
    }
  });

  console.log(`En attente de messages via ${queue}`);
};

consumeMessages('belles_phrases_exchange', 'phrases_queue_un');
consumeMessages('belles_phrases_exchange', 'phrases_queue_deux');