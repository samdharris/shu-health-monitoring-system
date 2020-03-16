<template>
  <b-modal v-model="$store.state.showLowLevelWarning" hide-footer>
    <template v-slot:modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button
      class="mt-3"
      block
      @click="$store.commit('setshowLowLevelWarning', false)"
      >Close Me</b-button
    >
  </b-modal>
</template>
