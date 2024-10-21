export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const translateStatus = (status: string) => {
  switch (status) {
    case 'AWAITNG_ANALYSIS':
      return 'Aguardando Análise';
    case 'IN_ANALYSIS':
      return 'Em Análise';
    default:
      return 'Fechado';
    }
}
