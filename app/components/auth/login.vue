<script lang="ts" setup>
const auth = useAuth();

const { refresh: login, isPending } = useAction(async () => {
  const { error } = await auth.login.google();
  if (error) {
    // TODO
    throw error;
  } else navigateTo("/");
});
</script>

<template>
  <Card
    class="bg-base-100 shadow-md shadow-primary-200 border-primary-100"
    variant="border"
  >
    <template #header>
      <Text class="text-primary-400" type="heading">Welcome Back!</Text>
    </template>
    <template #footer>
      <ButtonGoogle :loading="isPending" @click="login" />
    </template>
  </Card>
</template>
