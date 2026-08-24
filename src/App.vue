<template>
  <div class="flex min-h-screen bg-gray-100">

    <!-- Sidebar -->
    <nav class="min-h-screen w-64 bg-gray-800 px-6 py-8 shadow-lg">

      <!-- Logo / Title -->
      <h1 class="mb-10 text-2xl font-bold text-blue-500">
        ADMIN DASHBOARD
      </h1>

      <!-- Navigation Links -->
      <div class="flex flex-col gap-3">

        <RouterLink
          to="/admin"
          class="rounded-lg px-4 py-3 text-gray-300 transition duration-200 hover:bg-blue-600 hover:text-white"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/players"
          class="rounded-lg px-4 py-3 text-gray-300 transition duration-200 hover:bg-blue-600 hover:text-white"
        >
          Players
        </RouterLink>

        <RouterLink
          to="/payment"
          class="rounded-lg px-4 py-3 text-gray-300 transition duration-200 hover:bg-blue-600 hover:text-white"
        >
          Payment
        </RouterLink>

      </div>

    </nav>


    <!-- Main Content -->
    <div class="flex flex-1 flex-col">

      <!-- Navbar -->
      <Navbar />

      <!-- Page Content -->
      <main class="flex-1 p-8">
        <RouterView />
      </main>

    </div>

  </div>
</template>