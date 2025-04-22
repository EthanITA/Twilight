<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";

defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <Button
    :loading
    class="text-black border-[#e5e5e5] hover:bg-[#F5F5F4] bg-white w-full"
  >
    <div class="flex items-center">
      <LoaderCircle v-if="loading" class="animate-spin" />
      <span v-else class="flex gap-2 items-center">
        <ImgGoogle />
        <span>Sign in with Google</span>
      </span>
    </div>
  </Button>
</template>
