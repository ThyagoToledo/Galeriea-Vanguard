-- Script para criar usuário temporário no banco
-- Execute este SQL no Console do Neon: https://console.neon.tech

-- Criar usuário temporário com ID fixo
INSERT INTO "User" (id, email, name, password, "createdAt")
VALUES (
    'temp-user-galeria-vanguard',
    'temp@galeriavanguard.com',
    'Galeria Vanguard',
    'temp-hash-development',
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Verificar se foi criado
SELECT id, email, name FROM "User" WHERE id = 'temp-user-galeria-vanguard';
