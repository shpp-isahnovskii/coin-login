<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, helpers } from '@vuelidate/validators';
import LoginAnimation from './LoginAnimation.vue';

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
  <section class="grid grid-cols-2 max-w-7xl mx-auto lg:h-screen px-6 my-10 lg:my-0 overflow-hidden [&>*]:justify-self-center ">
    <div class="col-span-2 self-end lg:col-span-1 max-w-md mb-4 sm:mb-6 lg:mb-8 h-max">
      <h1 class="mb-4">TEST FORM</h1>
      <p class="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
    <LoginAnimation class="col-span-2 lg:col-span-1 lg:row-span-2" />
    <form @submit.prevent="submitForm" class="col-span-2 self-start lg:col-span-1 max-w-md w-full mt-6 sm:mt-8 lg:mt-0">
      <div :class="[{ error: $v.email.$errors.length }, 'input-wrapper mb-1']">
        <input
          v-model="state.email"
          placeholder="Email"
          class="lg:max-w-80 w-full"
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
          class="lg:max-w-80 w-full"
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
  </section>
</template>
