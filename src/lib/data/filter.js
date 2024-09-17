import { getCyclesAnnotated } from "./cycles";

export const timeFormulaFilter = (c = null, threshMinutes = 15) => {
    const threshMillis = threshMinutes*60*1000;

    let cycles = c;
    if (cycles == null) {
        //cycles = await getCyclesAnnotated();
        return {}
    }

    // we need to
    // loop through cycles, each cycle ->
    //   check
    let newCycles =  [];
    cycles.reduce((previous, current) => {
        const formulaId = current?.formula?.id ?? 'Null'
        if (previous.includes(formulaId)) {
            return previous;
        }

        // Grab all cycles with same Formula
        const sameFormulas = cycles.filter(c => {
            return (c?.formula?.id ?? 'Null') == formulaId
        }).sort((a,b) => {
            const aTime = new Date(a.dateTime)
            const bTime = new Date(b.dateTime)
            return aTime.valueOf() - bTime.valueOf()
        })

        // do the bread and butter of this
        // take the sameFormulas and combine same-time cycles together to one
        // reducedFormulas is the finalized array of cycles filtered
        let alreadyVisited = []
        const reducedFormulas = sameFormulas.reduce((prev, curr, index) => {
            const cycleId = curr.id;
            if (alreadyVisited.includes(cycleId)) {
                return prev;
            }
            
            let currTime = new Date(curr.dateTime);

            // go through all the elements after 'curr' element and check time
            // deltas; make an array and add to alreadyVisited if close in time
            // returns closeTimes of all cycles close in time to curr
            const closeTimes = sameFormulas.reduce((p, c, i) => {
                // check if after this element
                // or check if we alreadyVisited
                const cId = c.id
                if (i < index || alreadyVisited.includes(cId)) {
                    return p
                } else if (i == index) {
                    alreadyVisited.push(cId);
                    p.push(c);
                    return p;
                }

                // calculate timeDelta between curr and c
                // if less than threshMillis, push to alreadyVisited and push
                // to accumulator p
                const cTime = new Date(c.dateTime);
                const timeDelta = currTime.valueOf() - cTime.valueOf()
                if (Math.abs(timeDelta) < threshMillis) {
                    alreadyVisited.push(cId)
                    p.push(c)
                    if (timeDelta < 0)
                        currTime = cTime;
                }
                return p;
            }, [])

            curr.otherCycles = closeTimes;
            prev.push(curr);
            return prev;
        },[])

        newCycles = newCycles.concat(reducedFormulas);

        previous.push(formulaId);
        return previous;
    },[]);

    return newCycles;
}

export const removeTaggedCycles = (c = null, tags = ['Quick']) => {
    let cycles = c;
    if (cycles == null) {
        //await getCyclesAnnotated();
        return {}
    }

    return cycles.filter(cc => 
        !(cc.tags.some(t => tags.includes(t)))
    )
}

export const onlyTaggedCycles = (c = null, tags = ['Full']) => {
    let cycles = c;
    if (cycles == null) {
        return {}
    }

    return cycles.filter(cc => 
        (cc.tags.some(t => tags.includes(t)))
    )
}

export const removeSalons = (c = null, salons=[]) => {
    let cycles = c;
    if (cycles == null) {
        return {}
    }

    return cycles.filter(cc => 
        (!salons.includes(cc?.salon?.id ?? 'Null'))
        && (!salons.includes(cc?.salon?.name ?? 'Null'))
    )
}

export const removeUsers = (c = null, users = []) => {
    let cycles = c;
    if (cycles == null) {
        return {}
    }

    return cycles.filter(cc => 
        (!users.includes(cc?.stylist?.id ?? 'Null'))
        && (!users.includes(cc?.stylist?.name ?? 'Null'))
    )
}

export const removeNone = (c = null, arg) => {
    let cycles = c;
    if (cycles == null) {
        return {}
    }

    return cycles.filter(cc => cc.stylist !== undefined)
}

export const sortAlphabetical = (c,key='name', reverse = false) => {
    let cycles = c;
    if (!cycles) {
        return {}
    }

    const flip = reverse ? -1 : 1;

    return Object.keys(cycles).sort((a,b) =>
        (a.startsWith('_') || b.startsWith('_')) ? 0 : flip*(cycles[a][key].localeCompare(cycles[b][key]))
    ).reduce((previous,current) => {
        previous[current] = cycles[current];
        return previous
    }, {})
}

export const sortNumeric = (c, key='count', reverse= false) => {
    let cycles = c;
    if (!cycles) {
        return {}
    }

    const flip = reverse ? -1 : 1;

    return Object.keys(cycles).sort((a,b) =>
        (a.startsWith('_') || b.startsWith('_')) ? 0 : flip*(cycles[a][key] - cycles[b][key])
    ).reduce((previous,current) => {
        previous[current] = cycles[current];
        return previous
    }, {})
}

export const sortSerialNums =  (c, key='deviceSerialNums', reverse=false) => {
    let cycles = c;
    if (!cycles) {
        return {}
    }

    const flip = reverse ? -1 : 1;

    return Object.keys(cycles).sort((a, b) => {
        if (a.startsWith('_') || b.startsWith('_')) {
            return 0;
        }
        if (cycles[a][key].length < 1) {
            return -1*flip
        }
        if (cycles[b][key].length < 1) {
            return flip
        }
        return flip*(cycles[a][key][0].slice(-4).localeCompare(cycles[b][key][0].slice(-4)))
    }).reduce((previous,current) => {
        previous[current] = cycles[current];
        return previous
    }, {})
}