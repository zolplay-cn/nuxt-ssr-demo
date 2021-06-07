<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gray-800"
  >
    <h1 class="text-2xl text-gray-200">SSR Demo</h1>
    <template v-if="users.length > 0">
      <h2 class="font-bold mt-4 text-blue-400">Users:</h2>
      <ul class="mt-3 flex flex-col space-y-2">
        <li
          v-for="user in users"
          :key="user.name"
          class="text-green-500 font-medium text-lg"
        >
          {{ user.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  ssrPromise,
  ssrRef,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'

type UserDto = {
  name: string
  email: string
}

type TestApiResponse = {
  message: string
  users: UserDto[]
}

export default defineComponent({
  setup() {
    const message = ssrRef('')
    const users = ssrRef<UserDto[]>([])

    const { title } = useMeta()
    const { $http } = useContext()

    ssrPromise(async () => {
      const data = await $http.$get<TestApiResponse>('/api/test')

      message.value = data.message
      users.value = data.users

      title.value = `${message.value} with ${users.value.length} users`
    })

    return { users }
  },

  head: {},
})
</script>
