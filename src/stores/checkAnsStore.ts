import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCheckAnswerStore = defineStore('counter', () => {
  const isAnswered = ref(false)

  const checkAnswer = () => {
    isAnswered.value = true;
    localStorage.setItem('isAnswered', JSON.stringify(isAnswered.value));
    console.log('Respuesta enviada');
  }

  const checkIsAnswered = computed(() => {
    const valueAnswered = JSON.parse(localStorage.getItem('isAnswered') || 'false');

    //Mensajes de depuración
    console.log('Comprobando respuesta');
    console.log(valueAnswered);

    return valueAnswered;
  })

  return { isAnswered, checkAnswer, checkIsAnswered }
})
