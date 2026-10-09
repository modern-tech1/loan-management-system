
<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-8">
    <div class="mx-auto max-w-7xl">

      <!-- Page heading -->
      <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Loans Management</h1>
          <p class="mt-2 text-slate-500">
            Manage customer loans, balances and repayment status.
          </p>
        </div>

        <button
          @click="showForm = !showForm"
          class="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {{ showForm ? 'Close Form' : '+ Add New Loan' }}
        </button>
      </div>

      <!-- Messages -->
      <div
        v-if="message"
        class="mb-5 rounded-lg bg-blue-50 p-4 text-blue-800"
      >
        {{ message }}
      </div>

      <!-- Summary cards -->
      <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">Total Loans</p>
          <h2 class="mt-3 text-3xl font-bold text-blue-600">
            {{ loans.length }}
          </h2>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">Total Principal</p>
          <h2 class="mt-3 text-2xl font-bold text-purple-600">
            {{ money(totalPrincipal) }}
          </h2>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">Outstanding Balance</p>
          <h2 class="mt-3 text-2xl font-bold text-orange-600">
            {{ money(totalBalance) }}
          </h2>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">Overdue Loans</p>
          <h2 class="mt-3 text-3xl font-bold text-red-600">
            {{ overdueCount }}
          </h2>
        </div>
      </div>

      <!-- Add loan form -->
      <section
        v-if="showForm"
        class="mb-8 rounded-xl bg-white p-6 shadow-sm"
      >
        <h2 class="mb-5 text-xl font-bold text-slate-800">
          Register New Loan
        </h2>

        <form @submit.prevent="addLoan" class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium">Customer</label>    A
            <select
              v-model="form.customer_id"
              required
              class="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="">Select customer</option>
              <option
                v-for="customer in customerOptions"
                :key="customer.id"
                :value="String(customer.id)"
              >
                {{ customer.name }} (ID: {{ customer.id }})
              </option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Product</label>
            <input
              v-model.trim="form.product"
              required
              maxlength="150"
              placeholder="e.g. Phone, Laptop"
              class="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Principal Amount (RWF)</label>
            <input
              v-model.number="form.principal"
              type="number"
              min="0.01"
              step="0.01"
              required
              class="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Interest Rate (%)</label>
            <input
              v-model.number="form.interest_rate"
              type="number"
              min="0"
              max="999.99"
              step="0.01"
              required
              class="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Total Amount Due (RWF)</label>
            <input
              v-model.number="form.total_amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              class="w-full rounded-lg border border-slate-300 p-3"
            />
            <p class="mt-1 text-xs text-slate-500">
              Enter the agreed repayment amount, including interest.
            </p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Loan Date</label>
            <input
              v-model="form.loan_date"
              type="date"
              required
              class="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Due Date (optional)</label>
            <input
              v-model="form.due_date"
              type="date"
              class="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div class="flex items-end">
            <button
              type="submit"
              :disabled="saving"
              class="w-full rounded-lg bg-green-600 p-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save Loan' }}
            </button>
          </div>
        </form>
      </section>

      <!-- Search and filter -->
      <section class="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            v-model="search"
            placeholder="Search customer, product or loan ID..."
            class="rounded-lg border border-slate-300 p-3"
          />

          <select
            v-model="statusFilter"
            class="rounded-lg border border-slate-300 p-3"
          >
            <option value="">All loan statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </section>

      <!-- Loans table -->
      <section class="overflow-hidden rounded-xl bg-white shadow-sm">
        <div class="border-b p-5">
          <h2 class="text-lg font-bold text-slate-800">All Loans</h2>
          <p class="mt-1 text-sm text-slate-500">
            {{ filteredLoans.length }} loan(s) displayed
          </p>
        </div>

        <div v-if="loading" class="p-10 text-center text-slate-500">
          Loading loans...
        </div>

        <div v-else-if="error" class="p-8 text-center text-red-600">
          {{ error }}
          <button @click="loadLoans" class="ml-2 underline">Retry</button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full whitespace-nowrap text-left text-sm">
            <thead class="bg-slate-50 text-slate-600">
              <tr>
                <th class="p-4">ID</th>
                <th class="p-4">Customer</th>
                <th class="p-4">Product</th>
                <th class="p-4">Principal</th>
                <th class="p-4">Total Due</th>
                <th class="p-4">Paid</th>
                <th class="p-4">Balance</th>
                <th class="p-4">Due Date</th>
                <th class="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="loan in filteredLoans"
                :key="loan.id"
                class="border-t hover:bg-slate-50"
              >
                <td class="p-4">{{ loan.id }}</td>
                <td class="p-4 font-medium text-slate-800">
                  {{ loan.customer_name || `Customer #${loan.customer_id}` }}
                </td>
                <td class="p-4">{{ loan.product }}</td>
                <td class="p-4">{{ money(loan.principal) }}</td>
                <td class="p-4">{{ money(loan.total_amount) }}</td>
                <td class="p-4 text-green-700">{{ money(loan.amount_paid) }}</td>
                <td class="p-4 font-semibold text-orange-700">
                  {{ money(loan.balance) }}
                </td>
                <td class="p-4">{{ formatDate(loan.due_date) }}</td>
                <td class="p-4">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="statusClass(loan.status)"
                  >
                    {{ loan.status }}
                  </span>
                </td>
              </tr>

              <tr v-if="filteredLoans.length === 0">
                <td colspan="9" class="p-10 text-center text-slate-500">
                  No loans match your search.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API = 'http://localhost:3000'

