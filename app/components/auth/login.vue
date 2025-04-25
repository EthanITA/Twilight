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
  <Card size="lg">
    <template #header>
      <div class="gap-4 flex flex-col">
        <Text type="heading">Let's Login!</Text>
        <!--
                <Text type="body">
                  Twilight will plan and prioritizes your day,
                  <br />helping you to take back the hours to create, build, and live.
                </Text>
        -->
      </div>
    </template>
    <template #footer>
      <ButtonGoogle :loading="isPending" @click="login" />
    </template>
  </Card>
</template>
