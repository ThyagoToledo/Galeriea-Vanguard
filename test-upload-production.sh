#!/bin/bash

echo "🧪 Teste Detalhado do Upload - Produção"
echo "======================================="
echo ""

# Criar uma imagem de teste pequena (1x1 pixel PNG)
echo "📝 Criando imagem de teste..."
echo -n "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" | base64 -d > /tmp/test.png

echo "✅ Imagem criada: /tmp/test.png"
echo ""

echo "🚀 Enviando upload para produção..."
echo "POST https://galeriea-vanguard.vercel.app/api/upload"
echo ""

# Fazer upload
response=$(curl -s -X POST https://galeriea-vanguard.vercel.app/api/upload \
  -F "image=@/tmp/test.png" \
  -F "title=Teste Upload Script" \
  -F "description=Teste automatizado" \
  -F "tags=teste,debug" \
  -w "\nHTTP_STATUS:%{http_code}" 2>&1)

# Separar corpo e status
http_body=$(echo "$response" | sed '$d')
http_status=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)

echo "📊 Status HTTP: $http_status"
echo ""

if [ "$http_status" = "201" ] || [ "$http_status" = "200" ]; then
    echo "✅ Upload bem-sucedido!"
    echo ""
    echo "Resposta:"
    echo "$http_body" | jq '.' 2>/dev/null || echo "$http_body"
elif [ "$http_status" = "500" ]; then
    echo "❌ Erro 500 - Erro interno do servidor"
    echo ""
    echo "Resposta do servidor:"
    echo "$http_body" | jq '.' 2>/dev/null || echo "$http_body"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔍 POSSÍVEIS CAUSAS:"
    echo ""
    
    if echo "$http_body" | grep -qi "prisma\|database\|connection"; then
        echo "❌ ERRO DE BANCO DE DADOS"
        echo ""
        echo "Causas comuns:"
        echo "1. POSTGRES_PRISMA_URL não configurado ou inválido"
        echo "2. POSTGRES_URL_NON_POOLING não configurado ou inválido"
        echo "3. Banco não sincronizado (falta executar: npx prisma db push)"
        echo "4. Tabelas não existem no banco"
        echo ""
        echo "Solução:"
        echo "• Verifique as URLs no Vercel → Settings → Environment Variables"
        echo "• Execute localmente: npx prisma db push"
        echo "• Verifique os logs: https://vercel.com/dashboard → Deployments → Function Logs"
        
    elif echo "$http_body" | grep -qi "cloudinary\|api_key\|upload.*fail"; then
        echo "❌ ERRO DO CLOUDINARY"
        echo ""
        echo "Causas comuns:"
        echo "1. CLOUDINARY_API_KEY incorreto ou não configurado"
        echo "2. CLOUDINARY_API_SECRET incorreto ou não configurado"
        echo "3. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME incorreto"
        echo ""
        echo "Solução:"
        echo "• Acesse: https://cloudinary.com/console"
        echo "• Copie as credenciais corretas"
        echo "• Atualize no Vercel → Settings → Environment Variables"
        
    else
        echo "❓ ERRO GENÉRICO"
        echo ""
        echo "Verifique os logs completos em:"
        echo "https://vercel.com/dashboard"
        echo "→ Seu projeto → Deployments → Último deploy → View Function Logs"
    fi
    
elif [ "$http_status" = "400" ]; then
    echo "⚠️  Erro 400 - Requisição inválida"
    echo ""
    echo "Resposta:"
    echo "$http_body" | jq '.' 2>/dev/null || echo "$http_body"
else
    echo "⚠️  Status inesperado: $http_status"
    echo ""
    echo "Resposta:"
    echo "$http_body"
fi

# Limpar arquivo temporário
rm -f /tmp/test.png

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Para mais detalhes, veja os logs do Vercel:"
echo "https://vercel.com/dashboard → Deployments → Function Logs"
echo ""
