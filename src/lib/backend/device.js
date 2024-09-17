import { Device } from '$src/models';
import { DataStore } from 'aws-amplify';

export const getAllDevice = async () => {
    const allDevices = await DataStore.query(Device)

    console.log(allDevices);
    if (allDevices) {
        return allDevices;
    }

    return null;
}
/*
  id: ID!
  
  serial: String
  status: String
  properties: AWSJSON
  
  salon: Salon @belongsTo
    -> salonDevicesId

  log: [Log]
    -> Array of {dateTime, msg}
  
  taggedCycles: [CycleInfo] @hasMany
  batchedCycles: [BatchInfo] @hasMany
  
  curatedData: [AWSJSON]
    -> Array of Js obj

  salonAdminGroups: [String]
  salonGroups: [String]
*/

export const sanitizeDeviceObj = (obj) => {
    return {
        id: obj.id,
        serial: obj.serial,
        status: obj.status,
        properties: obj.properties,
        salonDevicesId: obj.salonDevicesId,
        //log: obj.log,
        //curatedData: obj.curatedData,
        salonAdminGroups: obj.salonAdminGroups,
        salonGroups: obj.salonGroups
    }
}

export const updateDevice = async (id, obj) => {
    const cleanObj = sanitizeDeviceObj(obj)
    const device = await DataStore.query(Device, id);
    await DataStore.save(Device.copyOf(device, updated => {
        if (cleanObj.serial !== undefined) {
            updated.serial = cleanObj.serial
        }
        if (cleanObj.status !== undefined) {
            updated.status = cleanObj.status
        }
        if (cleanObj.properties !== undefined) {
            updated.properties = cleanObj.properties
        }
        if (cleanObj.salonDevicesId !== undefined) {
            updated.salonDevicesId = cleanObj.salonDevicesId
        }
        if (cleanObj.salonAdminGroups !== undefined) {
            updated.salonAdminGroups = cleanObj.salonAdminGroups
        }
        if (cleanObj.salonGroups !== undefined) {
            updated.salonGroups = cleanObj.salonGroups
        }
    }))
}

export const newDevice = async (id, obj) => {
    const cleanObj = sanitizeDeviceObj(obj)

    const newDevice = await DataStore.save(new Device(
        cleanObj
    ))
    console.log('Created a new Device: ' + JSON.stringify(newDevice, null, 4))
    return newDevice
}