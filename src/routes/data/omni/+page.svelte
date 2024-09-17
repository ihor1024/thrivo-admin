<script>
	import { onMount } from 'svelte';
    import {browser} from '$app/environment'
    import { Auth, Hub, DataStore, Amplify } from 'aws-amplify';

    import {getCyclesAnnotated, organizeBySalon, organizeByUser, countCycles, getDeviceNumbersAnnotated} from '$lib/data/cycles';
    import {timeFormulaFilter, removeTaggedCycles, removeSalons, removeNone,
        removeUsers, sortAlphabetical, sortNumeric, sortSerialNums} from '$lib/data/filter';

    //Amplify.Logger.LOG_LEVEL = 'VERBOSE';

    let currentGroup = 'Salon'

    let cyclesAnnotated = []
    let bySalon = {}
    let byUser = {}
    let batchData = {}

    let start = new Date(2023, 3, 5);
    let end = new Date();

    let filters = {
        removeSalons: {enable: true, value: ['387f98f3-d74d-4928-bfcb-596fbe702b11'], func: removeSalons},
        removeNone: {enable: true, value: null, func: removeNone},
        removeTags: {enable: true, value: ['Quick','Test'], func: removeTaggedCycles},
        removeUsers: {enable: true, value: ['Brendjuan'], func: removeUsers},
        timeFormula: {enable: true, value: 15, func: timeFormulaFilter},
    }

    let sort = [
        {key: 'name', func: sortAlphabetical, enable: false, reverse: false},
        {key: 'count', func: sortNumeric, enable: false, reverse: true},
        {key: 'rawCount', func: sortNumeric, enable: false, reverse: false},
        {key: 'deviceSerialNums', func: sortSerialNums, enable: false, reverse: false}
    ]

    let viewedData = {};
    let timeFrameData = {};
    let filteredData = {};
    let countedData = {};
    let sortedData = {};

    let timeFrameBatch = {};

    const onLoadCallback = async () => {
        cyclesAnnotated = await getCyclesAnnotated();
        bySalon = await organizeBySalon(cyclesAnnotated)
        byUser  = await organizeByUser(cyclesAnnotated)
        if (currentGroup == 'Salon') {
            viewedData = bySalon
            viewedData['_by'] = 'Salon'
        } else if (currentGroup == 'User') {
            viewedData = byUser
            viewedData['_by'] = 'User'
        }
        batchData = await getDeviceNumbersAnnotated();
        console.log('Raw data grabbed')
        console.log(viewedData)
        console.log(batchData)
        await applyTimeFrame()
        console.log('Applied a time frame')
        console.log(viewedData)
        await applyFilter()
        console.log('Applied the filters')
        console.log(viewedData)
        await runCount()
        console.log('Run count')
        console.log(countedData)
        await applySort()
        console.log('Run Sort')
        console.log(sortedData)
        //await splitResults()
    }

    const applyTimeFrame = async () => {
        timeFrameData = Object.keys(viewedData).reduce((p, c, i) => {
            if (c.startsWith('_')) {
                p[c] = viewedData[c]
                return p;
            }
            const cycles = viewedData[c]
            p[c] = cycles.filter(cc => {
                const cTime = new Date(cc.dateTime)
                //console.log( ((start.valueOf() <= cTime.valueOf()) &&
                //   (end.valueOf() > cTime.valueOf())) + ' == ' + start.valueOf() + ' <= ' + cTime.valueOf() + ' < ' + end.valueOf())

                return (start.valueOf() <= cTime.valueOf()) &&
                    (end.valueOf() > cTime.valueOf())
            })
            return p;
        },{})
        timeFrameBatch = Object.keys(batchData).reduce((p, c, i) => {
            if (c.startsWith('_')){
                p[c] = batchData[c]
                return p
            }
            const batches = batchData[c];
            let minI = -1;
            let maxI = -1;
            p[c] = batches.filter((cc, i) => {
                const cTime = cc._lastChangedAt
                if (((start.valueOf() <= cTime) && (end.valueOf() > cTime))) {
                    minI = minI < 0 ? i : (minI > i ? i : minI)
                    maxI = maxI < 0 ? i : (maxI > i ? maxI : i)
                }
                return (start.valueOf() <= cTime) && (end.valueOf() > cTime)
            })
            if (minI > 0) {
                p[c] = [batches[minI-1]].concat(p[c])
            }
            if (minI == 0 && batches.length > 0) {
                p[c] = [{_lastChangedAt: batches[0]._lastChangedAt-10,
                    cycleCount: batches[0].cycleCount-1,
                    cancelCount: batches[0].cancelCount,
                    msg: batches[0].msg,
                }].concat(p[c])
            }
            if (maxI >= 0 && maxI < batches.length-1) {
                p[c].push(batches[maxI+1])
            }
            return p;
        },{})
    }

    const applyFilter = async () => {
        filteredData = Object.keys(timeFrameData).reduce((p, c, i) => {
            if (c.startsWith('_')) {
                p[c] = timeFrameData[c];
                return p;
            }
            const cycles = timeFrameData[c]

            let runningArr = cycles;
            Object.keys(filters).forEach(f => {
                const filterObj = filters[f]
                
                if (filterObj?.enable ?? false) {
                    runningArr = filterObj.func(runningArr, filterObj.value)
                }
                //console.log('FILTER: ' + f + ' on ' + c)
                //console.log(runningArr)
            })
            if (runningArr.length > 0) {
                p[c] = runningArr
            }
            return p;
        },{})
    }

    const runCount = async () => {
        countedData = await countCycles(filteredData, timeFrameBatch);
    }

    const splitResults = async () => {
        //splitCountedData = await splitCount(countedData);
    }

    const applySort = async () => {
        sortedData = countedData;
        sort.forEach((sortObj) => {
            if (!sortObj.enable) {
                return;
            }
            sortedData = sortObj.func(sortedData, sortObj.key, sortObj.reverse);
            sortedData = Object.keys(sortedData).reduce((previous, current) => {
                previous[current] = sortedData[current]
                if (!current.startsWith('_')) {
                    previous[current]['byStylists'] = sortObj.func(sortedData[current]['byStylists'], sortObj.key, sortObj.reverse)
                }
                return previous
            }, {})
        })
    }

    let showKeys = []
    const toggleShowKey = (key) => {
        if (showKeys.includes(key)) {
            showKeys = showKeys.filter(k => k!==key)
        } else {
            showKeys = [...showKeys, key]
        }
    }

    onMount(() => {
        if (browser) {
            onLoadCallback();
        }
    })

    const toggleSort = (key) => {
        sort = sort.map(sortObj => {
            if (sortObj.key === key) {
                if (!sortObj.enable) {
                    return {...sortObj, enable: true, reverse: false}
                } else if (!sortObj.reverse) {
                    return {...sortObj, enable: true, reverse: true}
                }
            }
            return {...sortObj, enable: false}
        })
        applySort()
    }

    
    const isSortReverseAndEnable = (key) => {
        return sort.reduce((p,c) => {
            if (c.key !== key) {
                return p;
            }
            if (c.enable) {
                return c.reverse ? 1 : 0
            }
        }, -1)
    }
    const isSort = (key) => (isSortReverseAndEnable(key) >= 0)
    const isReverse = (key) => (isSortReverseAndEnable(key) > 0)

