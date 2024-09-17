import { refreshSalonData, refreshData, refreshUsers, refreshFormulas, } from "$lib/backend/backend";

export const getFullCycles = async (fromDate='', toDate='') => {
    const {batches, cycles, devices} = await refreshData();
    return cycles?.filter(c => c.tags[0] === 'Full')
        .sort((a,b) => a.dateTime.localeCompare(b.dateTime)) ?? null

}

export const getCyclesOverTime = async (cycles, fromDate='', toDate='') => {
    const startObj = Date.parse(fromDate != '' ? fromDate : '01 Jan 1990');
    const endObj = toDate != '' ? Date.parse(toDate) : Date.now();

    return cycles?.filter((c) => {
        const cycleDateObj = Date.parse(c.dateTime);
        return endObj >= cycleDateObj && cycleDateObj >= startObj;
    })
}

function isThrivo(email, name) {
    return false
    || email === 'brendon@thrivotech.com'
    || email === 'austinssmith89@gmail.com'
    || name === 'nick cage'
    || email === 'lj@thrivotech.com'
    || email === 'brendon.jackson6@gmail.com'
}

function isFG(email, name) {
    return email === 'briennetambini@gmail.com'
    || email === 'marygambino@mac.com'
}

// Katie Haqq  -> Halo South Tampa
// Blair Whitt/Deberry -> Hive Beauty Collective
// Jessie Simon -> Halo : Crrowood/SouthTampa ??
// Haydee Idos -> Halo : Carrrowood
// Aaron Moore -> Palm Sunday
const deviceMappings = {
    "7EFE95FA-B1AB-EAB5-5731-63BF5859023F": 'Studio Be Salon: South',
    "3EF97203-E816-AB05-1435-916415C09CE1": 'The Orlando Salon',
    "D8FC4502-843A-6572-4BD0-DFB09C2A83DE": 'Studio Be Salon: Loveland',
    "47A6556C-D3EF-DBCC-D91F-015CA90F1836": 'Felix & Ginger',
    "34FBDD7B-AF09-634F-1EF3-1177B16C66DF": 'Studio Be Salon: Oldtown',
    "7B0E9D22-4F20-E4B8-8501-6E3189EA9680": 'Lumeria Beauty',
    "DF199CAC-6B49-8C1C-4914-8F9D5CE21277": 'Robert Cromeans Salon',
    "2A406127-0014-DECE-1743-334D9716E783": 'Sydney Grace Hair',
    "307D60C1-6DEA-AF28-4146-7E0B36B57B77": 'Salon Halo: South Tampa',
    "81B8FB42-7B6B-F112-873C-05AA5C456E3B": 'Salon Halo: Springhill',
    "1C3535A9-9621-BC05-6030-4D33E7D6894C": 'Salon Halo: South Tampa',
    "42BDAA6F-0366-FF50-EA01-50DD249B78AA": 'Studio Be Salon: Mackenzie??',
    "6A8CB6FB-F6E0-AB7A-7A47-63D9D9B831B1": 'Studio Be Salon: Boulder 1',
    "F25D6F1E-0736-1D8B-3F1C-CC9A0C9737B5": 'Salon Halo: Mandie Ciralsky??',
    "0DFB639E-D6E5-9413-A0FB-869D5CA3A9DF": 'Salon Halo: Luis Jimenez??',
    "A869C260-6EED-4F9A-97E9-6F5499650E77": 'Caru',
    "5115F26B-68F8-16E3-FF55-82D99856398E": 'Katie Johnson??',
    "EE91D410-93DE-6779-EC6C-B5E6E91652A1": 'Alyssia Hale (independent)',
    "17EF0EDD-30A2-EA2C-6195-B8E45A29FB56": 'Salon Halo: Carrowood (Haydee)',
    "9A35C876-A121-6FFA-46F6-2C1AFFC69A88": 'Salon Halo: Carrowood (Haydee)',
    "8EAD0342-7B8B-8699-FE87-1F238FEFEC71": 'Salon Halo: Carrowood/South Tampa (Jessie)',
    "B3DD1C63-79B6-9553-87BB-D2875DED8A02": 'Robert Cromeans Salon (Mary)',
    "FCD4AB05-06B6-25DA-44A0-9111B766C9A2": 'Hive (Blair)',
    "6151A789-6572-6321-6C8C-2E304868E8F6": 'Kim Bennett Studio (Kim)',
    "8FBCC725-8EE1-08C0-8962-A4AE6711E653": 'Austin Curls (Destiny Andrews)',
    "78ABF9F9-18E5-A738-5D4C-A89568DA9BFC": 'Austin Curls (Jasmin)',
    "D206ADAB-EE37-93EA-A12F-33DF5FE85F04": 'Palm Sunday (Aaron Moore)',
    "40AAED0A-BC94-13C9-9D01-1256739D3D1F": 'Robert Cromeans Salon (Katie Baker)',
    "58699B3F-2A97-21EF-8307-F57D0A7011F4": 'Hygge Hair Studio',
    "BDBB59A8-E337-1BE7-0F42-AEF125E7779A": 'Studio Be Salon: Oldtown',
    "674E7078-6B38-3105-B1D6-7B7008870ED1": 'Orlando Salon',
    "574AC4CD-0AFA-7C9A-C81E-48DB51342599": 'Palm Sunday (Eleanor)',
    "D8FC4502-843A-6572-4BD0-DFB09C2A83DE": 'Studio Be Salon: Loveland'
}

