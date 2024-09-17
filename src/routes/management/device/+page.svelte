<script>
    import { DataStore } from "aws-amplify";

    import {Device} from "$src/models";
    import { onMount } from 'svelte';

    import {browser} from '$app/environment'

    let loading = false

    const clearAndRefresh = async () => {
        if (loading) {
            return;
        }
        loading = true;
        await DataStore.clear();
        await DataStore.start();
        loading = false;
    }
</script>

