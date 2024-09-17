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
    const carrierCode = event.carrierCode;
    const serviceCode = event.serviceCode;
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
        serviceCode: serviceCode || 'fedex_ground',
        packageCode: packageCode || 'package',
        confirmation: 'delivery',
        shipDate: getTodayStr(),
        weight: weight,
        dimensions: dimensions,
        insuranceOptions: null,
        internationalOptions: null,
        advancedOptions: null,
        testLabel: false,

        ...override,

        shipFrom: {
          name: 'Austin S',
          company: 'Thrivo Technologies',
          street1: '2025 Washington Ave',
          street2: null,
          street3: null,
          city: 'Philadelphia',
          state: 'PA',
          postalCode: '19146',
          country: 'US',
          phone: '2672140980',
          residential: false,
        },
        shipTo: {
          name: 'Brendon J',
          company: null,
          street1: '514 N 41st Street',
          street2: null,
          street3: null,
          city: 'Philadelphia',
          state: 'PA',
          postalCode: '19104',
          country: 'US',
          phone: '2672140980',
          residential: true,
        },
      }
    } else {
      if (clientId === undefined) {
        throw new Error('Invalid ClientId');
      } else if (userId === undefined) {
        throw new Error('Invalid UserId');
      } else if (carrierCode === undefined) {
        throw new Error('Invalid CarrierCode');
      } else if (serviceCode === undefined) {
        throw new Error('Invalid ServiceCode');
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
        shipDate: getTodayStr(),
        weight: weight,
        dimensions: dimensions,
        insuranceOptions: null,
        internationalOptions: null,
        advancedOptions: null,
        testLabel: false,

        ...override,

        shipFrom: shipFromAddr,
        shipTo: shipToAddr,
      }
    }

    let base64PDF = '';
    let replyObj  = {}
    if (test) {
      base64PDF = 'JVBERi0xLjQKJeLjz9MKMiAwIG9iago8PC9MZW5ndGggNjEvRmlsdGVyL0ZsYXRlRGVjb2RlPj5zdHJlYW0KeJwr5HIK4TI2UzC2NFMISeFyDeEK5CpUMFQwAEJDBV1jIz1LIGlsqGekkJyroB+RZqjgkq8QyAUARuULswplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9QYWdlL01lZGlhQm94WzAgMCAyODggNDMyXS9SZXNvdXJjZXM8PC9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXS9YT2JqZWN0PDwvWGYxIDEgMCBSPj4+Pi9Db250ZW50cyAyIDAgUi9QYXJlbnQgMyAwIFI+PgplbmRvYmoKMSAwIG9iago8PC9MZW5ndGggMjUyMy9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdL1Jlc291cmNlczw8L1Byb2NTZXQgNSAwIFIvRm9udDw8L0YxIDYgMCBSL0YyIDcgMCBSL0YzIDggMCBSL0Y0IDkgMCBSL0Y1IDEwIDAgUi9GNiAxMSAwIFIvRjcgMTIgMCBSL0Y4IDEzIDAgUi9GOSAxNCAwIFIvRjEwIDE1IDAgUi9GMTEgMTYgMCBSL0YxMiAxNyAwIFI+Pi9YT2JqZWN0PDwvRmVkRXhHcm91bmQgMTggMCBSL0dyb3VuZEcgMTkgMCBSL2JhcmNvZGUwIDIwIDAgUj4+Pj4vVHlwZS9YT2JqZWN0L1N1YnR5cGUvRm9ybS9CQm94WzAgMCA2MTIgNzkyXS9NYXRyaXhbMSAwIDAgMSAwIDBdL0Zvcm1UeXBlIDE+PnN0cmVhbQpHYXQ9Lj51T3VlJnEtQiVycylRa011QWBRRmduMDRyISRibGEyLFIuLGdIS0ZgL201bjZcN09HQ09jOihsLCVzQD0jJC5gNitPcV0zVTBZRwplV05EVytEZ1FrViU/MWw7PCNEMTxaNUZiW2VNRypKZidEWEYpc1AiU2s3SD1KQzVrVU1FX1k5aFEhQD9UW1dVVHBBPlluQlU2RVhlPTVTIgpBcWw4YDU7SjYnP2hnLW0lMi4waGNcIz5LUz0tOllOWGpwW0dkZE5bMklDV0ozLkp1UnAjWFpjYjpAWjNuYWM6ajdUOiNoVzBTNVlRWD9yQApvKS9JKmViK15gaF8zOz9EOG8rak4sNzE6R0doJmMwIUJhKEkhb1M3XjdLOF1hPUQ8amw6dUJPck1PL3NJMExsVyI6Iy0hSmVRTD1jO2w5Xwo0O0gkZWNRSkYjOnA5TVFOaSosODVgJyY7ZXA4XiZRPU8mXDVQam5XaGJvUGEqKE5PdTUmJ1pAMzJEWTIzXVpZbCYmcWc4bThCTT1ORzBCbwo2UFBPKjc/OiNIN0llW19tRyVIXiRoWEE5R2wuXU5mYCssX1xOJStjQT5fPVZBR2VJL0M3OjRHWT9tVWJQO2tMM08yKixMQG5KQTtZaGtLbgpwNChxYEtOPSNqbkRII0AnXSFGMztGWkphWXJxKyJSMysnNT1XU05uWCclWCFcR1U7bEc1Z0koTXAjJT9cN0koTiRfLERzSTBNYF1dZjdpMQo+S2NnTTZoNGkpVDRLZ3UjUG1URm8lYnEiWzAlX11cJVEzaFhmUXVeS3VkX2FlO0pEaFQiZEFkQUtfPz9jIlFSOlxcNllNMVdUK2NTYl5aQwo8YVFqakMwKkUscXJbaEElKkBuXWwyKlwwPyFoSGcoWGUxWnE+K2Rwbzc6Jmk/YllBXWZLN19rYmA9XkRlNVpYT1tIPk5LaFknYDhxclZSKQo2YjRCXCkvImdsX1cucmNVQyNjIV5pdF5NW3U6NEBqaFxbYVI6QyklLyEmV0wobC48cS5EWD5oSVM0czxoO1tNSy9eKiQtaigwKSkwYigmXgoqZGVlOilHM180UDluND1OL3Aiaik2SUlwNUZWPGcwb2trM3ExIVUsWS5uNTRSQFdac15HQEg+XS5eUFE1OStuci4zTD5NOiElWSM2VDNcVwo2bkVWakE+NTJyRzlqXykibFkjYGZzaS1wQloyMVhGNWtOaGBzJ1M8bWByWy5iUlQ3TzlAOzFTWU1VdDQxdVUqTUpdZiNFN3MyV1RmIm01XApII1c0JltYUSRVbW0iJzJxITs4NV88OE1ROSZAaWk4Zjgva2svN0wzSCZvVGVgUHU3XERyK2luU19GQj1aNFppQGgsMmFJN25QaF4mJksucQotZ1lhOksiTVZbOFQsPm9UJzFNKSs6aEYmWkkpMC5gXi1wK2NdX00/W0xDPj86PzlBU2ojRUBoI1w6bzwlaypLJjonKFMiWzBIUXVBOVJsXQo3ZEVtcjtTYGlIUlA/Xy9VPU05IS1AZWdpb3VVZXQ7TFk4byE7SlBZTzJ1MmU8T2NBKWRici4kMFNzRUZEYkklRzIyMFdEPGY5Nm5qLDExWgpNMkotcTo2IlFyI1NCSkRUaSUhWGtGNGRRWHNsMUpHYGJVITZQPjZDP3IjSmdXYz5ePTNlZG9LSE9jUTQvJjVxKlZbczJJPTNiVisjWzM7MwpCTmhAU29hNDhuamQpRTRgNzM6PkxcOGZDZ05qam82ayQoSWE0N1twK2xyP0pNYXU4RTlKS0MzQmBjcD1qYk04WDhWZSJGQG9LQi9HLTMrLQpYc1VdTUQnVkVYaCxJUnVGWEIwbypeWkleWjpkNjpOUDIjYiIxdERGPjhTPkFqSlVMImk9aiNAS1NLbkdMckNscTFlSzgtPE50PU9pXDYkSgpjYEAwLz1ERnQ3KVY9Ojg6LioxSyojISduaGNya2hedG9udSJWZThFQFc7Q2c2KkRfOyIrL2paQzpWOWMmOEZKXGVpbTx1SEEsMFpCbDRZbwpULVI5NFc8Uk49YWNPWmlNWHJHZ2hkIVcqWHUhcGxja1VnNCVjcmAyQXJQP1c6Km9BS1deKCQkOUxFUFVZNk9cXWNfSUFeMSRNTFxrT1YyIgooWS08LVdJVzU5TzRLSDo+SCdNLldXcjEiLitGKWgiKSg4K15pJDQkJjtzbiNGOTBZMk4pVG4rVjNLIj9tNiItN2Q1P2opJCIxNFZmKUt1VwpqciFjSURsMDxLZklJXihSJk9CLl84cUBDQDYiQVQlPyVoKzIzMmJza09bJmRXZHJvJ0VSPE0vKSpRYEpeKDBJbzhOYiJyOCQ2ayQ6aWxIYApeaSQsKmpzaEBQS0BTSjFMXk1gX0tZSEpAM0omJ2RXR1FOTic+Vm9HX2RSXEg/NkFkZDIsVlBxJCIxNixObVsvayRtRjxkMkRrTyVGV2VpSApFb2kybC5xKUJHWGN0WENtJD8nQydhPkFoZlMhR2U9NiJVXG8pMlsuJXAxOCsvNT5saF50dEpnKSYlLHVXM1s9LkJNKTo/RFFDWCFEJiFhaApeSjJybFEzZ3MmPEZXdVNMOjYpZFdEMD8xZlA7NFphKV5IREBTRjg+PSZmXnJYTzksZGRjRFcjWDJFKT05cmkjOlk2MT03OTRFI1I9YiohPgpbTCQ/TjxINSpzJ2FySylvLlgyKXFXXmMiPS88ZWEmXWEoUVUkOTYvZl10XShAb1IwYlJtTGZDPCEuS2IwQSxlbSgsXEZjWiEhMT1cNmJYKwplcG1DLkE7VkA6MVglQFNbdWNXZCljOEtQcHU3YjY8IS5LRFBmRFhAU21rN1tDSjFaM3A8Smw1RTxuUDlAJz1Ac2tWXU5wLTU7SzoqMCtGMgooaTtwRV9ZJShIQWFSPTItKyZddTliOSNnUmJKS1IhNFFsIUNMIigvOmM+MytUKDk9IlxMQ006SDxsbThHZFdaUT9NVD9xYD5bPkJccEwzSQpXTWFtYydaVUU9PjBDWFJALmgpZW5JWVUvOkxOL1xsUSIiQkR0cyw8LVtrdS9jS2QtWTEsNUE+SF1CS0QwaCVebk1sVUpiOFo2JzpnJlZPbQo1OXBXR0E3WSk6ZiY8XTpJLWVzYF8jVyFbQiNgajs+YihgIzlUb0ddVyZXKFstVj9zbCltcU8rMm9VO1kwYi1LaDxecmJfIWwnJHIyIzEoYAphK2k/WlksVGkvKGVzS0dXbUI9ZENiVU42IyokT1NnVyktOmolMSpFLW0+M1lhR0A3cFFGUUppcCxGdStoViYqUm5lPEtucWRXRW5qbyxPbwpXPGk4YEleIytafj4KZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqClsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldCmVuZG9iago2IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS9FbmNvZGluZy9NYWNSb21hbkVuY29kaW5nPj4KZW5kb2JqCjcgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGQvRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZz4+CmVuZG9iago4IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYS1PYmxpcXVlL0VuY29kaW5nL01hY1JvbWFuRW5jb2Rpbmc+PgplbmRvYmoKOSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUvRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZz4+CmVuZG9iagoxMCAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9Db3VyaWVyL0VuY29kaW5nL01hY1JvbWFuRW5jb2Rpbmc+PgplbmRvYmoKMTEgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvQ291cmllci1Cb2xkL0VuY29kaW5nL01hY1JvbWFuRW5jb2Rpbmc+PgplbmRvYmoKMTIgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvQ291cmllci1PYmxpcXVlL0VuY29kaW5nL01hY1JvbWFuRW5jb2Rpbmc+PgplbmRvYmoKMTMgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvQ291cmllci1Cb2xkT2JsaXF1ZS9FbmNvZGluZy9NYWNSb21hbkVuY29kaW5nPj4KZW5kb2JqCjE0IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L1RpbWVzLVJvbWFuL0VuY29kaW5nL01hY1JvbWFuRW5jb2Rpbmc+PgplbmRvYmoKMTUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvVGltZXMtQm9sZC9FbmNvZGluZy9NYWNSb21hbkVuY29kaW5nPj4KZW5kb2JqCjE2IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L1RpbWVzLUl0YWxpYy9FbmNvZGluZy9NYWNSb21hbkVuY29kaW5nPj4KZW5kb2JqCjE3IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L1RpbWVzLUJvbGRJdGFsaWMvRW5jb2RpbmcvTWFjUm9tYW5FbmNvZGluZz4+CmVuZG9iagoxOCAwIG9iago8PC9UeXBlL1hPYmplY3QvU3VidHlwZS9JbWFnZS9XaWR0aCAxMTgvSGVpZ2h0IDQ3L0NvbG9yU3BhY2UvRGV2aWNlR3JheS9CaXRzUGVyQ29tcG9uZW50IDgvTGVuZ3RoIDQ1MC9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdPj5zdHJlYW0KR2IiL2VKSV1SPyNYbkxnVDY8ZGYvSS4mP0I9aGNEYWctckQ0XTAlUGZNVForYFFTSStKXUNeJnJEM0E4bE04bm5GRlAhSS5mKmpZQzJUblsKPDdpKDdcPEpIITx1VnVtM0hKZms8OCkrJVpOKk1mLXMlbD5WWlVDcyw5YDlvVyZUTSUvY2dtSlUlLmZMaGJJJCc+Qmd1X2lAUStDJmJXcjYKM0RDTTYvRlVNdCxEQl4sKlIwMHMiXVdGR0MwajojV2E0Z1c8KlFlVDssPztCUyFvcnU1dSRfM0IyalwyQy4nYi5GWHFAWDFBKixhXFNhR0oKOm5Na2NJUVwuSmY6MDU3Xy1MNEo8JTJRTW1JYW9AXDg4RktHYjFwLG1XOyUuSE5DLjtWLitgZClzOnJCaFVqTEhCWDJSQ145X3E4MW5WW0sKTD0yUUJGdDtyVENuNltmcG1wcjdTX2NHIWRXWyxzWDErKzhSPCktJUZjVS5rUnBXUylYRTs5Kzs0bFMrXzZBc3JjRWJRTGNJRWNfOyVNS0UKM2NqR1Q5Kk5bSi5wTjJXbUk4Vz8kbDtjNl01ZC8/cDh0PHNFYUoyZXJsK34+CmVuZHN0cmVhbQplbmRvYmoKMTkgMCBvYmoKPDwvVHlwZS9YT2JqZWN0L1N1YnR5cGUvSW1hZ2UvV2lkdGggNTQvSGVpZ2h0IDU0L0NvbG9yU3BhY2UvRGV2aWNlR3JheS9CaXRzUGVyQ29tcG9uZW50IDgvTGVuZ3RoIDE5Ni9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdPj5zdHJlYW0KR2IiME8zdTM+aCRxL00wSiglUzcsS3VZPC1zLmxILSdxRVMocFJPSENyUG4kN1o5KWE2IkxSJ1Mjb0M1OiJFbGhMJDIzJTI/Ol8nbGNZL3QKOSZDNC9OQHJPW1tFJ2piYHM+XDpQcGptNTxDLE09Jlg7byxBUWptZmFrSm1HJDBEcFQ8YC9XSENJS2RoOHA8MGtJMj9hYVVpSUwxVzMiQyEKNkRkNjZsLD5XXkhbZi49JClyTG5UaVNmSTQzQDlJPFd+PgplbmRzdHJlYW0KZW5kb2JqCjIwIDAgb2JqCjw8L1R5cGUvWE9iamVjdC9TdWJ0eXBlL0ltYWdlL1dpZHRoIDI5NC9IZWlnaHQgNTgvQ29sb3JTcGFjZS9EZXZpY2VHcmF5L0JpdHNQZXJDb21wb25lbnQgOC9MZW5ndGggMTE1My9GaWx0ZXJbL0FTQ0lJODVEZWNvZGUvRmxhdGVEZWNvZGVdPj5zdHJlYW0KR2IiL2NKU2xEXSRxJ15mNUhVVj1vOHVYI0Y7bG5FIipFcVlTOENqWWUjX3RjcD1cV2s7czNFLms6QWFRcCVAWFFjSkkxOSc7dUc0P25xRGkKLDRqUnU0PVI3bSQwbkw5NTBiKTg5JjprMmNVLXI2LFxROm1KZSdsYSJmLGxeL1okM1RsJXJBLm9KUyJmT1JWZjJoN2gpL2RFUSUoKC9VX1YKQjw2cy5XUlBiS1hgWi9FQDk5LnUsSTxsU1BhOWEvOG1LbG8vVSFDZnIzL0pYQGZmUF5ObU4wJkQ4RzdCPixkVEYrTEdtdCwxUkcxT0tSRzUKNiVVYlg+PXFRUTE4WElrOGc6JGxvNGEqNUBnKy5kcCtrXE1dSy1eOzctcyNnIStzXUMvZGkzT3B1YkFJKTZZcyNJamx0R1MhOTlLOnVLJmsKcnRrbjcrczQrOGtlPFU0UjBYIUhqZTQwVldJO21jYmh1Sk1PR1snNDtNWSZpOyloY1A5QmRMb2QpYTw5Sy4mL1lCOlhRVW5lO2JXSl46VVoKKEZOM2BoTVdRO15lXE5VJXBqOzxaVm9EYFpfYiRubVNRO08nPDpCYzYsOEhqSjI1IUw6W0RwN0UoaClyW2ZLLkJIUEh1NU1ORihNLTc8N2YKRjc9JkRTNHQldEJkbT5fLFpmczlxZUpORVcsaUgzRyk1TicwcyIzU1BkcUhBQkEiP3IqW3Bbb2lhMWhLX1dbWm1QKGdFQlskNUgrQzxgVFoKOiokR2FTdStqNzBOYTJpX2tjOSc1Z3I7bFNcbzFiJClkRkVMTiQzMW0hX3VILjpiJCxWMCY4K1wvKFhub0NhYTwwZmkxTE9NRjVfLDFZQEgKJEhQMUlSTyk2SGtzM2gkKTU8cEVZaU48VmcwQDZDa3BpTz5XJjx1dSR1aiNRM1Y4J0ciK29OJT5MRjZYTyNIV2snNjQ6J2Y8VWBWTEdaT20KM1NqJ2dHOj4sP2xdYUZBNVFWTUBQZT4ybjYyP0VmIkk4Lj1pX2AwTT1iUjVJV3Ryc1k4TFRHcWY/MVsmMjZmZWcuR15hZUdwR105VXNhNmYKODFnIylVQlM1JUYtazxRXGs8PzVYW0pcOE9LUDghXGtBVVMnakU6UjZfcWE5YEtRK3Q5SVdaKm9XTEhNITphYEVvaFtnUk5lIXQ1UGNkcU8KRihNQEBSQko3TiktSlE1S3AhTFtORFNNJksmYydXSkBATD5AcDNVdCVZTVVNR1pDIW1qNDkycDhrXEQoLG8nLUhFbSsuO1tUPEc3UUhJKUYKQlVTKClRJCsyM19vXG1ZLCU0KmpScmspS2FMXTFnTnQ+bUBdcCtpMjVHRWdGMSE1blwkRWRMMFpDXm5hODYkMCRcMCY2PzcsXitgO1MrL1kKKSQqVkZvUyxDQGRhR0hcUUk4W0I5MV1WOGRaWXE3PjohYy0pK1R1bFsvZmtjWXFxMio8L0RaPDNAdE1wOiEmXj09Pjh1aTU9WE9LYyklOEQKUGw/P2E1MlNSaCEqW0tzPjZ+PgplbmRzdHJlYW0KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbNCAwIFJdL0lUWFQoNS4xLjEpPj4KZW5kb2JqCjIxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAzIDAgUj4+CmVuZG9iagoyMiAwIG9iago8PC9Qcm9kdWNlcihpVGV4dFNoYXJwIDUuMS4xIFwoY1wpIDFUM1hUIEJWQkEpL0NyZWF0aW9uRGF0ZShEOjIwMjMwMTEwMTQxMjEyLTA4JzAwJykvTW9kRGF0ZShEOjIwMjMwMTEwMTQxMjEyLTA4JzAwJyk+PgplbmRvYmoKeHJlZgowIDIzCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDMwMyAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDY2OTcgMDAwMDAgbiAKMDAwMDAwMDE0MiAwMDAwMCBuIAowMDAwMDAzMjAzIDAwMDAwIG4gCjAwMDAwMDMyNTEgMDAwMDAgbiAKMDAwMDAwMzM0MCAwMDAwMCBuIAowMDAwMDAzNDM0IDAwMDAwIG4gCjAwMDAwMDM1MzEgMDAwMDAgbiAKMDAwMDAwMzYzMiAwMDAwMCBuIAowMDAwMDAzNzIwIDAwMDAwIG4gCjAwMDAwMDM4MTMgMDAwMDAgbiAKMDAwMDAwMzkwOSAwMDAwMCBuIAowMDAwMDA0MDA5IDAwMDAwIG4gCjAwMDAwMDQxMDEgMDAwMDAgbiAKMDAwMDAwNDE5MiAwMDAwMCBuIAowMDAwMDA0Mjg1IDAwMDAwIG4gCjAwMDAwMDQzODIgMDAwMDAgbiAKMDAwMDAwNTAwNCAwMDAwMCBuIAowMDAwMDA1MzcxIDAwMDAwIG4gCjAwMDAwMDY3NjAgMDAwMDAgbiAKMDAwMDAwNjgwNiAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMjMvUm9vdCAyMSAwIFIvSW5mbyAyMiAwIFIvSUQgWzwzMTdjOGM0NTU5ZDk5YjQzNjRhM2UwNGRhOTYyNjZjMT48MjU4MWYzYjZlM2JhNmFkMjMyMzRjOGI1OTBhYWI4ODE+XT4+CnN0YXJ0eHJlZgo2OTQyCiUlRU9GCg=='
      replyObj = {labelData: base64PDF}
    } else {
      const options = {
        headers: {
          'Host': 'ssapi.shipstation.com',
          'Authorization': 'Basic '+authStr,
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios.post("https://ssapi.shipstation.com/shipments/createlabel",requestObj,options)
        console.log(response.data)
        replyObj = response.data
      } catch (err) {
        console.log(err.response)
        throw err;
      }
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