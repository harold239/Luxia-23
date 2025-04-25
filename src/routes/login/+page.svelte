<script>
    import { auth } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { FacebookAuthProvider } from "firebase/auth";
    import {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
    } from "firebase/auth";
    import { goto } from "$app/navigation";

    let isLoginForm = true;
    let showPassword = false;

    let email = "";
    let password = "";
    let confirmPassword = "";
    let name = "";

    const toggleForm = () => {
        isLoginForm = !isLoginForm;
    };

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        goto("/");
    };

    const loginWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        await signInWithPopup(auth, provider);
        goto("/");
    };

    const handleSubmit = async () => {
        if (isLoginForm) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                goto("/");
            } catch (error) {
                alert(error.message);
            }
        } else {
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                goto("/");
            } catch (error) {
                alert(error.message);
            }
        }
    };
</script>

<div class="container-fluid bg-dark text-light py-5">
    <div class="container text-center">
        <h1 class="display-4 mb-4">
            <i class="fas fa-user-shield me-3"></i>{isLoginForm
                ? "Inicia Sesión"
                : "Regístrate"}
        </h1>
        <p class="lead">
            {isLoginForm
                ? "Accede a tu cuenta personal"
                : "Únete a nuestra comunidad"}
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card border-0 shadow-lg">
                <div class="card-body p-4 p-md-5">
                    <ul class="nav nav-pills nav-justified mb-5">
                        <li class="nav-item">
                            <button
                                class="nav-link {isLoginForm ? 'active' : ''}"
                                on:click={toggleForm}
                            >
                                <i class="fas fa-sign-in-alt me-2"></i>Login
                            </button>
                        </li>
                        <li class="nav-item">
                            <button
                                class="nav-link {!isLoginForm ? 'active' : ''}"
                                on:click={toggleForm}
                            >
                                <i class="fas fa-user-plus me-2"></i>Registro
                            </button>
                        </li>
                    </ul>

                    <div class="text-center mb-5">
                        <div class="d-flex justify-content-center gap-3">
                            <button
                                class="btn btn-outline-dark"
                                on:click={login}
                            >
                                <!-- google -->
                                <i class="fab fa-google fa-2x"></i>
                            </button>
                            <button
                                class="btn btn-outline-dark"
                                on:click={loginWithFacebook}
                            >
                                <!-- facebook -->
                                <i class="fab fa-facebook fa-2x"></i>
                            </button>
                        </div>
                    </div>

                    <div class="position-relative">
                        <div class="divider-text">o</div>
                    </div>

                    <form on:submit|preventDefault={handleSubmit}>
                        <div class="row g-3">
                            {#if !isLoginForm}
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nombre"
                                            placeholder="Nombre Completo"
                                            bind:value={name}
                                            required
                                        />
                                        <label for="nombre">
                                            <i class="fas fa-user me-2"
                                            ></i>Nombre Completo
                                        </label>
                                    </div>
                                </div>
                            {/if}

                            <div class="col-12">
                                <div class="form-floating">
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        bind:value={email}
                                        required
                                    />
                                    <label for="email">
                                        <i class="fas fa-envelope me-2"
                                        ></i>Correo Electrónico
                                    </label>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-floating">
                                    <input
                                        type={showPassword
                                            ? "text"
                                            : "password"}
                                        class="form-control"
                                        id="password"
                                        placeholder="Contraseña"
                                        bind:value={password}
                                        required
                                    />
                                    <label for="password">
                                        <i class="fas fa-lock me-2"
                                        ></i>Contraseña
                                    </label>
                                    <button
                                        type="button"
                                        class="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3"
                                        on:click={() =>
                                            (showPassword = !showPassword)}
                                    >
                                        <!-- xd -->
                                        <i
                                            class="fas {showPassword
                                                ? 'fa-eye-slash'
                                                : 'fa-eye'}"
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            {#if !isLoginForm}
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="confirmPassword"
                                            placeholder="Confirmar Contraseña"
                                            bind:value={confirmPassword}
                                            required
                                        />
                                        <label for="confirmPassword">
                                            <i class="fas fa-lock me-2"
                                            ></i>Confirmar Contraseña
                                        </label>
                                    </div>
                                </div>
                            {/if}

                            <div class="col-12 mt-4">
                                <button
                                    type="submit"
                                    class="btn btn-primary w-100 py-3"
                                >
                                    <i
                                        class="fas fa-{isLoginForm
                                            ? 'sign-in-alt'
                                            : 'user-plus'} me-2"
                                    ></i>
                                    {isLoginForm
                                        ? "Iniciar Sesión"
                                        : "Registrarse"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .nav-pills .nav-link {
        transition: all 0.3s;
    }

    .nav-pills .nav-link.active {
        background-color: #0d6efd;
        color: white !important;
    }

    .divider-text {
        position: relative;
        text-align: center;
        margin: 2rem 0;
    }

    .divider-text::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border-top: 2px solid #dee2e6;
        z-index: 1;
    }

    .form-control:focus {
        border-color: #0d6efd;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    .btn-primary {
        transition: all 0.3s;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
    }

    .btn-outline-dark:hover {
        background-color: #f8f9fa;
    }
</style>
