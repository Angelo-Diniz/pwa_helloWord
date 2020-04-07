self.addEventListener('install', function(event) {
    console.log('SW1: Instalado!!', event);
});


self.addEventListener('activate', function(event) {
    console.log('SW2: Ativado!!', event);
});