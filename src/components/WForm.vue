<template>
  <form class="Wform" @submit.prevent="validate">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-25">
        <md-field :class="getValidationClass('firstName')">
          <label for="first_name">姓</label>
          <md-input id="first_name" name="first_name" v-model="form.firstName" @input="first_phonetic" @keyup="first_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.firstName.required">必須項目です</span>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-25">
        <md-field :class="getValidationClass('lastName')">
          <label for="last_name">名</label>
          <md-input id="last_name" name="last_name" v-model="form.lastName" @input="last_phonetic" @keyup="last_phonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.lastName.required">必須項目です</span>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-medium-size-25">
        <md-field :class="getValidationClass('firstNamePhonetic')">
          <label for="first_name_phonetic">姓(ふりがな)</label>
          <md-input id="first_name_phonetic" name="first_name_phonetic" v-model="form.firstNamePhonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.firstNamePhonetic.required">必須項目です</span>
        </md-field>
      </div>
      <div class="md-layout-item md-medium-size-25">
        <md-field :class="getValidationClass('lastNamePhonetic')">
          <label for="last_name_phonetic">名(ふりがな)</label>
          <md-input id="last_name_phonetic" name="last_name_phonetic" v-model="form.lastNamePhonetic" required :disabled="sending"></md-input>
          <span class="md-error" v-if="!$v.form.lastNamePhonetic.required">必須項目です</span>
        </md-field>
      </div>
    </div>
    <div class="presence">
      <md-radio v-model="form.presence" :value="true" :disabled="sending">出席</md-radio>
      <md-radio v-model="form.presence" value="false" :disabled="sending">欠席</md-radio>
    </div>
    <md-field :class="getValidationClass('contact')">
      <label for="contact">メールアドレス</label>
      <md-input id="contact" name="contact" v-model="form.contact" :disabled="sending" required></md-input>
      <span class="md-error" v-if="!$v.form.contact.required">必須項目です</span>
      <span class="md-error" v-else-if="!$v.form.contact.email">メールアドレスの形式で入力してください</span>
    </md-field>
    <md-field :class="getValidationClass('message')">
      <label>メッセージ</label>
      <md-input v-model="form.message" :disabled="sending"></md-input>
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
        lastName: '',
        firstName: '',
        lastNamePhonetic: '',
        firstNamePhonetic: '',
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
      lastName: {
        required
      },
      firstName: {
        required
      },
      firstNamePhonetic: {
        required
      },
      lastNamePhonetic: {
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
      this.form.firstNamePhonetic = historykana(this.first_history)
    },
    last_phonetic () {
      const input = document.getElementById('last_name').value
      this.last_history.push(input)
      this.form.lastNamePhonetic = historykana(this.last_history)
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sending = true
        db.collection('presences').add(this.form).then(() => {
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }).catch(() => {
          this.sending = false
        })
      }
    },
    clearForm () {
      this.$v.$reset()
      for (let field in this.form) {
        if (this.form.hasOwnProperty(field)) {
          this.form[field] = ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
