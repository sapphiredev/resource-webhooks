<template>
	<div class="form-control mb-4 h-1/2 w-full">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<MonacoEditor
			:value="value"
			:model-value="value"
			:options="options"
			lang="markdown"
			@input="handleChange"
			@blur="handleBlur"
			class="h-full w-full"
		/>
		<forms-error-message :name="name" :errorMessage="!!errorMessage" />
	</div>
</template>

<script setup lang="ts">
import type { editor as monacoEditor } from 'monaco-editor';
import { useField } from 'vee-validate';

const props = defineProps<{ name: string; label: string }>();

const options: monacoEditor.IEditorConstructionOptions & { theme?: string } = {
	automaticLayout: true,
	selectOnLineNumbers: true,
	wordWrap: 'on',
	wrappingStrategy: 'advanced',
	minimap: {
		enabled: false
	},
	autoClosingQuotes: 'always',
	bracketPairColorization: {
		enabled: true
	},
	colorDecorators: true,
	cursorBlinking: 'expand',
	cursorSmoothCaretAnimation: 'on',
	fontLigatures: true,
	fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"',
	formatOnPaste: true,
	guides: {
		bracketPairs: true
	},
	theme: 'vs-dark',
	smartSelect: {
		selectLeadingAndTrailingWhitespace: true
	},
	tabCompletion: 'on',
	useShadowDOM: true
};

const { value, errorMessage, handleChange, handleBlur } = useField<string>(props.name);
</script>
