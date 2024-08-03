<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, helpers } from '@vuelidate/validators';

const defaultState = {
  name: '',
  email: '',
};

const state = reactive({ ...defaultState });
const onSubmit = ref(false);

const rules = {
  name: {
    required: helpers.withMessage('this field is required', required),
    minLength: helpers.withMessage('at least 3 symbols', minLength(3)),
  },
  email: {
    required: helpers.withMessage('this field is required', required),
    email: helpers.withMessage('invalid email value', email),
  },
};
const $v = useVuelidate(rules, state);

const submitForm = async () => {
  $v.value.$touch();
  if ($v.value.$error) {
    return;
  }
  onSubmit.value = true;

  await dummyPromise()
    .then(({ name, email }) => {
      window.alert(`name:${name}, email:${email}`);
    })
    .catch(() => {
      console.error('some error');
    });
  stateReset();
};

const dummyPromise = async () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res({ name: state.name, email: state.email });
    }, 500);
  });

const stateReset = () => {
  state.name = defaultState.name;
  state.email = defaultState.email;

  $v.value.$reset();
  onSubmit.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center px-6">
    <form @submit.prevent="submitForm" class="max-w-[426px] w-full">
      <h1 class="mb-4">TEST FORM</h1>
      <p class="text-justify mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div :class="[{ error: $v.email.$errors.length }, 'input-wrapper mb-1']">
        <input
          v-model="state.email"
          placeholder="Email"
          class="max-w-80 w-full"
          @blur="$v.email.$touch"
          :disabled="onSubmit"
        />
        <div v-if="$v.email.$errors.length" class="error-msg">
          {{ $v.email.$errors[0].$message }}
        </div>
      </div>
      <div :class="[{ error: $v.name.$errors.length }, 'input-wrapper mb-3']">
        <input
          v-model="state.name"
          placeholder="Name"
          class="max-w-80 w-full"
          @blur="$v.name.$touch"
          :disabled="onSubmit"
        />
        <div v-if="$v.name.$errors.length" class="error-msg">
          {{ $v.name.$errors[0].$message }}
        </div>
      </div>
      <button
        type="submit"
        class="blue-btn px-6 py-[10px] rounded-xl font-semibold text-white"
        :disabled="onSubmit"
      >
        Apply
      </button>
    </form>
  </div>
</template>
