import React from 'react';

function MenuPrincipal() {
  const zooName = "Zoo Vita";
  const engraving = "🐾"; 

  return (
    <header className="main-header">
      <div className="zoo-logo">
        <span className="zoo-engraving">{engraving}</span>
        {zooName}
      </div>
      {/* Aqui pode adicionar elementos de usuário/notificações */}
    </header>
  );
}

export default MenuPrincipal;