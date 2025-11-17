#!/bin/bash

echo "🔧 CORREÇÃO RÁPIDA - Erro 500 no Upload"
echo "========================================"
echo ""

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "✅ Criando .env a partir de .env.example..."
    cp .env.example .env 2>/dev/null || echo "⚠️  .env.example não encontrado"
fi

echo "📋 STATUS DAS VARIÁVEIS DE AMBIENTE:"
echo "------------------------------------"

check_var() {
    local var_name=$1
    local var_value=$(grep "^${var_name}=" .env 2>/dev/null | cut -d'=' -f2- | tr -d '"')
    
    if [ -z "$var_value" ] || echo "$var_value" | grep -q "COLE_AQUI"; then
        echo "❌ $var_name: NÃO CONFIGURADO"
        return 1
    else
        if echo "$var_name" | grep -q "SECRET"; then
            echo "✅ $var_name: ***configurado***"
        else
            echo "✅ $var_name: ${var_value:0:30}..."
        fi
        return 0
    fi
}

# Verificar cada variável
missing=0
check_var "POSTGRES_PRISMA_URL" || ((missing++))
check_var "POSTGRES_URL_NON_POOLING" || ((missing++))
check_var "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" || ((missing++))
check_var "CLOUDINARY_API_KEY" || ((missing++))
check_var "CLOUDINARY_API_SECRET" || ((missing++))

echo ""
echo "📊 RESULTADO:"
echo "------------------------------------"

if [ $missing -eq 0 ]; then
    echo "✅ Todas as variáveis configuradas!"
    echo ""
    echo "🔄 Reinicie o servidor:"
    echo "   npm run dev"
    echo ""
    echo "🧪 Teste o upload em: http://localhost:3000/upload"
else
    echo "❌ $missing variável(is) faltando"
    echo ""
    echo "📝 PRÓXIMOS PASSOS:"
    echo ""
    echo "1️⃣  CONFIGURAR NEON (Banco de Dados):"
    echo "   • Acesse: https://console.neon.tech"
    echo "   • Ou: https://vercel.com/dashboard → Settings → Environment Variables"
    echo "   • Copie POSTGRES_PRISMA_URL e POSTGRES_URL_NON_POOLING"
    echo "   • Cole no arquivo .env"
    echo ""
    echo "2️⃣  CONFIGURAR CLOUDINARY (Upload de Imagens):"
    echo "   • Acesse: https://cloudinary.com/console"
    echo "   • No Dashboard, copie:"
    echo "     - Cloud Name"
    echo "     - API Key"
    echo "     - API Secret"
    echo "   • Cole no arquivo .env"
    echo ""
    echo "3️⃣  VERIFICAR:"
    echo "   bash check-env.sh"
    echo ""
fi

echo "📖 Documentação completa: DadosUsados.md"
echo "🐛 Debug detalhado: node diagnose.js"
