<template>
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
  
        <div class="flex items-center justify-between h-20">

  
  
          <!-- Desktop Navigation -->
  
            <RouterLink
              to="/"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
              >
              ADMIN
            </RouterLink>
  
            <RouterLink
              to="/players"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              PLAYERS
            </RouterLink>
  
            <RouterLink
              to="/payment"
              class="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              PAYMENT
            </RouterLink>
          </div>
      </div>
    </nav>
  </template>