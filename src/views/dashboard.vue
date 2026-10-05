
<template>
  <div class="min-h-screen bg-slate-100">

    <!-- Top Navbar -->
    <header
      class="flex items-center justify-between bg-white px-6 py-4 shadow-sm"
    >
      <h1 class="text-xl font-bold text-blue-900">
        Loan Management System
      </h1>

      <div class="text-sm font-medium text-slate-600">
        Shopkeeper
      </div>
    </header>

    <div class="flex">

      <!-- Sidebar -->
      

      <!-- Main Dashboard -->
      <main class="min-w-0 flex-1 p-5 md:p-8">

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-slate-800">
            Dashboard
          </h2>

          <p class="mt-2 text-slate-500">
            Welcome back! Here is your business overview.
          </p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm text-slate-500">Total Customers</p>
            <h3 class="mt-3 text-3xl font-bold text-blue-600">
              {{ stats.customers }}
            </h3>
            <RouterLink
              to="/customers"
              class="mt-4 inline-block text-sm text-blue-600"
            >
              View customers →
            </RouterLink>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm text-slate-500">Total Loans</p>
            <h3 class="mt-3 text-3xl font-bold text-purple-600">
              {{ stats.loans }}
            </h3>
            <RouterLink
              to="/loans"
              class="mt-4 inline-block text-sm text-blue-600"
            >
              View loans →
            </RouterLink>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm text-slate-500">Outstanding Balance</p>
            <h3 class="mt-3 text-2xl font-bold text-orange-600">
              {{ money(stats.outstanding) }}
            </h3>
            <p class="mt-4 text-sm text-slate-400">
              Amount still owed
            </p>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p class="text-sm text-slate-500">Payments Received</p>
            <h3 class="mt-3 text-2xl font-bold text-green-600">
              {{ money(stats.payments) }}
            </h3>
            <RouterLink
              to="/payments"
              class="mt-4 inline-block text-sm text-blue-600"
            >
              View payments →
            </RouterLink>
          </div>

        </div>

        <!-- Quick Actions -->
        <section class="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h3 class="mb-4 text-lg font-bold text-slate-800">
            Quick Actions
          </h3>

          <div class="flex flex-wrap gap-3">
            <RouterLink
              to="/addcustomers"
              class="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              + Add Customer
            </RouterLink>

            <RouterLink
              to="/loans"
              class="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
            >
              Manage Loans
            </RouterLink>

            <RouterLink
              to="/payments"
              class="rounded-lg bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-700"
            >
              Record Payment
            </RouterLink>
          </div>
        </section>

        <!-- Recent Customers -->
        <section class="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div class="flex items-center justify-between border-b p-6">
            <h3 class="text-lg font-bold text-slate-800">
              Recent Customers
            </h3>

            <RouterLink
              to="/customers"
              class="text-sm font-medium text-blue-600"
            >
              View all →
            </RouterLink>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-600">
                <tr>
                  <th class="p-4">ID</th>
                  <th class="p-4">Customer</th>
                  <th class="p-4">Telephone</th>
                  <th class="p-4">Address</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="customer in customers"
                  :key="customer.id"
                  class="border-t hover:bg-slate-50"
                >
                  <td class="p-4">{{ customer.id }}</td>
                  <td class="p-4 font-medium">{{ customer.name }}</td>
                  <td class="p-4">{{ customer.telephone }}</td>
                  <td class="p-4">{{ customer.address }}</td>
                </tr>

                <tr v-if="customers.length === 0">
                  <td colspan="4" class="p-8 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stats = ref({
  customers: 0,
  loans: 0,
  outstanding: 0,
  payments: 0
})

const customers = ref([])

const money = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(Number(amount) || 0)

onMounted(async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/dashboard'
    )

    stats.value = response.data.stats
    customers.value = response.data.customers
  } catch (error) {
    console.error('Could not load dashboard:', error)
  }
})
</script>