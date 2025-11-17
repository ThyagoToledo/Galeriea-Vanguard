#!/bin/bash

echo "🔍 Testando API em Produção - Galeria Vanguard"
echo "=============================================="
echo ""

VERCEL_URL="https://galeriea-vanguard.vercel.app"

echo "📡 Testando endpoint de debug..."
echo "GET ${VERCEL_URL}/api/debug"
echo ""

response=$(curl -s "${VERCEL_URL}/api/debug" 2>&1)

if [ $? -eq 0 ]; then
    echo "✅ Resposta recebida:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
else
    echo "❌ Erro ao conectar com a API"
    echo "$response"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🧪 Analisando configuração..."

# Verificar se tem erro de banco
if echo "$response" | grep -q "database.*error\|Prisma.*error\|connection"; then
    echo "❌ PROBLEMA: Erro de conexão com banco de dados"
    echo ""
    echo "Solução:"
    echo "1. Verifique se POSTGRES_PRISMA_URL está configurado no Vercel"
    echo "2. Verifique se POSTGRES_URL_NON_POOLING está configurado"
    echo "3. Execute: npx prisma db push (para sincronizar schema)"
fi

# Verificar se tem erro do Cloudinary
if echo "$response" | grep -q "cloudinary\|api_key"; then
    echo "❌ PROBLEMA: Erro no Cloudinary"
    echo ""
    echo "Solução:"
    echo "1. Verifique NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
    echo "2. Verifique CLOUDINARY_API_KEY"
    echo "3. Verifique CLOUDINARY_API_SECRET"
fi

echo ""
echo "📋 Verificando logs do Vercel..."
echo "Acesse: https://vercel.com/dashboard"
echo "→ Seu projeto → Deployments → Último deploy → View Function Logs"
echo ""
