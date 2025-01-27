<script lang="ts" setup>
import {Check, LoaderCircle} from "lucide-vue-next";

const status = useStatus();
</script>

<template>
  <UApp>
    <div class="flex flex-col size-full">
      <div class="size-full flex">
        <Sidebar />
        <main class="flex-1 bg-base-200">
          <NuxtPage />
        </main>
      </div>
      <div class="border-t bg-base-100 h-6 flex justify-between px-2 py-0.5">
        <span></span>
        <span>
          <UTooltip v-if="status.bgLoading" delay-duration="0"  text="Saving..." >
            <LoaderCircle  class="size-full animate-spin" />
          </UTooltip>
          <UTooltip v-else delay-duration="0"  text="Saved" >
            <Check  class="size-full" />
          </UTooltip>
        </span>
      </div>
    </div>
  </UApp>
</template>
