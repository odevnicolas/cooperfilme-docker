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

export const formatPhoneNumber = (phoneString: string): string => {
  const cleaned = phoneString.replace(/\D/g, '')


  if (cleaned.length > 10) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); 
  } else if (cleaned.length > 6) {
    return cleaned.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
  } else if (cleaned.length > 2) {
    return cleaned.replace(/(\d{2})(\d+)/, '($1) $2');
  } else {
    return cleaned;
  }
};


