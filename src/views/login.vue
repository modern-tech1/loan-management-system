<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">

    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

      <h1 class="mb-6 text-center text-3xl font-bold text-blue-600">
        Admin Login
      </h1>

      <form @submit.prevent="login">

        <!-- Username -->
        <div class="mb-4">
          <label class="mb-2 block font-medium">
            Username
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="mb-2 block font-medium">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    login() {

      axios.post("http://localhost:5000/login", {
        username: this.username,
        password: this.password
      })
      .then((res) => {

        console.log(res.data);

        // Save login status
        localStorage.setItem("isLoggedIn", "true");

        // Go to dashboard
        this.$router.push("/admin");

      })
      .catch((error) => {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Login failed"
        );

      });

    }
  }
};
</script>