export function deviceToSalonName(deviceId, n) {
    if (deviceId in deviceMappings) {
        return deviceMappings[deviceId]
    }
    return n;
}

export const removeThrivoMembers = async (cycles) => {
    return  (await Promise.all(cycles.map(async (c) => {
        const stylist = await c.stylist
        if (!stylist) return null;
        if (isThrivo(stylist.email.toLowerCase(), stylist.name.toLowerCase())) return null;
        return c;
    }))).filter(c => c != null); 
}


export const organizeCycles = async (sortBy = 'Users', timeFrame=null) => {
    // 'Users', 'Devices'
    //const dataData = await refreshData();
    const usersData = await refreshUsers();
    
    const ogCycles = await removeThrivoMembers(await getFullCycles());
    let fullCycles = ogCycles;
    if (timeFrame != null) {
        let start = undefined;
        let end = undefined;
        if (timeFrame.start != undefined) {
            start = timeFrame.start;
        }
        if (timeFrame.end != undefined) {
            end = timeFrame.end;
        }
        fullCycles = await getCyclesOverTime(ogCycles, start, end)
    }

    console.log('total cycles = ' + fullCycles.length)
    fullCycles.forEach((c,i) => {
        if (c.tags[1] && c.tags[1].includes('7EFE')) {
        console.log(c.id + ' :: '  + c.tags[1] + ' :: ' + c.dateTime.split('T')[0])
        }
    })

    let byUsers = {};
    for (let i = 0; i < fullCycles.length; i++) {
        const stylist = await fullCycles[i]?.stylist ?? null;
        if (!stylist) continue;

        if (stylist.id in byUsers) {
            byUsers[stylist.id].count += 1;
            byUsers[stylist.id].collection.push(fullCycles[i]);
        } else {
            byUsers[stylist.id] = {count: 1, collection: [fullCycles[i]], stylist: stylist}
        }
    }
    const sortedByUser = Object.keys(byUsers).map(u => byUsers[u]).sort((a, b) => b.count - a.count);

    const devicesToStylist = {}

    sortedByUser.forEach(sbu => {
        const devices = sbu.collection.reduce((p, c) => {
            if (c.tags.length <= 1) {
                return p;
            }
            if (p.includes(c.tags[1])) {
                return p;
            }
            if (c.tags[1] in devicesToStylist) {
                devicesToStylist[c.tags[1]].push(sbu.stylist.email + ' : ' + sbu.stylist.name);
            } else {
                devicesToStylist[c.tags[1]] = [sbu.stylist.email + ' : ' + sbu.stylist.name]
            }
            p.push(c.tags[1]);
            return p;
        }, [])
        console.log(sbu.stylist.email + ' :: ' + JSON.stringify(devices))
       
    })
    console.log(JSON.stringify(devicesToStylist, null, 4))

    if (sortBy === 'uuid_Devices') {
        let byDevice = {};
        for (let i = 0; i < sortedByUser.length; i++) {
            const someCycle = sortedByUser[i].collection.find(c => {
                if (c.tags.length > 1) {
                    return c.tags[1] 
                }
                return false;
            });
            let deviceNumber = 'None';
            const name = sortedByUser[i].stylist.name.toLowerCase();
            const email = sortedByUser[i].stylist.email.toLowerCase()
            if (someCycle) {
                deviceNumber = someCycle.tags[1]
            } else if (isFG(email, name)) {
                deviceNumber = "47A6556C-D3EF-DBCC-D91F-015CA90F1836";
            } else if (email === "boulder@studiobesalon.com") {
                // studio be boulder
                deviceNumber = "6A8CB6FB-F6E0-AB7A-7A47-63D9D9B831B1";
            } else if (email === "smoosie45@gmail.com") {
                deviceNumber = "34FBDD7B-AF09-634F-1EF3-1177B16C66DF";
                // be salon north
            } else if (email === "d84gpvnywg@privaterelay.appleid.com") {
                deviceNumber = "81B8FB42-7B6B-F112-873C-05AA5C456E3B";
                // halo spring hill
            } else if (email === "management@salon-halo.com") {
                // Ryan @ Halo management??
                deviceNumber = "81B8FB42-7B6B-F112-873C-05AA5C456E3B"
            } else if (email === "katiebaker048@gmail.com") {
                deviceNumber = "DF199CAC-6B49-8C1C-4914-8F9D5CE21277"
            }
            if (deviceNumber in byDevice) {
                byDevice[deviceNumber].collection = byDevice[deviceNumber].collection.concat(sortedByUser[i].collection);
                byDevice[deviceNumber].count += sortedByUser[i].count;
                byDevice[deviceNumber].stylists.push(sortedByUser[i].stylist)
                //byDevice[deviceNumber].
            } else {
                byDevice[deviceNumber] = {};
                byDevice[deviceNumber].collection = sortedByUser[i].collection;
                byDevice[deviceNumber].count = sortedByUser[i].count;
                byDevice[deviceNumber].stylists = [sortedByUser[i].stylist]
                byDevice[deviceNumber].device = deviceNumber;
            }
        }
        const sortedByDevice = Object.keys(byDevice).map(u => byDevice[u]).sort((a, b) => b.count - a.count);

        console.log(sortedByDevice);
        return sortedByDevice;
    } else  if (sortBy === 'Devices') {
        let byDevice = {};
        for (let i = 0; i < sortedByUser.length; i++) {
            const someCycle = sortedByUser[i].collection.find(c => {
                if (c.tags.length > 2) {
                    return c.tags[2] 
                }
                return false;
            });
            let deviceNumber = 'None';
            const name = sortedByUser[i].stylist.name.toLowerCase();
            const email = sortedByUser[i].stylist.email.toLowerCase()
            if (someCycle) {
                deviceNumber = someCycle.tags[2]
            } /*else if (isFG(email, name)) {
                deviceNumber = "47A6556C-D3EF-DBCC-D91F-015CA90F1836";
            } else if (email === "boulder@studiobesalon.com") {
                // studio be boulder
                deviceNumber = "6A8CB6FB-F6E0-AB7A-7A47-63D9D9B831B1";
            } else if (email === "smoosie45@gmail.com") {
                deviceNumber = "34FBDD7B-AF09-634F-1EF3-1177B16C66DF";
                // be salon north
            } else if (email === "d84gpvnywg@privaterelay.appleid.com") {
                deviceNumber = "81B8FB42-7B6B-F112-873C-05AA5C456E3B";
                // halo spring hill
            } else if (email === "management@salon-halo.com") {
                // Ryan @ Halo management??
                deviceNumber = "81B8FB42-7B6B-F112-873C-05AA5C456E3B"
            }*/
            if (deviceNumber in byDevice) {
                byDevice[deviceNumber].collection = byDevice[deviceNumber].collection.concat(sortedByUser[i].collection);
                byDevice[deviceNumber].count += sortedByUser[i].count;
                byDevice[deviceNumber].stylists.push(sortedByUser[i].stylist)
                //byDevice[deviceNumber].
            } else {
                byDevice[deviceNumber] = {};
                byDevice[deviceNumber].collection = sortedByUser[i].collection;
                byDevice[deviceNumber].count = sortedByUser[i].count;
                byDevice[deviceNumber].stylists = [sortedByUser[i].stylist]
                byDevice[deviceNumber].device = deviceNumber;
            }
        }
        const sortedByDevice = Object.keys(byDevice).map(u => byDevice[u]).sort((a, b) => b.count - a.count);

        console.log(sortedByDevice);
        return sortedByDevice;
    } else if (sortBy === 'missingDeviceId') {

    } else {
        //console.log(sortedByUser);
        return sortedByUser;
    }

    //console.log(fullCycles)
}