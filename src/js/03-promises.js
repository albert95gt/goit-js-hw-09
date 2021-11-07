import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  cssAnimationStyle: 'from-right',
});

const refs = {
  form: document.querySelector('.form'),
}
refs.form.addEventListener("change", onChangeInput);

function onChangeInput(event){
   const delay = Number(event.currentTarget.elements.delay.value);
   const step = Number(event.currentTarget.elements.step.value);
   const amount = Number(event.currentTarget.elements.amount.value);
  
   return { delay, step, amount };
  }


refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event){
  event.preventDefault();
  
  let { delay, step, amount }  = onChangeInput(event);
  
 console.log({ delay, step, amount });
 
 let currentDelay = delay;
 for (let i = 0; i < amount; i++) {
   setTimeout(function() {
      createPromise(i + 1, currentDelay)
      
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }, currentDelay += delay);
    
    
    delay += step;
    
    
  }

}
function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
  
  })
}

