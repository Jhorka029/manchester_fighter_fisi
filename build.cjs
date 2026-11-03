// node build.cjs [ruta-del-html]. Genera un juego autónomo sin servidor.
const fs=require('fs'),path=require('path');
const root=__dirname;
// En la carpeta organizada bue/work/github-deploy, la entrega vive en bue/outputs.
// Un clon independiente genera su entrega en su propia carpeta outputs.
const organizedWorkspace=path.basename(root)==='github-deploy'&&path.basename(path.dirname(root))==='work';
const outputDir=organizedWorkspace?path.resolve(root,'../../outputs'):path.join(root,'outputs');
const out=process.argv[2]?path.resolve(process.argv[2]):path.join(outputDir,'Manchester-FISI-Fighter-v0.11.html');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>({tag:m[0],src:m[1],code:fs.readFileSync(path.join(root,m[1]),'utf8')}));
const styles=[...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(m=>({tag:m[0],src:m[1],code:fs.readFileSync(path.join(root,m[1]),'utf8')}));
const assets=new Set((html+scripts.map(x=>x.code).join('\n')+styles.map(x=>x.code).join('\n')).match(/assets\/[^'"\s)]+\.(?:png|webp|jpe?g|gif|mp3|wav|ogg)/g)||[]);
for(const src of assets){const ext=path.extname(src).slice(1).toLowerCase(),mime={mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg'}[ext]||'image/'+(ext==='jpg'?'jpeg':ext),data='data:'+mime+';base64,'+fs.readFileSync(path.join(root,src)).toString('base64');html=html.replaceAll(src,data);for(const s of [...scripts,...styles])s.code=s.code.replaceAll(src,data)}
for(const s of scripts)html=html.replace(s.tag,'<script>'+s.code.replaceAll('</script','<\\/script')+'</script>');
for(const s of styles)html=html.replace(s.tag,'<style>'+s.code+'</style>');
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,html);console.log('HTML autónomo: '+out+' ('+(Buffer.byteLength(html)/1048576).toFixed(1)+' MB; '+assets.size+' recursos multimedia)');
