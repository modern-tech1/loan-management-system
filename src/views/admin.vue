
<template>
    <div>
        <h1>this page</h1>
        <p>ADMIN PAGE</p>
      <button class="bg-blue-700 w-40 h-10 rounded-2xl">  <RouterLink to="/addnew">add new</RouterLink></button>
    </div>

  <div class="min-h-screen bg-gray-100 p-8">

    <div class="mx-auto max-w-6xl">

      <h1 class="mb-6 text-3xl font-bold text-gray-800">
        Players List
      </h1>

      <div class="overflow-x-auto rounded-lg bg-white shadow-lg">

        <table class="w-full text-left">

          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-6 py-4 font-semibold">ID</th>
              <th class="px-6 py-4 font-semibold">FIRSTNAME</th>
              <th class="px-6 py-4 font-semibold">LASTNAME</th>
              <th class="px-6 py-4 font-semibold">AGE</th>
              <th class="px-6 py-4 font-semibold">TELEPHONE</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">

            <tr
              v-for="item in items"
              :key="item.id"
              class="transition hover:bg-gray-100"
            >
              <td class="px-6 py-4">{{ item.id }}</td>

              <td class="px-6 py-4 font-medium text-gray-800">
                {{ item.firstname }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ item.lastname }}
              </td>

              <td class="px-6 py-4">
                <span class="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {{ item.age }}
                </span>
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ item.telephone }}
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      age: "",
      telephone: "",
      items: []
    }
  },

  mounted() {
    axios
      .get("http://localhost:5000/getting")
      .then((res) => {

        console.log("Data retrieved:", res.data);

        this.items = res.data.message;

        alert("Data selected successfully");

      })
      .catch((error) => {

        console.log("Error:", error);

        alert("Error getting data");

      });
  }
}
</script>
