<script>
    import { Drawer, getDrawerStore } from "@skeletonlabs/skeleton";
    import Sidebar from "./sidebar.svelte";


    const drawerStore = getDrawerStore();
    $: classesDrawer = $drawerStore.id === 'doc-sidenav' ? 'lg:hidden' : '';
</script>

<Drawer class={classesDrawer}>
    <Sidebar />
</Drawer>