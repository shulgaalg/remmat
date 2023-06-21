'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Burger menu
  function toggleMenu() {
    const burger = document.querySelector('#burger');
    const menu = document.querySelector('#mobile-menu');
    const body = document.querySelector('body');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('hidden');
      menu.classList.toggle('block');
      body.classList.toggle('overflow-hidden');
    });

    menu.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('block');
      burger.classList.remove('active');
      body.classList.remove('overflow-hidden');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        menu.classList.add('hidden');
        menu.classList.remove('block');
        burger.classList.remove('active');
        body.classList.remove('overflow-hidden');
      }
    });
  }

  toggleMenu();

  // Swiper slider
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 80,
    speed: 1000,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // autoplay: {
    //   delay: 1800,
    // }
  });

  // send message

  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    success = document.querySelector('#success'),
    loading = document.querySelector('#loading'),
    failure = document.querySelector('#failure');

  const postData = async (url, data) => {
    loading.classList.remove('hidden');

    let res = await fetch(url, {
      method: 'POST',
      body: data,
    });

    return await res;
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = '';
    });
  };

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(item);

      postData('../application.php', formData)
        .then((res) => {
          console.log(res);
          loading.classList.add('hidden');
          success.classList.remove('hidden');
        })
        .catch((err) => {
          console.log(err);
          loading.classList.add('hidden');
          failure.classList.remove('hidden');
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            loading.classList.add('hidden');
            success.classList.add('hidden');
            failure.classList.add('hidden');
          }, 5000);
        });
    });
  });

  // form validation
  let validation = new JustValidate('#call-form');
  let secondValidation = new JustValidate('#form');

  validation
    .addField('#call-name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 символа!',
      },
    ])
    .addField('#call-phone', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон!',
      },
    ])
    .onSuccess(function () {
      
      // sendMail(firstName, firstPhone);
    });

  secondValidation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Минимум 2 символа!',
      },
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон!',
      },
    ])
    .onSuccess(function () {
    
      // sendMail(firstName, firstPhone);
    });
});
