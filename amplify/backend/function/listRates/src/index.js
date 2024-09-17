/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const aws = require('aws-sdk');
const awsssm = require('aws-sdk/clients/ssm')
const axios = require('axios')

const cisp = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const docClient = new aws.DynamoDB.DocumentClient(); 
const ssm = new awsssm();



const clientTableName = 'Client-w3l35a5lyvhzng5pschx2pphvq-dev';
const salonTableName  = 'Salon-w3l35a5lyvhzng5pschx2pphvq-dev';
const userTableName   = 'User-w3l35a5lyvhzng5pschx2pphvq-dev';



const locationToAddress = (location) => {
  return {
    street1: location.address1,
    street2: (location.address2 && location.address2 != '') ? location.address2 : null ,
    street3: (location.address3 && location.address3 != '') ? location.address3 : null ,

    city: location.locality,
    state: location.region,
    country: location.country.toUpperCase() == 'USA' ? 'US' : location.country ,

    postalCode: location.postalCode,
  }
}

const getTodayStr = () => {
  const yourDate = new Date()
  const offset = yourDate.getTimezoneOffset()
  const offsetDate = new Date(yourDate.getTime() - (offset*60*1000))
  return offsetDate.toISOString().split('T')[0];
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    /* event = {
      clientId: '',
      salonId: '',
      userId: '',
      carrierCode: '',
      serviceCode: '',
      packageCode: '' [optional],
      dimensions: '' [optional],
      weight: '' [optional],
      testLabel: true | false [optional],
      testRequest: true | false [optional],
      overrideOptions: {...} [optional], // override options for the shipstation api callsd
    }
    */

    const keys = await ssm.getParameters({
      Names: ['/amplify/dc7guxjvcw1wg/dev/SHIPSTATION_KEY','/amplify/dc7guxjvcw1wg/dev/SHIPSTATION_SECRET']
    }).promise();
    const key = keys.Parameters[0].Value
    const secret = keys.Parameters[1].Value 
    const authBuff = new Buffer(key+':'+secret)
    const authStr  = authBuff.toString('base64')

    const clientId = event.clientId;
    let salonId  = event.salonId;
    const userId   = event.userId;
    const carrierCode = event.carrierCode || null; //optional
    const serviceCode = event.serviceCode || null ; //optional
    const packageCode = event.packageCode || 'package';
    const dimensions = event.dimensions || {units: 'inches', length: 9, width: 4, height: 3};
    const weight = event.weight || {value: 24, units: 'ounces'};
    const override = event.overrideOptions || {};
    const test = event.testLabel || false;

    const testRequest = event.testRequest || false;
    
    let requestObj = {};

    if (testRequest) {
      console.log('Testing the request')
      requestObj = {
        carrierCode: carrierCode || 'fedex',
        serviceCode: serviceCode || null,
        packageCode: packageCode || null,

        confirmation: 'delivery',

        weight: weight,
        dimensions: dimensions,

        fromPostalCode: '19146',
        fromCity: 'Philadelphia',
        fromState: 'PA',

        toState: 'PA',
        toCountry: 'US',
        toPostalCode: '19104',
        toCity: 'Philadelphia',

        residential: true,

        ...override,
      }
    } else {
      if (clientId === undefined) {
        throw new Error('Invalid ClientId');
      } else if (userId === undefined) {
        throw new Error('Invalid UserId');
      } else if (carrierCode === undefined) {
        throw new Error('Invalid CarrierCode');
      }

      const getUserParams = {
        TableName: userTableName,
        Key: {id: userId}
      }

      const getClientParams = {
        TableName: clientTableName,
        Key: {id: clientId}
      }

      let clientObj = {};
      let userObj = {};
      let salonObj = {};

      try {
        const data = await docClient.get(getClientParams).promise();
        if (data && data.Item) {
          clientObj = data.Item;
        } else {
          throw new Error('Unknown UserId');
        }
      } catch (err) {
        throw err;
      }

      try {
        const data = await docClient.get(getUserParams).promise();
        if (data && data.Item) {
          userObj = data.Item;
        } else {
          throw new Error('Unknown ClientId');
        }
      } catch (err) {
        throw err;
      }

      if (salonId === undefined) {
        salonId = userObj.salonUsersId;
        if (salonId === undefined) {
          throw new Error('Invalid User SalonId')
        }
      }

      if (salonId === undefined) {
        throw new Error('Invalid SalonId ')
      }

      const getSalonParams = {
        TableName: salonTableName,
        Key: {id: salonId},
      }

      try {
        const data = await docClient.get(getSalonParams).promise();
        if (data && data.Item) {
          salonObj = data.Item;
        } else {
          throw new Error('Unkown SalonId');
        }
      } catch (err) {
        throw err;
      }

      // At this point we have
      //  salon in salonObj
      //  user in userObj
      //  client in clientObj

      // format from address: salon address with salon name; from-name user name
      // format to address: client address and client name
      
      // check location subobj
      const salonLocation  = salonObj.location;
      const clientLocation = clientObj.location;

      if (salonLocation === undefined) {
        throw new Error('Invalid Salon Location')
      }

      if (clientLocation === undefined) {
        throw new Error('Invalid Client Location')
      }


      const shipFromAddr = {
        name: userObj.name,
        company: salonObj.name,
        phone: salonObj.phone,
        residential: false,
        ...locationToAddress(salonObj.location)
      }

      const shipToAddr = {
        name: clientObj.name,
        company: null,
        phone: clientObj.phone,
        residential: true,
        ...locationToAddress(clientObj.location)
      }

      requestObj = {
        carrierCode: carrierCode,
        serviceCode: serviceCode,
        packageCode: packageCode,
        confirmation: 'delivery',
        
        weight: weight,
        dimensions: dimensions,

        fromPostalCode: shipFromAddr.postalCode,
        fromCity: shipFromAddr.city,
        fromState: shipFromAddr.state,

        toState: shipToAddr.state,
        toCountry: shipToAddr.country,
        toPostalCode: shipToAddr.postalCode,
        toCity: shipToAddr.city,

        residential: true,

        ...override,
      }
    }

    let replyObj  = {}

    const options = {
        headers: {
            'Host': 'ssapi.shipstation.com',
            'Authorization': 'Basic '+authStr,
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post("https://ssapi.shipstation.com/shipments/getrates",requestObj,options)
        console.log(response.data)
        replyObj = response.data
    } catch (err) {
        console.log(err.response)
        throw err;
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify(replyObj),
    };
};