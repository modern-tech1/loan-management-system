
<template>
  <div class="min-h-screen bg-slate-50">

    <!-- TOP NAVBAR -->
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="flex h-20 items-center justify-between px-5 md:px-8">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-200">
            <Landmark :size="24" />
          </div>

          <div>
            <h1 class="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
              Loan Management
            </h1>
            <p class="text-xs font-medium text-slate-500">
              Financial Overview
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 md:gap-5">
          <div class="hidden text-right sm:block">
            <p class="text-sm font-semibold text-slate-800">
              Shopkeeper
            </p>
            <p class="text-xs text-slate-500">
              Management Portal
            </p>
          </div>

          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 ring-4 ring-blue-50">
            SK
          </div>
        </div>
      </div>
    </header>

    <!-- DASHBOARD CONTENT -->
    <main class="mx-auto max-w-[1600px] p-4 md:p-8">

      <!-- WELCOME SECTION -->
      <section class="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p class="mb-2 text-sm font-semibold text-blue-700">
            BUSINESS OVERVIEW
          </p>

          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Dashboard
          </h2>

          <p class="mt-2 text-sm text-slate-500 md:text-base">
            Monitor your customers, loans, balances, and payments in one place.
          </p>
        </div>

        <button
          @click="loadDashboard"
          :disabled="loading"
          class="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50 md:self-auto"
        >
          <RefreshCw :size="17" :class="{ 'animate-spin': loading }" />
          {{ loading ? 'Refreshing...' : 'Refresh Data' }}
        </button>
      </section>

      <!-- ERROR MESSAGE -->
      <div
        v-if="errorMessage"
        class="mb-6 flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center"
      >
        <p>{{ errorMessage }}</p>
        <button
          @click="loadDashboard"
          class="self-start font-bold underline sm:self-auto"
        >
          Try again
        </button>
      </div>

      <!-- SUMMARY CARDS -->
      <section class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Customers -->
        <div class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Customers
              </p>
              <h3 class="mt-4 text-3xl font-extrabold text-slate-900">
                {{ loading ? '—' : stats.customers.toLocaleString() }}
              </h3>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Users :size="24" />
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">
            <RouterLink
              to="/customers"
              class="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View customers <ArrowUpRight :size="16" />
            </RouterLink>
          </div>
        </div>

        <!-- Loans -->
        <div class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">
                Total Loans
              </p>
              <h3 class="mt-4 text-3xl font-extrabold text-slate-900">
                {{ loading ? '—' : stats.loans.toLocaleString() }}
              </h3>
            </div>

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Wallet :size="24" />
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">
            <RouterLink
              to="/loans"
              class="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              Manage loans <ArrowUpRight :size="16" />
            </RouterLink>
          </div>
        </div>

        <!-- Outstanding -->
        <div class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div class="flex items-start justify-between">
            <div class="min-w-0">
              <p class="text-sm font-medium text-slate-500">
                Outstanding Balance
              </p>
              <h3 class="mt-4 break-words text-2xl font-extrabold text-amber-600">
                {{ loading ? '—' : money(stats.outstanding) }}
              </h3>
            </div>

            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Clock3 :size="24" />
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">
            <RouterLink
              to="/loans"
              class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              Review balances <ArrowUpRight :size="16" />
            </RouterLink>
          </div>
        </div>

        <!-- Payments -->
        <div class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div class="flex items-start justify-between">
            <div class="min-w-0">
              <p class="text-sm font-medium text-slate-500">
                Payments Received
              </p>
              <h3 class="mt-4 break-words text-2xl font-extrabold text-emerald-600">
                {{ loading ? '—' : money(stats.payments) }}
              </h3>
            </div>

            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CircleDollarSign :size="24" />
            </div>
          </div>

          <div class="mt-6 border-t border-slate-100 pt-4">
            <RouterLink
              to="/payments"
              class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              View payments <ArrowUpRight :size="16" />
            </RouterLink>
          </div>
        </div>

      </section>

      <!-- QUICK ACTIONS -->
      <section class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 px-6 py-5 md:px-7">
          <h3 class="text-lg font-bold text-slate-900">
            Quick Actions
          </h3>
          <p class="mt-1 text-sm text-slate-500">
            Common tasks to keep your business running smoothly.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 md:p-7">

          <RouterLink
            to="/addcustomers"
            class="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
              <UserPlus :size="23" />
            </div>

            <div class="min-w-0 flex-1">
              <p class="font-bold text-slate-800">Add Customer</p>
              <p class="mt-1 text-xs text-slate-500">
                Register a new customer
              </p>
            </div>

            <ArrowRight :size="18" class="text-slate-400" />
          </RouterLink>

          <RouterLink
            to="/loans"
            class="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
              <Wallet :size="23" />
            </div>

            <div class="min-w-0 flex-1">
              <p class="font-bold text-slate-800">Manage Loans</p>
              <p class="mt-1 text-xs text-slate-500">
                Review loan records
              </p>
            </div>

            <ArrowRight :size="18" class="text-slate-400" />
          </RouterLink>

          <RouterLink
            to="/payments"
            class="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
              <CreditCard :size="23" />
            </div>

            <div class="min-w-0 flex-1">
              <p class="font-bold text-slate-800">Record Payment</p>
              <p class="mt-1 text-xs text-slate-500">
                Record customer repayment
              </p>
            </div>

            <ArrowRight :size="18" class="text-slate-400" />
          </RouterLink>

        </div>
      </section>

      <!-- RECENT CUSTOMERS -->
      <section class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div class="flex flex-col justify-between gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center md:px-7">
          <div>
            <h3 class="text-lg font-bold text-slate-900">
              Recent Customers
            </h3>
            <p class="mt-1 text-sm text-slate-500">
              The latest customers registered in your system.
            </p>
          </div>

          <RouterLink
            to="/customers"
            class="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:self-auto"
          >
            View all customers <ArrowRight :size="16" />
          </RouterLink>
        </div>

        <div v-if="loading && customers.length === 0" class="p-10 text-center text-slate-500">
          Loading customer records...
        </div>

        <div v-else-if="errorMessage && customers.length === 0" class="p-10 text-center text-slate-500">
          Customer information is currently unavailable.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th class="px-6 py-4 font-semibold">Customer</th>
                <th class="px-6 py-4 font-semibold">Telephone</th>
                <th class="px-6 py-4 font-semibold">Address</th>
                <th class="px-6 py-4 font-semibold">Customer ID</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="customer in customers"
                :key="customer.id"
                class="transition hover:bg-slate-50"
              >
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                      {{ initials(customer.name) }}
                    </div>

                    <span class="font-semibold text-slate-800">
                      {{ customer.name }}
                    </span>
                  </div>
                </td>

                <td class="whitespace-nowrap px-6 py-4 text-slate-600">
                  {{ customer.telephone }}
                </td>

                <td class="px-6 py-4 text-slate-600">
                  {{ customer.address || '—' }}
                </td>

                <td class="whitespace-nowrap px-6 py-4">
                  <span class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                    #{{ customer.id }}
                  </span>
                </td>
              </tr>

              <tr v-if="customers.length === 0">
                <td colspan="4" class="px-6 py-12 text-center">
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Users :size="24" />
                  </div>
                  <p class="mt-3 font-semibold text-slate-700">
                    No customers found
                  </p>
                  <p class="mt-1 text-sm text-slate-500">
                    Register your first customer to see records here.
                  </p>
                  <RouterLink
                    to="/addcustomers"
                    class="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Add Customer
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p class="text-xs text-slate-500">
            Showing {{ customers.length }} recent customer(s)
          </p>

          <span class="flex items-center gap-2 text-xs font-medium text-emerald-700">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            Dashboard overview
          </span>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="py-8 text-center text-xs text-slate-400">
        © {{ new Date().getFullYear() }} Loan Management System.
        All rights reserved.
      </footer>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import {
  Landmark,
  Users,
  Wallet,
  Clock3,
  CircleDollarSign,
  UserPlus,
  CreditCard,
  ArrowRight,
  ArrowUpRight,
  RefreshCw
} from 'lucide-vue-next'

const stats = ref({
  customers: 0,
  loans: 0,
  outstanding: 0,
  payments: 0
})

const customers = ref([])
const loading = ref(false)
const errorMessage = ref('')

const money = (amount) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(Number(amount) || 0)

function initials(name) {
  return String(name || 'Customer')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}

async function loadDashboard() {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(
      'http://localhost:3000/dashboard'
    )

    const data = response.data

    stats.value = {
      customers: Number(data.stats?.customers) || 0,
      loans: Number(data.stats?.loans) || 0,
      outstanding: Number(data.stats?.outstanding) || 0,
      payments: Number(data.stats?.payments) || 0
    }

    customers.value = Array.isArray(data.customers)
      ? data.customers.slice(0, 10)
      : []
  } catch (error) {
    console.error('Could not load dashboard:', error)

    errorMessage.value =
      error.response?.data?.message ||
      'Unable to load dashboard data. Check that your backend and MySQL database are running.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>