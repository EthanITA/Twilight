<script lang="ts" setup>
definePageMeta({ auth: { enabled: false }, layout: "auth" });
</script>

<template>
  <div class="flex flex-col mx-auto my-auto justify-center items-center">
    <u-card class="max-w-md border-none shadow-none">
      <template #header>
        <h2 class="text-lg md:text-xl">Accedi</h2>
        <p class="text-xs md:text-sm">
          Inserisci la tua email per accedere al tuo account
        </p>
      </template>
      <template #default>
        <AuthLogin />
        <div class="mt-4 text-center text-sm">
          Non hai un account?
          <NuxtLink class="underline" to="/register"> Registrati</NuxtLink>
        </div>
      </template>
    </u-card>
  </div>
</template>
