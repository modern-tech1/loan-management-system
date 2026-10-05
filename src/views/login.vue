```vue
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <!-- LOGIN CARD -->
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
    >

      <!-- LOGO / BRAND -->
      <div class="text-center mb-8">

        <div
          class="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-2xl
                 flex items-center justify-center shadow-lg"
        >
          <span class="text-white text-2xl font-bold">
            LM
          </span>
        </div>

        <h1 class="text-2xl font-bold text-gray-800">
          Loan Management System
        </h1>

        <p class="text-gray-500 text-sm mt-2">
          Sign in to access your dashboard
        </p>

      </div>


      <!-- LOGIN FORM -->
      <form @submit.prevent="submit" class="space-y-5">

        <!-- USERNAME -->
        <div>
          <label
            for="username"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            v-model="form.username"
            placeholder="Enter your username"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl
                   outline-none transition
                   focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
          />
        </div>


        <!-- PASSWORD -->
        <div>
          <label
            for="password"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl
                   outline-none transition
                   focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500"
          />
        </div>


        <!-- FORGOT PASSWORD -->
        <div class="flex justify-end">
          <button
            type="button"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </button>
        </div>


        <!-- LOGIN BUTTON -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700
                 text-white font-semibold py-3 rounded-xl
                 transition duration-200 shadow-md
                 hover:shadow-lg"
        >
          LOGIN
        </button>

      </form>


      <!-- FOOTER -->
      <div class="text-center mt-8">

        <p class="text-xs text-gray-400">
          © 2026 Loan Management System
        </p>

        <p class="text-xs text-gray-400 mt-1">
          Secure business management platform
        </p>

      </div>

    </div>

  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  methods: {

    async submit() {

      try {

        const res = await axios.post(
          "http://localhost:3000/login",
          this.form
        );

        console.log("Login response:", res.data);

        /*
         * Store token returned by Express
         */
        localStorage.setItem("token", res.data.token);

        /*
         * Redirect to dashboard
         */
        this.$router.push("/");

        alert("Login successful");

      } catch (error) {

        console.error("Login error:", error);

        alert("Invalid username or password");

      }

    }

  }
};
</script>
```
