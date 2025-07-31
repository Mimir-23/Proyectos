# 🔐 Configuración de Variables de Entorno

## Para Desarrollo Local

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Obtén tu API key gratuita de [RAWG.io](https://rawg.io/apidocs)

3. Edita el archivo `.env` y agrega tu API key:
   ```env
   VITE_RAWG_API_KEY=tu-api-key-real-aqui
   ```

## Para Despliegue (Vercel, Netlify, etc.)

### Vercel
1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a Settings → Environment Variables
4. Agrega:
   - **Name**: `VITE_RAWG_API_KEY`
   - **Value**: Tu API key de RAWG
   - **Environment**: Production (o todas)

### Netlify
1. Ve a tu dashboard de Netlify
2. Selecciona tu proyecto
3. Ve a Site Settings → Environment Variables
4. Agrega:
   - **Key**: `VITE_RAWG_API_KEY`
   - **Value**: Tu API key de RAWG

### Otras Plataformas
Busca la sección de "Environment Variables" o "Config Vars" en tu plataforma de hosting y agrega la variable `VITE_RAWG_API_KEY` con tu API key.

## 🔒 Seguridad

- ✅ El archivo `.env` está excluido de Git
- ✅ La API key NO está hardcodeada en el código
- ✅ Solo se accede a través de variables de entorno
- ✅ Se muestra una advertencia en consola si falta la API key

## 🆓 Obtener API Key Gratuita

1. Ve a [RAWG.io API](https://rawg.io/apidocs)
2. Haz clic en "Get API Key"
3. Regístrate con tu email
4. Confirma tu cuenta
5. Obtén tu API key gratuita (40,000 requests/mes)
