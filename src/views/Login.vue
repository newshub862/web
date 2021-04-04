<template>
    <v-form id="login-form">
        <div id="field-container">
            <v-text-field
                v-model="login"
                :counter="10"
                :rules="nameRules"
                label="Login"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :counter="10"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>
        </div>

        <div id="btn-action">
            <v-btn color="primary" @click="userLogin({login, password})" :disabled="isDisabledBtns">
                Login
            </v-btn>
            <v-btn color="primary" @click="registration({login, password})" :disabled="isDisabledBtns">
                Registration
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    data: () => ({
        valid: true,
        login: "",
        password: "",
        nameRules: [
            (v) => !!v || "Login is required",
            (v) =>
                (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
        email: "",
        passwordRules: [
            (v) => !!v || "Password is required",
            (v) =>
                (v && v.length <= 10) || "Name must be less than 10 characters",
        ],
    }),
    computed: {
        ...mapGetters('user', {
            isLogined: 'isLogined',
        }),
        isDisabledBtns: () => {
            // return this.login !== '' && this.password !== ''
        }
    },
    watch: {
        isLogined: (val) => {
            if (val) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        ...mapActions('user', {
            auth: 'auth',
            registration: 'registration',
            getSettings: 'getSettings',
        }),
        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        userLogin(data) {
             this.auth(data)
        },
    },
};
</script>

<style>
#login-form {
    margin-top: 50px;
}
#field-container {
    max-width: 300px;
    margin: auto;
}
#btn-action {
    max-width: 300px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
}
#btn-action button {
    margin-bottom: 10px;
}
</style>