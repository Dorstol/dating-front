<template>
  <div class="p-4">
    <!-- Hero Section -->
    <section class="hero text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-gray-800">
        Найдите свою вторую половинку
      </h1>
      <p class="text-lg mb-6 text-gray-600">
        Сервис знакомств для тех, кто готов к новым встречам
      </p>
      <router-link
        to="/swipe"
        class="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded transition duration-300"
      >
        Попробовать сейчас
      </router-link>
    </section>

    <!-- Как это работает -->
    <section class="how-it-works mb-12">
      <h2 class="text-2xl font-bold text-center mb-6">Как это работает</h2>
      <div class="flex flex-col md:flex-row justify-around gap-6">
        <div class="step text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-xl font-semibold mb-2">1. Регистрация</h3>
          <p class="text-gray-600">
            Зарегистрируйтесь и заполните профиль
          </p>
        </div>
        <div class="step text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-xl font-semibold mb-2">2. Укажите интересы</h3>
          <p class="text-gray-600">
            Расскажите о себе и о том, кто вам интересен
          </p>
        </div>
        <div class="step text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-xl font-semibold mb-2">3. Найдите пару</h3>
          <p class="text-gray-600">
            Свайпайте и начинайте общаться в чате
          </p>
        </div>
      </div>
    </section>

    <!-- Преимущества -->
    <section class="features mb-12">
      <h2 class="text-2xl font-bold text-center mb-6">
        Преимущества нашего сервиса
      </h2>
      <ul class="list-none flex flex-col md:flex-row justify-around gap-6 text-center">
        <li class="p-6 border rounded-lg shadow-sm bg-gray-50">
          Безопасность и модерация
        </li>
        <li class="p-6 border rounded-lg shadow-sm bg-gray-50">
          Умный подбор на основе интересов
        </li>
        <li class="p-6 border rounded-lg shadow-sm bg-gray-50">
          Удобный интерфейс
        </li>
        <li class="p-6 border rounded-lg shadow-sm bg-gray-50">
          Миллионы анкет
        </li>
      </ul>
    </section>

    <!-- Отзывы (пример) -->
    <section class="testimonials">
      <h2 class="text-2xl font-bold text-center mb-6">
        Отзывы счастливых пар
      </h2>
      <div class="testimonial bg-gray-100 p-6 rounded-lg mb-6 shadow">
        <p class="italic text-gray-700 mb-2">
          «Нашли друг друга за две недели! Спасибо сервису!»
        </p>
        <strong class="block text-right text-gray-800">
          — Анна и Сергей
        </strong>
      </div>
      <div class="testimonial bg-gray-100 p-6 rounded-lg shadow">
        <p class="italic text-gray-700 mb-2">
          «Долго сомневался, но решил попробовать. Не пожалел!»
        </p>
        <strong class="block text-right text-gray-800">
          — Дмитрий
        </strong>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional script is needed for this static view.
</script>