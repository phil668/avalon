<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')

const router = useRouter()

const handleSubmit = () => {
  console.log('email:', email.value)
  console.log('password:', password.value)
}

const handleRegister = () => {
  router.push({ path: '/register' })
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-[rgb(4,22,34)]">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center text-white">登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-300">邮箱</label>
          <input type="email" id="email" v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-300">密码</label>
          <input type="password" id="password" v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            required />
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          登录
        </button>
        <div class="mt-4 text-center">
          <span class="text-gray-300">还没有账号？</span>
          <a href="/register" class="text-indigo-500 hover:underline" @click="handleRegister">注册</a>
        </div>
      </form>
    </div>
  </div>
</template>
