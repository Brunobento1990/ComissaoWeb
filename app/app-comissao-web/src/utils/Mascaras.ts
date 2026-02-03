export function maskPhone(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.length > 15) return value;
  if (typeof value != "string") return "";
  const digits = value.replace(/\D/g, "");
  const match = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return "";
  return match[1]
    ? `(${match[1]}` +
        (match[2] ? `) ${match[2]}` + (match[3] ? `-${match[3]}` : "") : "")
    : "";
}

export function maskContaBancaria(conta?: string): string | undefined {
  if (!conta) return undefined;

  const digits = conta.replace(/\D/g, "");

  if (digits.length < 2) return digits;

  const dv = digits.slice(-1);
  const numero = digits.slice(0, -1);

  return `${numero}-${dv}`;
}

export function maskTelefoneInternacional(value?: string): string | undefined {
  if (!value) return undefined;
  if (typeof value != "string") return "";

  // Remove todos os caracteres não numéricos
  const digits = value.replace(/\D/g, "");
  if (!digits || digits.length === 0) return undefined;

  // Se tiver mais de 13 dígitos (código do país + DDD + número), usa a máscara de celular
  if (digits.length > 13) return maskPhone(value);

  // Regex para capturar: código do país (2-3 dígitos), DDD (2 dígitos), número (8-9 dígitos)
  const match = digits.match(/^(\d{0,2})(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return "";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, pais, ddd, parte1, parte2] = match;

  let resultado = "";

  // Adiciona o código do país se existir
  if (pais) {
    resultado += `+${pais}`;
  }

  // Adiciona o DDD se existir
  if (ddd) {
    resultado += ` (${ddd}`;
  }

  // Adiciona a primeira parte do número
  if (parte1) {
    resultado += ddd ? `) ${parte1}` : ` ${parte1}`;
  }

  // Adiciona a segunda parte do número
  if (parte2) {
    resultado += `-${parte2}`;
  }

  return resultado;
}

export function maskTelefoneFixo(value?: string): string | undefined {
  if (!value) return undefined;
  if (typeof value != "string") return "";
  const digits = value.replace(/\D/g, "");
  if (!digits || digits.length === 0) return undefined;
  if (digits.length > 10) return maskPhone(value);
  const match = digits.match(/^(\d{0,2})(\d{0,4})(\d{0,4})$/);
  if (!match) return "";
  return match[1]
    ? `(${match[1]}` +
        (match[2] ? `) ${match[2]}` + (match[3] ? `-${match[3]}` : "") : "")
    : "";
}

export function somenteNumero(value?: string | number): string | undefined {
  if (!value) return undefined;
  if (typeof value != "string") {
    return value?.toString().replace(/\D/g, "");
  }
  return value.replace(/\D/g, "");
}

export function clearMaskCnpj(cnpj?: string): string | undefined {
  if (!cnpj) return "";

  return cnpj
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", "")
    .replaceAll(" ", "");
}

export function clearMaskCpf(cpf?: string): string | undefined {
  if (!cpf) return "";

  return cpf.replaceAll(".", "").replaceAll("-", "").replaceAll(" ", "");
}

export function clearMaskCpfCnpj(value?: string): string | undefined {
  if (!value) return "";

  return clearMaskCpf(clearMaskCnpj(value));
}

export function clearMaskPhone(telefone?: string): string | undefined {
  if (!telefone) return undefined;

  return telefone
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
}

export function clearMaskPhoneInternacional(
  telefone?: string,
): string | undefined {
  if (!telefone) return undefined;

  return telefone
    .replaceAll("+", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
}

export function limparTodasMascaras(value?: any) {
  return clearMaskPhone(clearMaskCep(clearMaskCpfCnpj(value)));
}

export function maskCep(cep?: string): string {
  if (!cep) return "";
  if (cep.length > 8) return cep.slice(0, 9);
  return cep.replace(/\D+/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

export function clearMaskCep(cep?: string): string | undefined {
  if (!cep) return undefined;
  return cep.replaceAll("-", "");
}

export function maskCNPJ(cnpj?: string): string {
  if (!cnpj) return "";

  return cnpj
    .replace(/[^\w]/g, "")
    .replace(/(\w{2})(\w)/, "$1.$2")
    .replace(/(\w{3})(\w)/, "$1.$2")
    .replace(/(\w{3})(\w)/, "$1/$2")
    .replace(/(\w{4})(\w)/, "$1-$2")
    .replace(/(-\w{2})\w+?$/, "$1");
}

export function maskCpfCnpj(cpfCnpj?: string): string {
  if (!cpfCnpj) return "";

  if (clearMaskCpfCnpj(cpfCnpj ?? "")!.length > 11) return maskCNPJ(cpfCnpj);

  return maskCPF(cpfCnpj);
}

export function maskCPF(cpf?: string): string {
  if (!cpf) return "";

  return cpf
    .replace(/[^\w]/g, "")
    .replace(/(\w{3})(\w)/, "$1.$2")
    .replace(/(\w{3})(\w)/, "$1.$2")
    .replace(/(\w{3})(\w{1,2})/, "$1-$2")
    .replace(/(-\w{2})\w+?$/, "$1");
}

export function formatMoney(
  value: string | number | undefined,
  currency?: string,
): string {
  if (!value) {
    return `${currency ?? "R$"} 0,00`;
  }
  let newValue = value;
  let isNegative = false;
  if (typeof value === "number") {
    isNegative = value < 0;
    newValue = value.toFixed(2);
  } else {
    newValue = value?.trim();
    isNegative = newValue.includes("-");
  }
  const cleanValue = String(newValue).replace(/[^0-9]/g, "");
  const paddedValue = cleanValue.padStart(3, "0");
  const reais = paddedValue.slice(0, -2);
  const centavos = paddedValue.slice(-2);
  const formattedReais = Number(reais).toLocaleString("pt-BR");
  if (isNegative) return `${currency ?? "R$"} -${formattedReais},${centavos}`;
  return `${currency ?? "R$"} ${formattedReais},${centavos}`;
}

export function cleanFormatMoney(value?: string | number): number | undefined {
  if (!value) return undefined;
  if (value === "") return 0;
  if (typeof value === "number") return value;
  value = value.replace(/[^0-9.,]/g, "");
  if (!value.includes(",")) return parseFloat(value);
  const splited = value.trim().split(",");
  return parseFloat(`${splited[0].replaceAll(".", "")}.${splited[1]}`);
}
