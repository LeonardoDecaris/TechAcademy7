/**
 * Valida o e-mail do usuário.
 * @param email Email do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarEmail(email: string): string | true {
  if (!email) return "E-mail obrigatório";
  const trimmedEmail = email.trim().toLowerCase();
  
  if (trimmedEmail.length < 5) return "E-mail muito curto";
  if (trimmedEmail.length > 100) return "E-mail muito longo";
  
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(trimmedEmail)) return "E-mail inválido";
  
  const [local, domain] = trimmedEmail.split('@');
  
  if (local.length > 64) return "Parte local longa";
  if (local.length < 1) return "Parte local inválida";
  if (local.startsWith('.') || local.endsWith('.')) return "Pontos inválidos na parte local";
  if (local.includes('..')) return "Pontos consecutivos não permitidos";
  
  if (domain.length > 63) return "Domínio longo";
  if (domain.length < 4) return "Domínio curto";
  if (!domain.includes('.')) return "Domínio inválido";
  if (domain.startsWith('-') || domain.endsWith('-')) return "Hífens inválidos no domínio";
  
  const validTLDs = ['com', 'org', 'net', 'edu', 'gov', 'br', 'co', 'info', 'biz'];
  const tld = domain.split('.').pop() || "";
  if (!validTLDs.includes(tld)) return "Domínio de topo não reconhecido";
  
  return true;
}

/**
 * Valida a senha do usuário.
 * @param senha Senha do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarPassword(senha: string): string | true {
  if (!senha) return "Senha obrigatória";
  if (senha.length < 8) return "Mínimo 8 caracteres";
  if (senha.length > 64) return "Senha muito longa";
  
  if (!/[a-z]/.test(senha)) return "Precisa de pelo menos 1 letra minúscula";
  if (!/[A-Z]/.test(senha)) return "Precisa de pelo menos 1 letra maiúscula";
  if (!/[!@#$%^&*()/\[\]]/.test(senha)) return "Precisa de pelo menos 1 caractere especial (incluindo /)";
  if (/(.)\1\1/.test(senha)) return "Não pode ter 3 caracteres iguais consecutivos";
  if (/[\s\\]/.test(senha)) return "Não pode conter espaços ou barra invertida";
  
  const commonPatterns = ['123', 'abc', 'qwe', 'password', 'senha'];
  if (commonPatterns.some(pattern => senha.toLowerCase().includes(pattern))) {
    return "Evite padrões comuns na senha";
  }
  
  return true;
}

/**
 * Valida o CPF do usuário.
 * @param cpf CPF do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarCPF(cpf: string): string | true {
  if (!cpf) return "CPF obrigatório";
  
  const cleanedCPF = cpf.replace(/[^\d]/g, '');
  if (cleanedCPF.length !== 11) return "Deve ter exatamente 11 dígitos";
  
  const invalidSequences = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidSequences.includes(cleanedCPF)) return "CPF inválido";
  
  if (!/^\d+$/.test(cleanedCPF)) return "CPF deve conter apenas números";
  
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

/**
 * Valida o nome completo do usuário.
 * @param nome Nome completo do usuário
 * @returns Mensagem de erro ou true se válido
 */
export function validarNome(nome: string): string | true {
  if (!nome) return "Nome obrigatório";
  
  const trimmedNome = nome.trim().replace(/\s+/g, ' ');
  
  if (trimmedNome.length < 3) return "Mínimo 3 caracteres";
  if (trimmedNome.length > 50) return "Nome muito longo";

  const nameParts = trimmedNome.split(' ');
  if (nameParts.length < 2) return "Informe nome e sobrenome";
  
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/;
  if (!regex.test(trimmedNome)) return "Apenas letras e espaços, com pelo menos dois nomes";
  if (nameParts.some(part => part.length < 2)) return "Cada parte do nome deve ter pelo menos 2 caracteres";
  if (/(.)\1\1/.test(trimmedNome.replace(/\s/g, ''))) return "Não pode ter 3 letras iguais consecutivas";
  
  return true;
}