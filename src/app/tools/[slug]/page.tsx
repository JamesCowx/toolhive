import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import { getToolBySlug, getAllSlugs } from '@/data/tools';
import * as ToolComponents from '@/tools';

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - ToolHive`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const componentMap: Record<string, React.ComponentType> = {
    'bmi-calculator': ToolComponents.BMICalculator,
    'date-difference': ToolComponents.DateDifference,
    'password-generator': ToolComponents.PasswordGenerator,
    'qr-code-generator': ToolComponents.QRCodeGenerator,
    'uuid-generator': ToolComponents.UUIDGenerator,
    'random-number': ToolComponents.RandomNumber,
    'color-palette': ToolComponents.ColorPalette,
    'lorem-ipsum': ToolComponents.LoremIpsum,
    'json-csv-converter': ToolComponents.JsonCsvConverter,
    'unit-converter': ToolComponents.UnitConverter,
    'base64-encoder': ToolComponents.Base64Encoder,
    'text-case-converter': ToolComponents.TextCaseConverter,
    'word-counter': ToolComponents.WordCounter,
    'text-diff-checker': ToolComponents.TextDiffChecker,
    'text-repeater': ToolComponents.TextRepeater,
    'markdown-preview': ToolComponents.MarkdownPreview,
    'list-randomizer': ToolComponents.ListRandomizer,
    'hash-generator': ToolComponents.HashGenerator,
    'url-encoder': ToolComponents.UrlEncoder,
    'color-converter': ToolComponents.ColorConverter,
    'percentage-calculator': ToolComponents.PercentageCalculator,
    'age-calculator': ToolComponents.AgeCalculator,
    'binary-hex-converter': ToolComponents.BinaryHexConverter,
    'tip-calculator': ToolComponents.TipCalculator,
    'json-formatter': ToolComponents.JsonFormatter,
    'stopwatch': ToolComponents.Stopwatch,
    'emoji-picker': ToolComponents.EmojiPicker,
    'morse-code': ToolComponents.MorseCode,
  };

  const Component = componentMap[params.slug];
  if (!Component) notFound();

  return (
    <ToolLayout tool={tool}>
      <Component />
    </ToolLayout>
  );
}
