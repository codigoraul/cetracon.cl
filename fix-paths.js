import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function fixPaths(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await fixPaths(fullPath);
    } else if (file.name.endsWith('.html')) {
      let content = await readFile(fullPath, 'utf-8');
      
      // Reemplazar rutas absolutas por relativas en atributos
      content = content.replace(/href="\/_astro\//g, 'href="./_astro/');
      content = content.replace(/src="\/_astro\//g, 'src="./_astro/');
      content = content.replace(/href="\/images\//g, 'href="./images/');
      content = content.replace(/src="\/images\//g, 'src="./images/');
      content = content.replace(/href="\/favicon/g, 'href="./favicon');
      
      // Reemplazar rutas en estilos inline (background-image)
      content = content.replace(/url\('\/images\//g, "url('./images/");
      content = content.replace(/url\("\/images\//g, 'url("./images/');
      content = content.replace(/url\(\/images\//g, 'url(./images/');
      
      // Corregir enlaces internos que tienen /# en lugar de solo #
      content = content.replace(/href="\/#/g, 'href="#');
      
      // Corregir enlace del logo para que recargue la página actual sin cambiar de carpeta
      // Buscar específicamente el enlace del logo y cambiarlo
      content = content.replace(/<a href="\/" class="flex items-center">/g, '<a href="#" onclick="window.scrollTo(0,0); return false;" class="flex items-center">');
      
      // Para subdirectorios, necesitamos rutas relativas diferentes
      const depth = fullPath.split('/').length - 'dist'.split('/').length - 1;
      if (depth > 0) {
        const prefix = '../'.repeat(depth);
        content = content.replace(/href="\.\/_astro\//g, `href="${prefix}_astro/`);
        content = content.replace(/src="\.\/_astro\//g, `src="${prefix}_astro/`);
        content = content.replace(/href="\.\/images\//g, `href="${prefix}images/`);
        content = content.replace(/src="\.\/images\//g, `src="${prefix}images/`);
        content = content.replace(/href="\.\/favicon/g, `href="${prefix}favicon`);
        
        // Imágenes de fondo en subdirectorios
        content = content.replace(/url\('\.\/images\//g, `url('${prefix}images/`);
        content = content.replace(/url\("\.\/images\//g, `url("${prefix}images/`);
        content = content.replace(/url\(\.\/images\//g, `url(${prefix}images/`);
        
        // Enlaces a la página principal desde subdirectorios
        content = content.replace(/href="\/#/g, `href="${prefix}#`);
      }
      
      await writeFile(fullPath, content, 'utf-8');
      console.log(`Fixed: ${fullPath}`);
    }
  }
}

fixPaths('./dist').then(() => {
  console.log('✅ All paths fixed!');
}).catch(err => {
  console.error('❌ Error fixing paths:', err);
  process.exit(1);
});