</script>

<svelte:head>
    <title>Thrivo - Data</title>
</svelte:head>

<section>
    {start.toDateString()} - {end.toDateString()}
</section>

<section>
    <table>
        <tr>
            <th on:click={() => toggleSort('name')}>{currentGroup + ' Name'}{isSort('name', sort)?(isReverse('name', sort)?' ⇧':' ⇩'):'    '}</th>
            <th on:click={() => toggleSort('count')}>Filtered{isSort('count', sort)?(isReverse('count', sort)?' ⇧':' ⇩'):'    '}</th>
            <th on:click={() => toggleSort('rawCount')}>Unfiltered{isSort('rawCount', sort)?(isReverse('rawCount', sort)?' ⇧':' ⇩'):'    '}</th>
            <th on:click={() => toggleSort('hardwareNumbers')}>Hardware #'s{isSort('hardwareNumbers', sort)?(isReverse('hardwareNumbers', sort)?' ⇧':' ⇩'):'    '}</th>
            <th>Hardware Date Range</th>
            <th on:click={() => toggleSort('deviceSerialNums')}>Devices{isSort('deviceSerialNums', sort)?(isReverse('deviceSerialNums', sort)?' ⇧':' ⇩'):'    '}</th>
        </tr>
        {#each Object.keys(sortedData).filter(k => !k.startsWith('_')) as key}
        <tr>
            <td on:click={() => toggleShowKey(key)} class="salonName major-top">{sortedData[key]['name']}</td>
            <td class="num salonName major-top">{sortedData[key]['count']}</td>
            <td class="num salonName major-top">{sortedData[key]['rawCount']}</td>
            <td class="num salonName major-top">{sortedData[key]['hardwareNumbers']['numbers']}</td>
            <td class="major-top">{sortedData[key]['hardwareNumbers']['dateRangeStr']}</td>
            <td class="major-top">{sortedData[key]['deviceSerialNums']}</td>
        </tr>
        {#if showKeys.includes(key)}
        {#each Object.keys(sortedData[key]['byStylists']).filter(k => !k.startsWith('_')) as stylistKey}
        <tr>
            <td class="minor">{sortedData[key]['byStylists'][stylistKey]['name']}</td>
            <td class="num minor">{sortedData[key]['byStylists'][stylistKey]['count']}</td>
            <td class="num minor">{sortedData[key]['byStylists'][stylistKey]['rawCount']}</td>
            <td class="num minor">-</td>
            <td class="minor">-</td>
            <td class="minor">{sortedData[key]['byStylists'][stylistKey]['deviceSerialNums']}</td>
        </tr>
        {/each}
        <tr><td class="major"></td><td class="major"></td><td class="major"></td><td class="major"></td><td class="major"></td><td class="major"></td><tr>
        {/if}
        {/each}
    </table>

</section>

<style>
    .filter {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
    .num {
       text-align: right;
    }
    .salonName {
        font-weight: 800;
    }
    th {
        text-align: left;
        border-bottom: 2px solid rgba(100,100,100,0.8);
    }
    .major {
        border-bottom: 2px solid rgba(10,10,10,0.4);
    }
    .major-top {
        border-top: 2px solid rgba(10,10,10,0.4);
    }
    .minor {
        border-top: 1.5px solid rgba(20,20,20,0.2);
    }
    td {
        text-align: left;
    }
    th, td {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    section {
        display: flex;
        justify-content: center;
        
    }
    input {
        width: auto;
        justify-self: center;
        align-self: center;
    }
</style>