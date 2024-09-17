<script>
    import {
        AppRail,
        AppRailAnchor,
        AppRailTile,
        LightSwitch,
        getDrawerStore,
        getModalStore,
    } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import authStore from "$stores/authStore";
    import { signOut } from "$lib/auth";
    import Login from "$lib/modal/login/login.svelte";

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
    const modalStore = getModalStore();

    let isLoggedIn = false;
    authStore.read.subscribe((val) => {
        console.log(val);
        isLoggedIn = val.isLoggedIn;
    });

    let menuItems = [
        { name: "Home", icon: "home", link: "/" },
        {
            name: "Data",
            icon: "chart-line",
            link: "/data",
            subItems: [
                { name: "Clients", icon: "user", link: "/data/clients" },
                { name: "Usage", icon: "building", link: "/data/usage" },
                { name: "OMNI", icon: "mobile-alt", link: "/data/omni" },
            ],
        },
        {
            name: "Manage",
            icon: "cog",
            link: "/management",
            subItems: [
                { name: "Colors", icon: "palette", link: "/management/color" },
                {
                    name: "Devices",
                    icon: "mobile-alt",
                    link: "/management/device",
                },
                { name: "Users", icon: "user", link: "/management/user" },
                { name: "Salons", icon: "building", link: "/management/salon" },
            ],
        },
    ];

    let currentTile = 0;
    let section = undefined;
    const onSectionChange = async (item) => {
        if (item === "AUTH") {
            if (isLoggedIn) {
                console.log("Logging out");
                await DataStore.clear();
                await signOut();
            } else {
                modalStore.trigger(modal);
            }
        } else {
            if (item.subItems) {
                section = item.subItems;
            } else {
                section = undefined;
                goto(item.link);
                console.log("tapped");
            }
        }
    };
    $: listboxItemActive = (href) =>
        $page.url.pathname?.includes(href) ? "bg-primary-active-token" : "";
    const drawerStore = getDrawerStore();
</script>

<div class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ?? ''}">
    <AppRail
        background="bg-transparent"
        border="border-r border-surface-500/30"
    >
        <svelte:fragment slot="lead">
            <AppRailAnchor
                href="/"
                class="flex justify-center items-center p-3"
            >
                <img
                    class="h-auto rounded-xl w-auto mx-auto"
                    src="/android-chrome-512x512.png"
                    alt="Thrivo"
                />
            </AppRailAnchor>
        </svelte:fragment>

        <!-- --- -->
        {#each menuItems as item}
            <AppRailTile
                bind:group={currentTile}
                name={item.name}
                value={item.name}
                title={item.name}
                on:click={() => onSectionChange(item)}
            >
                <svelte:fragment slot="lead">
                    <i class="text-2xl fa fa-{item.icon}" />
                    <!-- TODO: Replace with icon component -->
                </svelte:fragment>
                <span>{item.name}</span>
            </AppRailTile>
        {/each}
        <!-- --- -->

        <svelte:fragment slot="trail">
            <AppRailAnchor
                title="Account"
                on:click={() => onSectionChange("AUTH")}
                >{isLoggedIn ? "Sign Out" : "Log in"}</AppRailAnchor
            >
        </svelte:fragment>
    </AppRail>
    {#if section}
        <section class="p-4 pb-20 space-y-4 overflow-y-auto">
            <p class="font-bold pl-4 text-2xl">{currentTile}</p>
            <!-- Nav List -->
            <nav class="list-nav">
                <ul>
                    {#each section as item}
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <li on:keypress on:click={drawerStore.close}>
                            <a
                                href={item.link}
                                class={listboxItemActive(item.link)}
                                data-sveltekit-preload-data="hover"
                            >
                                <span class="flex-auto">{@html item.name}</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </section>
    {/if}
</div>
