<script>
    import { onMount } from 'svelte';
    import {browser} from '$app/environment'

    import {addSalon, updateSalon} from '$lib/backend/salon'

    import Modal, {getModal} from '$lib/modal/modal.svelte';


    let id = '';
    let name = '';
    let phone = '';
    let location = {};

    export let salonObj = {};
    export let modalId = '';
    export let onSave = (() => {});

    const setStateVariables = (obj) => {
        if (obj && obj !== {}) {
            name = obj.name
            phone = obj.phone
            location = (obj?.location ?? false) ? {...obj.location} : {}
            id = obj?.id
        }
    }

    $: setStateVariables(salonObj)

    const onConfirm = async () => {
        let out = {}
        if (!id || id === '') {
            out = await addSalon(name, phone, location)
        } else {
            out = await updateSalon(id, name, phone, location)
        }
        onSave(out)
    }

    export function close() {
        getModal(modalId).close();
    }

    export function open() {
        getModal(modalId).open();
    }

</script>

<Modal id={modalId}>
    <h3>Salon Edit</h3>
    <form on:submit|preventDefault={onConfirm}>
        <div>
            <label for="name">Name</label>
            <input id="name" type="text" value={name} on:input={(e) => {name = e.target.value}}/>
        </div>
        <div>
            <label for="phone">Phone</label>
            <input type="text" label="phone" id="phone" value={phone} on:input={e => {phone = e.target.value}}/>
        </div>
        <h4>Address</h4>
        <div>
            <label for="address1">Address Line 1</label>
            <input id="address1" type="text" value={location?.address1 ?? ''} on:input={(e) => {location.address1 = e.target.value}}/>
        </div>
        <div>
            <label for="address2">Address Line 2</label>
            <input id="address2" type="text" value={location?.address2 ?? ''} on:input={(e) => {location.address2 = e.target.value}}/>
        </div>
        <div>
            <label for="address3">Address Line 3</label>
            <input id="address3" type="text" value={location?.address3 ?? ''} on:input={(e) => {location.address3 = e.target.value}}/>
        </div>
        <div>
            <label for="locality">City</label>
            <input id="locality" type="text" value={location?.locality ?? ''} on:input={(e) => {location.locality = e.target.value}}/>
        </div>
        <div>
            <label for="region">State</label>
            <input id="region" type="text" value={location?.region ?? ''} on:input={(e) => {location.region = e.target.value}}/>
        </div>
        <div>
            <label for="country">Country</label>
            <input id="country" type="text" value={location?.country ?? ''} on:input={(e) => {location.country = e.target.value}}/>
        </div>
        <div>
            <label for="postalCode">Zip Code</label>
            <input id="postalCode" type="text" value={location?.postalCode ?? ''} on:input={(e) => {location.postalCode = e.target.value}}/>
        </div>
        <button type="submit">Save</button>
    </form>
</Modal>