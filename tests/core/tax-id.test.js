const assert=require("assert");
const taxId=require("../../core/tax-id.js");

const validCpf="52998224725",invalidCpf="52998224724";
const validCnpj="11222333000181",invalidCnpj="11222333000180";

assert.strictEqual(taxId.isValidCpf(validCpf),true,"CPF válido foi rejeitado");
assert.strictEqual(taxId.isValidCpf(invalidCpf),false,"CPF com dígito verificador inválido foi aceito");
assert.strictEqual(taxId.isValidCpf("11111111111"),false,"CPF com todos os dígitos iguais foi aceito");
assert.strictEqual(taxId.isValidCnpj(validCnpj),true,"CNPJ válido foi rejeitado");
assert.strictEqual(taxId.isValidCnpj(invalidCnpj),false,"CNPJ com dígito verificador inválido foi aceito");
assert.strictEqual(taxId.isValidCnpj("11111111111111"),false,"CNPJ com todos os dígitos iguais foi aceito");
assert.strictEqual(taxId.inspect("000"+validCpf,taxId.CPF).valid,true,"CPF alinhado à direita em campo maior foi rejeitado");
assert.strictEqual(taxId.inspect("0"+validCnpj,taxId.CNPJ).valid,true,"CNPJ alinhado à direita em campo maior foi rejeitado");
assert.strictEqual(taxId.inspect("123"+validCpf,taxId.CPF).code,"invalid_padding","preenchimento físico indevido não foi detectado");
assert.strictEqual(taxId.inspect(validCnpj,taxId.CPF).code,"type_mismatch","CNPJ informado como CPF não foi classificado como incompatível");
assert.strictEqual(taxId.inspect("000"+validCpf,taxId.CNPJ).code,"type_mismatch","CPF informado como CNPJ não foi classificado como incompatível");
assert.strictEqual(taxId.inspect("123",taxId.CPF).code,"invalid_length","tamanho inválido de CPF não foi detectado");
assert.strictEqual(taxId.inspect("123",taxId.CNPJ).code,"invalid_length","tamanho inválido de CNPJ não foi detectado");
assert.strictEqual(taxId.inspect("00052998224A25",taxId.CPF).code,"non_numeric","conteúdo não numérico não foi detectado");

console.log("OK — validação matemática reutilizável de CPF/CNPJ aprovada.");
