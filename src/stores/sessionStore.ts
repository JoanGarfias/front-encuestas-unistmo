import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('sesionStore', () => {
  const isLogged = ref<boolean>(false)

  const login = () : void => {
    isLogged.value = true;
    localStorage.setItem('isLogged', JSON.stringify(isLogged.value));
    console.log('Usuario logeado');
  }

  const checkIsLogged = () => {
    const valueLogged = JSON.parse(localStorage.getItem('isLogged') || 'false');
    isLogged.value = valueLogged;
    //Mensajes de depuración
    console.log('Comprobando usuario');
    console.log(valueLogged);
    return valueLogged;
  }

  return { isLogged, login, checkIsLogged }
})