const loans = ref([])
const customerOptions = ref([])
const search = ref('')
const statusFilter = ref('')
const showForm = ref(false)
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const message = ref('')

const today = new Date()
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-')

const emptyForm = () => ({
  customer_id: '',
  product: '',
  principal: null,
  interest_rate: 0,
  total_amount: null,
  loan_date: localToday,
  due_date: ''
})

const form = ref(emptyForm())

const money = (value) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(Number(value) || 0)

const totalPrincipal = computed(() =>
  loans.value.reduce((sum, loan) => sum + Number(loan.principal || 0), 0)
)

const totalBalance = computed(() =>
  loans.value.reduce((sum, loan) => sum + Number(loan.balance || 0), 0)
)

const overdueCount = computed(() =>
  loans.value.filter(loan => loan.status === 'overdue').length
)

const filteredLoans = computed(() => {
  const term = search.value.trim().toLowerCase()

  return loans.value.filter(loan => {
    const matchesSearch = [
      loan.id,
      loan.customer_name,
      loan.customer_id,
      loan.product
    ].some(value => String(value ?? '').toLowerCase().includes(term))

    const matchesStatus =
      !statusFilter.value || loan.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

function statusClass(status) {
  return {
    active: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-700'
  }[status] || 'bg-slate-100 text-slate-700'
}

function formatDate(value) {
  if (!value) return '—'
  return String(value).slice(0, 10)
}

async function loadLoans() {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(`${API}/loans`)
    loans.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Could not load loans. Check your backend.'
  } finally {
    loading.value = false
  }
}

async function loadCustomers() {
  try {
    const response = await axios.get(`${API}/customers`)
    customerOptions.value = response.data
  } catch (err) {
    message.value = 'Could not load customers. Check your /customers endpoint.'
  }
}

async function addLoan() {
  message.value = ''

  if (
    !form.value.customer_id ||
    !form.value.product ||
    Number(form.value.principal) <= 0 ||
    Number(form.value.total_amount) <= 0 ||
    Number(form.value.interest_rate) < 0
  ) {
    message.value = 'Please enter valid loan details.'
    return
  }

  if (Number(form.value.total_amount) < Number(form.value.principal)) {
    message.value = 'Total amount due cannot be less than principal.'
    return
  }

  if (
    form.value.due_date &&
    form.value.due_date < form.value.loan_date
  ) {
    message.value = 'Due date cannot be earlier than loan date.'
    return
  }

  saving.value = true

  try {
    await axios.post(`${API}/loans`, {
      ...form.value,
      customer_id: Number(form.value.customer_id),
      due_date: form.value.due_date || null
    })

    message.value = 'Loan registered successfully.'
    form.value = emptyForm()
    showForm.value = false
    await loadLoans()
  } catch (err) {
    message.value = err.response?.data?.message || 'Could not save loan.'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadLoans()
  loadCustomers()
})
</script>