<script>
    import { onMount } from "svelte";
    import { organizeCycles, deviceToSalonName } from "$lib/data/leaderboards";
    import { ProgressRadial, RadioGroup, RadioItem, Table, tableMapperValues } from "@skeletonlabs/skeleton";
    import {totalAmountSummary} from "$lib/data/usage/totals"

    let summary = {day: {total: 0, color: 0, dev: 0}};
    let mixtures = [];
    let traces = [];
    let totals = {};
    let loading = true;

    let mixTableData = [];
    let mixTable = {
        head: ['Date', 'Salon', 'Stylist', 'Client'],
        body: tableMapperValues(mixTableData, ['date', 'salon', 'stylist', 'client']),
    }
    onMount(async () => {
        try {
            loading = true;
            const out = await totalAmountSummary();
            summary = out.summary;
            loading = false;
            mixtures = out.mixtures;
            traces = out.mixTraces;

        } catch (error) {
            console.error(error);
        }
    });
    let timeSelect = "day";
    $: totals = summary[timeSelect];
    const displayName =  {
        "total": "Total",
        "color": "Total Color",
        "dev": "Total Developer"
    }
    const organizeMixtures = (mixtures, traces) => {
        return mixtures?.slice(-10).reverse().map((mix, index) => {
            console.log(mix)
            return {
                position: (index + 1),
                client: mix.client.name,
                salon: mix.salon.name,
                stylist: mix.stylist.name,
                date: new Date(mix.createdAt).toISOString().split('T')[0],
                mixture: mix,
                amount: (mix?.mixTrace?.reduce((acc, trace) => {
                    const traceAmount = trace.pouredAmount + trace.amount;
                    return acc + traceAmount;
                }, 0).toFixed(2) ?? '??') + ' ml',
            }
        }) ?? [];
    }
    $: mixTableData = organizeMixtures(mixtures, traces);
    $: mixTable = {
        head: ['Date', 'Salon', 'Stylist', 'Client', 'Amount'],
        body: tableMapperValues(mixTableData, ['date', 'salon', 'stylist', 'client', 'amount']),
    }
</script>

<div class="bg-surface-100-800-token hero-gradient h-full">
    <div class="section-container flex w-full">
        <div class="flex-1">
            <h1 class="h1">
                Thrivo <span class="drop-shadow-lg bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">Dashboard</span>
            </h1>
        </div>
        <div class="flex-1">
        <RadioGroup active="variant-filled" hover="hover:variant-soft">
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
        </RadioGroup>
        </div>
    </div>
    <div class="section-container flex">
        {#each Object.entries(totals ?? {}) as [key, value]}
            <div class="card p-4 m-6 flex-1 shadow-sm hover:shadow-lg transition ease-in-out">
                <h1 class="text-center text-md">{displayName[key]}</h1>
                {#if loading}
                    <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" class="m-auto w-[20%]"/>
                {:else}
                    <p class="text-center  text-5xl">{value.toFixed(2) ?? '??'} ml</p>
                {/if}
            </div>
        {/each}
    </div>
    <div class="section-container">
        <div>
            <h1 class="h3">
                Latest Usage
            </h1>
        </div>
        <div class="card m-6 shadow-sm hover:shadow-lg transition ease-in-out">
            <Table source={mixTable}/>
        </div>
    </div>
</div>

<style lang="postcss">
    .hero-gradient {
        background-image: radial-gradient(
                at 0% 0%,
                rgba(var(--color-secondary-500) / 0.33) 0px,
                transparent 50%
            ),
            radial-gradient(
                at 98% 1%,
                rgba(var(--color-error-500) / 0.33) 0px,
                transparent 50%
            );
    }
    .section-container {
        @apply w-full max-w-7xl mx-auto p-4 py-4 md:py-6;
    }
</style>
