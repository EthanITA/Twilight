<script lang="ts" setup></script>

<template>
  <div class="relative size-full">
    <div class="grid sm:grid-cols-2 size-full">
      <div
        class="col-span-1 flex flex-col items-center justify-center bg-base-100"
      >
        <AuthLogin class="w-full" />
      </div>
      <div class="bg-primary-100/80 flex flex-col justify-between p-8">
        <Text class="text-primary" type="subtitle" variant="bold">
          Twilight
        </Text>
        <Text class="text-primary-content" type="quote">
          As we all know, we tend to fix things rather than prevent them.
          <br />
          <span class="font-bold">But it's time to change that.</span>
        </Text>
      </div>
    </div>
  </div>
  <slot />
</template>
