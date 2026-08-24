<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-6">

    <!-- Form Card -->
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

      <!-- Header -->
      <div class="mb-6">
        <h2 class="rounded-lg bg-blue-600 py-3 text-center text-xl font-bold text-white">
          ADD NEW PLAYER
        </h2>

        <p class="mt-2 text-center text-sm text-gray-500">
          Enter player information below
        </p>
      </div>

      <form @submit.prevent="send">

        <!-- Firstname -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-semibold text-gray-700">
            FIRSTNAME
          </label>

          <input
            type="text"
            v-model="form.firstname"
            placeholder="Enter firstname"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <!-- Lastname -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-semibold text-gray-700">
            LASTNAME
          </label>

          <input
            type="text"
            v-model="form.lastname"
            placeholder="Enter lastname"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <!-- Age -->
        <div class="mb-4">
          <label class="mb-2 block text-sm font-semibold text-gray-700">
            AGE
          </label>

          <input
            type="number"
            v-model="form.age"
            placeholder="Enter age"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <!-- Telephone -->
        <div class="mb-6">
          <label class="mb-2 block text-sm font-semibold text-gray-700">
            TELEPHONE
          </label>

          <input
            type="text"
            v-model="form.telephone"
            placeholder="Enter telephone number"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition duration-200 hover:bg-blue-700 active:scale-95"
        >
          ADD PLAYER
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
      form: {
        firstname: "",
        lastname: "",
        age: "",
        telephone: ""
      }
    };
  },

  methods: {
    send() {
      axios
        .post("http://localhost:5000/insert", this.form)
        .then((res) => {
          console.log("Data inserted:", res.data);

          alert("Data inserted successfully");

          // Clear the form after successful insertion
          this.form = {
            firstname: "",
            lastname: "",
            age: "",
            telephone: ""
          };
        })
        .catch((error) => {
          console.log("Insert error:", error);
          alert("Error inserting data");
        });
    }
  }
};
</script>