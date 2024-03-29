// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
const AWS = require('aws-sdk')
const eventbridge = new AWS.EventBridge()

exports.lambdaHandler = async (event, context) => {
  // Do some work... 
  // And now create the event...

  
  const  params  = {
    Entries: [ 
      {
        // Event envelope fields
        Source: 'custom.MYapp',
        EventBusName: 'MyCustomEventBus',
        DetailType: 'transaction',
        Time: new Date(),
  
        // Main event body
        Detail: JSON.stringify({ result: 'approved',})
      },
      {
        // Event envelope fields
        Source: 'custom.MYapp',
        EventBusName: 'MyCustomEventBus',
        DetailType: 'transaction',
        Time: new Date(),
        // Main event body
        Detail: JSON.stringify({ result: 'disapproved',})
      }
    ]
    }

  console.log('--- Params ---')
  console.log(params)
  const result = await eventbridge.putEvents(params).promise()

  console.log('--- Response ---')
  console.log(result)  
}
