<script>
    import {updateColorTable, enableColor} from '$lib/backend/color'
    import {goto} from '$app/navigation';

    import { onMount } from 'svelte';
    import { refreshColors } from '$lib/backend/backend'

    import {browser} from '$app/environment'
    import { Auth, Hub, DataStore, graphqlOperation} from 'aws-amplify';

    import { Color, ColorLine, Company } from '$src/models';

    import EditColorBatchIngredientsModal from '$lib/colors/editColorBatchIngredientsModal.svelte';

    import Modal, {getModal} from '$lib/modal/modal.svelte';
    import EditCompany from '$lib/colors/editCompany.svelte';
    import EditLine from '$lib/colors/editLine.svelte';
    import EditColor from '$lib/colors/editColor.svelte';
    import { newColor } from '$lib/backend/color';


    /** @type {import('./$types').PageData} */
	export let data;

    let files;
    let colorObj;
    let loading;
    let reader;

    let colors;
    let colorlines;
    let companies = [];

    let colorId;
    let brandId;
    let lineId;
    let focusBrand = null;
    let focusLine = null;
    let focusColor = null;
    let possibleLines = [];
    let possibleColors = [];
    let partialIngredients = false;
    let ecbiModal;
    let companyModal;
    let lineModal;

    const reloadData = async () => {
        const x = await refreshColors();
        companies = x.companies;
        colors = x.colors;
        colorlines = x.colorLines;
    }

    onMount(() => {
        if (browser) {
            reader = new FileReader();
            reader.onload = (event) => {
                let str = event.target.result;
                let json = JSON.parse(str)
                console.log(json);
                colorObj = json;
                loading = false;
            };
            brandId = data.brandId;
            lineId = data.lineId;
            colorId = data.colorId;
            reloadData();
        }
    })
    $: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);
        loading = true;
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
            reader.readAsText(file)
		}
	}
    $: if (brandId && companies && companies.length > 0 && !lineId && !colorId) {
        focusBrand = companies.find(x => x.id === brandId);
        possibleLines = colorlines.filter(x => x.company === focusBrand.key);
        console.log(possibleLines)
    }
    $: if (lineId && colorlines && colorlines.length > 0 && !colorId) {
        focusLine = colorlines.find(x => x.id === lineId);
        focusBrand = companies.find(x => x.key === focusLine.company);
        possibleLines = colorlines.filter(x => x.company === focusBrand.key);
        possibleColors = colors.filter(x => x.colorLineColorsId === lineId);
    }
    $: if (colorId && colors && colors.length > 0) {
        focusColor = colors.find(x => x.id === colorId);
        focusLine = colorlines.find(x => x.id === focusColor.colorLineColorsId);
        focusBrand = companies.find(x => x.key === focusLine.company);
        possibleLines = colorlines.filter(x => x.company === focusBrand.key);
        possibleColors = colors.filter(x => x.colorLineColorsId === lineId);
    }

    $: partialIngredients = possibleColors?.every(x => x.ingredients?.length <= 0)

    const clearAndRefresh = async () => {
        if (loading) {
            return;
        }
        loading = true;
        await DataStore.clear();
        await DataStore.start();
        loading = false;
    }

    const enableTheColor = async () => {
        if (loading || !colorObj) {
            return;
        }
        if (!(colorObj.hasOwnProperty('_company'))) {
            console.warn('No "_company" key available in file')
            return;
        }
        loading = true;
        const company = colorObj['_company']
        await enableColor(company)
        loading = false;
    }

    const uploadTheData = async () => {
        if (loading) {
            return;
        }
        if (!(colorObj.hasOwnProperty('_company'))) {
            console.warn('No "_company" key available in file')
            return;
        }

        loading = true;
        const company = colorObj['_company']
        await updateColorTable(colorObj, company)
        loading = false;
    }

    const onBatchAddIngredients = async () => {
        ecbiModal.open();
    }

    const openCompany = async (obj) => {
        lineId = undefined;
        colorId = undefined;
        brandId = brandId === obj.id ? undefined : obj.id;
        const url = new URL(window.location.href);
        if (brandId !== undefined)
            url.searchParams.set('brandId', brandId);
        else
            url.searchParams.delete('brandId');
        url.searchParams.delete('lineId');
        url.searchParams.delete('colorId');
        goto(url.href, {replaceState: true});
    }
    const openLine = async (obj) => {
        colorId = undefined;
        lineId = lineId === obj.id ? undefined : obj.id;
        const url = new URL(window.location.href);
        url.searchParams.delete('colorId');
        if (lineId !== undefined)
            url.searchParams.set('lineId', lineId);
        else
            url.searchParams.delete('lineId');
        goto(url.href, {replaceState: true});
    }
    const openColor = async (obj) => {
        colorId = colorId === obj.id ? undefined : obj.id;
        const url = new URL(window.location.href);
        if (colorId !== undefined)
            url.searchParams.set('colorId', colorId);
        else
            url.searchParams.delete('colorId');
        goto(url.href, {replaceState: true});
    }

    const onNewColor = async () => {
       
    }
    const onEditCompany = async () => {
        companyModal.open();
    }

    const onColorSave = async () => {
        reloadData();
    }

    const onCopyColor = async () => {
        const newObj = {...focusColor};
        newObj.colorKey = newObj.colorKey + ' (copy)';
        delete newObj.id;  
        delete newObj._lastChangedAt;
        delete newObj._deleted;
        delete newObj._version;
        const out = await newColor(newObj);
        await reloadData();
        openColor(out);
    }
    const onDeleteColor = async () => {
        if (confirm('Are you sure you want to delete this color?')) {
            await DataStore.delete(Color, focusColor.id);
            await openColor(focusColor);
            await reloadData();
        }
    }
