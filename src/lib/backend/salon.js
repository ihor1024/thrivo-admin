import { Predicates, DataStore } from "aws-amplify"
import { Salon, User } from '$src/models';

const sanitize = (str, comma = true) => {
    return (str !== '') ? (str + (comma? ', ' : ' ')) : ''
}

export const ConvertAddressObjToStr = (obj) => {
    if (!obj || obj===null || obj === {}) {
        return ''
    }
    return sanitize(obj?.address1 ?? '')
         + sanitize(obj?.address2 ?? '')
         + sanitize(obj?.address3 ?? '')
         + sanitize(obj?.locality ?? '') 
         + sanitize(obj?.region ?? '', false)
         + sanitize(obj?.postalCode ?? '')
         + sanitize(obj?.country ?? '', false)
}

export async function addRateToSalon(id, rate) {
    try {
        const toUpdate = await DataStore.query(Salon, id)
        if (!toUpdate) {
            console.log('Failed to query Salon')
            return null;
        }
        const out = await DataStore.save(Salon.copyOf(toUpdate, updated => {
            updated.shipping = {...updated.shipping, ourRate: {percent: rate}}
        }))
        if (!out) {
            console.log('Failed to update Salone')
            return null;
        }
        return out;
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function addSalon(name, phone, locationObj, privileges={}, shipping={}) {
    try {
        console.log('LOCATION OBJ ' + JSON.stringify(locationObj, null, 4))

        const out = await DataStore.save(new Salon({
            name: name,
            phone: (!phone || phone === '') ? undefined : phone,
            location: (!locationObj || JSON.stringify(locationObj) === '{}' ) ? undefined : locationObj,
            defaultSalonGroups: [name.replace(/ /g,"_")+'::Users'],
            defaultSalonAdminGroups: [name.replace(/ /g,"_")+'::Admins'],
            privileges: privileges,
            shipping: shipping
        }))
        if (out) {
            return out
        } else {
            console.log('Could not create a new salon?')
            return null
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function toggleSalonScalePrivilege(id) {
    const toUpdate = await DataStore.query(Salon, id)
    const flag = !(toUpdate?.privileges?.scale ?? false)
    return await updateSalon(toUpdate.id, toUpdate.name, toUpdate.phone, toUpdate.location, {...toUpdate.privileges, scale: flag})
}

export async function toggleSalonShippingPrivilege(id) {
    const toUpdate = await DataStore.query(Salon, id)
    const flag = !(toUpdate?.privileges?.shipping ?? false)
    return await updateSalon(toUpdate.id, toUpdate.name, toUpdate.phone, toUpdate.location, {...toUpdate.privileges, shipping: flag})
}

export async function updateSalon(id, name, phone, locationObj, privileges=undefined, shipping=undefined) {
    try {
        const toUpdate = await DataStore.query(Salon, id)
        console.log('LOCATION OBJ ' + JSON.stringify(locationObj, null, 4))
        if (!toUpdate) {
            console.log('Could Not query Salon ' + id);
            return null
        }
        const out = await DataStore.save(Salon.copyOf(toUpdate, updated => {
            updated.name = name;
            updated.phone = (!phone || phone === '') ? null : phone;
            updated.location = (!locationObj || locationObj === {} ) ? null : locationObj;
            //updated.defaultSalonGroups = [name.replace(/ /g,"_")+'::Users'],
            //updated.defaultSalonAdminGroups = [name.replace(/ /g,"_")+'::Admins'],
            updated.privileges = privileges ? privileges : updated.privileges;
            updated.shipping = shipping ? shipping : updated.shipping;
            updated.updatedAt = new Date().toISOString()
            updated.createdAt = updated?.createdAt ?? updated.updatedAt
        }))
        if (out) {
            return out
        } else {
            console.log('Could not update Salon')
            return null
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function getSalons() {
    try {
        const out = await DataStore.query(Salon, Predicates.ALL);
        if (out){
            return out;
        } else {
            console.log('Could not query all salons')
            return null
        }
    } catch (err) {
        console.log(err)
        return null
    }
}