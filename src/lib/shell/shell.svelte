<script>
    import { onDestroy, onMount } from "svelte";
    import {goto} from '$app/navigation';
    import '@aws-amplify/datastore';

    import { browser } from "$app/environment";
    import "$lib/auth";
    import { Hub, Auth, DataStore } from "aws-amplify";
    import authStore from "$stores/authStore";
    import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";
    import Login from "$lib/modal/login/login.svelte";

    //console.log('Shell Is Showing up')
    let loginModal;
    const modalStore = getModalStore();
    const modalComponent = {
        ref: Login,
        props: {
            background: "bg-surface-500/5",
        },
        slot: "<p>Test</p>",
    };
    const modal = {
        type: "component",
        component: modalComponent,
    };

    onMount(() => {
        console.log("Here before checking browser");
        if (browser) {
            console.log("Setting up auth Subscription");
            const unSub = authStore.subscribe((val) => {
                console.log(val);
                const ac = async () => {
                    if (val.loginChange) {
                        try {
                            const out = await Auth.currentAuthenticatedUser();
                            // console.log('User CHECK: ' + JSON.stringify(out, null, 4))
                            if (out) {
                                authStore.update((old) => {
                                    return {
                                        ...old,
                                        isLoggedIn: true,
                                        loginChange: !old.isLoggedIn,
                                    };
                                });
                                return;
                            }
                        } catch (e) {
                            console.log("ERROR: + " + e);
                        }

                        if (val.isLoggedIn) {
                            //loginModal.close();
                            console.log('Logged in, closing modal')
                            modalStore.close();
                            await DataStore.start();
                            goto("/");
                            // nothing?
                        } else {
                            console.log("goto auth called");

                            //goto('/auth')
                            //loginModal.open();
                            modalStore.trigger(modal);
                        }
                    }
                };
                ac();
            });
            console.log("Setting up Hub listener");
            Hub.listen("auth", (data) => {
                const newAuthState = {
                    lastEvent: data.payload.event,
                    lastPayload: data.payload,
                    loginChange: false,
                };
                let newLogin = false;
                let updateLogin = false;
                switch (data.payload.event) {
                    case "signIn":
                        console.log('Logged in, closing modal')
                        updateLogin = true;
                        newLogin = true;
                        DataStore.start();
                        //loginModal.close();
                        modalStore.close();
                        break;
                    case "signOut":
                        updateLogin = true;
                        newLogin = false;
                        //loginModal.open();
                        modalStore.trigger(modal);
                        break;
                }
                authStore.update((old) => {
                    const isLoggedInUpdate = updateLogin
                        ? newLogin
                        : old.isLoggedIn;
                    return {
                        ...newAuthState,
                        isLoggedIn: isLoggedInUpdate,
                        loginChange: isLoggedInUpdate != old.isLoggedIn,
                    };
                });
            });
        }
    });
</script>

<slot />
