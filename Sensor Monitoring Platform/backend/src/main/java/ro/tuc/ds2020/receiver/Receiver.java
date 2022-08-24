package ro.tuc.ds2020.receiver;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeoutException;

public class Receiver {

    private final static String QUEUE_NAME = "sensorReading";

    public static void getSensorData() throws IOException, TimeoutException, NoSuchAlgorithmException, KeyManagementException, URISyntaxException {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqps://wspzinov:zoYCcTsALv6wQJSCHIorFHeJXr3_kV0a@roedeer.rmq.cloudamqp.com/wspzinov");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String msg = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(msg);
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }
}
