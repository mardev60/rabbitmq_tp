import dotenv from 'dotenv';
import amqp from 'amqplib';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    console.log('Connecté avec succès à RabbitMQ');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à RabbitMQ : ', error);
    process.exit(1);
  }
};