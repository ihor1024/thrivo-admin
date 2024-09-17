<script>
	import { onMount } from 'svelte';
    import {browser} from '$app/environment'
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { Auth, Hub, DataStore} from 'aws-amplify';
    import { API, graphqlOperation} from 'aws-amplify';
    import { refreshColors } from '$lib/backend/backend';
	import { signOut } from '$lib/auth'
    import { refreshEverything } from '$lib/backend/backend';

	import {organizeCycles, deviceToSalonName} from '$lib/data/leaderboards';
	
    //import { User } from '../models';
    //console.log(Amplify)

	let byStylist = [];
	let byDevice = [];

	let timeFrame = {}

	const isJPMS = (name) => {
		return name.includes('Orlando') || name.includes('Salon Halo')
			|| name.includes('Cromeans') || name.includes('Caru')
			|| name.includes('Felix & Ginger')
	}


	const getLeaderBoards = async (start=null, end=null) => {
		timeFrame = {start:start, end: end}
		byStylist = await organizeCycles('Users', {start: start, end: end})
		byDevice = (await organizeCycles('uuid_Devices', {start: start, end: end})).map(d => {
			//console.log(d)
			const name = deviceToSalonName(d?.device ?? 'unnamed', d?.device ?? 'unnamed');
			return {...d, name: name}
		})
	}

	onMount(() => {
		if (browser) {
			getLeaderBoards();
		}
	})

    //asyncCaller()
	const onClickTest = () => {
		getLeaderBoards();
	}

	let currentTimeScale = 0;

	function getSunday(d, extra = false, weekAgo=0) {
		const del = extra? -1 : 0
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -7:0) + del -(7*weekAgo); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	const onTimeToggle = async (i) => {
		if (currentTimeScale == i ) {
			return;
		}
		currentTimeScale = i;
		if (i == 0) {
			getLeaderBoards();
		}
		const date = new Date();
		if (i == 1) {// year
			const start = new Date(date.getFullYear(), 0, 1);
			getLeaderBoards(start.toISOString().split('T')[0]);
		}
		if (i == 2) { //month
			const start = new Date(date.getFullYear(), date.getMonth(), 1);
			getLeaderBoards(start.toISOString().split('T')[0]);
		}
		if (i == 3) { // week
			getLeaderBoards(getSunday(date).toISOString().split('T')[0]);
		}
		if (i == 4) { // week
			getLeaderBoards(getSunday(date, true).toISOString().split('T')[0]);
		}
		if (i == 5) {
			getLeaderBoards(new Date('December 1, 2022').toISOString().split('T')[0],new Date('January 1, 2023').toISOString().split('T')[0]);
		}
		if (i == 6) {
			getLeaderBoards(getSunday(date, false, 1).toISOString().split('T')[0])
		}
		if (i == 7) {
			getLeaderBoards(new Date('January 1, 2023').toISOString().split('T')[0], new Date('February 1, 2023').toISOString().split('T')[0]);
		}
		if (i == 8) {
			getLeaderBoards(new Date('December 1, 2022').toISOString().split('T')[0],new Date('February 1, 2023').toISOString().split('T')[0]);
		}
		if (i == 9) {
			getLeaderBoards(new Date('November 1, 2022').toISOString().split('T')[0],new Date('December 1, 2022').toISOString().split('T')[0]);
		}
		if (i == 10) {
			getLeaderBoards(getSunday(date, true, 1).toISOString().split('T')[0], getSunday(date, false).toISOString().split('T')[0])
		}
	}

	const onSignOut = signOut;
</script>

<svelte:head>
	<title>Thrivo - Home</title>
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>
	
	<div class="summary">
		<p>The start of something new!</p>
	</div>

	<h2>Leaderboards</h2>
	{#if currentTimeScale == 0}
			<h3>All Time</h3>
		{:else}
			<h3>From: {timeFrame.start}</h3>
		{/if}
	<div class="boxes">
		
		<div class="box">
			<h3>By Stylist</h3>
			{#each byStylist as stylistData, index}
				<p>{stylistData.count} | {stylistData.stylist?.name ?? 'unnamed'}</p>
			{/each}
		</div>
		<div class="box">
			<h3>By Salon/Device</h3>
			{#each byDevice as deviceData, index}
				<p>{deviceData.count} | {deviceToSalonName(deviceData?.device ?? 'unnamed', deviceData.stylists[0].email + ' : ' + deviceData.stylists[0].name)}</p>
			{/each}
		</div>
	</div>

	
	
	<div class="">
	<h3>Switch to:</h3>
	<button on:click={() => onTimeToggle(5)}>December</button>
	<button on:click={() => onTimeToggle(7)}>January</button>
	<button on:click={() => onTimeToggle(8)}>Since December</button>
	<button on:click={() => onTimeToggle(9)}>November</button>

	<button on:click={() => onTimeToggle(4)}>Week+1</button>
		<button on:click={() => onTimeToggle(3)}>Week</button>
		<button on:click={() => onTimeToggle(6)}>Last Week</button>
		<button on:click={() => onTimeToggle(10)}>Last Week + 1</button>
		<button on:click={() => onTimeToggle(2)}>Month</button>
		<button on:click={() => onTimeToggle(1)}>Year</button>
		<button on:click={() => onTimeToggle(0)}>All Time</button>
	</div>
	<button on:click={onClickTest}>Refresh</button>

</section>

<style>
	button {
		margin-top: 10px
	}
	.summary {
		margin-top: -8em
	}
	h2 {
		line-height: 0;
		font-size: 1.2em;
		margin-bottom: 0.2em;
	}
	.boxes {
		display:flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
		padding: 0.5em;
		width: 80%
	}
	.box {
		margin: 0.24em;
		flex: 1;
		background-color: #F6F6F6;
		border-radius: 0.5em;
		min-width: 0;

		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
		padding: 0.3em;
		text-align: center;

	}
	.box p {
		white-space: nowrap;
		line-height: 0.1em;
		text-align: left;
	}
	.box h3 {
		white-space: nowrap;
		display: inline-block;
		line-height: 0;
	}
	.summary p {
		color: #224422;
		font-size: 1.5em;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
