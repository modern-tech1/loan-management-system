
<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
    ></div>

    <!-- SIDEBAR -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Brand -->
      <div class="flex h-24 items-center justify-between border-b border-white/10 px-6">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Landmark :size="27" />
          </div>

          <div>
            <h1 class="text-base font-extrabold tracking-wide">
              LOAN<span class="text-blue-400">FLOW</span>
            </h1>
            <p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Management System
            </p>
          </div>
        </div>

        <button
          @click="sidebarOpen = false"
          class="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          aria-label="Close navigation"
        >
          <X :size="21" />
        </button>
      </div>

      <!-- Navigation label -->
      <div class="px-6 pb-3 pt-8">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
        <RouterLink
          to="/"
          @click="closeSidebar"
          :class="navClass('/')"
        >
          <LayoutDashboard :size="20" />
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/customers"
          @click="closeSidebar"
          :class="navClass('/customers')"
        >
          <Users :size="20" />
          <span>Customers</span>
        </RouterLink>

        <RouterLink
          to="/addcustomers"
          @click="closeSidebar"
          :class="navClass('/addcustomers')"
        >
          <UserPlus :size="20" />
          <span>Add Customer</span>
        </RouterLink>

        <RouterLink
          to="/loans"
          @click="closeSidebar"
          :class="navClass('/loans')"
        >
          <Banknote :size="20" />
          <span>Loans</span>
        </RouterLink>

        <RouterLink
          to="/payments"
          @click="closeSidebar"
          :class="navClass('/payments')"
        >
          <CreditCard :size="20" />
          <span>Payments</span>
        </RouterLink>

        <!-- System section -->
        <div class="px-3 pb-2 pt-8">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            System
          </p>
        </div>

        <button
          @click="logout"
          class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut :size="20" />
          <span>Logout</span>
        </button>
      </nav>

      <!-- Sidebar footer -->
      <div class="border-t border-white/10 p-4">
        <div class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
            LM
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-white">
              Loan Administrator
            </p>
            <p class="mt-1 text-xs text-slate-400">
              Management Portal
            </p>
          </div>

          <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
        </div>
      </div>
    </aside>

    <!-- MAIN AREA -->
    <div class="min-h-screen lg:pl-72">

      <!-- TOP HEADER -->
      <header class="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:px-8">

        <div class="flex items-center gap-3">
          <button
            @click="sidebarOpen = true"
            class="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation"
          >
            <Menu :size="22" />
          </button>

          <div>
            <h2 class="text-lg font-bold text-slate-800 md:text-xl">
              {{ pageTitle }}
            </h2>
            <p class="hidden text-xs text-slate-500 sm:block">
              Loan management and financial operations
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden text-right sm:block">
            <p class="text-sm font-semibold text-slate-800">
              Administrator
            </p>
            <p class="text-xs text-slate-500">
              Loan Management
            </p>
          </div>

          <div class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-100 bg-blue-50 font-bold text-blue-700">
            AD
          </div>
        </div>
      </header>

      <!-- PAGE CONTENT -->
      <main class="min-h-[calc(100vh-5rem)] p-4 md:p-8">
        <div class="mx-auto w-full max-w-[1600px]">
          <RouterView />
        </div>

        <!-- Footer -->
        <footer class="mx-auto mt-10 max-w-[1600px] border-t border-slate-200 py-5 text-center text-xs text-slate-500 md:text-left">
          © {{ new Date().getFullYear() }} LoanFlow Management System.
          All rights reserved.
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  LayoutDashboard,
  Users,
  UserPlus,
  Banknote,
  CreditCard,
  Landmark,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)

const pageTitles = {
  '/': 'Dashboard',
  '/customers': 'Customer Management',
  '/addcustomers': 'Register Customer',
  '/loans': 'Loan Management',
  '/payments': 'Payment Management'
}

const pageTitle = computed(() => {
  return pageTitles[route.path] || 'Loan Management System'
})

function navClass(path) {
  const active = path === '/'
    ? route.path === '/'
    : route.path === path || route.path.startsWith(path + '/')

  return [
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
    active
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
      : 'text-slate-400 hover:bg-white/10 hover:text-white'
  ]
}

function closeSidebar() {
  sidebarOpen.value = false
}

function logout() {
  // Connect this to your authentication system.
  // Remove the stored login token here if your app uses one.
  router.push('/login')
}
</script>