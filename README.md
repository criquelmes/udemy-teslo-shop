#Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear un archivo `.env` basado en el archivo `.env.example`
   - Asegúrate de configurar las variables de entorno necesarias, como la conexión a la base de datos y las credenciales de Stripe.
   - Puedes usar el archivo `.env.example` como referencia para las variables de entorno.
   - Si estás usando Docker, asegúrate de que las variables de entorno coincidan con las configuraciones de tu contenedor.
   - Si no tienes un archivo `.env`, puedes crear uno manualmente o copiar el ejemplo proporcionado.
3. Instalar las dependencias con `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de prisma con `npx prisma migrate dev`
6. Ejecutar el seed de la base de datos `npm run seed`
7. Correr el proyecto con `npm run dev`



## Correr en producción
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Correr el proyecto con `npm run build`