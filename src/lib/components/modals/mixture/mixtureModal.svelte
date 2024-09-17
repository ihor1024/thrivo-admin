<script>
    import { Table, tableMapperValues } from "@skeletonlabs/skeleton";

    export let mix;
    export let parent;

    let trace = [];
    $: console.log(mix);
    $: {
        trace = (mix?.mixTrace ?? []).map(trace => {
            return {
                ...trace,
                amount: (trace.pouredAmount + trace.amount).toFixed(2),
            }
        });
    }

    let traceTable = {
        head: ['Brand', 'Line', 'Color', 'Amount (ml)'],
        body: tableMapperValues(trace, ['company', 'colorLine', 'colorName', 'amount']),
    };
    $: {
        traceTable = {
            head: ['Brand', 'Line', 'Color', 'Amount (ml)', 'Price ($)', 'Retail ($)'],
            body: tableMapperValues(trace.map(t => ({...t, cost: t?.cost?.toFixed(2) ?? 0.0, retail: t?.retail?.toFixed(2) ?? 0.0})), ['company', 'colorLine', 'colorName', 'amount', 'cost', 'retail']),
        }
    }
    const goToFormula = () => {

    }
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-xl font-bold">Mixture Summary</header>
    <Table source={traceTable}/>
    <div>
        <button class="btn hover:variant-filled-primary" on:click={goToFormula}>Go to Formula</button>
    </div>
</div>