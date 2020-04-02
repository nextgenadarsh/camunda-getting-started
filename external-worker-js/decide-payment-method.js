const { Client, logger, Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// subscribe to the topic
client.subscribe("DecidePaymentMethod", async function ({ task, taskService }) {
  // Put your business logic
  try {
    console.log(`Task started`);
    decidePaymentMethod();

    // Set process variables
    const processVariables = new Variables();
    processVariables.set("isCardPayment", decidePaymentMethod());

    // complete the task
    await taskService.complete(task, processVariables);

    console.log(`Task completed`);
  } catch (e) {
    console.log(`Error occured: ${e}`);
  }
});

/**
 * Business Logic
 */
const decidePaymentMethod = () => {
  console.log(Date.now());
  let isCardPayment = Date.now() % 2 === 0;
  return isCardPayment;
}