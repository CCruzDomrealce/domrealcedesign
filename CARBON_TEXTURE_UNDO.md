# Como Reverter a Textura de Carbono

Para reverter todas as texturas de carbono aplicadas, procure e remova as seguintes classes:

## Classes adicionadas:
1. `carbon-texture` - textura principal
2. `carbon-texture-subtle` - textura mais sutil

## Arquivos modificados:

### client/src/components/navigation.tsx
- **Linha ~40**: Remover `carbon-texture` da classe do header

### client/src/components/footer.tsx  
- **Linha ~11**: Remover `carbon-texture` da classe do footer

### client/src/pages/carrinho.tsx
- **Linha ~132**: Remover `carbon-texture` do div principal
- **Linha ~136**: Remover `carbon-texture-subtle` do header
- **Linha ~192**: Remover `carbon-texture-subtle` dos cards

### client/src/pages/servico-papel-parede.tsx
- **Linha ~309**: Remover `carbon-texture-subtle` da seção de orçamento

### client/src/components/services-section.tsx
- **Linha ~78**: Remover `carbon-texture` da seção de serviços

### client/src/index.css
- **Linhas 8-30**: Remover as definições das classes `.carbon-texture` e `.carbon-texture-subtle`

## Comando rápido para reverter:
1. Procurar "carbon-texture" em todos os arquivos
2. Remover todas as ocorrências da palavra
3. Remover as definições CSS do index.css

O site voltará ao visual original sem texturas de carbono.