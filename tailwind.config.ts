import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    darkMode: ['class'],
    content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'lib/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca'
                },
                secondary: {
                    500: '#8b5cf6',
                    600: '#7c3aed'
                }
            },
            fontFamily: {
                heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                body: ['"Inter"', 'system-ui', 'sans-serif']
            }
        }
    },
    plugins: [plugin(({ addUtilities }) => {
        addUtilities({
            '.text-balance': {
                textWrap: 'balance'
            }
        });
    })]
};

export default config;
