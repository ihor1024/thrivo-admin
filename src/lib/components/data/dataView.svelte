<script>
    import { RadioGroup, RadioItem, Table, tableMapperValues } from "@skeletonlabs/skeleton";

    export let salonFilter;
    export let userFilter;
    export let clientFilter;
    export let mixTraces;

    let startDate = new Date();
    let endDate = new Date();
    let timeSelect = "day";
    let byProduct;
    let productTable;

    let filteredTraces = [];
    $: {
        console.log('u', userFilter);
        console.log('c', clientFilter);
        console.log('s', salonFilter)
    }
    $: {
        switch (timeSelect) {
            case "week":
                startDate = new Date();
                endDate = new Date()
                startDate.setDate(startDate.getDate() - 7);
                break;
            case "month":
                endDate = new Date();
                startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
                break;
            case "year":
                endDate = new Date();
                startDate = new Date(endDate.getFullYear(), 0, 1);
                break;
            case "custom":
                break;
            case "day":
            default:
                startDate = new Date();
                endDate = new Date()
                startDate = new Date(startDate.setHours(0,0,0,0));
                break;
        }
    }

    // filter by date then
    // filter by filters then
    // add a price to each trace based on stylist/salon pricing structure
    // convert to information by product information
    $: filteredTraces = mixTraces.filter(
        trace => {
            const date = new Date(new Date(trace?.createdAt).setHours(0,0,0,0));
            const dateMatch = (date >= startDate) && (date <= endDate);
            if (trace?.salon?.id == "6ee9721e-66f6-479e-8087-97292c54ee4c")
                console.log(date, startDate, endDate, dateMatch);
            if (!dateMatch)
                return false;
            if (clientFilter?.length ?? 0 > 0)
                return clientFilter.some(id => id === trace?.client?.id);
            if (userFilter?.length ?? 0 > 0)
                return userFilter.some(id => id === trace?.stylist?.id);
            if (salonFilter?.length ?? 0 > 0)
                return salonFilter.some(id => id === trace?.salon?.id);
            return true;

            //console.log('stylist',trace.stylist.id);
           // console.log('client',trace.client.id);
            //console.log('salon',trace.salon.id);
        }
    );

    $: {
        const inter = filteredTraces.reduce((acc, trace) => {
            const company = trace?.color?.company ?? 'Unknown';
            const line = trace?.color?.colorLine ?? 'Unknown';
            const name = trace?.color?.colorKey ?? 'Unknown';
            const amount = trace.amount + trace.pouredAmount;
            const color = trace?.color ?? {id: -1};
            const price = trace?.cost ?? 0;
            const retail = trace?.retail ?? 0;
            const out = {
                amount: (acc[`${company}::${line}::${name}`]?.amount ?? 0) + amount,
                price: (acc[`${company}::${line}::${name}`]?.price ?? 0) + price,
                retail: (acc[`${company}::${line}::${name}`]?.retail ?? 0) + retail,
                color,
            };
            return {...acc, [`${company}::${line}::${name}`]: out};
        }, {});

        byProduct = Object.entries(inter).reduce((acc, [key, value]) => {
            const [company, line, name] = key.split('::');
            const price = value?.price ?? 0;
            const amount = value?.amount ?? 0;
            const retail = value?.retail ?? 0;
            const out = {
                company,
                line,
                name,
                retail: retail.toFixed(2),
                price: price.toFixed(2),
                amount: amount.toFixed(2),
            }
            return [...acc, out];
        }, []).sort((a, b) => {
            if (a.company != b.company)
                return a.company < b.company ? -1 : 1;
            if (a.line != b.line)
                return a.line < b.line ? -1 : 1;
            if (a.name != b.name)
                return a.name < b.name ? -1 : 1;
            return 0;
        });
        productTable = {
            head: ['Brand', 'Line', 'Product', 'Amount (ml)', 'Price ($)', 'Retail ($)'],
            body: tableMapperValues(byProduct, ['company', 'line', 'name', 'amount', 'price', 'retail'])
        }
    }

    let dateRangeStart;
    let dateRangeEnd;

    const applyDateRange = (e) => {
        console.log(dateRangeStart, dateRangeEnd);
        startDate = new Date(dateRangeStart);
        endDate = new Date(dateRangeEnd);
        console.log(startDate, endDate)
    }

    const exportToCSV = () => {
        const csv = byProduct.reduce((acc, product) => {
            const {company, line, name, amount, price, retail} = product;
            return `${acc}"${company}","${line}","${name}",${amount},${price},${retail}\r\n`;
        }, 'Brand,Line,Product,Amount (ml),Price ($),Retail ($)\r\n');
        const blob = new Blob([csv], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'thrivo.csv');
        a.click();
    }

</script>

<div class="overflow-y-auto overflow-x-hidden pr-3">
<div class="flex w-full justify-start">
    <div class="flex-none">
        <RadioGroup active="variant-filled" hover="hover:variant-soft" padding="px-4 py-3">
            <RadioItem bind:group={timeSelect } value="day">
                Today
            </RadioItem>
            <RadioItem bind:group={timeSelect } value="week">
                Week
            </RadioItem>
            <RadioItem bind:group={timeSelect } value="month">
                Month
            </RadioItem>
            <RadioItem bind:group={timeSelect } value="year">
                Year
            </RadioItem>
            <RadioItem bind:group={timeSelect } value="custom">
                Custom
            </RadioItem>
        </RadioGroup>
    </div>
    {#if timeSelect === 'custom'}
        <span class="divider-vertical h-fill flex-none ml-2 my-2" />
        <div class="flex-none flex flex-row w-auto">
            <input class="input flex-1 h-auto mx-2" title="Start Date" type="date" bind:value={dateRangeStart} />
            <input class="input flex-1 h-auto mx-2" title="End Date" type="date" bind:value={dateRangeEnd} />
            <button class="btn variant-outline-primary hover:variant-filled-primary hover:shadow-xl" on:click={applyDateRange}>Apply</button>
        </div>
    {/if}
    <span class="divider-vertical h-fill flex-none ml-2 my-2" />
    <button class="flex-none btn variant-outline-primary hover:variant-filled-primary hover:shadow-xl" on:click={exportToCSV}>Export CSV</button>
</div>
<div class="p-2 min-w-[45vw]">
{#if (byProduct?.length ?? 0) > 0}
    <Table source={productTable} />
{:else}
    <p class="text-center text-2xl">No Data</p>
{/if}
</div>
</div>
