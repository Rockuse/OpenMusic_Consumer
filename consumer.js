require('dotenv').config();
const amqp = require('amqplib');
const PlaylistServices = require('./src/services/PlaylistServices');
const MailSender = require('./src/MailSender');
const Listener = require('./src/Listener');
 
const init = async () => {
  const playlistServices = new PlaylistServices();
  const mailSender = new MailSender();
  const listener = new Listener(playlistServices, mailSender);
 
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
 
  await channel.assertQueue('export:playlist', {
    durable: true,
  });
 
  channel.consume('export:playlist', listener.listen, { noAck: true });
};
 
init();