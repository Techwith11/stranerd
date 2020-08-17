module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript'
	],
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-var': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'indent': ['error', 'tab'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		/*'semi': ['error', 'never'],
	    'quotes': ['error', 'single'],
	    'prefer-const': ['error'],
	    'arrow-parens': ['error', 'always']*/
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
}
