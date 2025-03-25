<script lang="ts" setup>
const auth = useAuth();

const email = ref("");
const password = ref("");

const toast = useToast();

const { refresh } = useApi(
  async () => {
    const { error } = await auth.login.email({
      email: email.value,
      password: password.value,
    });
    if (error) {
      toast.add({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
      throw error;
    } else navigateTo("/");
  },
  undefined,
  { immediate: false },
);

const login = () => {
  if (!email.value || !password.value) return;
  refresh();
};
</script>

<template>
  <div class="space-y-4" @keydown.enter="login">
    <div class="space-y-2">
      <div class="space-y-1">
        <Label for="email">Email</Label>
        <Input
          id="email"
          v-model="email"
          autocomplete="email"
          placeholder="example@domain.com"
          required
          type="email"
        />
      </div>
      <div class="space-y-1">
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="password"
          autocomplete="current-password"
          placeholder="password"
          required
          type="password"
        />
      </div>
    </div>

    <Button
      :disabled="!email || !password"
      class="w-full btn btn-primary"
      type="submit"
      @click="login"
    >
      <span> Accedi </span>
    </Button>
  </div>
</template>

<style scoped></style>
