
<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
    <div class="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

      <!-- Branding panel -->
      <div class="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white md:flex">
        <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div class="relative z-10">
          <div class="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <Landmark :size="30" />
          </div>

          <p class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Financial Management
          </p>

          <h1 class="text-4xl font-extrabold leading-tight">
            Manage your lending business with confidence.
          </h1>

          <p class="mt-5 leading-7 text-slate-400">
            Manage customers, track loans, record repayments, and monitor your business from one place.
          </p>
        </div>

        <div class="relative z-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          Secure access to your Loan Management System.
        </div>
      </div>

      <!-- Login form -->
      <div class="flex items-center justify-center p-6 sm:p-10 md:p-12">
        <div class="w-full max-w-md">

          <div class="mb-8 md:hidden">
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Landmark :size="26" />
            </div>
            <h1 class="text-2xl font-extrabold text-slate-900">
              Loan Management
            </h1>
          </div>

          <div class="mb-8">
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p class="mt-3 text-sm leading-6 text-slate-500">
              Sign in with your account to access your dashboard.
            </p>
          </div>

          <form @submit.prevent="login" class="space-y-5">

            <div>
              <label for="username" class="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>

              <div class="relative">
                <UserRound class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" :size="19" />

                <input
                  id="username"
                  v-model.trim="username"
                  type="text"
                  autocomplete="username"
                  required
                  maxlength="100"
                  placeholder="Enter your username"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label for="password" class="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div class="relative">
                <LockKeyhole class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" :size="19" />

                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  placeholder="Enter your password"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <EyeOff v-if="showPassword" :size="19" />
                  <Eye v-else :size="19" />
                </button>
              </div>
            </div>

            <div
              v-if="errorMessage"
              role="alert"
              class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LoaderCircle v-if="loading" class="animate-spin" :size="20" />
              {{ loading ? 'Signing in...' : 'Sign In' }}
              <ArrowRight v-if="!loading" :size="19" />
            </button>

          </form>

          <div class="mt-8 border-t border-slate-100 pt-5 text-center">
            <p class="text-xs leading-5 text-slate-400">
              Authorized users only. Keep your password private.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import {
  Landmark,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  LoaderCircle
} from 'lucide-vue-next'

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function login() {
  if (loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.post(
      'http://localhost:3000/login',
      {
        username: username.value,
        password: password.value
      }
    )

    const { token, user } = response.data

    if (!token || !user) {
      throw new Error('The server returned an invalid login response.')
    }

    // Basic token storage for this development example.
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))

    await router.replace('/')
  } catch (error) {
    errorMessage.value =
      error.response?.status === 401
        ? 'Incorrect username or password.'
        : error.response?.data?.message ||
          error.message ||
          'Unable to sign in. Check your backend connection.'
  } finally {
    loading.value = false
  }
}
</script>