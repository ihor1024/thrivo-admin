<script>
    import {getUsers, setUserSalon} from '$lib/backend/user/user'
    import {getSalons, addSalon, ConvertAddressObjToStr, toggleSalonShippingPrivilege} from '$lib/backend/salon'

    import { onMount } from 'svelte';
    import {browser} from '$app/environment'
    import { Auth, Hub, DataStore, Amplify} from 'aws-amplify';

    import {sleep} from '$lib/utils/delay';


    let users = [];
    let filterUsers = [];
    let filter = ''
    let userSalonFocus = -1;
    let userKeyFocus = '';
    let loading = false;

    let salons = [];
    let filterSalons = [];
    let salonFilter = '';
    let filterKeys = [];

    const refreshUsers = async () => {
        console.log('Getting Users')
        const ss = await getUsers();
        console.log(ss)
        users = await Promise.all(ss.map( async (u) => {
            const out = {...u}
            out.salon = await u.salon
            if (typeof out.appVersion === 'string') {
                out.appVersionObj = JSON.parse(out?.appVersion ?? '{}')
            } else {
                out.appVersionObj = out?.appVersion ?? {}
            }
            return out
        }))
        console.log('after all')
        
        filterUsers = users.reduce((prev, curr) => {
            let salonId = curr?.salon?.name ?? 'Unassigned'
            if (salonId === 'Unassigned' && (curr?.appVersionObj?.version ?? '') != '') {
                salonId = curr?.appVersionObj?.version
            }
            if (!(salonId in prev)) {
                prev[salonId] = []
            }
            prev[salonId].push(curr)
            return prev;
        }, {})
        console.log(filterUsers)

        filterKeys = Object.keys(filterUsers).sort((ka, kb) => {
            if (ka === 'Unassigned')
                return -1;
            if (kb === 'Unassigned')
                return 1;
            if (kb.match(/^\d/) && !ka.match(/^\d/))
                return 1;
            if (ka.match(/^\d/) && !kb.match(/^\d/))
                return -1;
            return ka.toLowerCase().match(kb.toLowerCase())
        })
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
        filterSalons = salons;
    }

    onMount(() => {
        if (browser) {
            refreshUsers();
            refreshSalons();
        }
    })

    const clearAndRefresh = async () => {
        if (loading) {
            return;
        }
        loading = true;
        console.log('Clearing...')
        await DataStore.clear();
        console.log('Starting...')
        await DataStore.start();
        await sleep(2000);
        console.log('Refreshing...')
        refreshUsers();
        loading = false;
    }

    const setUserSalonFocus = (i, key) => {
        userSalonFocus = i
        userKeyFocus = key
    }
    const handleSalonFilterInput = () => {
        return filterSalons = salons.filter(s => s.name.toLowerCase().match(salonFilter.toLowerCase()))
    }

    const setUserSalonHere = async (userId, salonId) => {
        const out = await setUserSalon(userId, salonId)
        users[userSalonFocus].salon = await out.salon
        refreshUsers()
        setUserSalonFocus(-1, '')
    }
    const unsetUserSalon = async (userId) => {
        const out = await setUserSalon(userId)
        users[userSalonFocus].salon = await out.salon
        refreshUsers()
        setUserSalonFocus(-1,'')
    }


</script>

<svelte:head>
    <title>Thrivo - User Management</title>
</svelte:head>

<section >
    <button on:click={clearAndRefresh}>Refresh Data</button>

    
        
    {#each filterKeys as key, i}
    <section>
        <h3>{key}</h3>
        <table>
        <tr>
            <th>Name</th>
            <th>Email / Phone</th>
            <th on:click={() => setUserSalonFocus(-1,'')}>Salon</th>
            <th>App Version</th>
        </tr>
        {#each (filterUsers[key]) as obj, i}
            <tr>
                <td>{obj.name}</td>
                <td>{obj?.email ?? ''} {obj?.phone ?? ''}</td>
                {#if userSalonFocus != i || userKeyFocus != key}
                    <td on:click={() => setUserSalonFocus(i, key)}>{obj?.salon?.name ?? 'None'}</td>
                {:else}
                    <input type="text" placeholder="Search..." autocomplete="off" id="searchInput" bind:value={salonFilter} on:input={handleSalonFilterInput}/>
                    <a on:click={unsetUserSalon(obj.id)}>None</a>
                    {#each filterSalons as salon}
                        <a on:click={setUserSalonHere(obj.id, salon.id)}>{salon.name}</a>
                    {/each}
                {/if}
                <td>{obj?.appVersionObj?.version ?? ''}</td>
                
            </tr>
        {/each}
        </table>
    </section>
    {/each}
        
</section>

<style>
    a {
        font-size: 14px;
  color: black;
  background-color: #ccc;
  padding: 0px 0px;
  text-decoration: none;
  display: block;
}	
	
input {
    font-size: 14px;
}
a:hover {background-color: #fff}
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
        flex-direction: column;
    }
</style>