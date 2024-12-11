# SARA IA

SARA IA es una aplicación web diseñada para ayudar a las personas mayores en el uso de las Tecnologías de la Información y Comunicación (TIC). Utilizando la inteligencia artificial, SARA proporciona asistencia personalizada y clara, adaptándose a las necesidades de los usuarios en tiempo real. La aplicación está alojada en [sara-ia.vercel.app](https://sara-ia.vercel.app/).

## Descripción Detallada

### Funcionalidades Principales

- **Asistente Personalizado**: SARA ofrece guías paso a paso y recomendaciones específicas para ayudar a los usuarios a navegar por tareas tecnológicas comunes, como hacer una cita médica o utilizar servicios bancarios en línea.
- **Interacción en Tiempo Real**: La IA analiza las necesidades del usuario en tiempo real y adapta sus respuestas para proporcionar una asistencia continua y coherente.
- **Seguridad y Privacidad**: La seguridad y la privacidad son pilares fundamentales en el diseño y operación de SARA. Nos comprometemos a proteger los datos de los usuarios y asegurar que la interacción con el sistema sea segura.

### Páginas Principales

- **Inicio**: Una introducción a SARA y sus capacidades.
- **Contacto**: Un formulario para que los usuarios puedan enviar mensajes y consultas.
- **Quiénes Somos**: Información sobre el equipo detrás de SARA y la historia del proyecto.
- **Chat con SARA**: Acceso a la interfaz de chat donde los usuarios pueden interactuar con la IA de SARA.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **Tailwind CSS**: Framework de CSS para estilos utilitarios.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **OpenAI**: Plataforma de inteligencia artificial utilizada para el asistente virtual.
- **Drizzle ORM**: ORM para la interacción con la base de datos SQL.
- **NextUI**: Biblioteca de componentes UI para React.

## Proyectos en los que se Basa

El desarrollo de SARA IA ha sido influenciado e inspirado por los siguientes proyectos:

1. [GPT-4 Vision and Next.js Tutorial - Create Your Own AI Coding Bot](https://www.youtube.com/watch?v=z9PF8NdM4XU&t) - *Autor: Sam Meech-Ward*
2. [Easiest Database Setup in Next.js 14 with Turso & Drizzle](https://www.youtube.com/watch?v=4ZhtoOFKFP8&t) - *Autor: Sam Meech-Ward*
3. [Kinde: The Best Auth Solution Next.js 14](https://www.youtube.com/watch?v=sjcLxYbw5BQ&t) - *Autor: Sam Meech-Ward*
4. [Build ChatGPT AI Tool in React JS | React JS Project with Working Example using OpenAI API](https://www.youtube.com/watch?v=vAO1fxifJIs) - *Autor: ZAINKEEPSCODE*
5. [NEXT.JS 14: Server Actions, React Server Components, Paginación y MÁS!](https://www.youtube.com/watch?v=m6KESRxAdK4) - *Autor: MiduDev*
6. [Tutorial Next.js 14 paso a paso, para Principiantes](https://www.youtube.com/watch?v=jMy4pVZMyLM) - *Autor: MiduDev*
7. [Desarrollando El Componente Chat | Next.js 13](https://www.youtube.com/watch?v=soJU2_SKy1I&t) - *Autor: MiduDev*
8. [Build and Deploy Navbar Dropdown Navigation with Tailwind CSS and Next.js](https://youtu.be/lo_BJ6dl7fw?t=571) - *Autor: react with utkarsh*
9. [Build and Deploy a Full Stack AI SaaS | Next JS 13, DrizzleORM, OpenAI, Stripe, TypeScript, Tailwind] (https://www.youtube.com/watch?v=bZFedu-0emE&t=11228s) - *Autor: Elliott Chong*

## Empezar

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

Puedes empezar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente a medida que editas el archivo.

Este proyecto utiliza [next/font](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

## Aprende Más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.
- Puedes visitar el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js/) - ¡tus comentarios y contribuciones son bienvenidos!

## Despliegue en Vercel

El despliegue se ha realizado en la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta la [documentación sobre despliegue en Next.js](https://nextjs.org/docs/deployment) para más detalles.

## Instalación y Configuración

Clona el repositorio:

1. Copiar código

    ```console
    git clone https://github.com/tu-usuario/sara-ia.git
    ```

    ```console
    cd sara-ia
    ```

    Instala las dependencias:

2. Copiar código  

    ```console
    pnpm install
    ```  

    Configura las variables de entorno creando un archivo .env.local en la raíz del proyecto y añade las siguientes líneas:

3. Copiar código  

```console
   OPENAI_API_KEY=tu-api-key  
   DATABASE_URL=tu-database-url  
   DATABASE_AUTH_TOKEN=tu-auth-token  
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clave-publica-clerk
   CLERK_SECRET_KEY=clerk-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

   Inicia el servidor de desarrollo:

4. Copiar código  

    ```console
    pnpm run dev 
    ```

    Abre tu navegador y ve a <http://localhost:3000>.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir el cambio que deseas realizar antes de enviar una pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto a través de correo electrónico o visita nuestra página de Contacto.
