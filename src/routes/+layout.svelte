<script>
    import "../app.postcss";
    import { AppShell, Modal } from "@skeletonlabs/skeleton";
    import { initializeStores } from "@skeletonlabs/skeleton";
    import Sidebar from "$lib/navigation/sidebar.svelte";

    // export const prerender = true;
    import Shell from "$lib/shell/shell.svelte";
    import { dev } from "$app/environment";
    import { inject } from "@vercel/analytics";
    import Topbar from "$lib/navigation/topbar.svelte";
    import Sidedrawer from "$lib/navigation/sidedrawer.svelte";

    initializeStores();
    inject({ mode: dev ? "development" : "production" });

</script>

<Modal />
<Sidedrawer />

<Shell>
    <AppShell slotSidebarLeft="bg-surface-500/5" slotPageContent="relative h-full w-full overflow-hidden">
        <svelte:fragment slot="header">
            <Topbar />
        </svelte:fragment>
        <svelte:fragment slot="sidebarLeft">
            <!-- Insert the list: -->
            <Sidebar class="hidden lg:grid overflow-hidden" />
            <!-- --- -->
        </svelte:fragment>
        <slot />
    </AppShell>
</Shell>
