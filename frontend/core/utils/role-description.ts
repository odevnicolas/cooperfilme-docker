
function roleDescription(role: string): string {
  switch (role) {
    case "CLIENT":
      return "Você é um roteirista! Aqui, você pode ser notado pelo time da cooperfilme!";
    case "ANALYST":
      return "Você é um analista! Aqui, seu trabalho é analisar os projetos e garantir a qualidade dos trabalhos feitos.";
    case "ACCOUNTANT":
      return "Você é um revisor! Aqui, seu trabalho é corrigir os roteiros.";
    case "APPROVERS":
      return "Você é um aprovador! Você escolhe os trabalhos que serão executados e aprova-los.";
    default:
      return "Você é um roteirista! Aqui, você pode ser notado pelo time da cooperfilme!";
  }
}

export default roleDescription;