import { refreshSalonData, refreshData, refreshUsers, refreshFormulas,
    queryCycles, queryBatch} from "$lib/backend/backend";

export const getDeviceNumbersAnnotated = async () => {
    const batches = await queryBatch();
    return batches.reduce((previous, current) => {
        const key = (current?.msg ?? '') === '' ? 'None' : current.msg
        if (!(key in previous)) {
            previous[key] = []
        }
        previous[key].push(current)

        previous[key] = previous[key].sort((a,b) => {
            return a._lastChangedAt - b._lastChangedAt;
        })
        return previous
    }, {})
}

export const getCyclesAnnotated = async () => {
    const cycles = await queryCycles();
    return (await Promise.all(cycles.map(async (c) => {
        let out = {...c}
        out.formula = await c.formula;
        out.mixture = await c.mixture;
        out.stylist = await c.stylist;
        

        if (out.stylist && JSON.stringify(out.stylist) !== '{}'
            && out.stylist.salonUsersId
            && out.stylist.salonUsersId !== '') {
                out.salon = await out.stylist.salon
        }
        if ((out?.tags?.length ?? 0) >= 3) {
            out.deviceSerialNumber = out.tags[2]
        }
        if ((out?.tags?.length ?? 0) >= 2) {
            out.deviceId = out.tags[1]
        }

        return out;
    }))).sort((a, b) => {
        const aTime = new Date(a.dateTime).valueOf()
        const bTime = new Date(b.dateTime).valueOf()
        return aTime - bTime
    });
}

export const getBatchesAnnotated = async () => {
    const batches = await queryBatch();
    return batches;
    /*return await Promise.all(batches.map(async (b) => {

    }))*/
}

export const organizeBySalon = async (c = null) => {
    let cycles = c;
    if (cycles == null) {
        cycles = await getCyclesAnnotated();
    }
    return cycles.reduce((prv, curr) => {
        let salonId = (curr?.salon?.id ?? 'None')
        if (salonId === 'None' || salonId === '') {
            salonId = curr?.deviceSerialNumber ?? 'None'
        }
        if (salonId === 'None' || salonId === '') {
            salonId = curr?.stylist?.name ?? 'None'
        }
        if (!(salonId in prv)) {
            prv[salonId] = [];
        }
        prv[salonId].push(curr);
        return prv;
    },{'_by':'Salon'})
}

export const organizeByUser = async (c = null) => {
    let cycles = c;
    if (cycles == null) {
        cycles = await getCyclesAnnotated();
    }
    return cycles.reduce((prv, curr) => {
        const stylistId = (curr?.stylist?.id ?? 'None')
        if (!(stylistId in prv)) {
            prv[stylistId] = [];
        }
        prv[stylistId].push(curr);
        return prv;
    },{'_by':'User'})
}

const quickCount = (cycles) => {
    const rawNumbers = cycles.reduce((p, c) => {
        if (c?.otherCycles ?? false) {
            p += c.otherCycles.length
        } else {
            p += 1
        }
        return p;
    }, 0)

    const serialNums = cycles.reduce((p, c) => {
        const serialNum = c?.deviceSerialNumber ?? ''
        if (serialNum !== '' && !p.includes(serialNum)) {
            p.push(serialNum)
        }
        return p;
    },[])

    const numbers = cycles.length
    const salonName = cycles[0]?.salon?.name ?? null
    const stylistName = cycles[0]?.stylist?.name ?? null
    const salonObj = cycles[0]?.salon ?? null
    const stylistObj = cycles[0]?.stylist ?? null
    return {numbers, rawNumbers, serialNums, salonName, stylistName, salonObj, stylistObj}
}

export const quickBatchCount = async (bd) => {
    if (bd.length == 0 || bd.length == 1) {
        return {numbers: -1}
    }
    const startObj = bd[0]
    const endObj = bd[bd.length - 1]
    return {numbers: endObj.cycleCount - startObj.cycleCount, 
        start: new Date(startObj._lastChangedAt),
        end: new Date(endObj._lastChangedAt),
        dateRangeStr: new Date(startObj._lastChangedAt).toLocaleString() +' - ' + new Date(endObj._lastChangedAt).toLocaleString()
    }
}

export const countCycles = async (c, bd = {}) => {
    let cycles = c;
    if (cycles == null) {
        return {}
    }

    const bySalon = cycles['_by'] == 'Salon'

    let output = {};
    for (var currIndex in Object.keys(cycles)) {
        const curr = Object.keys(cycles)[currIndex]

        if (curr.startsWith('_')) {
            output[curr] = cycles[curr];
            continue;
        }

        const cycleArr = cycles[curr]
        //const bySalon = curr === (cycleArr[0]?.salon?.id ?? )

        const quickObj = quickCount(cycleArr);

        let byStylist = undefined;
        if (bySalon) {
            const byStylistObj = await organizeByUser(cycleArr);
            byStylist = await countCycles(byStylistObj);
        }

        const salonName = quickObj.salonName != null ? quickObj.salonName : curr;
        const stylistName = quickObj.stylistName != null ? quickObj.stylistName : curr;
        const salonObj = quickObj.salonObj != null ? quickObj.salonObj : null;
        const stylistObj = quickObj.stylistObj != null ? quickObj.stylistObj : null;

        let hardwareObj = {numbers: -1, start: new Date(1980, 0, 1), end: new Date(), dateRangeStr: 'Not Enough'}
        if (quickObj.serialNums.length > 1) {
            console.log('Multiple devices for this one location, using first')
            console.log('TODO: Handle case with multiple devices for one location?')
        }
        if (quickObj.serialNums.length > 0) {
            const thisSerialNumber = quickObj.serialNums[0];
            if (!(thisSerialNumber in bd)){
                console.log(thisSerialNumber + ' has no batch data assigned to it :/')
            } else {
                const hardwareRaw = bd[thisSerialNumber]
                const hardwareNumbers = await quickBatchCount(hardwareRaw)
                hardwareObj = {
                    raw: hardwareRaw,
                    ...hardwareNumbers,
                }
            }
        }


        const outObj = {
            name: bySalon ? salonName: stylistName,
            obj: bySalon ? salonObj : stylistObj,
            count: quickObj.numbers,
            rawCount: quickObj.rawNumbers,
            deviceSerialNums: quickObj.serialNums,
            byStylists: byStylist,
            rawCycles: cycleArr,
            hardwareNumbers: hardwareObj,
        }
        output[curr] = outObj
    }
    return output;
}

export const splitCount = (c) => {
    const cycles = c;
    if (!cycles) {
        return {}
    }

    const out = Object.keys(c).reduce((previous, current) => {

    }, {})
}
