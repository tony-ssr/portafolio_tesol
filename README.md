# Portafolio TESOL — María Alejandra Acosta Rodríguez

Portafolio de enseñanza TESOL desarrollado como parte del 7.° semestre
del Programa de Licenciatura en Español e Inglés de la **Universidad de Nariño**.

🌐 **Live:** Desplegado en [Vercel](https://vercel.com)

---

## ✨ Acerca de este portafolio

Este portafolio documenta el proceso formativo de María Alejandra Acosta Rodríguez
como futura docente de lenguas, e incluye:

- Reflexión crítica sobre el currículo en contexto colombiano
- Diseño de un silabo TESOL para grado 5.°, escuela rural, San Andrés de Sotavento
- Plan de clase: *Verb To Be* (pre-A1 a A1)
- Certificado de asistencia — VI Conferencia Internacional
- Materiales pedagógicos originales (LEGO, The Office, Rapunzel)

---

## 🗂 Estructura del proyecto

```
portafolio-web/
├── index.html              # Página principal (SPA)
├── vercel.json             # Configuración de despliegue Vercel
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── styles.css      # Estilos completos (design tokens, layout, responsive)
    ├── js/
    │   └── main.js         # Interactividad: navbar, lightbox, PDF modal, reveal
    ├── images/
    │   ├── maria-alejandra-profile.jpg
    │   ├── pompom-hero.jpg         # Ilustración Pompompurin — estudio
    │   ├── pompom-badge.jpg        # Ilustración Pompompurin — badge
    │   ├── pompom-grad.jpg         # Ilustración Pompompurin — graduación
    │   └── syllabus/
    │       ├── syllabus-01-learner-background.jpg
    │       ├── syllabus-02-weekly-plan.jpg
    │       ├── syllabus-03-cover-objectives.jpg
    │       ├── syllabus-04-activities-table.jpg
    │       └── syllabus-05-evaluation-criteria.jpg
    └── documents/
        ├── lesson-plan.pdf
        ├── certificate-attendance.pdf
        ├── material-01-lego.pdf
        ├── material-02-the-office.pdf
        └── material-03-rapunzel.pdf
```

---

## 🚀 Despliegue

### GitHub Pages (opcional)
1. Sube la carpeta `portafolio-web/` a tu repositorio como raíz.
2. En Settings → Pages, selecciona la rama y carpeta raíz.

### Vercel (recomendado)
1. Importa el repositorio en [vercel.com/new](https://vercel.com/new).
2. Selecciona **Framework Preset: Other** (sitio estático).
3. Establece **Root Directory** a `portafolio-web` (o mueve los archivos a la raíz del repo).
4. ¡Listo! Vercel detecta `index.html` y despliega automáticamente.

---

## 🎨 Diseño

- **Tema:** Pompompurin (Sanrio) × Estética Profesional Académica
- **Paleta:** Golden Yellow `#F5C842` · Warm Cream `#FFF8E1` · Brown `#8B6914` · Soft Beige `#FAF0D7`
- **Tipografía:** Playfair Display (display) + Inter (cuerpo)
- **Principios:** Apple Human Interface Guidelines — Simplicity, Craft, Delight, Accessibility

---

## ♿ Accesibilidad

- Contraste WCAG AA en todos los textos
- Skip-link para navegación por teclado
- ARIA labels en modales, botones y galería de imágenes
- Foco visible en todos los elementos interactivos
- Responsive: mobile-first, 320px → 1200px+

---

*Portafolio creado con ❤️ y 🐾 Pompompurin — 2026*
