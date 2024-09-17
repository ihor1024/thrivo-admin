<script>
    import { AppBar, LightSwitch, getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    const dOpen = () => {
        drawerStore.open();
    }
    const refresh = () => {
        alert('Refresh Data not implemented - need to implement better data caching')
    }
</script>

<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
    <svelte:fragment slot="lead">
        <div class="flex items-center">
            <button class="lg:hidden btn btn-sm mr-4" on:click={dOpen}>
                <span>
                    <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                        <rect width="100" height="20" />
                        <rect y="30" width="100" height="20" />
                        <rect y="60" width="100" height="20" />
                    </svg>
                </span>
            </button>
            <strong class="text-xl uppercase">Thrivo</strong>
            
        </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <button class="btn btn-sm mr-4 hover:variant-filled-primary" on:click={refresh}>
            <span class="text-md font-semibold">Refresh Data</span>
        </button>
        <div class="flex items-center">
            <LightSwitch class="mx-2"/>
        </div>
    </svelte:fragment>
</AppBar>
