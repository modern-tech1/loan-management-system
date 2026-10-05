```vue
<template>
  <div class="min-h-screen flex bg-gray-100">

    <!-- SIDEBAR -->
    <aside class="w-64 min-h-screen bg-gray-800 text-white p-5">

      <!-- LOGO / TITLE -->
      <h4 class="text-white font-bold text-lg mb-8">
        LOAN MANAGEMENT SYSTEM
      </h4>

      <!-- NAVIGATION -->
      <nav class="flex flex-col gap-3">

        <!-- Dashboard -->
        <RouterLink
          to="/"
          class="flex items-center gap-3 hover:bg-gray-700 p-3 rounded"
        >
          <LayoutDashboard :size="22" />
          <span>Dashboard</span>
        </RouterLink>

        <!-- Customers -->
        <RouterLink
          to="/customers"
          class="flex items-center gap-3 hover:bg-gray-700 p-3 rounded"
        >
          <Users :size="22" />
          <span>Customer</span>
        </RouterLink>

        <!-- Add Customer -->
        <RouterLink
          to="/addcustomers"
          class="flex items-center gap-3 hover:bg-gray-700 p-3 rounded"
        >
          <UserPlus :size="22" />
          <span>Add Customer</span>
        </RouterLink>

        <!-- Loans -->
        <RouterLink
          to="/loans"
          class="flex items-center gap-3 hover:bg-gray-700 p-3 rounded"
        >
          <Banknote :size="22" />
          <span>Loans</span>
        </RouterLink>

        <!-- Payments -->
        <RouterLink
          to="/payments"
          class="flex items-center gap-3 hover:bg-gray-700 p-3 rounded"
        >
          <CreditCard :size="22" />
          <span>Payment</span>
        </RouterLink>

        <!-- Logout -->
        <RouterLink
          to="/logout"
          class="mt-5 p-3 rounded hover:bg-gray-700"
        >
          Logout
        </RouterLink>

      </nav>

    </aside>


    <!-- MAIN CONTENT -->
    <main class="flex-1 min-h-screen bg-gray-100 p-6">

      <!-- Child pages appear here -->
      <RouterView />

    </main>

  </div>
</template>



<script setup>
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Banknote,
  CreditCard
} from "lucide-vue-next";
</script>
```
