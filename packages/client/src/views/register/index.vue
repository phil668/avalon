<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  console.log('email:', email.value)
  console.log('password:', password.value)
  console.log('confirmPassword:', confirmPassword.value)
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-[rgb(4,22,34)]">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center text-white">注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-300">邮箱</label>
          <input type="email" id="email" v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            required />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-300">密码</label>
          <input type="password" id="password" v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300">确认密码</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword"
            class="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            required />
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          注册并登录
        </button>
      </form>
    </div>
  </div>
</template>
