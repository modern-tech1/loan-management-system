```vue
<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8">
    <!-- Page Header -->
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Payments</h1>
        <p class="mt-2 text-gray-500">
          Record and manage customer loan payments.
        </p>
      </div>

      <button
        @click="showForm = !showForm"
        class="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
      >
        {{ showForm ? 'Cancel' : '+ Record Payment' }}
      </button>
    </div>

    <!-- Notifications -->
    <div
      v-if="message"
      class="mb-5 rounded-lg p-4"
      :class="isError
        ? 'bg-red-100 text-red-700'
        : 'bg-green-100 text-green-700'"
    >
      {{ message }}
    </div>

    <!-- Summary Cards -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div class="rounded-xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Total Payments</p>
        <h2 class="mt-3 text-3xl font-bold text-blue-600">
          {{ payments.length }}
        </h2>
      </div>

      <div class="rounded-xl bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">Total Amount Received</p>
        <h2 class="mt-3 text-3xl font-bold text-green-600">
          {{ formatMoney(totalAmount) }}
        </h2>
      </div>
    </div>

    <!-- Record Payment Form -->
    <div v-if="showForm" class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-6 text-xl font-bold text-gray-800">
        Record New Payment
      </h2>

      <form @submit.prevent="addPayment" class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Loan ID *
          </label>
          <input
            v-model.number="form.loan_id"
            type="number"
            min="1"
            required
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter loan ID"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Payment Amount *
          </label>
          <input
            v-model="form.amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Payment Date *
          </label>
          <input
            v-model="form.payment_date"
            type="date"
            required
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Payment Method *
          </label>
          <select
            v-model="form.payment_method"
            required
            class="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="cash">Cash</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="bank">Bank</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Reference Number
          </label>
          <input
            v-model="form.reference"
            type="text"
            maxlength="100"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            placeholder="Transaction reference (optional)"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700">
            Notes
          </label>
          <input
            v-model="form.notes"
            type="text"
            maxlength="255"
            class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            placeholder="Additional information"
          />
        </div>

        <div class="flex gap-3 md:col-span-2">
          <button
            type="submit"
            :disabled="saving"
            class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save Payment' }}
          </button>

          <button
            type="button"
            @click="resetForm"
            class="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </form>
    </div>

    <!-- Search -->
    <div class="mb-5 rounded-xl bg-white p-4 shadow-sm">
      <input
        v-model="search"
        type="text"
        placeholder="Search by payment ID, loan ID, or reference..."
        class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
      />
    </div>

    <!-- Payments Table -->
    <div class="overflow-hidden rounded-xl bg-white shadow-sm">
      <div class="border-b p-5">
        <h2 class="text-xl font-bold text-gray-800">Payment History</h2>
      </div>

      <div v-if="loading" class="p-8 text-center text-gray-500">
        Loading payments...
      </div>

      <div v-else-if="loadError" class="p-8 text-center text-red-600">
        {{ loadError }}
        <button
          @click="fetchPayments"
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
              <th class="whitespace-nowrap px-5 py-4">Loan ID</th>
              <th class="whitespace-nowrap px-5 py-4">Amount</th>
              <th class="whitespace-nowrap px-5 py-4">Date</th>
              <th class="whitespace-nowrap px-5 py-4">Method</th>
              <th class="whitespace-nowrap px-5 py-4">Reference</th>
              <th class="whitespace-nowrap px-5 py-4">Notes</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="payment in filteredPayments"
              :key="payment.id"
              class="hover:bg-blue-50"
            >
              <td class="px-5 py-4 font-semibold text-gray-800">
                {{ payment.id }}
              </td>
              <td class="px-5 py-4">
                #{{ payment.loan_id }}
              </td>
              <td class="whitespace-nowrap px-5 py-4 font-semibold text-green-700">
                {{ formatMoney(payment.amount) }}
              </td>
              <td class="whitespace-nowrap px-5 py-4">
                {{ formatDate(payment.payment_date) }}
              </td>
              <td class="whitespace-nowrap px-5 py-4">
                <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {{ methodLabel(payment.payment_method) }}
                </span>
              </td>
              <td class="px-5 py-4">
                {{ payment.reference || '—' }}
              </td>
              <td class="px-5 py-4">
                {{ payment.notes || '—' }}
              </td>
            </tr>

            <tr v-if="filteredPayments.length === 0">
              <td colspan="7" class="px-5 py-10 text-center text-gray-500">
                No payments found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t p-4 text-sm text-gray-500">
        Showing {{ filteredPayments.length }} payment(s)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/payments'

const payments = ref([])
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const search = ref('')
const message = ref('')
const isError = ref(false)
const loadError = ref('')

function today() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function emptyForm() {
  return {
    loan_id: '',
    amount: '',
    payment_date: today(),
    payment_method: 'cash',
    reference: '',
    notes: ''
  }
}

const form = ref(emptyForm())

const totalAmount = computed(() =>
  payments.value.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  )
)

const filteredPayments = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) return payments.value

  return payments.value.filter(payment =>
    [
      payment.id,
      payment.loan_id,
      payment.reference
    ].some(value =>
      String(value ?? '').toLowerCase().includes(query)
    )
  )
})

function formatMoney(amount) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 2
  }).format(Number(amount || 0))
}

function formatDate(date) {
  if (!date) return '—'

  // Avoid timezone changes when the API returns YYYY-MM-DD.
  const value = String(date).slice(0, 10)
  const parts = value.split('-')

  if (parts.length !== 3) return value

  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

function methodLabel(method) {
  const labels = {
    cash: 'Cash',
    mobile_money: 'Mobile Money',
    bank: 'Bank'
  }

  return labels[method] || method || 'Cash'
}

async function fetchPayments() {
  loading.value = true
  loadError.value = ''

  try {
    const response = await axios.get(API_URL)

    // Supports either an array or { payments: [...] }.
    payments.value = Array.isArray(response.data)
      ? response.data
      : response.data.payments || []
  } catch (error) {
    loadError.value =
      error.response?.data?.message ||
      'Could not load payments. Check that the backend is running.'
  } finally {
    loading.value = false
  }
}

async function addPayment() {
  message.value = ''
  isError.value = false

  const loanId = Number(form.value.loan_id)
  const amount = Number(form.value.amount)

  if (!Number.isInteger(loanId) || loanId <= 0) {
    message.value = 'Enter a valid loan ID.'
    isError.value = true
    return
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    message.value = 'Payment amount must be greater than zero.'
    isError.value = true
    return
  }

  saving.value = true

  try {
    await axios.post(API_URL, {
      ...form.value,
      loan_id: loanId,
      amount
    })

    message.value = 'Payment recorded successfully.'
    showForm.value = false
    form.value = emptyForm()

    await fetchPayments()
  } catch (error) {
    message.value =
      error.response?.data?.message ||
      'Failed to record payment. Check the loan ID and backend API.'
    isError.value = true
  } finally {
    saving.value = false
  }
}

function resetForm() {
  form.value = emptyForm()
}

onMounted(fetchPayments)
</script>
```
