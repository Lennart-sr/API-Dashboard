import axios from "axios";
import { mapMutations, mapState } from "vuex";
import alertError from "./alertError.js";

export default {
  data() {
    return {
      registred: true,
      tempUser: {
        cnpj: "",
        password: "",
        user: ""
      }
    }
  },
  mixins: [alertError],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    getUser(){
      axios.get('/user', {
        params: {
          type: 'auth',
          key: 'cnpj',
          value: this.user.cnpj || this.tempUser.cnpj,
          password: this.user.password || this.tempUser.password
        }
      })
      .then(res => {
        res = res.data
        if(res.error)
          return this.alertError(res.error)

        this.UPDATE_USER(res)
        this.getApi()
      })
    },
    getApi(){
      axios.get('/user', {
        params: {
          type: 'api',
          key: 'cnpj',
          value: this.user.cnpj
        }
      })
      .then(res => {
        this.UPDATE_API(res.data)
      })
    },
    updateUser(){
      axios.put('/user', {
        key: 'cnpj',
        value: this.user.cnpj,
        keys: this.user
      }).then(() =>{
         this.getUser() 
      })
    },
    createUser(){
      axios.post('/user', this.tempUser)
      .then(res => {
        res = res.data
        if(res.error)
          return this.alertError(res.error)

        this.registred = !this.registred
      })
    },
    ...mapMutations(['UPDATE_USER','UPDATE_API'])
  }
}