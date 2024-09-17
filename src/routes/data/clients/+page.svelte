<script>
    import {getSalonUsersClients} from '$lib/data/clients/clients.js';
    import { ListBox, ListBoxItem, ProgressRadial, Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';

    import SalonSummary from '$lib/components/salon/salonSummary.svelte';
    import UserSummary from '$lib/components/user/userSummary.svelte';
    import ClientSummary from '$lib/components/client/clientSummary.svelte';
    import DataView from '$lib/components/data/dataView.svelte';
    import {totalAmountSummary} from "$lib/data/usage/totals"
    import MixHistory from '$lib/components/data/mixHistory.svelte';


    let salonList = [];
    let userList = [];
    let clientList = [];
    let salonDict = {};
    let userDict = {};
    let clientDict = {};

    let startDate  = new Date();
    let endDate = new Date()

    let salonFilter = [];
    let userFilter = [];
    let clientFilter =[];
    let viewTab = 0;
    let mixTraces = [];
    let mixtures = [];
    let loading = true;
    $: userFilterList = userList.filter(
        (user) => salonFilter && (salonFilter?.length ?? 0 > 0) ? salonFilter.some(id => id === user?.salon?.id) : true
    );
    $: clientFilterList = clientList.filter(
        client => 
        (
            (
                userFilter && (userFilter?.length ?? 0 > 0)) ? 
                userFilter.some(id => id === client?.stylist?.id) : 
                (
                    (salonFilter && (salonFilter?.length ?? 0 > 0)) ? 
                    salonFilter.some(id => id === client?.salon?.id) : 
                    true
                )
        )
    );
    const refresh = async () => {
        loading = true;
        const {salons, users, clients, salonsById, usersById, clientsById} = await getSalonUsersClients();
        const data = await totalAmountSummary();
        mixtures = data?.mixtures ?? [];
        mixTraces = data?.mixTraces ?? [];

        salonDict = salonsById == null ? [] : salonsById;
        userDict = usersById == null ? [] : usersById;
        clientDict = clientsById == null ? [] : clientsById;
        salonList = salons == null ? [] : salons;
        userList = users == null ? [] : users;
        clientList = clients == null ? [] : clients;
        loading = false;
    }
    onMount(async () => {
        await refresh();
    });
    const salonChange = async (e, salon) => {
        clientFilter = [];
        userFilter = [];
    }

    const userChange = async (e, user) => {
        clientFilter = [];
    }

    const clientChange = async (e, client) => {
    }
</script>

<div class="flex flex-row relative w-auto h-full content-start p-6 overflow-x-scroll overflow-y-hidden">
    <div class="card flex-none w-auto h-full flex flex-col m-2 rounded-3xl variant-soft hover:shadow-xl">
        <h1 class="text-center text-md font-semibold mt-1 pt-2 px-5 flex-none">Salons</h1>
        <hr class="m-2 flex-none"/>
        {#if loading}
            <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" class="m-auto w-[20%]"/>
        {:else}
            <ListBox class="overflow-y-scroll h-full p-2 flex-1" rounded="rounded-none" multiple>
                {#each salonList as salon}
                    <ListBoxItem bind:group={salonFilter} value={salon.id} name="small" rounded="rounded-full" on:change={(e) => salonChange(e, salon)}>
                        {salon.name}
                    </ListBoxItem>
                {/each}
            </ListBox>
        {/if}
    </div>
    <div class="card flex-none w-auto h-full flex flex-col m-2 rounded-3xl variant-soft hover:shadow-xl">
        <h1 class="text-center text-md font-semibold mt-1 pt-2 px-5 flex-none">Stylists</h1>
        <hr class="m-2 flex-none"/>
        {#if loading}
            <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" class="m-auto w-[20%]"/>
        {:else}
            <ListBox class="overflow-y-scroll h-full p-2 flex-1" rounded="rounded-none" multiple>
                {#each userFilterList as user}
                    <ListBoxItem bind:group={userFilter} value={user.id} name="small" rounded="rounded-full" on:change={(e) => userChange(e, user)}>
                        {user.name}
                    </ListBoxItem>
                {/each}
            </ListBox>
        {/if}
    </div>
    <div class="card flex-none w-auto h-full flex flex-col m-2 rounded-3xl variant-soft hover:shadow-xl">
        <h1 class="text-center text-md font-semibold mt-1 pt-2 px-5 flex-none">Clients</h1>
        <hr class="m-2 flex-none"/>
        {#if loading}
            <ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" class="m-auto w-[20%]"/>
        {:else}
            <ListBox class="overflow-y-scroll h-full p-2 flex-1" rounded="rounded-none" multiple>
                {#each clientFilterList as client}
                    <ListBoxItem bind:group={clientFilter} value={client.id} name="small" rounded="rounded-full" on:change={(e) => clientChange(e, client)}>
                        {client.name}
                    </ListBoxItem>
                {/each}
            </ListBox>
        {/if}
    </div>
    <!--<span class="divider-vertical h-full flex-1" />-->
    <div class="card flex-none relative w-auto h-full m-2 px-6 rounded-3xl variant-soft hover:shadow-xl">
        <TabGroup justify="justify-start" class="h-full flex-1 flex flex-col" regionPanel="flex-1 overflow-y-auto" regionList="flex-none mt-1">
            <Tab bind:group={viewTab} name="tab1" value={0}>Salon Summary</Tab>
            <Tab bind:group={viewTab} name="tab1" value={1}>Stylist Summary</Tab>
            <Tab bind:group={viewTab} name="tab1" value={2}>Client Summary</Tab>
            <Tab bind:group={viewTab} name="tab1" value={3}>Usage Reports</Tab>
            <Tab bind:group={viewTab} name="tab1" value={4}>History</Tab>
            <svelte:fragment slot="panel">
                {#if viewTab === 0}
                    {#if salonFilter && (salonFilter?.length ?? 0) == 1}
                        <SalonSummary salonId={salonFilter[0]} salon={salonDict[salonFilter[0]]}/>
                    {:else if salonFilter && (salonFilter?.length ?? 0) > 1}
                        <p class="hint-text text-md">To see a salon's summary, select a single salon</p>
                    {:else}
                        <p class="hint-text text-md">Select a Salon</p>
                    {/if}
                {:else if viewTab === 1}
                    {#if userFilter && (userFilter?.length ?? 0) == 1}
                        <UserSummary userId={userFilter[0]} user={userDict[userFilter[0]]}/>
                    {:else if userFilter && (userFilter?.length ?? 0) > 1}
                        <p class="hint-text text-md">To see a stylist's summary, select a single stylist</p>
                    {:else}
                        <p class="hint-text text-md">Select a Stylist</p>
                    {/if}
                {:else if viewTab === 2}
                    {#if clientFilter && (clientFilter?.length ?? 0) == 1}
                        <ClientSummary clientId={clientFilter[0]} client={clientDict[clientFilter[0]]}/>
                    {:else if clientFilter && (clientFilter?.length ?? 0) > 1}
                        <p class="hint-text text-md">To see a client's summary, select a single client</p>
                    {:else}
                        <p class="hint-text text-md">Select a Client</p>
                    {/if}
                {:else if viewTab === 3}
                    {#if ((salonFilter?.length ?? 0) == 0) && ((userFilter?.length ?? 0) == 0 ) && ((clientFilter?.length ?? 0) == 0 )}
                        <p class="hint-text text-md">Select a Salon, Stylist, or Client to data dump for!</p>
                    {:else}
                        <DataView salonFilter={salonFilter} userFilter={userFilter} clientFilter={clientFilter} mixTraces={mixTraces}/>
                    {/if}
                {:else if viewTab = 4}
                    <MixHistory mixtures={mixtures} salonFilter={salonFilter} userFilter={userFilter} clientFilter={clientFilter}/>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
</div>

<style lang="postcss">
    .section-container {
        @apply card flex-none w-auto h-full flex flex-col m-2 rounded-3xl variant-soft;
    }
    .hint-text {
        @apply text-center font-extralight mt-1 p-2 px-5 flex-none italic;
    }
</style>
