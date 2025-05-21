
// Script para incorporar o chat em qualquer site
(function() {
  // Criar um iframe para conter o chat
  function createChatIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.zIndex = '9999';
    iframe.style.overflow = 'hidden';
    iframe.setAttribute('id', 'lumis-chat-iframe');
    iframe.setAttribute('title', 'Lumis Chat');
    
    // Substituir pela URL real onde o embed-chat.html estará hospedado
    iframe.src = 'https://seusite.com/embed-chat.html';
    
    document.body.appendChild(iframe);
    return iframe;
  }
  
  // Verifica se o script já foi carregado para evitar duplicação
  if (!window.lumisScriptLoaded) {
    window.lumisScriptLoaded = true;
    const iframe = createChatIframe();
    
    // Após o iframe carregar, inicialize o chat com as opções
    iframe.onload = function() {
      const options = window.lumisOptions || {};
      if (iframe.contentWindow && iframe.contentWindow.LumisChat) {
        iframe.contentWindow.LumisChat.init(options);
        
        // Redimensionar iframe apenas para o botão inicialmente
        iframe.style.width = '80px';
        iframe.style.height = '80px';
        
        // Configurar mensagem para redimensionar o iframe quando o chat abrir/fechar
        window.addEventListener('message', function(event) {
          if (event.data.type === 'lumisChat') {
            if (event.data.action === 'open') {
              iframe.style.width = '350px';
              iframe.style.height = '500px';
            } else if (event.data.action === 'close') {
              iframe.style.width = '80px';
              iframe.style.height = '80px';
            } else if (event.data.action === 'maximize') {
              iframe.style.width = event.data.width || '80%';
              iframe.style.height = event.data.height || '80%';
            }
          }
        });
      }
    };
  }
})();

// Para uso no site onde quer incorporar:
// <script>
//   window.lumisOptions = {
//     position: 'right', // 'left' ou 'right'
//     buttonColor: '#FF196E', // cor do botão
//     avatarUrl: '/caminho/para/avatar.png' // URL da imagem do avatar
//   };
// </script>
// <script src="https://seusite.com/embed-script.js" async></script>
