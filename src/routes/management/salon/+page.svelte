<script>
    import {getSalons, addSalon, ConvertAddressObjToStr, toggleSalonShippingPrivilege,addRateToSalon,toggleSalonScalePrivilege} from '$lib/backend/salon'
    import { onMount } from 'svelte';
    import {browser} from '$app/environment'
    import EditSalonModal from '../../../lib/backend/salon/editSalonModal.svelte';

    let salons = [];


    let salonModal;
    let focusIndex = -1;
    let salonShippingFocus = -1;
    let rate = 1; 

    const setSalonShippingFocus = (i) => {
        if (i >= 0)
            rate = salons[i]?.shipping?.ourRate?.percent ?? 1;
        salonShippingFocus = i;
    }

    const refreshSalons = async () => {
        console.log('Getting Salons')
        const ss = await getSalons();
        salons = ss.map(s => {
            return {
                ...s,
                locationStr: ConvertAddressObjToStr(s.location)
            };
        })
        console.log(JSON.stringify(salons, null, 4));
    }

    onMount(() => {
        if (browser) {
            refreshSalons();
        }
    })
    const onSave = (obj) => {
        console.log('ON SAVE')
        console.log(JSON.stringify(obj, null, 4))
        if (focusIndex >= 0) {
            salons[focusIndex] = obj
        } else {
            salons.push(obj)
        }
        
        refreshSalons();
        salonModal.close();
    }


    const toggleShippingPrivilege = async (index) => {
        const obj = await toggleSalonShippingPrivilege(salons[index].id)
        salons[index] = obj
        refreshSalons();
    }

    const toggleScalePrivilege = async (index) => {
        const obj = await toggleSalonScalePrivilege(salons[index].id)
        salons[index] = obj
        refreshSalons();
    }

    const editModal = (index) => {
        focusIndex = index;
        salonModal.open();
    }

    const handleRateInput = () => {

    }

    const commitRate = async (i) => {
        const out = await addRateToSalon(salons[i].id, rate)
        console.log(out)
        salons[i] = {...out,locationStr: ConvertAddressObjToStr(out.location)};
        setSalonShippingFocus(-1);
    }

</script>

<svelte:head>
    <title>Thrivo - Salon Management</title>
</svelte:head>

<section>
    <table>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th></th>
            <th>Shipping?</th>
            <th on:click={() => {setSalonShippingFocus(-1)}}>Rate Options</th>
            <th>Scale?</th>
        </tr>
        {#each salons as obj, i}
            <tr>
                <td>{obj.name}</td>
                <td>{obj.phone}</td>
                <td>{obj.locationStr}</td>
                <td><button on:click|preventDefault={() => editModal(i)}>Edit</button></td>
                <td><input type=checkbox checked={obj?.privileges?.shipping ?? false} on:click|preventDefault={() => toggleShippingPrivilege(i)}></td>
                {#if salonShippingFocus != i}
                    <td on:click={() => setSalonShippingFocus(i)}>{((obj?.shipping?.ourRate?.percent??1.0)*100) + '%'}</td>
                {:else}
                    <input type="text" placeholder="100%" autocomplete="off" id="searchInput" bind:value={rate} on:keyup={(e) => e.key === 'Enter' && commitRate(i)} on:input={handleRateInput}/>
                {/if}
                <td><input type=checkbox checked={obj?.privileges?.scale ?? false} on:click|preventDefault={() => toggleScalePrivilege(i)}></td>
            </tr>
        {/each}
    </table>
    
</section>
<section>
    <button on:click={() => editModal(-1)}>New Salon</button>
</section>

<EditSalonModal onSave={onSave} id="EditSalonModal" bind:this={salonModal} salonObj={focusIndex >= 0 ? salons[focusIndex] : {}}/>

<style>
    th {
        border-bottom: 2px solid rgba(100,100,100,0.8);
    }
    th, td {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    th {
        text-align: left;
    }
    section {
        display: flex;
        justify-content: center;
    }
    input {
        width: auto;
        justify-self: center;
        align-self: center;
    }
</style>