# Implementação do Mecanismo de Compêndio

Este documento detalha a implementação do sistema de Compêndio para a ficha de RPG, facilitando sua replicação em projetos semelhantes.

## Arquitetura do Sistema

O sistema é composto por três camadas principais:
1.  **Camada de Dados**: Um objeto estruturado contendo os itens, talentos e "bundles" pré-fabricados.
2.  **Camada de Contexto**: Lógica para manipular a inserção em lote (batch import) e geração de IDs únicos.
3.  **Camada de UI**: Um Modal centralizado para navegação, busca e importação.

---

## 1. Estrutura de Dados (`compendium.js`)

A chave para o compêndio é uma estrutura organizada por categorias.

```javascript
export const COMPENDIUM = {
    items: [
        { name: "Item Exemplo", icon: "fa-box", type: "Consumível", description: "..." }
    ],
    talents: [
        { name: "Talento Exemplo", category: "talent", tags: ["Passiva"], description: "..." }
    ],
    bundles: [
        {
            name: "Pacote Aventura",
            items: [...],
            talents: [...]
        }
    ]
};
```

## 2. Lógica de Importação (`CharacterContext.jsx`)

Para importar itens sem conflitos, é necessário gerar IDs únicos no momento da importação.

```javascript
const importBundle = (bundle) => {
    setCharacterData(prev => {
        const newData = { ...prev };
        
        // Exemplo para Itens
        if (bundle.items) {
            const newItems = bundle.items.map(item => ({
                ...item,
                id: `bundle-${Date.now()}-${Math.random()}`
            }));
            newData.inventory = [...prev.inventory, ...newItems];
        }
        
        return newData;
    });
};
```

## 3. Interface de Usuário (`CompendiumModal.jsx`)

O modal utiliza o estado do contexto para disparar as importações.

### Destaques da UI:
- **Tabs Dinâmicas**: Para alternar entre categorias (usa `bg-cyber-blue text-white` para a aba ativa).
- **Busca**: Filtro em tempo real no estado local do modal.
- **Feedback**: Uso de Toasts para confirmar a importação ao usuário.

```javascript
const handleImport = (item) => {
    if (!isEditMode) {
        showToast("Ative o modo edição", "error");
        return;
    }
    // Chama função do contexto
    addInventoryItem(item);
    showToast(`${item.name} importado!`, "success");
};
```

## 4. Integração no Header

O acesso é feito por um botão discreto no topo da ficha, garantindo que o compêndio esteja sempre à disposição sem ocupar espaço na navegação principal.

```javascript
<button onClick={() => setIsCompendiumOpen(true)}>
    <i className="fa-solid fa-book-atlas"></i>
</button>
```

---

> [!TIP]
> Ao replicar este sistema, certifique-se de que as funções de "Add" do seu contexto gerem IDs únicos para evitar que itens importados "escrevam" sobre itens existentes se o usuário importar o mesmo bundle duas vezes.
