package learn.camunda;

import java.util.logging.Logger;
import java.awt.Desktop;
import java.net.URI;

import org.camunda.bpm.client.ExternalTaskClient;

public class App {
    private final static Logger LOGGER = Logger.getLogger(App.class.getName());

    public static void main(String[] args) {
        ExternalTaskClient client = ExternalTaskClient.create()
                .baseUrl("http://localhost:8080/rest")
                .asyncResponseTimeout(10000) // long polling timeout
                .build();

        // subscribe to an external task topic as specified in the process
        client.subscribe("CardPayment")
                .lockDuration(1000) // the default lock duration is 20 seconds, but you can override this
                .handler((externalTask, externalTaskService) -> {
                    // Put your business logic here

                    // Get a process variable
                    // String item = (String) externalTask.getVariable("item");

                    LOGGER.info("Card payment successful");

                    // Complete the task
                    externalTaskService.complete(externalTask);
                })
                .open();

        System.out.println("Hello World!");
    }
}
