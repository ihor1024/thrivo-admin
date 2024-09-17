<script>
    import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    export let clientId = -1;
    export let client;

    onMount(() => {
        console.log("Salon Summary is showing up");
        console.log(clientId);
    });

    $: objTable = {
        head: ['Key', 'Value'],
        body: tableMapperValues(Object.entries(client?? {}).reduce((acc, [key, value]) => {
            let out = value;
            if (key === 'users')
                return acc;
            if (key === 'clients')
                return acc;
            if (key === "salon")
                return acc;
            if (key === "stylist")
                return acc;
            if (key === 'id')
                return acc;
            if (key === 'owner')
                return acc;
            if (typeof value === 'object')
                out = JSON.stringify(value, null, 4);
            return [...acc, [key, out]];
        }, []), [0, 1]),
    }
</script>

<Table source={objTable} />

