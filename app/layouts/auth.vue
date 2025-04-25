<script lang="ts" setup></script>

<template>
  <div class="relative size-full">
    <div class="grid sm:grid-cols-3 size-full">
      <div class="bg-primary-200 flex flex-col items-center justify-center">
        <AuthLogin class="w-full text-primary-content" />
      </div>
      <div
        class="sm:flex hidden bg-base-100 col-span-2 flex-col justify-between p-8"
      >
        <Text class="text-primary" type="subtitle" variant="bold">
          Twilight
        </Text>
        <Text type="quote">
          We all know, people tend to fix things rather than prevent them.
          <br />
          <Text variant="bold"> But it's time to change that.</Text>
        </Text>
      </div>
    </div>
  </div>
  <slot />
</template>
