// node build.cjs [ruta-del-html]. Genera un juego autónomo sin servidor.
const fs=require('fs'),path=require('path');
const root=__dirname,out=process.argv[2]?path.resolve(process.argv[2]):path.join(root,'dist','Manchester-FISI-Fighter-v0.5.html');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>({tag:m[0],src:m[1],code:fs.readFileSync(path.join(root,m[1]),'utf8')}));
const styles=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(m=>({tag:m[0],src:m[1],code:fs.readFileSync(path.join(root,m[1]),'utf8')}));
const assets=new Set((html+scripts.map(x=>x.code).join('\n')+styles.map(x=>x.code).join('\n')).match(/assets\/[^'"\s)]+\.(?:png|webp|jpe?g|gif)/g)||[]);
for(const src of assets){const ext=path.extname(src).slice(1).toLowerCase(),data='data:image/'+(ext==='jpg'?'jpeg':ext)+';base64,'+fs.readFileSync(path.join(root,src)).toString('base64');html=html.replaceAll(src,data);for(const s of [...scripts,...styles])s.code=s.code.replaceAll(src,data)}
for(const s of scripts)html=html.replace(s.tag,'<script>'+s.code.replaceAll('</script','<\\/script')+'</script>');
for(const s of styles)html=html.replace(s.tag,'<style>'+s.code+'</style>');
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,html);console.log('HTML autónomo: '+out+' ('+(Buffer.byteLength(html)/1048576).toFixed(1)+' MB; '+assets.size+' imágenes)');
