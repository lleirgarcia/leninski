# Deploy a Vercel desde la Terminal

## Configuración Inicial

Ya tienes configurado:
- ✅ `vercel.json` con la configuración para Vite
- ✅ Script `deploy` en `package.json`

## Pasos para Deployar

### 1. Instalar Vercel CLI (si no está instalado globalmente)
```bash
npm install -g vercel
```

### 2. Iniciar sesión en Vercel
```bash
vercel login
```
Esto abrirá tu navegador para autenticarte.

### 3. Deployar por primera vez
```bash
vercel
```
Esto te hará algunas preguntas:
- Set up and deploy? **Yes**
- Which scope? (selecciona tu cuenta)
- Link to existing project? **No** (si es la primera vez)
- Project name? (puedes usar `leninski` o el que prefieras)
- Directory? **./** (presiona Enter)
- Override settings? **No**

### 4. Deployar a producción
```bash
npm run deploy
```
O directamente:
```bash
vercel --prod
```

## Comandos Útiles

- **Deploy a preview**: `vercel` (sin flags)
- **Deploy a producción**: `vercel --prod` o `npm run deploy`
- **Ver información del proyecto**: `vercel ls`
- **Ver logs**: `vercel logs`
- **Eliminar deployment**: `vercel remove`

## Configuración Automática

El archivo `vercel.json` ya está configurado para:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

## Notas

- El primer deploy puede tardar un poco más
- Los siguientes deploys serán más rápidos
- Puedes ver el progreso en la terminal
- La URL de producción se mostrará al final del deploy

