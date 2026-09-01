# FRONTEND-SICLUS Code Repository

Berikut adalah salinan lengkap dan mutakhir dari seluruh berkas kode yang ada di dalam repository `PROJECT-SICLUS` berdasarkan flow terbaru tanpa modifikasi sama sekali.

## Daftar Berkas

1. [`.env`](#1-env)
2. [`.gitignore`](#2-gitignore)
3. [`.oxlintrc.json`](#3-oxlintrcjson)
4. [`index.html`](#4-indexhtml)
5. [`package.json`](#5-packagejson)
6. [`vite.config.js`](#6-viteconfigjs)
7. [`public/favicon.svg`](#7-publicfaviconsvg)
8. [`public/icons.svg`](#8-publiciconssvg)
9. [`src/assets/react.svg`](#9-srcassetsreactsvg)
10. [`src/index.css`](#10-srcindexcss)
11. [`src/main.jsx`](#11-srcmainjsx)
12. [`src/App.jsx`](#12-srcappjsx)
13. [`src/components/layout/BottomNav.jsx`](#13-srccomponentslayoutbottomnavjsx)
14. [`src/components/layout/MobileLayout.jsx`](#14-srccomponentslayoutmobilelayoutjsx)
15. [`src/components/ui/InspectionToggle.jsx`](#15-srccomponentsuiinspectiontogglejsx)
16. [`src/pages/auth/Login.jsx`](#16-srcpagesauthloginjsx)
17. [`src/pages/auth/Register.jsx`](#17-srcpagesauthregisterjsx)
18. [`src/pages/auth/ManageUser.jsx`](#18-srcpagesauthmanageuserjsx)
19. [`src/pages/auth/UserData.jsx`](#19-srcpagesauthuserdatajsx)
20. [`src/pages/Beranda.jsx`](#20-srcpagesberandajsx)
21. [`src/pages/RingkasanHarian.jsx`](#21-srcpagesringkasanharianjsx)
22. [`src/pages/laporan/Persiapan.jsx`](#22-srcpageslaporanpersiapanjsx)
23. [`src/pages/laporan/Inspeksi.jsx`](#23-srcpageslaporaninspeksijsx)
24. [`src/pages/laporan/Kendala.jsx`](#24-srcpageslaporankendalajsx)
25. [`src/pages/laporan/DetailLaporan.jsx`](#25-srcpageslaporandetaillaporanjsx)
26. [`src/pages/laporan/Rekap.jsx`](#26-srcpageslaporanrekapjsx)
27. [`src/pages/laporan/RiwayatDriver.jsx`](#27-srcpageslaporanriwayatdriverjsx)
28. [`src/pages/perjalanan/TitikStart.jsx`](#28-srcpagesperjalanantitikstartjsx)
29. [`src/pages/perjalanan/Penumpang.jsx`](#29-srcpagesperjalananpenumpangjsx)
30. [`src/services/api.js`](#30-srcservicesapijs)
31. [`src/utils/UserData.js`](#31-srcutilsuserdatajs)
32. [`src/utils/dummyData.js`](#32-srcutilsdummydatajs)
33. [`src/utils/dummyTesting.js`](#33-srcutilsdummytestingjs)
34. [`src/utils/formatTime.js`](#34-srcutilsformattimejs)

---

## 1. `.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 2. `.gitignore`

```plaintext
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Environment variables (JANGAN diupload! Berisi API Key & Secret)
.env
.env.*
!.env.example

# Windows cache
Thumbs.db

# Coverage reports
coverage/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

---

## 3. `.oxlintrc.json`

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

---

## 4. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>siclus-app</title>
  </head>
  
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 5. `package.json`

```json
{
  "name": "siclus-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/poppins": "^5.3.0",
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.20.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "oxlint": "^1.75.0",
    "vite": "^8.2.0"
  }
}
```

---

## 6. `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

## 7. `public/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

---

## 8. `public/icons.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

---

## 9. `src/assets/react.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

---

## 10. `src/index.css`

```css
@import "tailwindcss";

:root {
  --font-sans: 'Poppins', sans-serif;
}

body {
  font-family: var(--font-sans);
  background-color: #f1f5f9;
}

/* Hide scrollbar untuk horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## 11. `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import Font Poppins biar langsung aktif di seluruh app
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## 12. `src/App.jsx`

```jsx
import React, { useState } from "react";
import { apiService } from "./services/api";
import MobileLayout from "./components/layout/MobileLayout";
import BottomNav from "./components/layout/BottomNav";
import Login from "./pages/auth/Login";
import Beranda from "./pages/Beranda";
import Persiapan from "./pages/laporan/Persiapan";
import Inspeksi from "./pages/laporan/Inspeksi";
import Kendala from "./pages/laporan/Kendala";
import RiwayatDriver from "./pages/laporan/RiwayatDriver";
import TitikStart from "./pages/perjalanan/TitikStart";
import Penumpang from "./pages/perjalanan/Penumpang";
import RingkasanHarian from "./pages/RingkasanHarian";

// profil akun komponen
const ProfilAkun = ({ user, onLogout }) => {
  const [profilePic, setProfilePic] = React.useState(null);
  const [toastMsg, setToastMsg] = React.useState("");
  const fileInputRef = React.useRef(null);
  const dummyTrayek = user?.trayek || "Trayek A";
  const dummyBus = user?.bus || "Bus 07 (S 1772 SP)";

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      setToastMsg("Sedang mengunggah foto ke server... ⏳");

      try {
        const formData = new FormData();
        formData.append("foto", file);

        // TEMBAK API SUPABASE BACKEND
        const res = await apiService.updateFotoProfil(formData);

        if (res.foto_profil) {
          setProfilePic(res.foto_profil);
          setToastMsg("Foto profil berhasil disimpan permanen! 📸");
        }
      } catch (err) {
        setToastMsg("Gagal mengunggah foto ke server ❌");
      }

      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto pb-6 relative">
      {toastMsg && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#00206B] text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,32,107,0.5)] flex items-center gap-3 border border-blue-400/30">
            <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-extrabold text-sm tracking-wide">{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Profil Akun</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Kelola informasi data diri pengemudi</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-[#00206B] to-blue-500"></div>

        <div className="relative z-10 flex flex-col items-center mt-12 px-6 pb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
            </div>

            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoChange} />

            <button
              onClick={handleCameraClick}
              className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform text-[#00206B] border border-slate-100 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <h3 className="mt-4 text-2xl font-black text-[#00206B]">{user?.name || "Pak Budi"}</h3>
          <span className="bg-blue-50 text-blue-600 font-bold px-4 py-1.5 rounded-full text-xs mt-2 uppercase tracking-wide border border-blue-100">{user?.role || "Pengemudi"}</span>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">ID Pengemudi</span>
                <span className="font-extrabold text-[#00206B] text-sm">{user?.id || "SUP001"}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Trayek Tugas</span>
                <span className="font-extrabold text-[#00206B] text-sm">{dummyTrayek}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left flex gap-4 items-center md:col-span-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00206B] shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Armada Bus</span>
                <span className="font-extrabold text-[#00206B] text-sm">{dummyBus}</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] font-extrabold py-4 px-4 rounded-2xl transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              KELUAR DARI APLIKASI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔥 DETAIL LAPORAN COMPONENT
const DetailLaporan = ({ report, onBack }) => {
  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    if (report.morning) {
      total += 5;
      if (report.morning.start) filled++;
      if (report.morning.odometerStart) filled++;
      if (report.morning.departure) filled++;
      if (report.morning.arrival) filled++;
      if (report.morning.passengers) filled++;
    }
    if (report.afternoon) {
      total += 5;
      if (report.afternoon.start) filled++;
      if (report.afternoon.odometerStart) filled++;
      if (report.afternoon.departure) filled++;
      if (report.afternoon.arrival) filled++;
      if (report.afternoon.passengers) filled++;
    }
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };
  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Riwayat
      </button>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Kelengkapan Data</h3>
          <span className="text-2xl font-black text-[#00206B]">{completeness}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${completeness >= 80 ? "bg-gradient-to-r from-emerald-500 to-green-500" : completeness >= 50 ? "bg-gradient-to-r from-yellow-500 to-orange-500" : "bg-gradient-to-r from-red-500 to-pink-500"}`}
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">{completeness >= 80 ? "✅ Data hampir lengkap" : completeness >= 50 ? "⚠️ Data belum lengkap" : "❌ Data sangat kurang"}</p>
      </div>
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-800 uppercase">LAPORAN HARIAN ANGKUTAN SEKOLAH GRATIS KOTA MOJOKERTO</h2>
          <p className="text-sm font-bold text-slate-600">TAHUN 2026</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="font-bold">HARI / TANGGAL</span>
            <p className="text-slate-700 mt-1">{report.date || "-"}</p>
          </div>
          <div>
            <span className="font-bold">TRAYEK / NOPOL</span>
            <p className="text-slate-700 mt-1">
              {report.trayek || "-"} / {report.bus || "-"}
            </p>
          </div>
        </div>
        <table className="w-full border-collapse border-2 border-slate-400 text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2" rowSpan="2">
                No.
              </th>
              <th className="border-2 border-slate-400 p-2" rowSpan="2">
                URAIAN
              </th>
              <th className="border-2 border-slate-400 p-2" colSpan="2">
                PELAYANAN
              </th>
            </tr>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2">PAGI / BERANGKAT SEKOLAH</th>
              <th className="border-2 border-slate-400 p-2">SIANG / PULANG SEKOLAH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">1</td>
              <td className="border-2 border-slate-400 p-2">Nama Pengemudi</td>
              <td className="border-2 border-slate-400 p-2" colSpan="2">
                {report.driverName || "-"}
              </td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">2</td>
              <td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dishub</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerStart || "-"}</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerStart || "-"}</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">3</td>
              <td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dishub</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.start || "-"} WIB</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.start || "-"} WIB</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">
                4
              </td>
              <td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">
                Kondisi kendaraan sebelum berangkat
              </td>
            </tr>
            {["Rem", "AC", "Lampu", "Klakson", "Wiper kaca", "Lampu rem/seint", "Bell Penumpang", "Pintu bus", "Kebersihan"].map((item, idx) => (
              <tr key={idx}>
                <td className="border-2 border-slate-400 p-2">
                  {String.fromCharCode(97 + idx)}. {item}
                </td>
                <td className="border-2 border-slate-400 p-2 text-center">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span>
                </td>
                <td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td>
              </tr>
            ))}
            <tr>
              <td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">
                Kondisi kendaraan sesudah berangkat
              </td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">5</td>
              <td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.departure || "-"} WIB</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.departure || "-"} WIB</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">6</td>
              <td className="border-2 border-slate-400 p-2">Km speedometer berangkat trayek/start</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerDeparture || "-"}</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerDeparture || "-"}</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">7</td>
              <td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.arrival || "-"} WIB</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.arrival || "-"} WIB</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">8</td>
              <td className="border-2 border-slate-400 p-2">Km speedometer datang trayek/finish</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerArrival || "-"}</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerArrival || "-"}</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">9</td>
              <td className="border-2 border-slate-400 p-2">Jumlah penumpang diangkut</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.passengers || "-"} Orang</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.passengers || "-"} Orang</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">10</td>
              <td className="border-2 border-slate-400 p-2">Jam datang di kantor Dishub</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.returnTime || "-"} WIB</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.returnTime || "-"} WIB</td>
            </tr>
            <tr>
              <td className="border-2 border-slate-400 p-2 text-center">11</td>
              <td className="border-2 border-slate-400 p-2">Km speedometer datang di Dishub</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerReturn || "-"}</td>
              <td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerReturn || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔥 REKAP COMPONENT (SUDAH KONEK SUPABASE & EXCEL)
const RekapPage = () => {
  const [searchName, setSearchName] = React.useState("");
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [reports, setReports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // 1. OTOMATIS NARIK DATA REKAP PAS BUKA HALAMAN
  React.useEffect(() => {
    apiService
      .getRekapAdmin()
      .then((res) => {
        if (res.data) {
          const formattedData = res.data.map((r) => {
            const sesiPagi = r.trip_sessions?.find((s) => s.tipe_sesi === "PAGI") || {};
            const sesiSiang = r.trip_sessions?.find((s) => s.tipe_sesi === "SIANG") || {};

            return {
              ...r,
              driverName: r.id_supir, // Supabase nyimpen email supir di kolom id_supir
              date: r.tanggal,
              trayek: r.trayek,
              bus: r.bus,
              morning: {
                start: sesiPagi.jam_berangkat_kantor || "-",
                odometerStart: sesiPagi.km_berangkat_kantor || "-",
                departure: sesiPagi.jam_berangkat_start || "-",
                odometerDeparture: sesiPagi.km_berangkat_start || "-",
                arrival: sesiPagi.jam_tiba_finish || "-",
                odometerArrival: sesiPagi.km_tiba_finish || "-",
                passengers: sesiPagi.jumlah_penumpang || 0,
                returnTime: sesiPagi.jam_tiba_kantor || "-",
                odometerReturn: sesiPagi.km_tiba_kantor || "-",
              },
              afternoon: {
                start: sesiSiang.jam_berangkat_kantor || "-",
                odometerStart: sesiSiang.km_berangkat_kantor || "-",
                departure: sesiSiang.jam_berangkat_start || "-",
                odometerDeparture: sesiSiang.km_berangkat_start || "-",
                arrival: sesiSiang.jam_tiba_finish || "-",
                odometerArrival: sesiSiang.km_tiba_finish || "-",
                passengers: sesiSiang.jumlah_penumpang || 0,
                returnTime: sesiSiang.jam_tiba_kantor || "-",
                odometerReturn: sesiSiang.km_tiba_kantor || "-",
              },
            };
          });
          setReports(formattedData);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredReports = reports.filter((report) => {
    return !searchName || report.driverName?.toLowerCase().includes(searchName.toLowerCase());
  });

  // 2. FUNGSI SAKTI EXPORT EXCEL DARI BACKEND
  const handleExportExcel = async () => {
    if (reports.length === 0) {
      alert("Belum ada data laporan di database bro!");
      return;
    }
    setIsDownloading(true);
    try {
      // Panggil API Download Excel lu
      const blobData = await apiService.exportExcelAdmin();

      // Bikin URL link sementara buat donlot file-nya ke HP/Laptop
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Rekap_SICLUS_${new Date().toISOString().split("T")[0]}.xlsx`);
      document.body.appendChild(link);
      link.click(); // Otomatis keklik buat download

      // Bersihin sampah memori browser
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Gagal mengunduh file Excel dari server.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (selectedReport) {
    return <DetailLaporan report={selectedReport} onBack={() => setSelectedReport(null)} />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Data Rekapitulasi</h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">Pantau dan unduh semua laporan pengemudi</p>
        </div>

        <button
          onClick={handleExportExcel}
          disabled={isDownloading || isLoading}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-extrabold py-3 px-5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          {isDownloading ? (
            "MEMPROSES EXCEL... ⏳"
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              UNDUH DATA EXCEL
            </>
          )}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Cari Laporan</h3>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Pengemudi</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Cari email supir..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 text-center font-bold text-[#00206B] animate-pulse">Menarik data dari Supabase... ⏳</div>
      ) : filteredReports.length > 0 ? (
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <div
              key={index}
              onClick={() => setSelectedReport(report)}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
            >
              <div>
                <h3 className="text-base font-extrabold text-[#00206B]">{report.driverName}</h3>
                <p className="text-xs text-slate-400 font-semibold">{report.date}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">Detail ➔</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium">Tidak Ada Laporan</div>
      )}
    </div>
  );
};

// 🔥 KELOLA USER COMPONENT
const ManageUsers = ({ onBack, shiftRules, setShiftRules, onForceUnlock }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: "", email: "", password: "", role: "pengemudi", trayek: "", bus: "" });

  // State baru buat data dari backend
  const [usersData, setUsersData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // 1. OTOMATIS NARIK DATA SUPIR PAS HALAMAN DIBUKA
  React.useEffect(() => {
    apiService
      .getUsersAdmin()
      .then((res) => {
        if (res.data) setUsersData(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 2. FUNGSI TEMBAK API POST /api/admin/users
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newId = `SUP${String(usersData.length + 1).padStart(3, "0")}`;

      const payload = {
        id: newId,
        nama_lengkap: formData.name,
        email: formData.email,
        password: formData.password,
        role: "pengemudi",
        trayek: formData.trayek,
        bus: formData.bus,
      };

      await apiService.tambahUserAdmin(payload);
      alert("BERHASIL! Akun supir sudah masuk ke Supabase.");
      setShowForm(false);

      const res = await apiService.getUsersAdmin();
      if (res.data) setUsersData(res.data);
    } catch (error) {
      alert("Gagal menambah supir! Email mungkin sudah dipakai atau Ngrok mati.");
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#00206B]">Kelola Pengguna</h2>
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer font-bold text-sm">
          Kembali
        </button>
      </div>

      <div className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-extrabold text-red-600 uppercase mb-4">Pengaturan Waktu & Kunci Laporan</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Jam Buka Pagi</label>
            <input
              type="number"
              value={shiftRules.pagi}
              onChange={(e) => setShiftRules({ ...shiftRules, pagi: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">Jam Buka Siang</label>
            <input
              type="number"
              value={shiftRules.siang}
              onChange={(e) => setShiftRules({ ...shiftRules, siang: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm"
            />
          </div>
        </div>
        <button onClick={onForceUnlock} className="w-full bg-red-500 text-white font-black py-4 rounded-xl shadow-md cursor-pointer">
          BUKA PAKSA KUNCI LAPORAN SEMUA SUPIR
        </button>
      </div>

      <button onClick={() => setShowForm(true)} className="w-full bg-[#00206B] text-white font-extrabold py-4 rounded-xl shadow-sm cursor-pointer">
        TAMBAH PENGGUNA BARU
      </button>

      {/* 3. LIST DATA SUPIR ASLI DARI SUPABASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="p-5 font-bold text-[#00206B] animate-pulse">Menarik data dari Supabase... ⏳</div>
        ) : (
          usersData.map((user) => (
            <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-extrabold text-[#00206B]">{user.nama}</h3>
              <p className="text-xs text-slate-500 font-medium">{user.email}</p>
              <div className="mt-2 text-[10px] font-bold text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                Trayek: {user.trayek || "-"} | Bus: {user.bus || "-"}
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-black text-[#00206B] mb-4">Tambah Pengguna Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none"
              />
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none"
              />
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none"
              />
              <input
                type="text"
                name="trayek"
                onChange={handleChange}
                placeholder="Trayek (Misal: Trayek A)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none"
              />
              <input
                type="text"
                name="bus"
                onChange={handleChange}
                placeholder="Bus (Misal: Bus 07)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00206B] outline-none"
              />
              <button type="submit" className="w-full bg-[#00206B] text-white py-3.5 rounded-xl mt-4 font-bold shadow-md cursor-pointer">
                Simpan Pengguna
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="w-full bg-slate-200 text-slate-700 py-3.5 rounded-xl mt-2 font-bold cursor-pointer hover:bg-slate-300">
                Batal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 🔥 MAIN APP COMPONENT
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("beranda");

  // 🔥 STATE BARU: KHUSUS BUAT LOADING SUBMIT FORM (ANTI-SPAM BE)
  const [isProcessing, setIsProcessing] = useState(false);

  const [tripStatus, setTripStatus] = useState("belum_mulai");
  const [preparationData, setPreparationData] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [trips, setTrips] = useState([]);
  const [driverReports, setDriverReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentShift, setCurrentShift] = useState("pagi");
  const [tempMorningData, setTempMorningData] = useState(null);
  const [isLaporanLocked, setIsLaporanLocked] = useState(false);
  const [shiftRules, setShiftRules] = useState({ pagi: 5, siang: 12 });

  const handleLogin = async (userInfo) => {
    setUser(userInfo);
    setTripStatus("belum_mulai");

    // 🔥 KALO YANG LOGIN SUPIR, KITA TARIK JADWAL ASLI DARI DATABASE
    if (userInfo?.role?.toLowerCase() !== "admin") {
      try {
        const resJadwal = await apiService.getJadwalDriver();
        if (resJadwal && resJadwal.data) {
          const jadwalPagi = resJadwal.data.find((j) => j.tipe_sesi === "PAGI");
          const jadwalSiang = resJadwal.data.find((j) => j.tipe_sesi === "SIANG");
          const jamPagi = jadwalPagi ? parseInt(jadwalPagi.batas_keluar_dishub.split(":")[0]) : 5;
          const jamSiang = jadwalSiang ? parseInt(jadwalSiang.batas_keluar_dishub.split(":")[0]) : 12;

          setShiftRules({ pagi: jamPagi, siang: jamSiang });
        }
      } catch (err) {
        console.error("Gagal narik jadwal dari server:", err);
      }
    }

    setCurrentPage(userInfo?.role?.toLowerCase() === "admin" ? "riwayatdriver" : "beranda");
  };

  const handleLogout = () => {
    localStorage.removeItem("siclus_token");
    setUser(null);
    setTripStatus("belum_mulai");
    setCurrentPage("beranda");
  };

  // 🔥 FUNGSI BUNGKUSAN (WRAPPER) BUAT NGASIH DELAY LOADING DI TIAP TRANSAKSI FORM
  const processFormStep = (actionFunc) => {
    setIsProcessing(true);
    setTimeout(() => {
      actionFunc();
      setIsProcessing(false);
    }, 800);
  };

  const handleStartInspection = () => processFormStep(() => setCurrentPage("persiapan"));

  const handleInspectionSuccess = async (report) => {
    setIsProcessing(true);
    try {
      await apiService.submitInspeksi(preparationData.laporan_id, {
        rem: report.checklist.rem || "OK",
        ac: report.checklist.ac || "OK",
        lampu: report.checklist.lampu || "OK",
        klakson: report.checklist.klakson || "OK",
        wiper: report.checklist.wiper || "OK",
        lampu_rem: report.checklist.lampuRem || "OK",
        bell: report.checklist.bell || "OK",
        pintu: report.checklist.pintu || "OK",
        kebersihan: report.checklist.kebersihan || "OK",
        catatan: "",
      });

      const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
      setInspections((prev) => [{ ...report, timestamp }, ...prev]);
      setTripStatus("sedang_berlangsung");
      setCurrentPage("beranda");
    } catch (err) {
      alert("Gagal simpan data inspeksi kendaraan!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInspectionIssues = (report) => {
    const timestamp = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setInspections((prev) => [{ ...report, timestamp }, ...prev]);
    setTripStatus("belum_mulai");
    setCurrentPage("ringkasan");
    setPreparationData(null);
  };

  const handleTripSubmit = async (report) => {
    setIsProcessing(true);
    try {
      await apiService.submitSesiPerjalanan(preparationData.laporan_id, {
        tipe_sesi: currentShift.toUpperCase(),
        jam_berangkat_kantor: "05:50",
        km_berangkat_kantor: parseInt(preparationData.odometer || 0),
        jam_berangkat_start: tripData?.arrivalTime ? tripData.arrivalTime.replace(" WIB", "") : "06:15",
        km_berangkat_start: parseInt(tripData?.odometer || 0),
        jam_tiba_finish: "07:00",
        km_tiba_finish: parseInt(tripData?.odometer || 0) + 15,
        jumlah_penumpang: report.passengers.total,
        jam_tiba_kantor: "07:30",
        km_tiba_kantor: parseInt(tripData?.odometer || 0) + 20,
      });

      if (currentShift === "pagi") {
        setTempMorningData(report.morning || report);
        setCurrentShift("siang");
        setIsLaporanLocked(true);
        setCurrentPage("beranda");
        setTripData(null);
      } else {
        setTripStatus("belum_mulai");
        setCurrentShift("pagi");
        setTempMorningData(null);
        setIsLaporanLocked(false);
        setCurrentPage("ringkasan");
        setTripData(null);
      }
    } catch (err) {
      alert("Gagal menyimpan data penumpang & sesi perjalanan!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetLogs = () => {
    setInspections([]);
    setTrips([]);
    setDriverReports([]);
    setTripStatus("belum_mulai");
  };

  // 🔥 NAVIGASI MENU SEKARANG INSTAN (NO LOADING)
  const handleMenuNavigation = (targetMenuOrPage) => {
    let finalPage = targetMenuOrPage;
    if (user?.role?.toLowerCase() === "admin") {
      if (targetMenuOrPage === "riwayatdriver") finalPage = "riwayatdriver";
      else if (targetMenuOrPage === "rekap") finalPage = "rekap";
      else if (targetMenuOrPage === "kelolauser") finalPage = "kelolauser";
      else if (targetMenuOrPage === "akun") finalPage = "akun";
      else finalPage = "riwayatdriver";
    } else {
      if (targetMenuOrPage === "laporan") finalPage = "persiapan";
      else if (targetMenuOrPage === "riwayat") finalPage = "ringkasan";
      else if (targetMenuOrPage === "akun") finalPage = "akun";
      else if (targetMenuOrPage === "beranda") finalPage = "beranda";
    }
    setCurrentPage(finalPage);
  };

  const renderLockedScreen = () => {
    const nextShiftName = currentShift === "siang" ? "Siang" : "Pagi (Besok)";
    const nextShiftTime = currentShift === "siang" ? shiftRules.siang : shiftRules.pagi;

    return (
      <div className="flex flex-col items-center justify-center p-8 mt-16 text-center space-y-5 animate-[fadeIn_0.3s]">
        <div className="w-24 h-24 bg-[#FCE8E6] text-[#C5221F] rounded-full flex items-center justify-center border-4 border-[#FAD2CF] shadow-sm">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-[#00206B] uppercase m-0">Laporan Dikunci</h2>
        <div className="bg-white border-2 border-slate-200 w-full max-w-sm p-4 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Jadwal Pengisian Selanjutnya:</p>
          <p className="text-xl font-black text-[#C5221F]">
            Shift {nextShiftName} - {nextShiftTime}:00 WIB
          </p>
        </div>
        <p className="text-xs font-bold text-slate-500 max-w-xs leading-relaxed">
          Anda sudah menyelesaikan form shift sebelumnya. Cek Beranda untuk melihat progress atau hubungi Admin jika butuh akses mendesak.
        </p>
        <button
          onClick={() => handleMenuNavigation("beranda")}
          className="mt-2 w-full max-w-xs bg-[#00206B] hover:bg-[#00174E] text-white py-4 rounded-xl font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Kembali ke Beranda
        </button>
      </div>
    );
  };

  const getPageTitle = () => {
    if (!user) return "SICLUS";
    switch (currentPage) {
      case "beranda":
        return "SICLUS";
      case "persiapan":
      case "inspeksi":
      case "kendala":
      case "titikstart":
      case "penumpang":
        return "Laporan";
      case "ringkasan":
        return "Riwayat";
      case "riwayatdriver":
        return "Riwayat Driver";
      case "detaillaporan":
        return "Detail Laporan";
      case "rekap":
        return "Rekap Laporan";
      case "kelolauser":
        return "Kelola Pengguna";
      case "akun":
        return "Profil Akun";
      default:
        return "SICLUS";
    }
  };

  const handleBack = () => {
    if (currentPage === "inspeksi") setCurrentPage("persiapan");
    else if (currentPage === "kendala") setCurrentPage("inspeksi");
    else if (currentPage === "penumpang") setCurrentPage("titikstart");
    else if (currentPage === "detaillaporan") setCurrentPage("riwayatdriver");
    else if (currentPage === "akun" || currentPage === "rekap" || currentPage === "kelolauser" || currentPage === "riwayatdriver") {
      handleMenuNavigation("beranda");
    } else {
      handleMenuNavigation("beranda");
    }
  };

  const renderPage = () => {
    if (!user) return <Login onLoginSuccess={handleLogin} />;

    // 🔥 RENDER LOADING HANYA SAAT SUBMIT FORM / PINDAH STEP LAPORAN!
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-6 animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#00206B] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-[#00206B] font-black text-sm tracking-[0.2em] uppercase animate-pulse">Memproses Data... 🚀</h3>
        </div>
      );
    }

    switch (currentPage) {
      case "beranda":
        if (user?.role?.toLowerCase() === "admin") {
          setCurrentPage("riwayatdriver");
          return null;
        }
        return (
          <Beranda
            activeUser={user}
            tripStatus={tripStatus}
            onQuickAction={handleMenuNavigation}
            onLogout={handleLogout}
            onStartInspection={handleStartInspection}
            stats={{ totalInspection: inspections.length, activeTrips: trips.length }}
            currentShift={currentShift}
            isLaporanLocked={isLaporanLocked}
            shiftRules={shiftRules}
            onStartSiang={() =>
              processFormStep(() => {
                setIsLaporanLocked(false);
                setCurrentPage("titikstart");
              })
            }
          />
        );

      // case persipan
      case "persiapan":
        if (isLaporanLocked) return renderLockedScreen();
        return (
          <Persiapan
            onNext={async (data) => {
              setIsProcessing(true);
              try {
                const res = await fetch(data.photoPreview);
                const blob = await res.blob();
                const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });

                const formData = new FormData();
                formData.append("foto", file);

                await apiService.uploadSelfie(formData);

                const tglHariIni = new Date().toISOString().split("T")[0];
                const lapRes = await apiService.mulaiLaporan({
                  tanggal: tglHariIni,
                  trayek: user?.trayek || "Trayek Default",
                  bus: user?.bus || "Bus Default",
                });

                setPreparationData({ ...data, laporan_id: lapRes.id });
                setCurrentPage("inspeksi");
              } catch (err) {
                alert("Gagal kirim persiapan! Pastikan server hidup.");
              } finally {
                setIsProcessing(false);
              }
            }}
          />
        );

      // case inspeksi
      case "inspeksi":
        if (isLaporanLocked) return renderLockedScreen();
        if (!preparationData) {
          setCurrentPage("persiapan");
          return null;
        }
        return (
          <Inspeksi
            preparationData={preparationData}
            onNext={(report) => processFormStep(() => handleInspectionSuccess(report))}
            onReportIssue={(report) =>
              processFormStep(() => {
                setPreparationData(report);
                setCurrentPage("kendala");
              })
            }
          />
        );
      case "kendala":
        if (isLaporanLocked) return renderLockedScreen();
        if (!preparationData) {
          setCurrentPage("persiapan");
          return null;
        }
        return <Kendala data={preparationData} onSubmit={(report) => processFormStep(() => handleInspectionIssues(report))} />;
      case "titikstart":
        if (isLaporanLocked) return renderLockedScreen();
        return (
          <TitikStart
            onNext={(data) =>
              processFormStep(() => {
                setTripData(data);
                setCurrentPage("penumpang");
              })
            }
          />
        );
      case "penumpang":
        if (isLaporanLocked) return renderLockedScreen();
        if (!tripData) {
          setCurrentPage("titikstart");
          return null;
        }
        return <Penumpang tripData={tripData} onSubmit={(report) => processFormStep(() => handleTripSubmit(report))} />;
      case "ringkasan":
        return <RingkasanHarian inspections={inspections} trips={trips} currentShift={currentShift} onResetAllLogs={handleResetLogs} />;
      case "riwayatdriver":
        return (
          <RiwayatDriver
            user={user}
            driverReports={driverReports}
            onViewDetail={(report) => {
              setSelectedReport(report);
              setCurrentPage("detaillaporan");
            }}
          />
        );
      case "detaillaporan":
        return <DetailLaporan report={selectedReport} onBack={() => setCurrentPage("riwayatdriver")} />;
      case "rekap":
        return <RekapPage trips={trips} inspections={inspections} />;
      case "kelolauser":
        return (
          <ManageUsers
            onBack={() => setCurrentPage("riwayatdriver")}
            shiftRules={shiftRules}
            setShiftRules={setShiftRules}
            onForceUnlock={() => {
              setIsLaporanLocked(false);
              alert("BERHASIL! Laporan diunlock.");
            }}
          />
        );
      case "akun":
        return <ProfilAkun user={user} onLogout={handleLogout} />;
      default:
        return user?.role?.toLowerCase() === "admin" ? (
          <div className="p-10 text-center">
            <h2 className="text-3xl font-black">Riwayat Driver</h2>
          </div>
        ) : (
          <Beranda activeUser={user} tripStatus={tripStatus} onQuickAction={handleMenuNavigation} onLogout={handleLogout} onStartInspection={handleStartInspection} />
        );
    }
  };

  const getActiveMenuTab = () => {
    if (["persiapan", "inspeksi", "kendala", "titikstart", "penumpang"].includes(currentPage)) {
      return "laporan";
    }
    if (["ringkasan"].includes(currentPage)) {
      return "riwayat";
    }
    if (["detaillaporan"].includes(currentPage)) {
      return "riwayatdriver";
    }
    return currentPage;
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] font-sans antialiased overflow-hidden">
      {!user ? (
        renderPage()
      ) : (
        <MobileLayout
          user={user}
          title={getPageTitle()}
          onBack={currentPage !== "beranda" && currentPage !== "ringkasan" && currentPage !== "rekap" && currentPage !== "kelolauser" && currentPage !== "riwayatdriver" ? handleBack : null}
          activeMenu={getActiveMenuTab()}
          onMenuClick={handleMenuNavigation}
        >
          {renderPage()}
          <BottomNav user={user} activeTab={currentPage} setActiveTab={handleMenuNavigation} />
        </MobileLayout>
      )}
    </div>
  );
}

export default App;
```

---

## 13. `src/components/layout/BottomNav.jsx`

```jsx
import React from 'react';

const BottomNav = ({ activeTab, setActiveTab, user = null }) => {
  const adminNavItems = [
    { id: 'riwayatdriver', label: 'Riwayat', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { id: 'rekap', label: 'Rekap', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg> },
    { id: 'kelolauser', label: 'Kelola', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    { id: 'akun', label: 'Akun', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
  ];

  const driverNavItems = [
    { id: 'beranda', label: 'Beranda', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'laporan', label: 'Laporan', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
    { id: 'riwayat', label: 'Riwayat', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'akun', label: 'Akun', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
  ];

  const navItems = user?.role?.toLowerCase() === 'admin' ? adminNavItems : driverNavItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isReportTabActive = item.id === 'laporan' && (activeTab === 'persiapan' || activeTab === 'inspeksi' || activeTab === 'kendala' || activeTab === 'laporan');
          const isRiwayatTabActive = (item.id === 'riwayat' || item.id === 'riwayatdriver') && (activeTab === 'ringkasan' || activeTab === 'riwayat' || activeTab === 'detaillaporan');
          const isActive = activeTab === item.id || isReportTabActive || isRiwayatTabActive;
          return (
            <button key={item.id} onClick={() => { if (item.id === 'laporan') setActiveTab('persiapan'); else if (item.id === 'riwayat') setActiveTab('ringkasan'); else setActiveTab(item.id); }} className={`flex flex-col items-center justify-center flex-1 py-2.5 rounded-2xl transition-all duration-200 ${isActive ? 'bg-[#66FFAA]/40 text-[#006633] shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
              <div className="mb-1">{item.icon}</div>
              <span className={`text-[11px] font-bold whitespace-nowrap ${isActive ? 'font-extrabold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
```

---

## 14. `src/components/layout/MobileLayout.jsx`

```jsx
import React, { useState } from 'react';

const MobileLayout = ({ children, title = 'SICLUS', onBack = null, activeMenu = 'beranda', onMenuClick = () => {}, user = null }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const adminMenuItems = [
    { id: 'riwayatdriver', label: 'Riwayat Driver', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> },
    { id: 'rekap', label: 'Rekap', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /> },
    { id: 'kelolauser', label: 'Kelola User', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
    { id: 'akun', label: 'Akun', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> }
  ];

  const driverMenuItems = [
    { id: 'beranda', label: 'Beranda', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: 'laporan', label: 'Laporan', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
    { id: 'riwayat', label: 'Riwayat', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'akun', label: 'Akun', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> }
  ];

  const menuItems = user?.role?.toLowerCase() === 'admin' ? adminMenuItems : driverMenuItems;

  return (
    <div className="flex h-screen w-full bg-[#131314] font-sans overflow-hidden">
      <aside className={`hidden md:flex flex-col h-full bg-[#131314] text-[#C4C7C5] transition-all duration-300 ease-in-out border-r border-white/5 z-50 ${isSidebarOpen ? 'w-64' : 'w-[72px]'}`}>
        <div className={`flex items-center h-20 ${isSidebarOpen ? 'px-4 justify-between' : 'justify-center'}`}>
          <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
            <span className="text-xl font-black text-white tracking-widest uppercase">SICLUS</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isReportTabActive = item.id === 'laporan' && ['persiapan', 'inspeksi', 'kendala', 'laporan'].includes(activeMenu);
            const isRiwayatTabActive = (item.id === 'riwayat' || item.id === 'riwayatdriver') && ['ringkasan', 'riwayat', 'detaillaporan'].includes(activeMenu);
            const isActive = activeMenu === item.id || isReportTabActive || isRiwayatTabActive;
            return (
              <button key={item.id} onClick={() => onMenuClick(item.id)} className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-[#A8C7FA]/10 text-[#A8C7FA]' : 'hover:bg-white/5 hover:text-white'}`} title={!isSidebarOpen ? item.label : ''}>
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 flex items-center ${isSidebarOpen ? 'ml-4 opacity-100 w-full' : 'opacity-0 w-0'}`}>
                  <span className="text-sm font-semibold whitespace-nowrap text-left">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
        <div className="p-3 mb-2 border-t border-white/5 mt-auto">
          <div onClick={() => onMenuClick('akun')} className="flex items-center p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors group" title={!isSidebarOpen ? 'Buka Akun' : ''}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className={`overflow-hidden transition-all duration-300 flex flex-col justify-center ${isSidebarOpen ? 'ml-3 w-full opacity-100' : 'w-0 opacity-0'}`}>
              <span className="text-sm font-bold text-white truncate group-hover:text-cyan-200 transition-colors">{user?.name || 'Profil Saya'}</span>
              <span className="text-[10px] text-slate-400 truncate uppercase tracking-widest mt-0.5">{user?.role || 'Pengemudi'}</span>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen relative bg-[#F5F7FB] md:rounded-l-[2.5rem] md:my-2 md:mr-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300">
        <header className="sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-xl px-6 py-4 border-b border-slate-200/50">
          <div className="w-10 flex items-center justify-start">
            {onBack && (
              <button onClick={onBack} className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 text-slate-600 active:scale-95 focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
          </div>
          <div className="text-center flex-1">
            <span className="text-lg font-black tracking-widest text-[#00206B] block uppercase">{title}</span>
          </div>
          <div className="w-10"></div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 pb-28 md:pb-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;
```

---

## 15. `src/components/ui/InspectionToggle.jsx`

```jsx
import React from 'react';

const InspectionToggle = ({ label, isChecked, onChange }) => {
  return (
    <label className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-xl cursor-pointer transition-all duration-200 select-none group">
      <span className="text-xs font-bold text-slate-700 group-hover:text-[#00206B] transition-colors duration-150">
        {label}
      </span>
      <div className="relative">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* Track */}
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${isChecked ? 'bg-[#34A853]' : 'bg-slate-300'}`}></div>
        {/* Thumb */}
        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform duration-200 ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </label>
  );
};

export default InspectionToggle;
```

---

## 16. `src/pages/auth/Login.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { apiService } from "../../services/api";

const Login = ({ onLoginSuccess }) => {
  const [driverId, setDriverId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Tembak API Login (ngelewatin apiService yang udah disetting axios)
      const response = await apiService.login(driverId, pin);

      // 2. SIMPAN TIKET VIP (JWT) KE BRANKAS BROWSER!
      localStorage.setItem("siclus_token", response.access_token);

      // 3. Rapihin data dari Backend lu biar gampang dibaca FE Cevin
      const userData = {
        id: response.user.id,
        name: response.user.nama_lengkap,
        email: response.user.email,
        role: response.user.role,
        trayek: response.user.trayek,
        bus: response.user.bus,
      };

      // 4. Buka gerbang masuk! (Kasih delay dikit biar animasi loadingnya mulus)
      setTimeout(() => {
        onLoginSuccess(userData);
      }, 500);
    } catch (err) {
      // 5. Nangkep pesan error ASLI dari Backend lu (misal: password salah)
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Gagal terhubung ke server pastikan server menyala!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 sm:-top-32 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-gradient-to-b from-blue-500 via-cyan-500 to-indigo-600 rounded-full blur-[80px] sm:blur-[120px] opacity-60 animate-pulse"></div>
      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 sm:-bottom-32 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-gradient-to-t from-purple-600 via-indigo-700 to-pink-500 rounded-full blur-[80px] sm:blur-[120px] opacity-50 animate-pulse"
        style={{ animationDelay: "2.5s" }}
      ></div>
      <div
        className={`relative w-full max-w-[360px] xs:max-w-[390px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[520px] bg-white/85 backdrop-blur-2xl rounded-[2.2rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/70 transition-all duration-1000 ease-out transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <div className="flex flex-col items-center text-center mt-1 mb-5 sm:mb-8">
          <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#00206B] via-[#00174E] to-[#000F33] flex items-center justify-center shadow-md border border-white/20">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="4" y="3" width="16" height="15" rx="3" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <circle cx="8" cy="9" r="1.5" fill="currentColor" />
              <circle cx="16" cy="9" r="1.5" fill="currentColor" />
              <path d="M6 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18H6zM16 18v1.5a0.5 0 000.5 0.5h1a0.5 0 000.5-0.5V18h-2z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-3xl lg:text-4xl font-black text-[#00206B] tracking-tight mt-3 sm:mt-5 uppercase">SICLUS</h2>
          <p className="text-[7px] sm:text-xs font-bold text-slate-500 mt-1 tracking-widest leading-relaxed uppercase">
            School Integrated Check-in & Logbook Unit System
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className={`overflow-hidden transition-all duration-300 ${error ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="p-3 bg-red-500/10 border border-red-200/80 backdrop-blur-sm rounded-2xl text-xs text-red-600 font-bold text-center flex items-center justify-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] sm:text-sm font-bold text-[#00206B] ml-1 uppercase tracking-wide">ID Pengemudi / Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="11" r="2.5" />
                  <path d="M15 9h3M15 13h3M15 17h3" />
                </svg>
              </div>
              <input
                type="text"
                required
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full bg-slate-100/80 border-2 border-slate-200/70 focus:border-[#00206B] focus:bg-white focus:ring-4 focus:ring-[#00206B]/10 rounded-2xl pl-10 sm:pl-11 pr-4 py-3 sm:py-4 text-xs sm:text-base font-bold text-[#00206B] placeholder-slate-400 outline-none transition-all duration-300"
                placeholder="Contoh: admin@siclus.id"
              />
            </div>
          </div>
          <div className="space-y-1 group">
            <label className="text-[11px] sm:text-sm font-bold text-[#00206B] ml-1 uppercase tracking-wide">PIN / Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#00206B] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <input
                type={showPin ? "text" : "password"}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-slate-100/80 border-2 border-slate-200/70 focus:border-[#00206B] focus:bg-white focus:ring-4 focus:ring-[#00206B]/10 rounded-2xl pl-10 sm:pl-11 pr-11 py-3 sm:py-4 text-xs sm:text-base font-bold text-[#00206B] placeholder-slate-400 outline-none transition-all duration-300 tracking-wider"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute inset-y-0 right-0 pr-3.5 sm:pr-4 flex items-center text-slate-400 hover:text-[#00206B] transition-colors focus:outline-none"
              >
                {showPin ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#00206B] via-[#001D60] to-[#001240] text-white font-black py-3.5 sm:py-4 px-4 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,32,107,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,32,107,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-3 sm:mt-6 group"
          >
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 opacity-20 group-hover:animate-[shine_1s] pointer-events-none" />
            <div className="flex items-center justify-center gap-2 relative z-10 text-xs sm:text-base">
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white/70" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>MEMPROSES...</span>
                </>
              ) : (
                <>
                  <span>MASUK SISTEM</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200/60">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span className="text-[9px] sm:text-xs font-bold text-slate-500 tracking-wide uppercase">Siclus 1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

---

## 17. `src/pages/auth/Register.jsx`

```jsx
import React, { useState } from 'react';

const Register = ({ onRegisterSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    // Simpan ke localStorage (nanti bisa diganti backend)
    const users = JSON.parse(localStorage.getItem('siclus_users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      setError('Email sudah terdaftar!');
      return;
    }

    const newUser = {
      id: `USR${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone
    };

    users.push(newUser);
    localStorage.setItem('siclus_users', JSON.stringify(users));
    
    onRegisterSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#00206B] to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">SICLUS</h1>
          <p className="text-slate-300 text-sm mt-2">Sistem Informasi Angkutan Sekolah</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#00206B]">Buat Akun Admin</h2>
            <p className="text-xs text-slate-400 mt-1">Daftar untuk mengelola sistem</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="admin@siclus.id"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                No. Telepon
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="081234567890"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none transition-all"
                placeholder="Ulangi password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all text-sm cursor-pointer mt-2"
            >
              DAFTAR SEKARANG
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Sudah punya akun?{' '}
              <button
                onClick={onBackToLogin}
                className="text-[#00206B] font-bold hover:underline cursor-pointer"
              >
                Login di sini
              </button>
            </p>
          </div>
        </div>

        {/* Dummy Account Info */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
          <p className="text-xs text-white font-bold mb-2">📝 Akun Dummy untuk Testing:</p>
          <div className="space-y-1 text-[10px] text-slate-200 font-mono">
            <div>Admin: admin@siclus.id / admin123</div>
            <div>Supir: budi@siclus.id / budi123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
```

---

## 18. `src/pages/auth/ManageUser.jsx`

```jsx
// src/pages/admin/ManageUsers.jsx
import React, { useState } from 'react';
import { dummyUsers } from '../../utils/usersData';

const ManageUsers = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'pengemudi',
    phone: '',
    trayek: '',
    bus: ''
  });
  const [successMsg, setSuccessMsg] = useState('');

  // Load users dari localStorage + dummy
  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');
  const allUsers = [...dummyUsers, ...localUsers];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('siclus_users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      alert('Email sudah terdaftar!');
      return;
    }

    const newUser = {
      id: `SUP${String(users.length + 1).padStart(3, '0')}`,
      ...formData
    };

    users.push(newUser);
    localStorage.setItem('siclus_users', JSON.stringify(users));
    
    setSuccessMsg(`User ${formData.name} berhasil ditambahkan!`);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'pengemudi',
      phone: '',
      trayek: '',
      bus: ''
    });

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
            Kelola Pengguna
          </h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">
            Tambah, edit, atau hapus akun pengemudi
          </p>
        </div>
        <button
          onClick={onBack}
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold py-3 px-4 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      {/* Add User Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        TAMBAH PENGGUNA BARU
      </button>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allUsers.filter(u => u.role !== 'admin').map((user) => (
          <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#00206B] truncate">{user.name}</h3>
                <p className="text-xs text-slate-400 font-semibold">{user.id}</p>
                <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Trayek</span>
                <span className="font-bold text-[#00206B]">{user.trayek || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Bus</span>
                <span className="font-bold text-[#00206B]">{user.bus || '-'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#00206B]">Tambah Pengguna Baru</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Nama pengemudi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="pengemudi@siclus.id"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="081234567890"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Trayek
                </label>
                <input
                  type="text"
                  name="trayek"
                  value={formData.trayek}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Trayek A"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Bus
                </label>
                <input
                  type="text"
                  name="bus"
                  value={formData.bus}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-all"
                  placeholder="Bus 07 (S 1772 SP)"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                TAMBAH PENGGUNA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
```

---

## 19. `src/pages/auth/UserData.jsx`

```jsx
// src/utils/usersData.js

export const dummyUsers = [
  // Admin
  {
    id: 'ADM001',
    name: 'Admin SICLUS',
    email: 'admin@siclus.id',
    password: 'admin123',
    role: 'admin',
    phone: '081234567890'
  },
  // Supir 1
  {
    id: 'SUP001',
    name: 'Pak Budi',
    email: 'budi@siclus.id',
    password: 'budi123',
    role: 'pengemudi',
    phone: '081234567891',
    trayek: 'Trayek A',
    bus: 'Bus 07 (S 1772 SP)'
  },
  // Supir 2
  {
    id: 'SUP002',
    name: 'Pak Joko',
    email: 'joko@siclus.id',
    password: 'joko123',
    role: 'pengemudi',
    phone: '081234567892',
    trayek: 'Trayek B',
    bus: 'Bus 03 (S 1773 SP)'
  },
  // Supir 3
  {
    id: 'SUP003',
    name: 'Pak Ahmad',
    email: 'ahmad@siclus.id',
    password: 'ahmad123',
    role: 'pengemudi',
    phone: '081234567893',
    trayek: 'Trayek C',
    bus: 'Bus 05 (S 1774 SP)'
  }
];

// Dummy trips data untuk rekap
export const dummyTrips = [
  {
    id: 'TRP001',
    driverId: 'SUP001',
    driverName: 'Pak Budi',
    trayek: 'Trayek A',
    bus: 'Bus 07',
    date: '2023-10-24',
    morning: {
      start: '05:30',
      end: '07:15',
      passengers: 42,
      odometerStart: 45200,
      odometerEnd: 45230
    },
    afternoon: {
      start: '12:00',
      end: '14:00',
      passengers: 38,
      odometerStart: 45230,
      odometerEnd: 45260
    },
    status: 'completed'
  },
  {
    id: 'TRP002',
    driverId: 'SUP002',
    driverName: 'Pak Joko',
    trayek: 'Trayek B',
    bus: 'Bus 03',
    date: '2023-10-24',
    morning: {
      start: '05:45',
      end: '07:30',
      passengers: 35,
      odometerStart: 32100,
      odometerEnd: 32140
    },
    afternoon: null,
    status: 'partial'
  },
  {
    id: 'TRP003',
    driverId: 'SUP003',
    driverName: 'Pak Ahmad',
    trayek: 'Trayek C',
    bus: 'Bus 05',
    date: '2023-10-24',
    morning: {
      start: '06:00',
      end: '08:00',
      passengers: 40,
      odometerStart: 28500,
      odometerEnd: 28545
    },
    afternoon: {
      start: '12:30',
      end: '14:30',
      passengers: 37,
      odometerStart: 28545,
      odometerEnd: 28590
    },
    status: 'completed'
  }
];
```

---

## 20. `src/pages/Beranda.jsx`

```jsx
import React from 'react';

const Beranda = ({ 
  activeUser, 
  onQuickAction, 
  onLogout, 
  tripStatus = 'belum_mulai', 
  onStartInspection,
  currentShift,
  isLaporanLocked,
  shiftRules,
  onStartSiang
}) => {
  // 🔥 BELAJAR DISINI: Bikin tanggalnya otomatis ngikutin hari ini
  const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const currentHour = new Date().getHours();
  const siangHour = shiftRules?.siang || 12;
  const isSiangTime = currentHour >= siangHour;

  // 🔥 BELAJAR DISINI 1: Komponen Kotak Siang yang bisa dipake di mana aja!
  const renderKotakSiang = () => {
    let btnText = "";
    let isDisabled = true;

    if (currentShift === 'pagi') {
      isDisabled = true;
      btnText = "SELESAIKAN PAGI DULU";
    } else {
      // Udah shift siang, tinggal ngecek jam admin!
      if (isSiangTime) {
        isDisabled = false;
        btnText = "MULAI LAPORAN SIANG";
      } else {
        isDisabled = true;
        btnText = `TUNGGU JAM ${siangHour}:00 WIB`;
      }
    }

    return (
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-[#00206B]">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-base font-extrabold m-0">Laporan Siang</h3>
            <p className="text-[11px] text-slate-500 font-bold mt-1">Buka Pukul {siangHour}:00 WIB</p>
          </div>
        </div>

        <button
          onClick={onStartSiang}
          disabled={isDisabled}
          className={`w-full font-extrabold py-3.5 px-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs ${
            !isDisabled
              ? 'bg-[#00206B] hover:bg-[#00174E] text-white active:scale-[0.98] cursor-pointer'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {isDisabled ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            )}
          </svg>
          {btnText}
        </button>
      </div>
    );
  };

  // 1. RENDER ACTIVE TRIP STATE
  if (tripStatus === 'sedang_berlangsung') {
    return (
      <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0">
            Selamat bertugas, <span className="block text-3xl md:text-4xl font-black">{activeUser?.name || 'Pak Budi'}</span>
          </h2>
          <p className="text-sm text-slate-400 font-semibold">{currentDate}</p>
        </div>

        {/* 🔥 BELAJAR DISINI 2: Gridnya gue balikin 3 kolom biar nggak ada ruang kosong! */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kiri: Active Trip (Ambil 2 Kolom) */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-[#E6F7ED] border border-[#BCECD2] text-[#137333] font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SEDANG BERLANGSUNG
              </div>
              <span className="text-sm font-black text-[#00206B]">06:15 WIB</span>
            </div>

            {/* Route details */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="w-12 h-12 rounded-lg bg-[#00206B] text-white flex items-center justify-center font-black text-xl">
                A
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#00206B] m-0">Trayek A</h4>
                <p className="text-sm text-slate-500 font-medium mt-0.5">Bus 07 (W 1234 XY)</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-slate-200"></div>
              
              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#E6F7ED] border border-[#BCECD2] flex items-center justify-center text-[#137333] text-xs font-bold">✓</div>
                <div>
                  <span className="text-sm font-bold text-slate-500">Pemeriksaan Awal</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">Selesai 06:05</span>
                </div>
              </div>

              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#00206B] border border-white flex items-center justify-center text-white text-xs font-bold">•</div>
                <div>
                  <span className="text-sm font-black text-[#00206B]">Menuju Titik Start</span>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Halte SMPN 1 Mojokerto</p>
                  <div className="flex items-center gap-1.5 text-sm text-[#00206B] font-bold mt-1">
                    <span>Estimasi 10 menit</span>
                  </div>
                </div>
              </div>

              <div className="relative flex gap-3">
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-slate-100 border-2 border-slate-300"></div>
                <div><span className="text-sm font-bold text-slate-300">Perjalanan Rute</span></div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onQuickAction('titikstart')}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              LANJUTKAN LAPORAN ➔
            </button>
          </div>

          {/* Kanan: Sidebar Kanan (Ngisi Ruang Kosong) */}
          <div className="space-y-4">
            
            {/* 🔥 MUNCULIN KOTAK SIANG DISINI JUGA BIAR SUPIR INGET! */}
            {renderKotakSiang()}

            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-black text-[#00206B] block uppercase tracking-wide">LOKASI TERVALIDASI</span>
                <span className="text-xs text-slate-400 font-semibold block">Dishub Mojokerto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER INITIAL STATE
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-[#00206B] m-0">
          {activeUser?.name || 'Pak Budi'}
        </h2>
        <p className="text-sm text-slate-500 font-bold">
          Pengemudi Angkutan Sekolah
        </p>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          {currentDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          
          {isLaporanLocked && currentShift === 'siang' ? (
            // 🔥 BELAJAR DISINI 3: Kalau Pagi kelar, kotak utamanya jadi Ucapan Selamat!
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <div className="w-20 h-20 bg-[#E6F7ED] text-[#137333] rounded-full flex items-center justify-center border-4 border-[#BCECD2]">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-black text-[#00206B] m-0">Shift Pagi Selesai!</h3>
                    <p className="text-sm text-slate-500 font-medium mt-2 max-w-xs mx-auto">Anda telah menyelesaikan tugas pagi. Silakan istirahat, dan mulai laporan siang pada menu di samping ketika waktunya tiba.</p>
                </div>
            </div>
          ) : (
            <>
              <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-2 text-[#137333] shadow-sm">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-black uppercase tracking-wide">
                  SISTEM AKTIF
                </span>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-[#00206B] m-0">
                      Perjalanan Hari Ini
                    </h3>
                    <span className="inline-block bg-slate-100 text-slate-500 font-extrabold text-xs px-3 py-1.5 rounded mt-1.5">
                      BELUM DIMULAI
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-[#00206B] block">Trayek A</span>
                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">Bus 07 (S 1772 SP)</span>
                  </div>
                </div>

                <button
                  onClick={onStartInspection}
                  className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
                >
                  MULAI LAPORAN PAGI
                </button>
              </div>
            </>
          )}
        </div>

        {/* Kanan: Sidebar Cards */}
        <div className="space-y-4">
          
          {/* 🔥 TOMBOL SIANG SELALU ADA DISINI (Nyesuain state disabled-nya otomatis) */}
          {renderKotakSiang()}

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Cepat</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="font-semibold">Batas Buka Pagi</span>
                <span className="text-slate-400">{shiftRules?.pagi || 5}:00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Batas Buka Siang</span>
                <span className="text-slate-400">{shiftRules?.siang || 12}:00 WIB</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Beranda;
```

---

## 21. `src/pages/RingkasanHarian.jsx`

```jsx
import React from 'react';

// 🔥 BELAJAR DISINI: Kita udah nggak butuh onStartSiang di sini, jadi dicabut dari props.
const RingkasanHarian = ({ inspections = [], trips = [], currentShift, onResetAllLogs }) => {
  // Ambil data trip terakhir
  const latestTrip = trips[0];
  const latestInspection = inspections[0];
  
  // Extract data dari inspection
  const odometerStart = latestInspection?.odometer || '67008';
  
  // Extract data dari trip
  const passengerCount = latestTrip?.passengers?.total || latestTrip?.passengers?.seated || 0;
  const departureTime = latestTrip?.departure || '06:10';
  const arrivalTime = latestTrip?.arrival || '06:40';
  const odometerDeparture = latestTrip?.odometerDeparture || '67013';
  const odometerArrival = latestTrip?.odometerArrival || '67018';

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
        RINGKASAN LAPORAN HARIAN
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card 1: Perjalanan Pagi */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#00206B] m-0 pb-2 border-b border-slate-100">
              Perjalanan Pagi
            </h3>
            
            {/* Start / Mulai Row */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Mulai (Dishub)</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">05:30 WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {parseInt(odometerStart).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Departure from Start Point */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Berangkat dari Titik Start</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">{departureTime} WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {parseInt(odometerDeparture).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* End / Selesai Row */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="text-slate-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <div className="flex-1 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700">Selesai (Sekolah)</span>
                <div className="text-right">
                  <span className="font-black text-[#00206B] block">{arrivalTime} WIB</span>
                  <span className="text-xs text-slate-400 font-semibold block mt-0.5">KM {parseInt(odometerArrival).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* Total Passengers Row */}
            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="font-bold text-slate-500">Total Penumpang</span>
              <span className="text-base font-black text-[#00206B]">{passengerCount} Siswa</span>
            </div>
          </div>
          
          {/* 🔥 BELAJAR DISINI: Card Perjalanan Siang beserta tombolnya 
              UDAH GUE BUMI HANGUSKAN DARI SINI BIAR HALAMANNYA BERSIH! 🧹 */}
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          {/* Complete Data Check Box */}
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-2 text-[#137333] shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wide">
              Data Pagi Lengkap
            </span>
          </div>

          {/* Statistics */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Statistik Hari Ini</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Perjalanan</span>
                <span className="font-bold text-[#00206B]">1/2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Siswa</span>
                <span className="font-bold text-[#00206B]">{passengerCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jarak Tempuh</span>
                <span className="font-bold text-[#00206B]">
                  {odometerArrival && odometerStart ? 
                    (parseInt(odometerArrival) - parseInt(odometerStart)).toLocaleString('id-ID') + ' KM' 
                    : '30 KM'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => alert('Laporan harian berhasil disimpan ke server!')}
              className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              SIMPAN LAPORAN HARIAN
            </button>
            {inspections.length > 0 && (
              <button
                onClick={onResetAllLogs}
                className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Hapus Log Percobaan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingkasanHarian;
```

---

## 22. `src/pages/laporan/Persiapan.jsx`

```jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';

const Persiapan = ({ onNext }) => {
  const [odometer, setOdometer] = useState('67008');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [currentFacing, setCurrentFacing] = useState('environment');
  const [videoKey, setVideoKey] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const facingRef = useRef('environment');

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCameraStream = useCallback(async (facing) => {
    setCameraError('');
    setIsCameraLoading(true);

    try {
      stopStream();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      streamRef.current = stream;

      const trySetVideo = () => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              setIsCameraLoading(false);
            }).catch(err => {
              console.error('Play error:', err);
              setCameraError('Gagal memutar video. Coba refresh halaman.');
              setIsCameraLoading(false);
            });
          };
        } else {
          setTimeout(trySetVideo, 100);
        }
      };

      trySetVideo();
    } catch (err) {
      console.error('Camera error:', err);
      let errorMessage = 'Gagal akses kamera';
      if (err.name === 'NotAllowedError') errorMessage = 'Izin kamera ditolak. Aktifkan di pengaturan browser.';
      else if (err.name === 'NotFoundError') errorMessage = 'Kamera tidak ditemukan.';
      else if (err.name === 'NotReadableError') errorMessage = 'Kamera sedang digunakan aplikasi lain.';

      setCameraError(errorMessage);
      setIsCameraLoading(false);
      setShowCamera(false);
    }
  }, [stopStream]);

  useEffect(() => {
    if (showCamera) {
      setVideoKey(prev => prev + 1);
      facingRef.current = currentFacing;
      startCameraStream(currentFacing);
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [showCamera]);

  const switchCamera = useCallback(() => {
    const newFacing = facingRef.current === 'environment' ? 'user' : 'environment';
    facingRef.current = newFacing;
    setCurrentFacing(newFacing);
    setVideoKey(prev => prev + 1);
    startCameraStream(newFacing);
  }, [startCameraStream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setCameraError('Video belum siap. Tunggu sebentar lalu coba lagi.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (facingRef.current === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      setPhotoPreview(dataUrl);
      setPhotoTaken(true);
      setShowCamera(false);
      stopStream();
    }
  }, [stopStream]);

  const stopCamera = useCallback(() => {
    setShowCamera(false);
    setCameraError('');
  }, []);

  const handleRetakePhoto = () => {
    setPhotoTaken(false);
    setPhotoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (odometer && photoTaken) {
      onNext({
        odometer, photoTaken, photoPreview,
        driver: { name: 'Pak Budi', date: '24 Oktober 2023' },
        assignment: { route: 'Trayek A', bus: 'Bus 07', plate: 'S 1772 SP' }
      });
    }
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      {/* Progress Step Bar */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#00206B] text-white flex items-center justify-center text-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#00206B]">Persiapan</span>
        </div>
        <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-xs font-bold">2</div>
          <span className="text-sm font-bold text-slate-400">Inspeksi</span>
        </div>
      </div>

      {/* Grid Layout untuk Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Driver Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#00206B] m-0">Pak Budi</h3>
              <p className="text-sm text-slate-400 font-semibold mt-0.5">24 Oktober 2023</p>
            </div>
          </div>

          {/* Assignment Card */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">Penugasan Saat Ini</span>
            <div className="bg-[#F0F4F8] rounded-xl p-5 flex items-center justify-between border border-slate-100">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#00206B] m-0">Trayek A</h4>
                <p className="text-sm text-slate-500 font-medium">S 1772 SP (Bus 07)</p>
              </div>
              <div className="text-slate-400">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="4" y="3" width="16" height="15" rx="3" />
                  <line x1="4" y1="13" x2="20" y2="13" />
                  <circle cx="8" cy="9" r="1.2" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.2" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Speedometer Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
              <label className="block text-sm font-bold text-slate-500 uppercase tracking-wide">Speedometer Awal (KM)</label>
              <input
                type="number" required value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#00206B] focus:bg-white rounded-xl px-4 py-4 text-base text-[#00206B] font-bold focus:outline-none transition-all"
                placeholder="67008"
              />
            </div>

            {/* Camera UI */}
            {showCamera ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#00206B] shadow-sm bg-black">
                  <video
                    key={videoKey}
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-64 object-cover ${currentFacing === 'user' ? 'scale-x-[-1]' : ''}`}
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {currentFacing === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}
                  </div>
                  {isCameraLoading && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                      <svg className="w-10 h-10 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-white text-xs font-bold">Memuat kamera...</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={switchCamera} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 border-slate-200 hover:bg-slate-50 transition-all text-xs cursor-pointer text-slate-600 disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Switch
                  </button>
                  <button type="button" onClick={stopCamera} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 border-2 border-slate-200 hover:bg-slate-50 transition-all text-xs cursor-pointer text-slate-600 disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Batal
                  </button>
                  <button type="button" onClick={capturePhoto} disabled={isCameraLoading} className="py-3 px-2 rounded-xl font-bold flex flex-col items-center justify-center gap-1 bg-[#00206B] hover:bg-[#00174E] text-white transition-all text-xs cursor-pointer disabled:opacity-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Ambil
                  </button>
                </div>
                {cameraError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-lg text-center">{cameraError}</div>
                )}
              </div>
            ) : photoTaken && photoPreview ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#BCECD2] shadow-sm">
                  <img src={photoPreview} alt="Foto Speedometer" className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-[#137333] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Foto Tersimpan
                  </div>
                </div>
                <button type="button" onClick={handleRetakePhoto} className="w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-slate-200 hover:bg-slate-50 transition-all text-sm cursor-pointer text-slate-600">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Ambil Foto Ulang
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setShowCamera(true)} disabled={isCameraLoading} className="w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:bg-slate-50 transition-all text-sm cursor-pointer text-[#00206B] disabled:opacity-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ambil Foto Selfie
              </button>
            )}

            {/* Proceed Button */}
            <button type="submit" disabled={!photoTaken} className="w-full bg-[#00206B] hover:bg-[#00174E] disabled:bg-slate-300 disabled:text-slate-500 text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer">
              <span>LANJUT KE INSPEKSI</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-4">
          <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-xl p-4 flex items-center gap-3 text-[#137333] shadow-sm">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wide">GPS Tervalidasi</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Info Persiapan</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between"><span className="font-semibold">Waktu Mulai</span><span className="text-slate-400">06:00 WIB</span></div>
              <div className="flex justify-between"><span className="font-semibold">Lokasi</span><span className="text-slate-400">Dishub Mojokerto</span></div>
              <div className="flex justify-between"><span className="font-semibold">Status</span><span className="text-emerald-600 font-bold">Siap</span></div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <h4 className="text-sm font-extrabold text-[#00206B] mb-3">Progress Inspeksi</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs"><span className="text-slate-500">Komponen</span><span className="font-bold">0/9</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-[#00206B] h-2 rounded-full" style={{ width: '0%' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persiapan;
```

---

## 23. `src/pages/laporan/Inspeksi.jsx`

```jsx
import React, { useState } from 'react';

const checklistItems = [
  { id: 'rem', name: 'Rem', icon: '⚙️' },
  { id: 'ac', name: 'AC', icon: '❄️' },
  { id: 'lampu', name: 'Lampu', icon: '💡' },
  { id: 'klakson', name: 'Klakson', icon: '📢' },
  { id: 'wiper', name: 'Wiper', icon: '💧' },
  { id: 'lampuRem', name: 'Lampu Rem', icon: '🔦' },
  { id: 'bell', name: 'Bell', icon: '🔔' },
  { id: 'pintu', name: 'Pintu', icon: '🚪' },
  { id: 'kebersihan', name: 'Kebersihan', icon: '🧹' }
];

const Inspeksi = ({ preparationData, onNext, onReportIssue }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleSelect = (itemId, status) => {
    setAnswers(prev => ({ ...prev, [itemId]: status }));
  };

  const evaluatedCount = Object.keys(answers).length;
  const isAllEvaluated = evaluatedCount === checklistItems.length;

  const handleLanjutkan = () => {
    if (!isAllEvaluated) return;
    const failedItems = Object.entries(answers)
      .filter(([_, status]) => status === 'KURANG')
      .map(([itemId]) => itemId);
    
    if (failedItems.length > 0) {
      onReportIssue({
        preparationData,
        checklist: answers,
        issueItem: failedItems[0]
      });
    } else {
      setShowSummary(true);
    }
  };

  const handleConfirmDeparture = () => {
    onNext({
      preparationData,
      checklist: answers,
      status: 'Siap Berangkat',
      summary: {
        trayek: 'Trayek A',
        armada: 'Bus 07',
        odometer: preparationData.odometer || '67008',
        waktu: '05:50 WIB'
      }
    });
  };

  // 1. RENDER SUMMARY
  if (showSummary) {
    return (
      <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#00206B] m-0">Ringkasan Laporan</h2>
          <p className="text-sm text-slate-400 font-semibold mt-0.5">Tinjauan akhir sebelum keberangkatan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#E6F7ED] border border-[#BCECD2] rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#34A853]/20 flex items-center justify-center text-[#137333] flex-shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-[#137333] m-0">SIAP BERANGKAT</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Semua pengecekan keselamatan telah selesai.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-[#00206B] border border-slate-100">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 block tracking-wide">TRAYEK</span>
                  <span className="text-lg font-extrabold text-[#00206B]">Trayek A</span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-[#00206B] border border-slate-100">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <rect x="4" y="3" width="16" height="15" rx="3" />
                    <line x1="4" y1="13" x2="20" y2="13" />
                    <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-400 block tracking-wide">ARMADA</span>
                  <span className="text-lg font-extrabold text-[#00206B]">Bus 07</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 12l3-3" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-400 block tracking-wide">ODOMETER</span>
                <span className="text-base font-black text-[#00206B]">
                  {preparationData.odometer ? Number(preparationData.odometer).toLocaleString('id-ID') : '67.008'} KM
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
              <div className="text-[#00206B]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 15 14" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-400 block tracking-wide">WAKTU</span>
                <span className="text-base font-black text-[#00206B]">05:50 WIB</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmDeparture}
          className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 text-base cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="4" y="3" width="16" height="15" rx="3" />
            <line x1="4" y1="13" x2="20" y2="13" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="16" cy="9" r="1.5" fill="currentColor" />
          </svg>
          KONFIRMASI BERANGKAT
        </button>
      </div>
    );
  }

  // 2. RENDER PHYSICAL CHECKLIST
  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          INSPEKSI KONDISI KENDARAAN
        </h2>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed mt-0.5">
          Lakukan pemeriksaan visual dan fungsional sebelum memulai perjalanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.map((item) => {
              const status = answers[item.id];
              return (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-xl p-5 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      {item.icon}
                    </span>
                    <span className="text-sm font-black text-[#00206B]">{item.name}</span>
                  </div>
                  <div className="flex bg-slate-100 rounded-lg p-0.5 w-[140px] border border-slate-200/50">
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, 'OK')}
                      className={`flex-1 text-xs font-extrabold py-2 rounded-md transition-all cursor-pointer ${
                        status === 'OK'
                          ? 'bg-[#34A853] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      OK
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.id, 'KURANG')}
                      className={`flex-1 text-xs font-extrabold py-2 rounded-md transition-all cursor-pointer ${
                        status === 'KURANG'
                          ? 'bg-[#C5221F] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      KURANG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-black text-[#00206B] mb-2">
                {evaluatedCount} / {checklistItems.length}
              </div>
              <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                KOMPONEN DIPERIKSA
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-[#00206B] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(evaluatedCount / checklistItems.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleLanjutkan}
            disabled={!isAllEvaluated}
            className="w-full bg-[#00206B] hover:bg-[#00174E] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            LANJUTKAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inspeksi;
```

---

## 24. `src/pages/laporan/Kendala.jsx`

```jsx
import React, { useState } from 'react';

const Kendala = ({ data, onSubmit }) => {
  const [desc, setDesc] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...data,
      status: 'Keberangkatan Ditahan (Rem Bermasalah)',
      kendala: {
        itemTerpengaruh: ['Rem Utama'],
        deskripsi: desc,
        keparahan: 'Kritis',
        photoTaken
      }
    });
  };

  return (
    <div className="space-y-4 text-left max-w-[420px] mx-auto pb-6">
      {/* Detail Kendala Card */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-black text-[#00206B]">Item: Rem</span>
            <span className="bg-[#C5221F] text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              KURANG
            </span>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
              Deskripsi Kendala
            </label>
            <textarea
              required
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#C5221F] focus:bg-white rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none transition-all placeholder-slate-400 resize-none leading-relaxed"
              placeholder="Jelaskan kendala rem secara rinci..."
            />
          </div>
          {/* Photo Button */}
          <button
            type="button"
            onClick={() => setPhotoTaken(true)}
            className={`w-full py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-dashed transition-all text-xs cursor-pointer ${
              photoTaken 
                ? 'bg-[#E6F7ED] border-[#BCECD2] text-[#137333]' 
                : 'bg-slate-50/50 border-slate-300 hover:bg-slate-50 text-[#00206B]'
            }`}
          >
            {photoTaken ? (
              <>
                <span>📷</span>
                <span>Foto Terlampir</span>
              </>
            ) : (
              <>
                <span className="text-sm">📷</span>
                <span>FOTO KONDISI KENDARAAN</span>
              </>
            )}
          </button>
        </div>

        {/* Submit Report Button */}
        <button
          type="submit"
          className="w-full bg-[#C5221F] hover:bg-[#A81F1C] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          LAPORKAN KENDALA
        </button>
      </form>
    </div>
  );
};

export default Kendala;
```

---

## 25. `src/pages/laporan/DetailLaporan.jsx`

```jsx
import React from 'react';

const DetailLaporan = ({ report, onBack }) => {
  // Hitung persentase kelengkapan data
  const calculateCompleteness = () => {
    let total = 0;
    let filled = 0;
    
    if (report.morning) {
      total += 5;
      if (report.morning.start) filled++;
      if (report.morning.odometerStart) filled++;
      if (report.morning.departure) filled++;
      if (report.morning.arrival) filled++;
      if (report.morning.passengers) filled++;
    }
    
    if (report.afternoon) {
      total += 5;
      if (report.afternoon.start) filled++;
      if (report.afternoon.odometerStart) filled++;
      if (report.afternoon.departure) filled++;
      if (report.afternoon.arrival) filled++;
      if (report.afternoon.passengers) filled++;
    }
    
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const completeness = calculateCompleteness();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Riwayat
      </button>

      {/* Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#00206B] uppercase">Kelengkapan Data</h3>
          <span className="text-2xl font-black text-[#00206B]">{completeness}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              completeness >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
              completeness >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {completeness >= 80 ? '✅ Data hampir lengkap' : completeness >= 50 ? '⚠️ Data belum lengkap' : '❌ Data sangat kurang'}
        </p>
      </div>

      {/* Detail Laporan */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-slate-800 uppercase">LAPORAN HARIAN ANGKUTAN SEKOLAH GRATIS KOTA MOJOKERTO</h2>
          <p className="text-sm font-bold text-slate-600">TAHUN 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div><span className="font-bold">HARI / TANGGAL</span><p className="text-slate-700 mt-1">{report.date || '-'}</p></div>
          <div><span className="font-bold">TRAYEK / NOPOL</span><p className="text-slate-700 mt-1">{report.trayek || '-'} / {report.bus || '-'}</p></div>
        </div>

        <table className="w-full border-collapse border-2 border-slate-400 text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2" rowSpan="2">No.</th>
              <th className="border-2 border-slate-400 p-2" rowSpan="2">URAIAN</th>
              <th className="border-2 border-slate-400 p-2" colSpan="2">PELAYANAN</th>
            </tr>
            <tr className="bg-slate-100">
              <th className="border-2 border-slate-400 p-2">PAGI / BERANGKAT SEKOLAH</th>
              <th className="border-2 border-slate-400 p-2">SIANG / PULANG SEKOLAH</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-2 border-slate-400 p-2 text-center">1</td><td className="border-2 border-slate-400 p-2">Nama Pengemudi</td><td className="border-2 border-slate-400 p-2" colSpan="2">{report.driverName || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">2</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerStart || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerStart || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">3</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.start || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.start || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center" rowSpan="9">4</td><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sebelum berangkat</td></tr>
            {['Rem', 'AC', 'Lampu', 'Klakson', 'Wiper kaca', 'Lampu rem/seint', 'Bell Penumpang depan dan belakang', 'Pintu bus depan dan belakang', 'Kebersihan'].map((item, idx) => (
              <tr key={idx}><td className="border-2 border-slate-400 p-2">{String.fromCharCode(97 + idx)}. {item}</td><td className="border-2 border-slate-400 p-2 text-center"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">OK</span><span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded font-bold text-xs ml-2">KURANG</span></td><td className="border-2 border-slate-400 p-2 text-center" rowSpan="8"></td></tr>
            ))}
            <tr><td className="border-2 border-slate-400 p-2 font-bold" colSpan="3">Kondisi kendaraan sesudah berangkat</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">5</td><td className="border-2 border-slate-400 p-2">Jam berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.departure || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.departure || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">6</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat berangkat dari titik awal trayek/start</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerDeparture || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerDeparture || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">7</td><td className="border-2 border-slate-400 p-2">Jam datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.arrival || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.arrival || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">8</td><td className="border-2 border-slate-400 p-2">Km speedometer bus pada saat datang di titik akhir trayek/finish</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerArrival || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerArrival || '-'}</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">9</td><td className="border-2 border-slate-400 p-2">Jumlah penumpang/pelajar yang diangkut</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.passengers || '-'} Orang</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.passengers || '-'} Orang</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">10</td><td className="border-2 border-slate-400 p-2">Jam datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.returnTime || '-'} WIB</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.returnTime || '-'} WIB</td></tr>
            <tr><td className="border-2 border-slate-400 p-2 text-center">11</td><td className="border-2 border-slate-400 p-2">Km speedometer pada saat datang di kantor Dinas Perhubungan Kota Mojokerto</td><td className="border-2 border-slate-400 p-2 text-center">{report.morning?.odometerReturn || '-'}</td><td className="border-2 border-slate-400 p-2 text-center">{report.afternoon?.odometerReturn || '-'}</td></tr>
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <div className="inline-block text-center">
            <p className="font-bold mb-16">PENGEMUDI</p>
            <div className="border-t-2 border-slate-800 pt-2 w-48"><p className="font-bold text-sm">{report.driverName || '________________'}</p></div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs">
          <p className="font-bold">Catatan:</p>
          <p>Jika uraian kondisi kendaraan sebelum berangkat ada yang kurang, maka harus/wajib menghubungi/melaporkan kepada Seksi Angkutan, Bidang Angkutan Jalan.</p>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporan;
```

---

## 26. `src/pages/laporan/Rekap.jsx`

```jsx
import React, { useState } from 'react';
import { dummyUsers, dummyTrips } from '../utils/usersData';

const Rekap = () => {
  const [activeTab, setActiveTab] = useState('drivers');
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Gabungkan dummy users dengan yang di localStorage
  const allUsers = [...dummyUsers];
  const localUsers = JSON.parse(localStorage.getItem('siclus_users') || '[]');
  const drivers = [...allUsers, ...localUsers].filter(u => u.role !== 'admin');
  const admins = [...allUsers, ...localUsers].filter(u => u.role === 'admin');

  const allTrips = [...dummyTrips];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          Rekapitulasi Data
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          Pantau performa seluruh pengemudi angkutan sekolah
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Supir</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">{drivers.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#00206B]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Perjalanan</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">{allTrips.length}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Total Penumpang</span>
              <span className="text-2xl font-black text-[#00206B] block mt-1">
                {allTrips.reduce((sum, t) => sum + (t.morning?.passengers || 0) + (t.afternoon?.passengers || 0), 0)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">Selesai Hari Ini</span>
              <span className="text-2xl font-black text-green-600 block mt-1">
                {allTrips.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white border border-slate-100 rounded-xl p-1.5 shadow-sm">
        <button
          onClick={() => { setActiveTab('drivers'); setSelectedDriver(null); }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'drivers' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Daftar Supir
        </button>
        <button
          onClick={() => setActiveTab('trips')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'trips' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Riwayat Perjalanan
        </button>
        <button
          onClick={() => setActiveTab('admins')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'admins' ? 'bg-[#00206B] text-white' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          Admin
        </button>
      </div>

      {/* Content */}
      {activeTab === 'drivers' && !selectedDriver && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drivers.map((driver) => {
            const driverTrips = allTrips.filter(t => t.driverId === driver.id);
            const totalPassengers = driverTrips.reduce((sum, t) => sum + (t.morning?.passengers || 0) + (t.afternoon?.passengers || 0), 0);
            
            return (
              <div
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {driver.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-[#00206B] truncate">{driver.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{driver.id}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{driver.trayek || 'Belum ditugaskan'}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Perjalanan</span>
                    <span className="text-sm font-black text-[#00206B]">{driverTrips.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Penumpang</span>
                    <span className="text-sm font-black text-[#00206B]">{totalPassengers}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Driver Detail */}
      {activeTab === 'drivers' && selectedDriver && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedDriver(null)}
            className="flex items-center gap-2 text-sm font-bold text-[#00206B] hover:underline cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar
          </button>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl">
                {selectedDriver.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-[#00206B]">{selectedDriver.name}</h3>
                <p className="text-sm text-slate-400 font-semibold">{selectedDriver.id} • {selectedDriver.role}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedDriver.email}</p>
              </div>
            </div>

            <h4 className="text-sm font-extrabold text-[#00206B] mb-3 uppercase tracking-wide">Riwayat Perjalanan</h4>
            <div className="space-y-3">
              {allTrips.filter(t => t.driverId === selectedDriver.id).map((trip) => (
                <div key={trip.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-[#00206B]">{trip.trayek} • {trip.bus}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {trip.status === 'completed' ? 'SELESAI' : 'PARTIAL'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Pagi</span>
                      <span className="font-bold text-[#00206B]">{trip.morning?.start || '-'} - {trip.morning?.end || '-'}</span>
                      <span className="text-slate-500 block">{trip.morning?.passengers || 0} penumpang</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Siang</span>
                      <span className="font-bold text-[#00206B]">{trip.afternoon?.start || '-'} - {trip.afternoon?.end || '-'}</span>
                      <span className="text-slate-500 block">{trip.afternoon?.passengers || 0} penumpang</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trips' && (
        <div className="space-y-3">
          {allTrips.map((trip) => (
            <div key={trip.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#00206B]">{trip.driverName}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{trip.trayek} • {trip.bus} • {trip.date}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  trip.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {trip.status === 'completed' ? 'SELESAI' : 'PARTIAL'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-slate-400 block mb-1">PERJALANAN PAGI</span>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{trip.morning?.start || '-'} → {trip.morning?.end || '-'}</span>
                    <span className="font-black text-[#00206B]">{trip.morning?.passengers || 0} org</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="text-xs font-bold text-slate-400 block mb-1">PERJALANAN SIANG</span>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-slate-700">{trip.afternoon?.start || '-'} → {trip.afternoon?.end || '-'}</span>
                    <span className="font-black text-[#00206B]">{trip.afternoon?.passengers || 0} org</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admins.map((admin) => (
            <div key={admin.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-lg">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#00206B]">{admin.name}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{admin.id}</p>
                  <p className="text-xs text-slate-500 mt-1">{admin.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  ADMIN
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rekap;
```

---

## 27. `src/pages/laporan/RiwayatDriver.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const RiwayatDriver = ({ onViewDetail, user }) => { 
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Menarik data berdasarkan hak akses (Role)
    const fetchRiwayat = user.role.toLowerCase() === "admin" 
      ? apiService.getRekapAdmin() 
      : apiService.getRiwayatDriver();

    fetchRiwayat
      .then(res => {
        if (res.data) {
          const formattedData = res.data.map(item => ({
            ...item,
            driverName: user.role.toLowerCase() === "admin" ? item.id_supir : "Anda",
            date: item.tanggal,
            trayek: item.trayek,
            bus: item.bus,
            submittedAt: item.trip_sessions && item.trip_sessions.length > 0 ? "Selesai Direkam" : "Menunggu Penyelesaian"
          }));
          
          // Mengurutkan data laporan terbaru di urutan teratas
          formattedData.sort((a, b) => new Date(b.created_at || b.tanggal) - new Date(a.created_at || a.tanggal));

          setReports(formattedData);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return <div className="text-center p-10 font-bold text-[#00206B] animate-pulse">Memuat Data Laporan Operasional... ⏳</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">
          {user?.role?.toLowerCase() === "admin" ? "Laporan Seluruh Pengemudi" : "Riwayat Perjalanan Anda"}
        </h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          {user?.role?.toLowerCase() === "admin" ? "Pemantauan data laporan operasional dari seluruh armada." : "Catatan operasional harian yang telah Anda laporkan."}
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((report, index) => (
            <div key={index} onClick={() => onViewDetail(report)} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {report.driverName?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-[#00206B] truncate">{report.driverName}</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{report.date} • {report.trayek} • {report.bus}</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">Status: {report.submittedAt}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <h3 className="text-lg font-extrabold text-slate-600 m-0">Belum Ada Data Laporan</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Data operasional pengemudi akan tampil di sini.</p>
        </div>
      )}
    </div>
  );
};

export default RiwayatDriver;
```

---

## 28. `src/pages/perjalanan/TitikStart.jsx`

```jsx
import React, { useState } from "react";

const TitikStart = ({ onNext }) => {
  const [odometer, setOdometer] = useState("67013");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (odometer) {
      onNext({
        odometer,
        terminal: "Terminal Kertajaya",
        route: "Rute Pagi - SMPN 1 Mojokerto",
        arrivalTime: "06:10 WIB",
      });
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto pb-6">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0 tracking-wide uppercase">Tiba di Titik Start</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">Laporan Kedatangan Bus</p>
      </div>

      {/* Wrapper Card Biar Rapi di Desktop */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Automatic Time Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E6F7ED] text-[#137333] flex items-center justify-center">
              {/* Clock Icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block tracking-wide uppercase">Waktu Tercatat Otomatis</span>
              <span className="text-xl font-black text-[#00206B] mt-0.5 block">06:10 WIB</span>
            </div>
          </div>

          {/* On Time Badge */}
          <div className="flex items-center gap-1.5 bg-[#E6F7ED] text-[#137333] px-3 py-1.5 rounded-full font-extrabold text-xs">
            <span>✓</span>
            <span>Tepat Waktu</span>
          </div>
        </div>

        {/* Speedometer Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#00206B] uppercase tracking-wide">Odometer Kendaraan (KM)</label>
            <div className="relative flex items-center bg-white border-2 border-[#00206B] rounded-2xl px-5 py-4 shadow-sm">
              <input
                type="number"
                required
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full bg-transparent text-center text-2xl font-black text-[#00206B] focus:outline-none placeholder-slate-300"
                placeholder="67013"
              />
              <span className="absolute right-5 text-sm font-black text-[#00206B]">KM</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">Pastikan angka sesuai dengan dashboard bus saat tiba.</p>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            KONFIRMASI TIBA ✓
          </button>
        </form>
      </div>
    </div>
  );
};

export default TitikStart;
```

---

## 29. `src/pages/perjalanan/Penumpang.jsx`

```jsx
import React, { useState } from 'react';

const Penumpang = ({ tripData, onSubmit }) => {
  const [passengerCount, setPassengerCount] = useState(6);

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      setPassengerCount(val);
    } else if (e.target.value === '') {
      setPassengerCount('');
    }
  };

  const handleBlur = () => {
    if (passengerCount === '') {
      setPassengerCount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...tripData,
      passengers: {
        seated: passengerCount,
        standing: 0,
        total: passengerCount
      }
    });
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto pb-6">
      
      {/* Title Section */}
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-black text-[#00206B] m-0">Pencatatan Penumpang</h2>
        <p className="text-sm text-slate-400 font-semibold mt-0.5">
          {tripData?.route || 'Rute Pagi - SMPN 1 Mojokerto'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Input Penumpang (2/3 layar Desktop) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 flex flex-col items-center h-full">
            <span className="text-lg font-extrabold text-[#00206B] tracking-tight block">
              Jumlah Pelajar / Penumpang
            </span>
            <div className="flex items-center justify-center gap-8 py-4 select-none w-full max-w-[400px]">
              <button
                type="button"
                onClick={() => setPassengerCount(Math.max(0, (typeof passengerCount === 'number' ? passengerCount : 0) - 1))}
                className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-3xl font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              >
                －
              </button>
              
              <div className="flex items-baseline justify-center relative flex-1 min-w-[100px]">
                <input
                  type="text"
                  value={passengerCount}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-full text-center text-6xl font-black text-[#00206B] focus:outline-none bg-transparent"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPassengerCount((typeof passengerCount === 'number' ? passengerCount : 0) + 1)}
                  className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-3xl font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                >
                  ＋
                </button>
                <span className="text-sm font-black text-slate-500">Orang</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold pt-2 border-t border-slate-50 w-full justify-center">
              <span>ⓘ</span>
              <span>Klik +/- atau ketik langsung angkanya</span>
            </div>
          </div>
        </div>

        {/* 🔥 BELAJAR DISINI: Kolom Kanan: Info Perjalanan 
            Gue ubah padding jadi p-8 (setara kotak kiri),
            Font title dibesarin (text-lg), Font list dibesarin (text-sm/base),
            Margin/Space ditambahin biar renggang dan proporsional! */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm h-full">
            <h4 className="text-lg font-extrabold text-[#00206B] mb-5 border-b border-slate-100 pb-3">Info Perjalanan</h4>
            <div className="space-y-4 text-sm text-slate-600">
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Rute</span>
                <span className="text-base font-black text-[#00206B]">Pagi</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Trayek</span>
                <span className="text-base font-black text-[#00206B]">A</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500">Bus</span>
                <span className="text-base font-black text-[#00206B]">07</span>
              </div>
              
            </div>
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#00206B] hover:bg-[#00174E] text-white font-extrabold py-4 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        SIMPAN DATA PENUMPANG
      </button>
    </div>
  );
};

export default Penumpang;
```

---

## 30. `src/services/api.js`

```javascript
import axios from "axios";

// 1. NGAMBIL URL DARI FILE .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// 2. BIKIN MESIN AXIOS
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420", // RESEP AGAR ANTI-BLOKIR NGROK
  },
});

// 3. SATPAM TOKEN (INTERCEPTOR)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("siclus_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 4. DAFTAR COLOKAN API
export const apiService = {
  login: async (email, password) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  // ZONA DRIVER
  getJadwalDriver: async () => {
    const response = await apiClient.get("/driver/jadwal");
    return response.data;
  },
  getProfilDriver: async () => {
    const response = await apiClient.get("/driver/profil");
    return response.data;
  },
  getRiwayatDriver: async () => {
    const response = await apiClient.get("/driver/riwayat");
    return response.data;
  },
  updateFotoProfil: async (formData) => {
    const response = await apiClient.put("/driver/profil/foto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  mulaiLaporan: async (data) => {
    const response = await apiClient.post("/laporan/mulai", data);
    return response.data;
  },
  submitInspeksi: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/inspeksi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  submitSesiPerjalanan: async (laporanId, data) => {
    const response = await apiClient.post(`/laporan/sesi?laporan_id=${laporanId}`, data);
    return response.data;
  },
  uploadSelfie: async (formData) => {
    const response = await apiClient.post("/laporan/upload-selfie", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // ZONA ADMIN
  getDashboardAdmin: async () => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  },
  getUsersAdmin: async () => {
    const response = await apiClient.get("/admin/users");
    return response.data;
  },
  tambahUserAdmin: async (userData) => {
    const response = await apiClient.post("/admin/users", userData);
    return response.data;
  },
  getRekapAdmin: async () => {
    const response = await apiClient.get("/admin/rekap");
    return response.data;
  },
  exportExcelAdmin: async () => {
    const response = await apiClient.get("/admin/export-excel", {
      responseType: "blob",
    });
    return response.data;
  },
};

export default apiClient;
```

---

## 31. `src/utils/UserData.js`

```javascript
// src/utils/usersData.js
export const dummyUsers = [
  {
    id: 'ADM001',
    name: 'Admin SICLUS',
    email: 'admin@siclus.id',
    password: 'admin123',
    role: 'admin',
    phone: '081234567890'
  },
  {
    id: 'SUP001',
    name: 'Pak Budi',
    email: 'budi@siclus.id',
    password: 'budi123',
    role: 'pengemudi',
    phone: '081234567891',
    trayek: 'Trayek A',
    bus: 'Bus 07 (S 1772 SP)'
  },
  {
    id: 'SUP002',
    name: 'Pak Joko',
    email: 'joko@siclus.id',
    password: 'joko123',
    role: 'pengemudi',
    phone: '081234567892',
    trayek: 'Trayek B',
    bus: 'Bus 03 (S 1773 SP)'
  }
];
```

---

## 32. `src/utils/dummyData.js`

```javascript
export const dummyDrivers = [
  { id: 'D001', name: 'Pak Budi', phone: '0812-3456-7890', status: 'Aktif', vehicleId: 'B-1234-TJS' },
  { id: 'D002', name: 'Pak Joko', phone: '0813-9876-5432', status: 'Sedang Tugas', vehicleId: 'B-5678-WQA' },
  { id: 'D003', name: 'Bu Ani', phone: '0815-1122-3344', status: 'Libur', vehicleId: 'B-9012-KLP' },
];

export const dummyVehicles = [
  { id: 'V001', plateNumber: 'B-1234-TJS', type: 'Bus TransJakarta', capacity: 50, condition: 'Baik' },
  { id: 'V002', plateNumber: 'B-5678-WQA', type: 'Microtrans (Angkot)', capacity: 15, condition: 'Baik' },
  { id: 'V003', plateNumber: 'B-9012-KLP', type: 'Medium Bus', capacity: 30, condition: 'Butuh Perbaikan' },
];

export const dummyInspections = [
  { id: 'I001', driverId: 'D001', vehicleId: 'V001', date: '2026-08-18', time: '08:00', status: 'Selesai', notes: 'Semua aman' },
  { id: 'I002', driverId: 'D002', vehicleId: 'V002', date: '2026-08-18', time: '09:30', status: 'Tertunda', notes: 'Pengecekan rem' },
];

export const dummyTrips = [
  { id: 'T001', driverName: 'Pak Budi', route: 'Rute 1A (Balai Kota - PIK)', passengers: 42, startTime: '07:15', status: 'Dalam Perjalanan' },
  { id: 'T002', driverName: 'Pak Joko', route: 'Rute 2B (Kuningan - Senayan)', passengers: 12, startTime: '08:45', status: 'Terjadwal' },
];
```

---

## 33. `src/utils/dummyTesting.js`

```javascript
export const dummyLaporanPagi = [
  {
    driverName: 'Pak Budi (Full Day)',
    date: '26 Agustus 2026',
    submittedAt: '26 Agustus 2026, 16:00 WIB',
    trayek: 'Trayek A',
    bus: 'Bus 07 (S 1772 SP)',
    morning: {
      odometerStart: '67008', start: '05:30', departure: '06:10', odometerDeparture: '67013',
      arrival: '06:40', odometerArrival: '67018', passengers: 12, returnTime: '07:00', odometerReturn: '67023'
    },
    afternoon: {
      odometerStart: '67023', start: '13:00', departure: '13:30', odometerDeparture: '67028',
      arrival: '14:15', odometerArrival: '67035', passengers: 15, returnTime: '15:00', odometerReturn: '67040'
    }
  },
  {
    driverName: 'Pak Joko (Test Pagi)',
    date: '26 Agustus 2026',
    submittedAt: '26 Agustus 2026, 10:40 WIB',
    trayek: 'Trayek B',
    bus: 'Bus 03 (S 1773 SP)',
    morning: {
      odometerStart: '71000', start: '05:45', departure: '06:15', odometerDeparture: '71005',
      arrival: '06:50', odometerArrival: '71012', passengers: 8, returnTime: '07:15', odometerReturn: '71018'
    },
    afternoon: null
  }
];
```

---

## 34. `src/utils/formatTime.js`

```javascript
export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes} WIB`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
```

---
