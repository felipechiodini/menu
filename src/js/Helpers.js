export const formatCurrency = (value) => {
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'R$',
    }).format(value);
}