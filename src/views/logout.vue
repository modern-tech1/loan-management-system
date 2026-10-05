<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')

  router.push('/login')
}
</script>