export function formatyCurrency(value: number) {
  return  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: "currency"
  }).format(value)
}