</script>

<svelte:head>
    <title>Thrivo - Color Management</title>
</svelte:head>

<section>
    <input type="file" id="colorJSON" accept=".json,application/json" bind:files/>
    <br>
    <button on:click={uploadTheData}>Upload the Data</button>
    <button on:click={enableTheColor}>Enable the Company</button>
    <br>
    <button on:click={clearAndRefresh}>Refresh Data</button>
    <br>
    {loading ? 'Loading...' : 'Done Loading.'}
    <hr />
    <h2>Brands</h2>
    <div class="buttonsContainer">
        {#each companies as obj, i}
            <button class:active={brandId == obj.id} on:click={() => openCompany(obj)}>
                {obj.name}
            </button>
        {/each}
    </div>
    {#if (brandId)}
    <hr />
    
    <div class="subheader">
        <h2>Lines</h2>
            <button on:click={onEditCompany}>
                Edit {focusBrand?.name ?? 'Brand'}
            </button>
            <!--<button>
                Batch Edit (TODO?)
            </button>-->
        
    </div>
    <div class="buttonsContainer">
        {#each possibleLines as obj, i}
            <button class:active={lineId == obj.id} on:click={() => openLine(obj)}>
                {obj.name}
            </button>
        {/each}
    </div>
    {/if}
    {#if (lineId)}
    <hr />
    
    <div class="subheader">
        <h2>Colors</h2>
        
            <button on:click={() => lineModal.open()}>
                Edit {focusLine?.name ?? 'Line'}
            </button>
            {#if partialIngredients}
            <button on:click={() => onBatchAddIngredients()}>
                Batch Add Missing Ingredients to {focusLine?.name ?? 'Line'}
            </button>
            {:else}
            <button on:click={() => onBatchAddIngredients()}>
                Batch Overwrite Ingredients for {focusLine?.name ?? 'Line'}
            </button>
            {/if}
    </div>
    <div class="buttonsContainer">
        {#each possibleColors as obj, i}
            <button class:active={colorId == obj.id} on:click={() => openColor(obj)}>
                {obj.colorKey}
            </button>
        {/each}
    </div>
    <br />
    <!--<button on:click={() => onNewColor()}>New Color</button>-->
    {/if}
    {#if (colorId)}
    <hr />
    <EditColor color={focusColor} colorId={colorId} onSave={onColorSave}/>
    <button on:click={() => onCopyColor()}>Duplicate & Edit Color</button>
    <button on:click={() => onDeleteColor()}>Delete Color</button>
    {/if}
</section>

<EditColorBatchIngredientsModal bind:this={ecbiModal} colorLineId={focusLine?.id ?? ''} colorLineName={focusLine?.name ?? ''} onSave={reloadData}/>
<EditCompany bind:this={companyModal} modalId="EditCompany" onSave={reloadData}/>
<EditLine bind:this={lineModal} modalId="EditLine" onSave={reloadData} colorLine={focusLine}/>

<style>
    .buttonsContainer {
        display: flex;
        flex-wrap: wrap;
    }
    .buttonsContainer button {
        margin: 5px;
    }
    .active {
		background-color: black;
        font-weight: bold;
        color: white;
	}
    .subheader {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .subheader button {
        margin-left: 10px;
        padding: 10px, 10px;
    }
    
</style>