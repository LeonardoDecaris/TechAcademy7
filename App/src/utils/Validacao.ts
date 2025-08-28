export function validarEmail(email: string): string | true {
  if (!email) return "E-mail obrigatório";
  const trimmedEmail = email.trim().toLowerCase();
  
  // Reduzir tamanho máximo e verificar comprimento mínimo
  if (trimmedEmail.length < 5) return "E-mail muito curto";
  if (trimmedEmail.length > 100) return "E-mail muito longo";
  
  // Regex mais restritivo
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(trimmedEmail)) return "E-mail inválido";
  
  const [local, domain] = trimmedEmail.split('@');
  
  // Verificações mais rigorosas para parte local
  if (local.length > 64) return "Parte local longa";
  if (local.length < 1) return "Parte local inválida";
  if (local.startsWith('.') || local.endsWith('.')) return "Pontos inválidos na parte local";
  if (local.includes('..')) return "Pontos consecutivos não permitidos";
  
  // Verificações mais rigorosas para domínio
  if (domain.length > 63) return "Domínio longo";
  if (domain.length < 4) return "Domínio curto";
  if (!domain.includes('.')) return "Domínio inválido";
  if (domain.startsWith('-') || domain.endsWith('-')) return "Hífens inválidos no domínio";
  
  // Verificar TLD comum
  const validTLDs = ['com', 'org', 'net', 'edu', 'gov', 'br', 'co', 'info', 'biz'];
  const tld = domain.split('.').pop() || "";
  if (!validTLDs.includes(tld)) return "Domínio de topo não reconhecido";
  
  return true;
}

export function validarPassword(senha: string): string | true {
  if (!senha) return "Senha obrigatória";
  
  // Regras mais restritivas para tamanho
  if (senha.length < 12) return "Mínimo 12 caracteres";
  if (senha.length > 64) return "Senha muito longa";
  
  // Múltiplas verificações de caracteres
  if (!/[a-z].*[a-z]/.test(senha)) return "Precisa de pelo menos 2 letras minúsculas";
  if (!/[A-Z].*[A-Z]/.test(senha)) return "Precisa de pelo menos 2 letras maiúsculas";
  if (!/[0-9].*[0-9]/.test(senha)) return "Precisa de pelo menos 2 números";
  if (!/[!@#$%^&*()].*[!@#$%^&*()]/.test(senha)) return "Precisa de pelo menos 2 caracteres especiais";
  
  // Verificar caracteres repetidos consecutivos
  if (/(.)\1\1/.test(senha)) return "Não pode ter 3 caracteres iguais consecutivos";
  
  // Verificar espaços e caracteres não permitidos
  if (/[\s\\\/]/.test(senha)) return "Não pode conter espaços ou barras";
  
  // Verificar padrões comuns
  const commonPatterns = ['123', 'abc', 'qwe', 'password', 'senha'];
  if (commonPatterns.some(pattern => senha.toLowerCase().includes(pattern))) {
    return "Evite padrões comuns na senha";
  }
  
  return true;
}

export function validarCPF(cpf: string): string | true {
  if (!cpf) return "CPF obrigatório";
  
  const cleanedCPF = cpf.replace(/[^\d]/g, '');
  if (cleanedCPF.length !== 11) return "Deve ter exatamente 11 dígitos";
  
  // Verificar sequências inválidas
  const invalidSequences = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidSequences.includes(cleanedCPF)) return "CPF inválido";
  
  // Verificar se contém apenas números
  if (!/^\d+$/.test(cleanedCPF)) return "CPF deve conter apenas números";
  
  // Algoritmo de validação do CPF com verificação mais rigorosa
  let soma = 0;
  let peso = 10;
  for (let i = 0; i < 9; i++) {
    soma += Number(cleanedCPF[i]) * peso--;
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== Number(cleanedCPF[9])) return "CPF inválido (primeiro dígito verificador)";
  
  soma = 0;
  peso = 11;
  for (let i = 0; i < 10; i++) {
    soma += Number(cleanedCPF[i]) * peso--;
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== Number(cleanedCPF[10])) return "CPF inválido (segundo dígito verificador)";
  
  return true;
}

export function validarNome(nome: string): string | true {
  if (!nome) return "Nome obrigatório";
  
  const trimmedNome = nome.trim().replace(/\s+/g, ' ');
  
  // Regras mais restritivas para tamanho
  if (trimmedNome.length < 3) return "Mínimo 3 caracteres";
  if (trimmedNome.length > 50) return "Nome muito longo";
  
  // Verificar se é um nome completo (pelo menos dois nomes)
  const nameParts = trimmedNome.split(' ');
  if (nameParts.length < 2) return "Informe nome e sobrenome";
  
  // Regex mais restritivo para caracteres válidos
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/;
  if (!regex.test(trimmedNome)) return "Apenas letras e espaços, com pelo menos dois nomes";
  
  // Verificar comprimento mínimo de cada parte do nome
  if (nameParts.some(part => part.length < 2)) return "Cada parte do nome deve ter pelo menos 2 caracteres";
  
  // Verificar caracteres repetidos consecutivos
  if (/(.)\1\1/.test(trimmedNome.replace(/\s/g, ''))) return "Não pode ter 3 letras iguais consecutivas";
  
  return true;
}