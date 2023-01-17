<script lang="ts" setup>
import { Head, useHead } from '@vueuse/head'

if (!import.meta.env.SSR && import.meta.env.PROD) {
    useHead({
        script: [
            {
                children:
                    '(function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); }; m[i].l = 1 * new Date(); (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a); })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(86328787, "init", { defer: true, clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });',
            },
            {
                children:
                    "(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-M5M32QX');",
            },
            {
                children:
                    "!(function () { var t = document.createElement('script'); (t.type = 'text/javascript'), (t.async = !0), (t.src = 'https://vk.com/js/api/openapi.js?169'), (t.onload = function () { VK.Retargeting.Init('VK-RTRG-1228393-gLdf0'), VK.Retargeting.Hit(); }), document.head.appendChild(t); })();",
            },
        ],
    })
}
</script>
<template lang="pug">

Head
  meta(charset="UTF-8")
  meta(http-equiv="X-UA-Compatible", content="IE=edge")
  meta(name="viewport", content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no")

  title IT Resume
  meta(property="og:site_name" content="IT Resume")
  meta(property="og:title" content="IT Resume")
  meta(name="description" content="IT Resume - Платформа для развития навыков программирования")
  meta(property="og:description" content="IT Resume - Платформа для развития навыков программирования")

  meta(property="og:type" content="website")
  meta(property="og:locale" content="ru_RU")

  meta(property="og:image" content="https://itresume.ru/og-image.jpg")
  meta(property="og:image:secure_url" content="https://itresume.ru/og-image.jpg")
  meta(name="twitter:image" content="https://itresume.ru/og-image.jpg")
  meta(name="twitter:card" content="summary_large_image")
  link(rel="icon" href="https://itresume.ru/favicon.ico" sizes="any")
  link(rel="icon" href="https://itresume.ru/icon.svg" type="image/svg+xml")
  link(rel="apple-touch-icon" href="https://itresume.ru/apple-touch-icon.png")

</template>
