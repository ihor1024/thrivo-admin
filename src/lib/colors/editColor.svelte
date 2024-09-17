<script>
    import { updateColor } from '$lib/backend/color';

    export let color;
    export let colorId;
    export let onSave;
    let cachedObj;
    $: cachedObj = {...color};

    const editableKeys = {
        'colorKey': true,
        'altKey': true,
        'segment': true,
        'colorType': true,
        'material': true,
        'description': true,
        'size': 'int',
        'units': true,
        'level': true,
    }

    const onSaveHere = async () => {
    console.log(cachedObj);
       const out = await updateColor(colorId, cachedObj);
       onSave(out);

    }

</script>

<section>
    <table>
        <thead>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(cachedObj ?? {}) as [key, value]}
                {#if typeof value === 'object' && !Array.isArray(value) && value !== null}
                    {#each Object.entries(value ?? {}) as [subKey, subValue]}
                        <tr>
                            <td>{key}.{subKey}</td>
                            <td>{subValue}</td>
                        </tr>
                    {/each}
                {:else}
                    {#if editableKeys.hasOwnProperty(key)}
                        {#if editableKeys[key] === 'int'}
                            <tr>
                                <td>{key}</td>
                                <td><input type="number" value={value} on:input={(e) => {cachedObj[key] = e.target.value}}/></td>
                            </tr>
                        {:else}
                            <tr>
                                <td>{key}</td>
                                <td><input type="text" value={value} on:input={(e) => {cachedObj[key] = e.target.value}}/></td>
                            </tr>
                        {/if}
                    {:else}
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    {/if}
                {/if}
            {/each}
        </tbody>
    </table>
    <br/>
    <button on:click={onSaveHere}>Save</button>
</section>

<style>
    input {

        width: 100%;
    }
    table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #ffbcbc;
  }

  tr:nth-child(even) {
    background-color: #ffdbdb;
  }
</style>