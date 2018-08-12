<template>
  <form class="Wform" @submit.prevent="validate">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-25">
        <md-field class="first_name">
          <label>姓</label>
          <md-input id="first_name" v-model="form.firstName" @input="first_phonetic" @keyup="first_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.first_name.required">必須項目です</span>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-25">
        <md-field :class="getValidationClass('firstName')">
          <label>名</label>
          <md-input id="last_name" v-model="form.last_name" @input="last_phonetic" @keyup="last_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.last_name.required">必須項目です</span>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-25">
        <md-field class="first_name">
          <label>姓(ふりがな)</label>
          <md-input id="first_name_phonetic" v-model="form.first_name_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.last_name_phonetic.required">必須項目です</span>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-25">
        <md-field class="first_name">
          <label>名(ふりがな)</label>
          <md-input id="last_name_phonetic" v-model="form.last_name_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.last_name_phonetic.required">必須項目です</span>
        </md-field>
      </div>
    </div>
    <div class="presence">
      <md-radio v-model="form.presence" value="true" :disabled="sending">出席</md-radio>
      <md-radio v-model="form.presence" value="false" :disabled="sending">欠席</md-radio>
      <span class="md-error" v-if="!$v.form.presence.required">必須項目です</span>
    </div>
    <md-field class="message">
      <label>メッセージ</label>
      <md-input v-model="form.message" :disabled="sending"></md-input>
    </md-field>
    <md-field class="contact">
      <label>メールアドレス</label>
      <md-input v-model="form.contact" :disabled="sending"></md-input>
    </md-field>
    <md-button class="md-raised md-primary" type="submit" :disabled="sending">送信</md-button>
    <md-progress-bar md-mode="indeterminate" v-if="sending" />
    <md-snackbar :md-active.sync="userSaved">登録ありがとうございました！</md-snackbar>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import historykana from 'historykana'
import { db } from '../main'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'WForm',
  mixins: [validationMixin],
  data () {
    return {
      form: {
        last_name: '',
        first_name: '',
        last_name_phonetic: '',
        first_name_phonetic: '',
        presence: true,
        message: '',
        contact: ''
      },
      first_history: [],
      last_history: [],
      userSaved: false,
      sending: false
    }
  },
  validations: {
    form: {
      last_name: {
        required
      },
      first_name: {
        required
      },
      first_name_phonetic: {
        required
      },
      last_name_phonetic: {
        required
      },
      presence: {
        required
      },
      contact: {
        email,
        required
      }
    }
  },
  methods: {
    first_phonetic () {
      const input = document.getElementById('first_name').value
      this.first_history.push(input)
      this.form.first_name_phonetic = historykana(this.first_history)
    },
    last_phonetic () {
      const input = document.getElementById('last_name').value
      this.last_history.push(input)
      this.form.last_name_phonetic = historykana(this.last_history)
    },
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        db.collection('presences').add(this.form).then(() => {
          this.userSaved = true
          this.sending = false
          // this.clearForm()
        }).error(() => {
          this.sending = false
        })
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form = null
    }
  }
}
</script>

<style scoped>

</style>
