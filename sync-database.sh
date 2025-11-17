#!/bin/bash

echo "🔧 SINCRONIZAR BANCO DE DADOS - Vercel/Neon"
echo "==========================================="
echo ""

echo "⚠️  IMPORTANTE: Este script precisa das credenciais do Neon"
echo "Certifique-se de ter configurado o .env local com:"
echo "  - POSTGRES_PRISMA_URL"
echo "  - POSTGRES_URL_NON_POOLING"
echo ""

read -p "Deseja continuar? (s/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Operação cancelada"
    exit 1
fi

echo ""
echo "📋 Verificando configuração local..."
echo ""

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo ""
    echo "Crie o arquivo .env com as credenciais do Neon:"
    echo ""
    echo "POSTGRES_PRISMA_URL=\"postgresql://...\""
    echo "POSTGRES_URL_NON_POOLING=\"postgresql://...\""
    echo ""
    exit 1
fi

# Verificar se as URLs estão configuradas
if ! grep -q "^POSTGRES_PRISMA_URL=" .env || grep -q "COLE_AQUI" .env; then
    echo "❌ POSTGRES_PRISMA_URL não configurado no .env"
    echo ""
    echo "Edite o arquivo .env e adicione a URL do Neon"
    exit 1
fi

echo "✅ Arquivo .env encontrado"
echo ""

echo "🔄 Gerando Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Erro ao gerar Prisma Client"
    exit 1
fi

echo ""
echo "🚀 Sincronizando schema com banco de dados..."
echo ""

npx prisma db push

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ BANCO SINCRONIZADO COM SUCESSO!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📊 Visualizar banco de dados:"
    echo "   npx prisma studio"
    echo ""
    echo "🧪 Testar upload em produção:"
    echo "   bash test-upload-production.sh"
    echo ""
    echo "⚠️  IMPORTANTE:"
    echo "Após sincronizar o banco, faça um redeploy no Vercel:"
    echo "1. Acesse: https://vercel.com/dashboard"
    echo "2. Clique no seu projeto"
    echo "3. Vá em 'Deployments'"
    echo "4. No último deploy, clique nos 3 pontinhos"
    echo "5. Clique em 'Redeploy'"
    echo ""
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "❌ ERRO AO SINCRONIZAR BANCO"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Possíveis causas:"
    echo "1. URLs do Neon incorretas no .env"
    echo "2. Banco de dados não acessível"
    echo "3. Permissões insuficientes"
    echo ""
    echo "Verifique:"
    echo "• As URLs no .env estão corretas"
    echo "• Você tem acesso ao banco no Neon"
    echo "• As URLs incluem ?sslmode=require"
    echo ""
    exit 1
fi
