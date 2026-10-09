
<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <!-- Header -->
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Customers</h1>
        <p class="mt-2 text-gray-500">
          Manage customer information for your loan business.
        </p>
      </div>

      <button
        @click="showForm = !showForm"
        class="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
      >
        {{ showForm ? 'Cancel' : '+ Add Customer' }}
      </button>
    </div>

    <!-- Notification -->
    <div
      v-if="message"
      class="mb-5 rounded-lg p-4"
      :class="isError
        ? 'bg-red-100 text-red-700'
        : 'bg-green-100 text-green-700'"
    >
      {{ message }}
    </div>

    <!-- Summary -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div class="rounded-xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Total Customers</p>
        <h2 class="mt-3 text-3xl font-bold text-blue-600">
          {{ customers.length }}
        </h2>
      </div>

      <div class="rounded-xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">New Customers Today</p>
        <h2 class="mt-3 text-3xl font-bold text-green-600">
          {{ newToday }}
        </h2>
      </div>
    </div>

    <!-- Registration Form -->
    <div v-if="showForm" class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-6 text-xl font-bold text-gray-800">
        Register New Customer
      </h2>

      <form
        @submit.prevent="addCustomer"
        class="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Full Name *
          </label>
          <input
            v-model.trim="form.name"
            type="text"
            maxlength="200"
            required
            placeholder="Enter customer's full name"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Telephone *
          </label>
          <input
            v-model.trim="form.telephone"
            type="tel"
            maxlength="200"
            required
            placeholder="Enter telephone number"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            ID Card Number *
          </label>
          <input
            v-model="form.id_card"
            type="number"
            min="1"
            step="1"
            required
            placeholder="Enter ID card number"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Address *
          </label>
          <input
            v-model.trim="form.address"
            type="text"
            maxlength="200"
            required
            placeholder="Enter customer's address"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div class="flex flex-wrap gap-3 md:col-span-2">
          <button
            type="submit"
            :disabled="saving"
            class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Register Customer' }}
          </button>

          <button
            type="button"
            @click="resetForm"
            class="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>

    <!-- Search -->
    <div class="mb-5 rounded-xl bg-white p-4 shadow-sm">
      <input
        v-model="search"
        type="search"
        placeholder="Search by name, telephone, ID card, or address..."
        class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <!-- Customer Table -->
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
      <div class="border-b p-5">
        <h2 class="text-xl font-bold text-gray-800">
          Registered Customers
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          View and search customer records.
        </p>
      </div>

      <div v-if="loading" class="p-8 text-center text-gray-500">
        Loading customers...
      </div>

      <div v-else-if="loadError" class="p-8 text-center text-red-600">
        {{ loadError }}
        <button
          @click="fetchCustomers"
          class="ml-2 font-semibold underline"
        >
          Retry
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-gray-600">
            <tr>
              <th class="whitespace-nowrap px-5 py-4">ID</th>
              <th class="whitespace-nowrap px-5 py-4">Customer Name</th>
              <th class="whitespace-nowrap px-5 py-4">Telephone</th>
              <th class="whitespace-nowrap px-5 py-4">ID Card</th>
              <th class="whitespace-nowrap px-5 py-4">Address</th>
              <th class="whitespace-nowrap px-5 py-4">Registered Date</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="hover:bg-blue-50"
            >
              <td class="px-5 py-4 font-semibold text-gray-800">
                {{ customer.id }}
              </td>

              <td class="whitespace-nowrap px-5 py-4 font-medium text-gray-800">
                {{ customer.name }}
              </td>

              <td class="whitespace-nowrap px-5 py-4">
                {{ customer.telephone }}
              </td>

              <td class="whitespace-nowrap px-5 py-4">
                {{ customer.id_card }}
              </td>

              <td class="px-5 py-4">
                {{ customer.address }}
              </td>

              <td class="whitespace-nowrap px-5 py-4 text-gray-500">
                {{ formatDate(customer.created_at) }}
              </td>
            </tr>

            <tr v-if="filteredCustomers.length === 0">
              <td colspan="6" class="px-5 py-10 text-center text-gray-500">
                No customers found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t p-4 text-sm text-gray-500">
        Showing {{ filteredCustomers.length }} customer(s)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/customers'

const customers = ref([])
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const search = ref('')
const message = ref('')
const isError = ref(false)
const loadError = ref('')

function emptyForm() {
  return {
    name: '',
    telephone: '',
    id_card: '',
    address: ''
  }
}

const form = ref(emptyForm())

const today = new Date().toLocaleDateString('en-CA', {
  timeZone: 'Africa/Kigali'
})

const newToday = computed(() =>
  customers.value.filter(customer => {
    if (!customer.created_at) return false

    const date = String(customer.created_at).slice(0, 10)
    return date === today
  }).length
)

const filteredCustomers = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return customers.value

  return customers.value.filter(customer =>
    [
      customer.id,
      customer.name,
      customer.telephone,
      customer.id_card,
      customer.address
    ].some(value =>
      String(value ?? '').toLowerCase().includes(query)
    )
  )
})

function formatDate(value) {
  if (!value) return '—'

  const date = String(value).slice(0, 10)
  const parts = date.split('-')

  if (parts.length !== 3) return date

  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

async function fetchCustomers() {
  loading.value = true
  loadError.value = ''

  try {
    const response = await axios.get(API_URL)

    customers.value = Array.isArray(response.data)
      ? response.data
      : response.data.customers || []
  } catch (error) {
    loadError.value =
      error.response?.data?.message ||
      'Could not load customers. Check your backend connection.'
  } finally {
    loading.value = false
  }
}

async function addCustomer() {
  message.value = ''
  isError.value = false

  const idCard = Number(form.value.id_card)

  if (
    !Number.isSafeInteger(idCard) ||
    idCard <= 0
  ) {
    message.value = 'Enter a valid positive ID card number.'
    isError.value = true
    return
  }

  saving.value = true

  try {
    await axios.post(API_URL, {
      ...form.value,
      id_card: idCard
    })

    message.value = 'Customer registered successfully.'
    showForm.value = false
    form.value = emptyForm()

    await fetchCustomers()
  } catch (error) {
    message.value =
      error.response?.data?.message ||
      'Failed to register customer. Please try again.'
    isError.value = true
  } finally {
    saving.value = false
  }
}

function resetForm() {
  form.value = emptyForm()
}

onMounted(fetchCustomers)
</script>