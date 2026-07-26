import type { JSX } from 'react';

export type ToolCategory = 'calculators' | 'generators' | 'converters' | 'text-tools' | 'encoders' | 'other';

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
}

const tools: ToolDefinition[] = [
  { slug: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index and get health category recommendations.', category: 'calculators', icon: '📊' },
  { slug: 'date-difference', name: 'Date Difference', description: 'Calculate the exact number of days, months, and years between two dates.', category: 'calculators', icon: '📅' },
  { slug: 'password-generator', name: 'Password Generator', description: 'Generate strong, secure passwords with customizable length and character types.', category: 'generators', icon: '🔐' },
  { slug: 'qr-code-generator', name: 'QR Code Generator', description: 'Create QR codes for URLs, text, and more. Download as PNG.', category: 'generators', icon: '📱' },
  { slug: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUID v4 identifiers. Supports bulk generation.', category: 'generators', icon: '🔑' },
  { slug: 'random-number', name: 'Random Number', description: 'Generate random numbers within a range with optional decimal precision.', category: 'generators', icon: '🎲' },
  { slug: 'color-palette', name: 'Color Palette', description: 'Generate beautiful random color palettes with hex codes.', category: 'generators', icon: '🎨' },
  { slug: 'lorem-ipsum', name: 'Lorem Ipsum', description: 'Generate placeholder text in various lengths: words, sentences, or paragraphs.', category: 'generators', icon: '📝' },
  { slug: 'json-csv-converter', name: 'JSON ⇄ CSV', description: 'Convert data between JSON and CSV formats with support for nested objects.', category: 'converters', icon: '🔄' },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert between units of length, weight, temperature, and volume.', category: 'converters', icon: '📏' },
  { slug: 'base64-encoder', name: 'Base64 Encode/Decode', description: 'Encode text to Base64 or decode Base64 back to text.', category: 'encoders', icon: '🔡' },
  { slug: 'text-case-converter', name: 'Text Case Converter', description: 'Convert text between upper, lower, camel, pascal, kebab, snake, and title case.', category: 'text-tools', icon: '🔤' },
  { slug: 'word-counter', name: 'Word Counter', description: 'Count words, characters, sentences, paragraphs, and reading time.', category: 'text-tools', icon: '📊' },
  { slug: 'text-diff-checker', name: 'Text Diff Checker', description: 'Compare two texts and highlight the differences side by side.', category: 'text-tools', icon: '🔍' },
  { slug: 'text-repeater', name: 'Text Repeater', description: 'Repeat any text a specified number of times with optional separator.', category: 'text-tools', icon: '🔁' },
  { slug: 'markdown-preview', name: 'Markdown Preview', description: 'Write Markdown and see the rendered HTML preview in real time.', category: 'text-tools', icon: '📄' },
  { slug: 'list-randomizer', name: 'List Randomizer', description: 'Shuffle, randomize, and sort lists. Pick random items from your list.', category: 'other', icon: '🔀' },
  { slug: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for any text.', category: 'encoders', icon: '🔒' },
  { slug: 'url-encoder', name: 'URL Encoder/Decoder', description: 'Encode or decode URLs and query parameters.', category: 'encoders', icon: '🔗' },
  { slug: 'color-converter', name: 'Color Converter', description: 'Convert colors between HEX, RGB, and HSL formats.', category: 'converters', icon: '🌈' },
];

export const categoryLabels: Record<ToolCategory, string> = {
  calculators: 'Calculators',
  generators: 'Generators',
  converters: 'Converters',
  'text-tools': 'Text Tools',
  encoders: 'Encoders',
  other: 'Other',
};

export const categoryDescriptions: Record<ToolCategory, string> = {
  calculators: 'Handy calculators for everyday math and health',
  generators: 'Generate secure passwords, QR codes, UUIDs & more',
  converters: 'Convert data, units, colors and formats',
  'text-tools': 'Manipulate, analyze, and transform text',
  encoders: 'Encode, decode, and hash your data',
  other: 'Miscellaneous useful utilities',
};

export function getToolsByCategory(): Record<ToolCategory, ToolDefinition[]> {
  const grouped: Record<ToolCategory, ToolDefinition[]> = {
    calculators: [],
    generators: [],
    converters: [],
    'text-tools': [],
    encoders: [],
    other: [],
  };
  for (const tool of tools) {
    grouped[tool.category].push(tool);
  }
  return grouped;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find(t => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tools.map(t => t.slug);
}

export default tools;
