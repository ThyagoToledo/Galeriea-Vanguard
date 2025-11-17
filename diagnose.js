#!/usr/bin/env node

console.log('🔍 Diagnóstico de Upload - Galeria Vanguard\n');

// 1. Verificar variáveis de ambiente
console.log('1️⃣  VARIÁVEIS DE AMBIENTE');
console.log('─────────────────────────────');

const requiredVars = {
    'POSTGRES_PRISMA_URL': process.env.POSTGRES_PRISMA_URL,
    'POSTGRES_URL_NON_POOLING': process.env.POSTGRES_URL_NON_POOLING,
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
    'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET,
    'NEXTAUTH_SECRET': process.env.NEXTAUTH_SECRET,
};

let missingVars = [];
for (const [key, value] of Object.entries(requiredVars)) {
    const status = value && !value.includes('COLE_AQUI') ? '✅' : '❌';
    const display = value && !value.includes('COLE_AQUI') 
        ? (key.includes('SECRET') ? '***oculto***' : value.substring(0, 30) + '...')
        : '⚠️  NÃO CONFIGURADO';
    
    console.log(`${status} ${key}: ${display}`);
    
    if (!value || value.includes('COLE_AQUI')) {
        missingVars.push(key);
    }
}

// 2. Testar conexão com banco
console.log('\n2️⃣  CONEXÃO COM BANCO DE DADOS');
console.log('─────────────────────────────');

if (missingVars.some(v => v.includes('POSTGRES'))) {
    console.log('❌ Impossível testar: URLs do PostgreSQL não configuradas');
} else {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    (async () => {
        try {
            await prisma.$connect();
            console.log('✅ Conexão com PostgreSQL estabelecida');
            
            const userCount = await prisma.user.count();
            const artworkCount = await prisma.artwork.count();
            
            console.log(`   📊 ${userCount} usuário(s) cadastrado(s)`);
            console.log(`   📊 ${artworkCount} artwork(s) no banco`);
            
            await prisma.$disconnect();
        } catch (error) {
            console.log('❌ Erro ao conectar com banco:', error.message);
            process.exit(1);
        }
    })();
}

// 3. Testar Cloudinary
console.log('\n3️⃣  CLOUDINARY');
console.log('─────────────────────────────');

if (missingVars.some(v => v.includes('CLOUDINARY'))) {
    console.log('❌ Impossível testar: Credenciais Cloudinary não configuradas');
} else {
    const { v2: cloudinary } = require('cloudinary');
    
    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    cloudinary.api.ping((error, result) => {
        if (error) {
            console.log('❌ Erro ao conectar com Cloudinary:', error.message);
        } else {
            console.log('✅ Cloudinary configurado corretamente');
            console.log(`   ☁️  Cloud: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
        }
    });
}

// 4. Resumo
console.log('\n4️⃣  RESUMO');
console.log('─────────────────────────────');

if (missingVars.length > 0) {
    console.log('❌ CONFIGURAÇÃO INCOMPLETA\n');
    console.log('Variáveis faltando:');
    missingVars.forEach(v => console.log(`   • ${v}`));
    console.log('\n📝 Edite o arquivo .env e configure essas variáveis.');
    console.log('📚 Veja instruções em: DadosUsados.md\n');
    process.exit(1);
} else {
    console.log('✅ Todas as variáveis configuradas!');
    console.log('🚀 Sistema pronto para upload\n');
}
