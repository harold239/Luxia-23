<script>
    import { onMount } from "svelte";
    import { auth } from "$lib/firebase";
    import { goto } from "$app/navigation";

    import { getFirestore, collection, getDocs } from "firebase/firestore";

    let user = null;

    onMount(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            user = currentUser;
        } else {
            goto("/login");
        }
    });

    const handleLogout = async () => {
        await auth.signOut();
        goto("/");
    };

    let citas = [];
    const db = getFirestore();
    const obtenerCitas = async () => {
        const querySnapshot = await getDocs(collection(db, "citas"));
        citas = querySnapshot.docs.map((doc) => doc.data());
    };
    onMount(() => {
        obtenerCitas();
    });
</script>

{#if user}
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card border-0 shadow-lg bg-dark">
                    <div class="card-body p-4 p-md-5">
                        <h2 class="">Perfil de {user.displayName}</h2>
                        <div class="text-center">
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                class="img-fluid rounded-circle"
                            />
                        </div>
                        <p>Email: {user.email}</p>
                        <button class="btn btn-danger" on:click={handleLogout}
                            >Cerrar sesión</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container py-5">
        <h2>Citas Pendientes</h2>
        <table class="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                </tr>
            </thead>
            <tbody>
                {#each citas as cita}
                    <tr>
                        <td>{cita.fecha}</td>
                        <td>{cita.hora}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    <p>Cargando...</p>
{/if}

<style>
    .img-fluid {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .card-body {
        text-align: center;
    }

    .btn-danger {
        margin-top: 20px;
    }
</style>
