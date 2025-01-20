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
  - **Ajustes**: Acceso a los ajustes de los datos de usuario en la base de datos.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **Tailwind CSS**: Framework de CSS para estilos utilitarios.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **OpenAI**: Plataforma de inteligencia artificial utilizada para el asistente virtual.
- **Drizzle ORM**: ORM para la interacción con la base de datos SQL.
- **NextUI**: Biblioteca de componentes UI para React.
- **NeonDatabase**: Base de datos para PostgreSQL.
- **Pinecone**: Base de datos vectorial.
- **Clerk**: Para la autenticación y registro de usuarios.
- **ElevenLabs**: Para la tecnología de TTS.

## Proyectos en los que se basa

El desarrollo de SARA IA ha sido influenciado e inspirado por los siguientes proyectos:

1. [GPT-4 Vision and Next.js Tutorial - Create Your Own AI Coding Bot](https://www.youtube.com/watch?v=z9PF8NdM4XU&t) - _Autor: Sam Meech-Ward_
2. [Easiest Database Setup in Next.js 14 with Turso & Drizzle](https://www.youtube.com/watch?v=4ZhtoOFKFP8&t) - _Autor: Sam Meech-Ward_
3. [Kinde: The Best Auth Solution Next.js 14](https://www.youtube.com/watch?v=sjcLxYbw5BQ&t) - _Autor: Sam Meech-Ward_
4. [Build ChatGPT AI Tool in React JS | React JS Project with Working Example using OpenAI API](https://www.youtube.com/watch?v=vAO1fxifJIs) - _Autor: ZAINKEEPSCODE_
5. [NEXT.JS 14: Server Actions, React Server Components, Paginación y MÁS!](https://www.youtube.com/watch?v=m6KESRxAdK4) - _Autor: MiduDev_
6. [Tutorial Next.js 14 paso a paso, para Principiantes](https://www.youtube.com/watch?v=jMy4pVZMyLM) - _Autor: MiduDev_
7. [Desarrollando El Componente Chat | Next.js 13](https://www.youtube.com/watch?v=soJU2_SKy1I&t) - _Autor: MiduDev_
8. [Build and Deploy Navbar Dropdown Navigation with Tailwind CSS and Next.js](https://youtu.be/lo_BJ6dl7fw?t=571) - _Autor: react with utkarsh_
9. [Build and Deploy a Full Stack AI SaaS | Next JS 13, DrizzleORM, OpenAI, Stripe, TypeScript, Tailwind](https://www.youtube.com/watch?v=bZFedu-0emE&t=11228s) - _Autor: Elliott Chong_
10. [Learn AI Skills - Here's everything you need to know about RAG](https://www.youtube.com/watch?v=cYRcdsqFAmY) - _Autor: Mckay Wrigley_
11. [Build an AI Text-to-Speech (TTS) App Using Next.js and ElevenLabs (2024)](https://youtu.be/JgoWMTa0pa4?si=VQVpcscR2lJYxLSh) - _Autor: Code Spirit_
12. [Quick Guide Parse CSV File in React JS and Next JS With Code](https://youtu.be/3jDCr_nhUO0?si=krnYHDhQYeNtXox9) - _Autor: Developers Hive_
13. [Build and Deploy a RAG Chatbot with JavaScript, LangChain.js, Next.js, Vercel, OpenAI](https://youtu.be/d-VKYF4Zow0?si=KlYKtChtKGhmmgOQ) - _Autor: freeCodeCamp.org_

## Instalación y Configuración

Clona el repositorio:

1. Copiar código

   ```console
   git clone https://github.com/DukeFPV/TFG.git
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
# Acceso NeonDatabase
DATABASE_AUTH_TOKEN=
# used for database migrations
DATABASE_URL=
# used for server side fetching
DATABASE_AUTHENTICATED_URL=
# used for client side fetching
NEXT_PUBLIC_DATABASE_AUTHENTICATED_URL=

# Datos de acceso a S3
NEXT_PUBLIC_S3_ACCESS_KEY_ID=
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=
NEXT_PUBLIC_S3_BUCKET_NAME=
NEXT_PUBLIC_S3_REGION_NAME=

# Datos de acceso a Pinecone
PINECONE_CLOUD=
PINECONE_REGION=
PINECONE_INDEX=
PINECONE_API_KEY=

# Datos de acceso a OpenAI
OPENAI_API_KEY=

# Datos de acceso a ElevenLabs
XI_API_KEY=

#Datos de acceso a Google
GOOGLE_APPLICATION_CREDENTIALS=
GCP_PROJECT_ID=
```

Inicia el servidor de desarrollo:

4. Copiar código

   ```console
   pnpm run dev
   ```

   Abre tu navegador y ve a <http://localhost:3000>.

## Empezar

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

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir el cambio que deseas realizar antes de enviar una pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto a través de correo electrónico o visita la página de Contacto.
