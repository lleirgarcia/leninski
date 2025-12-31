# Compresión de Imágenes

## Instalación

Primero, instala la dependencia necesaria:

```bash
npm install --save-dev sharp
```

## Uso

Ejecuta el script de compresión:

```bash
npm run compress-images
```

Este script:
- Busca todas las imágenes PNG, JPG y JPEG en la carpeta `public/`
- Comprime cada imagen optimizando el tamaño
- Mantiene la calidad visual alta (85% para JPEG, 90% para PNG)
- Solo sobrescribe si se ahorra espacio
- Muestra un resumen del espacio ahorrado

## Resultados Esperados

Con ~247MB de imágenes, deberías ver una reducción significativa:
- **PNG**: Compresión nivel 9 con filtrado adaptativo
- **JPEG**: Calidad 85% con optimización mozjpeg
- **Ahorro esperado**: 40-60% del tamaño original

## Nota

El script comprime las imágenes **in-place** (sobrescribe los archivos originales). 
Si quieres mantener los originales, haz una copia de seguridad primero:

```bash
cp -r public public-backup
```

