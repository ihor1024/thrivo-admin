<script>
    import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    export let userId = -1;
    export let user;

    onMount(() => {
        console.log("Salon Summary is showing up");
        console.log(userId);
    });

    $: objTable = {
        head: ['Key', 'Value'],
        body: tableMapperValues(Object.entries(user?? {}).reduce((acc, [key, value]) => {
            let out = value;
            if (key === 'users')
                return acc;
            if (key === 'clients')
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

