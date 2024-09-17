<script>
    import { Table, getModalStore, tableMapperValues, tableSourceMapper } from "@skeletonlabs/skeleton";
    import MixtureModal from "../modals/mixture/mixtureModal.svelte";


    export let mixtures;
    export let salonFilter;
    export let userFilter;
    export let clientFilter;

    let historyArray = [];
    let historyTable = {
        head: ['Date', 'Salon', 'Stylist', 'Client', 'Amount'],
        body: tableMapperValues(historyArray, ['date', 'salon', 'stylist', 'client', 'amount']),
    };

    $: {
        const filteredMixes = mixtures.filter(
            mix => {
                if (clientFilter?.length ?? 0 > 0)
                    return clientFilter.some(id => id === mix?.client?.id)
                if (userFilter?.length ?? 0 > 0)
                    return userFilter.some(id => id === mix?.stylist?.id)
                if (salonFilter?.length ?? 0 > 0)
                    return salonFilter.some(id => id === mix?.salon?.id)
                return true;
            });
        historyArray = filteredMixes.map(mix => {
            const date = new Date(mix?.createdAt).toISOString().split('T')[0];
            const stylist = mix?.stylist?.name ?? 'Unknown Stylist';
            const client = mix?.client?.name ?? 'Unknown Client';
            const salon = mix?.salon?.name ?? 'Unknown Salon';
            const total = mix?.totalAmount?.toFixed(2) ?? 'Unknown Amount';
            const retail = mix?.retailCost?.toFixed(2) ?? 'Unknown Retail';
            const price = mix?.totalCost?.toFixed(2) ?? 'Unknown Price';

            if (total < 0) {
                console.log("----Negative Total----")
                mix.mixTrace.forEach(trace => {
                    console.log(trace);
                });
                console.log("----------------------")
            }

            return {
                date,
                mix,
                stylist,
                client,
                salon,
                total,
                retail,
                price,
            };
        }).sort((a,b) => {
            return new Date(a.date) < new Date(b.date) ? 1 : -1;
        });
        historyTable = {
            head: ['Date', 'Salon', 'Stylist', 'Client', 'Amount (ml)', 'Price ($)', 'Retail ($)'],
            body: tableMapperValues(historyArray, ['date', 'salon', 'stylist', 'client', 'total', 'price', 'retail']),
            meta: tableMapperValues(historyArray, ['mix'])
        };
    }

    const modalStore = getModalStore();
    

    const historySelector = (e) => {
        const mix = e.detail[0];
        console.log(e);
        const modalComponent = {
            ref: MixtureModal,
            props: {
                mix,
            },
        }
        const modal = {
            type: "component",
            component: modalComponent,
        }
        modalStore.trigger(modal);
    }

</script>

<p class="italic text-lg">Select a row to view Mixture's components</p>
<Table source={historyTable} interactive={true} on:selected={historySelector}/>