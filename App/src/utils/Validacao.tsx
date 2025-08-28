export function validarEmail(email: string): string | true {
  if (!email) return "E-mail obrigatório";
  const trimmedEmail = email.trim().toLowerCase();
  if (trimmedEmail.length > 254) return "E-mail muito longo";
  
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!regex.test(trimmedEmail)) return "E-mail inválido";
  
  const parts = trimmedEmail.split('@');
  if (parts[0].length > 64) return "Parte local longa";
  if (parts[1].length > 255) return "Domínio longo";
  
  return true;
}

export function validarPassword(senha: string): string | true {
  if (!senha) return "Senha obrigatória";
  if (senha.length < 8) return "Mínimo 8 caracteres";
  if (senha.length > 128) return "Senha muito longa";
  if (!/[a-z]/.test(senha)) return "Falta letra minúscula";
  if (!/[A-Z]/.test(senha)) return "Falta letra maiúscula";
  if (!/[0-9]/.test(senha)) return "Falta número";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return "Falta caractere especial";
  if (/\s/.test(senha)) return "Sem espaços";
  return true;
}

export function validarCPF(cpf: string): string | true {
  if (!cpf) return "CPF obrigatório";
  
  const cleanedCPF = cpf.replace(/[^\d]/g, '');
  if (cleanedCPF.length !== 11) return "Deve ter 11 dígitos";
  
  const invalidSequences = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidSequences.includes(cleanedCPF)) return "CPF inválido";
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(cleanedCPF[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto >= 10) resto = 0;
  if (resto !== Number(cleanedCPF[9])) return "CPF inválido";
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cleanedCPF[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto >= 10) resto = 0;
  if (resto !== Number(cleanedCPF[10])) return "CPF inválido";
  
  return true;
}

export function validarNome(nome: string): string | true {
  if (!nome) return "Nome obrigatório";
  const trimmedNome = nome.trim().replace(/\s+/g, ' ');
  if (trimmedNome.length < 2) return "Mínimo 2 caracteres";
  if (trimmedNome.length > 100) return "Nome muito longo";
  
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;
  if (!regex.test(trimmedNome)) return "Apenas letras e espaços";
  
  return true;
}