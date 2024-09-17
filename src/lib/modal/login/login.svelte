<script>
    import { getModalStore } from "@skeletonlabs/skeleton";
    import authStore from '$stores/authStore';
    import { Auth } from 'aws-amplify';

    const modalStore = getModalStore();
    let username = '';
    let password = '';
    
    authStore.subscribe(val => {
        if (val.isLoggedIn) {
            //goto('/')
            username = '';
            password = '';
            modalStore.close();
        }
    })

    const handleSignIn = async () => {
        try {
            const out = await Auth.signIn(username, password);
            console.log(JSON.stringify(out, null, 4));
        } catch (error) {
            console.log(error);
        }
    };

</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-xl font-bold">Please Sign In to continue</header>
    <form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
        <label class="label">
            <span>Email</span>
            <input class="input" type="text" bind:value={username} placeholder="Enter email..."/>
        </label>
        <label class="label">
            <span>Email</span>
            <input class="input" type="password" bind:value={password} placeholder="******"/>
        </label>
    </form>
    <footer class="modal-footer flex justify-end">
        <button class="btn btn-primary variant-filled hover:variant-filled-secondary transition" type="button" on:click={handleSignIn}>Sign In</button>
    </footer>
</div>