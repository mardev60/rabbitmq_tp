import { connectToRabbitMQ } from '../config';
import { phrases } from './data/phrases';
import { celebrites } from './data/celebrites';

const getRandomMessage = (type: string) => {
  if (type === "phrases") {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  } else if (type === "celebrites") {
    const randomIndex = Math.floor(Math.random() * celebrites.length);
    return celebrites[randomIndex];
  }
};

const produceMessagesContinuously = async (exchange: string, interval: number, type: string) => {
  const connection = await connectToRabbitMQ();
  const channel = await connection.createChannel();
  
  await channel.assertExchange(exchange, 'direct', { durable: true });

  const queues = type === 'phrases' ? ['phrases_queue_un', 'phrases_queue_deux'] : ['celebrites_queue_un', 'celebrites_queue_deux'];
  for (const queue of queues) {
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, queue);
  }

  setInterval(() => {
    const message: any = getRandomMessage(type);
    const routingKey = queues[Math.floor(Math.random() * queues.length)];
    channel.publish(exchange, routingKey, Buffer.from(message));
    console.log(`Message envoyé à ${exchange} via routage ${routingKey}: ${message}`);
  }, interval);

  process.stdin.resume();
};

produceMessagesContinuously('belles_phrases_exchange', 5000, "phrases");
produceMessagesContinuously('celebrites_exchange', 5000, "celebrites");