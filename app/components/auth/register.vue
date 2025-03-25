<script lang="ts" setup>
const auth = useAuth();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const { refresh: register } = useAction(async () => {
  const { error } = await auth.register.email({
    email: email.value,
    password: password.value,
    name: `${firstName.value} ${lastName.value}`,
  });
  if (error) {
    useToast().add({
      variant: "destructive",
      title: "Registration failed",
      description: error.message,
      type: "foreground",
      duration: 5000,
    });
    throw error;
  } else navigateTo("/");
});
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-2">
      <div class="space-y-1">
        <Label for="first-name">First name</Label>
        <Input
          id="first-name"
          v-model="firstName"
          placeholder="John"
          required
        />
      </div>
      <div class="space-y-1">
        <Label for="last-name">Last name</Label>
        <Input id="last-name" v-model="lastName" placeholder="Doe" required />
      </div>
    </div>
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
        autocomplete="new-password"
        placeholder="password"
        type="password"
      />
    </div>
    <Button
      :disabled="!firstName || !lastName || !email || !password"
      class="w-full btn btn-primary"
      type="submit"
      @click="() => register()"
    >
      Create an account
    </Button>
  </div>
</template>

<style scoped></style>
