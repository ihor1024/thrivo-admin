<script>
    import { onMount } from 'svelte';
    import {browser} from '$app/environment'

    import {addSalon, updateSalon} from '$lib/backend/salon'

    import Modal, {getModal} from '$lib/modal/modal.svelte';
    import { updateColorLineIngredients } from '$lib/backend/color';

    let displayName = ""
    let keyName = ""

    export let modalId = '';
    export let onSave = (() => {});
    
    export function close() {
        getModal(modalId).close();
    }
    export function open() {
        getModal(modalId).open();
    }

    const onConfirm = async () => {
        close();
    }

</script>

<Modal id={modalId}>
    <h3>Companies/Brands cannot be editted as it would break old version of the phone apps</h3>
    <h4>TODO: Implement the functionality to update company name - it needs to update colorline.company and color.company</h4>
    <button on:click={onConfirm}>Close</button>
</Modal>