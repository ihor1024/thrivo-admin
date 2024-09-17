<script>
    import { onMount } from 'svelte';
    import {browser} from '$app/environment'

    import {addSalon, updateSalon} from '$lib/backend/salon'

    import Modal, {getModal} from '$lib/modal/modal.svelte';
    import { updateColorLine } from '$lib/backend/color';
    import { queryColorLines } from '../backend/backend';

    let displayName = ""
    let keyName = ""

    export let modalId = '';
    export let onSave = (() => {});
    export let colorLine = {};

    let cachedObj = {};
    let name;
    let allColorLines = [];
    let possibleColorLines = [];

    $: name = colorLine?.name ?? '';
    $: cachedObj = {...colorLine};
    
    const reloadColorLines =  async () => {
        allColorLines = await queryColorLines();
        console.log(allColorLines)
    }

    onMount(() => {
        if (browser) {
            console.log(colorLine);
            reloadColorLines();
        }
        
    });
    $: possibleColorLines = allColorLines?.filter(x => x.company === colorLine?.company ?? '') ?? [];
    
    export function close() {
        getModal(modalId).close();
    }
    export function open() {
        getModal(modalId).open();
    }

    // why not just hard code lol
    const editableKeys = {
        'name': true,
        'description': true,
        'type': true,
        'size': 'int',
        'units': true,
        childrenIds: 'colorlines',
        parentIds: 'colorlines',
    }

    const onConfirm = async () => {
        let updatedObj = Object.entries(editableKeys).reduce((acc ,[key, value]) => {
            if (!cachedObj.hasOwnProperty(key))
                return acc;
            if (value === 'colorlines') {
                //cachedObj[key] = cachedObj[key].map(x => x.id);
            } else if (value === 'int') {
                acc[key] = parseInt(cachedObj[key] == null ? 0 : cachedObj[key]);
            } else if (value) {
                acc[key] = cachedObj[key]?.toString() ?? null;
            }
            return acc;
        }, {});

        const good = updateColorLine(colorLine.id, updatedObj);
        if (good) {
            onSave(good);
            close();
        } else {
            alert('Something went wrong, please try again');
        }
    }

</script>

<Modal id={modalId}>
    <h3>Edit color line, {name}'s meta data</h3>
    <form on:submit|preventDefault={onConfirm}>
        <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
        {#each Object.entries(cachedObj ?? {}) as [key, value]}
            <tr>
                <td>{key}</td>
            {#if editableKeys.hasOwnProperty(key)}
                {#if editableKeys[key] === 'colorlines'}
                    <td></td>
                {:else if editableKeys[key] === 'int'}
                    <td>
                        <input type="number" value={value} on:input={(e) => {cachedObj[key] = e.target.value}}/>
                    </td>
                {:else}
                    <td>
                        <input type="text" value={value} on:input={(e) => {cachedObj[key] = e.target.value}}/>
                    </td>
                {/if}
            {:else}
                <td>{value}</td>
            {/if}
            </tr>
          {/each}
        </tbody>
    </table>
    <br/>
    <button type="submit">Save</button>
    </form>
</Modal>