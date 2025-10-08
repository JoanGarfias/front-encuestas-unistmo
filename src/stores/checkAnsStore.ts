import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCheckAnswerStore = defineStore('checkAnswerStore', () => {
  const isAnswered = ref<boolean>(JSON.parse(localStorage.getItem('isAnswered') || 'false'))

  const checkAnswer = () : void => {
    isAnswered.value = true;
    localStorage.setItem('isAnswered', JSON.stringify(isAnswered.value));
    console.log('Respuesta enviada');
  }

  const checkIsAnswered = () : boolean => {
    const valueAnswered = JSON.parse(localStorage.getItem('isAnswered') || 'false');
    isAnswered.value = valueAnswered;
    //Mensajes de depuración
    console.log('Comprobando respuesta');
    console.log(valueAnswered);
    return valueAnswered;
  }

  return { isAnswered, checkAnswer, checkIsAnswered }
})
