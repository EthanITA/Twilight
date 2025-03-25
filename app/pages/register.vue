<script lang="ts" setup>
definePageMeta({ auth: { enabled: false }, layout: "auth" });
</script>

<template>
  <div class="flex flex-col mx-auto my-auto justify-center items-center">
    <u-card class="max-w-md border-none shadow-none">
      <template #header>
        <h3 class="text-lg md:text-xl">Register</h3>
        <p class="text-xs md:text-sm">
          Enter your information to create an account
        </p>
      </template>
      <template #default>
        <AuthRegister />
        <u-separator class="my-6" label="OR" />
        <AuthGoogle />
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink class="underline" to="/login"> Login</NuxtLink>
        </div>
      </template>
    </u-card>
  </div>
</template>
