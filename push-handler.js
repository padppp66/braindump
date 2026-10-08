self.addEventListener('push',event=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 event.waitUntil(self.registration.showNotification(String(data.title||'BrainDump'),{
  icon:new URL('./braindump-icon-192-v2.png',self.registration.scope).href,
  body:String(data.body||'มีงานใกล้ถึงกำหนด เปิดแอปเพื่อตรวจสอบ'),tag:String(data.id||'braindump-reminder'),
  data:{url:new URL('./#tasks',self.registration.scope).href}
 }));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const url=new URL('./#tasks',self.registration.scope).href;
 event.waitUntil((async()=>{const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of windows){if(client.url.startsWith(self.registration.scope)){await client.navigate(url);return client.focus()}}
  return self.clients.openWindow(url);
 })());
});
