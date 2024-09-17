<script>
    import { onMount } from 'svelte';
    import {browser} from '$app/environment'

    import {addSalon, updateSalon} from '$lib/backend/salon'

    import Modal, {getModal} from '$lib/modal/modal.svelte';
    import { updateColorLineIngredients } from '$lib/backend/color';

    let newIngredientsArray = [];
    let newIngredients = "";
    export let modalId = '';
    export let onSave = (() => {});
    export let colorLineName = '';
    export let colorLineId = '';

    export function close() {
        getModal(modalId).close();
    }
    export function open() {
        getModal(modalId).open();
    }

    const onConfirm = async () => {
       newIngredientsArray = newIngredients.split(", ");
       console.log(newIngredientsArray);
        await updateColorLineIngredients(colorLineId, newIngredientsArray);
        onSave();
       close();
    }

</script>
 
<Modal id={modalId}>
    <h3>Add Ingredients on {colorLineName}</h3>
    <i>comma, space seperated list (", ")</i>
    <form on:submit|preventDefault={onConfirm}>
        <div>
            <label for="name">Ingredients:</label>
            <textarea id="name" type="text" value={newIngredients} on:input={(e) => {newIngredients = e.target.value}}/>
        </div>
        <button type="submit">Save</button>
    </form>
</Modal>

<style>
    textarea {
        width: 20vw;
        height: 200px;
    }
    div {
        display: flex;
        justify-content: center;
        align-content: center;
    }
    label {
        margin-right: 20px;
    }
        
</style>