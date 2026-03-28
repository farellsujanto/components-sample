'use client';

import React, { useState } from 'react';
import { DashboardMenu } from './components/ui/DashboardMenu';
import { Header } from './components/ui/Header';
import { Button, IconButton } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Textarea } from './components/ui/Textarea';
import { Select } from './components/ui/Select';
import { Toggle } from './components/ui/Toggle';
import { Slider } from './components/ui/Slider';
import { Modal } from './components/ui/Modal';
import { Chip } from './components/ui/Chip';
import { Badge } from './components/ui/Badge';
import { Alert } from './components/ui/Alert';
import { Avatar } from './components/ui/Avatar';
import { Breadcrumb } from './components/ui/Breadcrumb';
import { Progress } from './components/ui/Progress';
import { Spinner } from './components/ui/Spinner';
import { Tooltip } from './components/ui/Tooltip';
import { Dropdown } from './components/ui/Dropdown';
import { Tabs } from './components/ui/Tabs';
import { Card, CardHeader, CardBody, CardFooter } from './components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from './components/ui/Table';
import { Pagination } from './components/ui/Pagination';
import { Island } from './components/ui/Island';

// ── SVG icon helpers ──────────────────────────────────────────────────────────
const Icon = {
  palette: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/></svg>,
  type: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  form: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  nav: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  table: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/></svg>,
  layout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  dots: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>,
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  copy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  download: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  settings: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  user: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  help: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  logout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// ── Types ─────────────────────────────────────────────────────────────────────
type SectionId = 'colors' | 'typography' | 'buttons' | 'forms' | 'feedback' | 'navigation' | 'overlays' | 'data' | 'layout';

const MENU_SECTIONS = [
  {
    title: 'Foundations',
    items: [
      { id: 'colors', label: 'Colors', icon: Icon.palette },
      { id: 'typography', label: 'Typography', icon: Icon.type },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'buttons', label: 'Buttons & Actions', icon: Icon.zap },
      { id: 'forms', label: 'Forms', icon: Icon.form },
      { id: 'feedback', label: 'Feedback', icon: Icon.bell },
      { id: 'navigation', label: 'Navigation', icon: Icon.nav },
      { id: 'overlays', label: 'Overlays', icon: Icon.layers },
      { id: 'data', label: 'Data', icon: Icon.table },
      { id: 'layout', label: 'Layout', icon: Icon.layout },
    ],
  },
];

// ── Shared wrappers ───────────────────────────────────────────────────────────
// Section is an alias for Island — use Island directly for new code
const Section = Island;

function Row({ children, gap = 'gap-3' }: { children: React.ReactNode; gap?: string }) {
  return <div className={`flex flex-wrap items-center ${gap}`}>{children}</div>;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2 mt-4 first:mt-0">{children}</p>;
}

// ── Copy chip ─────────────────────────────────────────────────────────────────
function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1 text-[11px] text-[#a1a1aa] hover:text-[#1b3a5c] transition-colors cursor-pointer"
    >
      {copied ? Icon.check : Icon.copy}
      {copied ? 'Copied' : value}
    </button>
  );
}

// ── Color palette data ────────────────────────────────────────────────────────
const colorGroups = [
  {
    name: 'Brand (Navy)',
    desc: 'The core brand palette. Navy is the single primary accent — used for CTAs, active states, focus rings, and links.',
    colors: [
      { name: 'Navy /10',  hex: '#e8edf3', bg: 'bg-[#e8edf3]', usage: 'Active nav bg, subtle tinted surfaces' },
      { name: 'Navy 300',  hex: '#8baabf', bg: 'bg-[#8baabf]', usage: 'Illustrated elements, light accents' },
      { name: 'Navy 400',  hex: '#264d75', bg: 'bg-[#264d75]', usage: 'Secondary brand shade, hover on light surfaces' },
      { name: 'Navy 500',  hex: '#1b3a5c', bg: 'bg-[#1b3a5c]', usage: 'Primary CTA, active states, focus borders' },
      { name: 'Navy 600',  hex: '#16324f', bg: 'bg-[#16324f]', usage: 'Hover state on primary actions' },
      { name: 'Navy 900',  hex: '#0a1929', bg: 'bg-[#0a1929]', usage: 'Deep brand, pressed state' },
    ],
  },
  {
    name: 'Neutral (Gray)',
    desc: 'Surface, border, and text hierarchy. Neutral tones carry no brand meaning — they structure the layout.',
    colors: [
      { name: 'White',    hex: '#ffffff', bg: 'bg-white',    usage: 'Card backgrounds, inputs, modals' },
      { name: 'Gray 50',  hex: '#f9fafb', bg: 'bg-[#f9fafb]', usage: 'Page background, table row stripes' },
      { name: 'Gray 100', hex: '#f3f4f6', bg: 'bg-[#f3f4f6]', usage: 'Input fills, secondary surfaces' },
      { name: 'Gray 200', hex: '#e5e7eb', bg: 'bg-[#e5e7eb]', usage: 'Borders, dividers, separator lines' },
      { name: 'Gray 400', hex: '#9ca3af', bg: 'bg-[#9ca3af]', usage: 'Placeholder text, muted icons' },
      { name: 'Gray 600', hex: '#4b5563', bg: 'bg-[#4b5563]', usage: 'Secondary body text, subtitles' },
      { name: 'Gray 900', hex: '#111827', bg: 'bg-[#111827]', usage: 'Headings, primary labels' },
    ],
  },
  {
    name: 'Semantic',
    desc: 'Color reserved exclusively for state meaning. Never apply these decoratively — each hue maps to one intent.',
    colors: [
      { name: 'Success',  hex: '#16a34a', bg: 'bg-[#16a34a]', usage: 'Completed, approved, active, live' },
      { name: 'Warning',  hex: '#d97706', bg: 'bg-[#d97706]', usage: 'Pending, expiring, draft, scheduled' },
      { name: 'Error',    hex: '#dc2626', bg: 'bg-[#dc2626]', usage: 'Failed, rejected, destructive actions' },
      { name: 'Info',     hex: '#2563eb', bg: 'bg-[#2563eb]', usage: 'Processing, open, informational' },
      { name: 'Purple',   hex: '#9333ea', bg: 'bg-[#9333ea]', usage: 'Admin badge, beta, special roles' },
    ],
  },
  {
    name: 'Status Surfaces',
    desc: 'Chip and badge backgrounds. Always pair with the matching semantic text color — never use alone.',
    colors: [
      { name: 'Success bg', hex: '#f0fdf4', bg: 'bg-[#f0fdf4]', usage: 'Completed · Approved · Active chip bg' },
      { name: 'Warning bg', hex: '#fffbeb', bg: 'bg-[#fffbeb]', usage: 'Pending · Expiring · Draft chip bg' },
      { name: 'Error bg',   hex: '#fef2f2', bg: 'bg-[#fef2f2]', usage: 'Failed · Rejected · Blocked chip bg' },
      { name: 'Info bg',    hex: '#eff6ff', bg: 'bg-[#eff6ff]', usage: 'Processing · Open · Info chip bg' },
      { name: 'Purple bg',  hex: '#faf5ff', bg: 'bg-[#faf5ff]', usage: 'Admin · Beta · Special role chip bg' },
      { name: 'Neutral bg', hex: '#f3f4f6', bg: 'bg-[#f3f4f6]', usage: 'Archived · Closed · Inactive chip bg' },
    ],
  },
];

// ── Typography data ───────────────────────────────────────────────────────────
const typeScale = [
  { name: 'Display',   size: '24px', weight: '700', class: 'text-[24px] font-bold text-[#18181b] leading-tight', sample: 'Dashboard Overview' },
  { name: 'Heading 1', size: '20px', weight: '600', class: 'text-[20px] font-semibold text-[#18181b] leading-tight', sample: 'Page Title' },
  { name: 'Heading 2', size: '16px', weight: '600', class: 'text-[16px] font-semibold text-[#18181b]', sample: 'Section Heading' },
  { name: 'Heading 3', size: '14px', weight: '600', class: 'text-[14px] font-semibold text-[#18181b]', sample: 'Card Title' },
  { name: 'Body',      size: '14px', weight: '400', class: 'text-[14px] font-normal text-[#52525b]', sample: 'Regular body text for content areas' },
  { name: 'Body Sm',   size: '13px', weight: '400', class: 'text-[13px] font-normal text-[#52525b]', sample: 'Compact body text for dense layouts' },
  { name: 'Caption',   size: '12px', weight: '400', class: 'text-[12px] font-normal text-[#a1a1aa]', sample: 'Captions, hints, timestamps' },
  { name: 'Label',     size: '11px', weight: '600', class: 'text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider', sample: 'TABLE HEADER · SECTION LABEL' },
];

// ── Table sample data ─────────────────────────────────────────────────────────
const tableData = [
  { id: '#1042', name: 'Aria Chen', email: 'aria@example.com', plan: 'Pro', status: 'active', mrr: '$149' },
  { id: '#1041', name: 'Marcus Silva', email: 'marcus@example.com', plan: 'Starter', status: 'pending', mrr: '$29' },
  { id: '#1040', name: 'Yuki Tanaka', email: 'yuki@example.com', plan: 'Enterprise', status: 'active', mrr: '$499' },
  { id: '#1039', name: 'Jordan Lee', email: 'jordan@example.com', plan: 'Pro', status: 'suspended', mrr: '$149' },
  { id: '#1038', name: 'Nina Patel', email: 'nina@example.com', plan: 'Starter', status: 'active', mrr: '$29' },
];

const statusChipVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'error',
};

// ── Section components ────────────────────────────────────────────────────────
function ColorsSection() {
  return (
    <div className="space-y-4">
      {colorGroups.map((g) => (
        <Section key={g.name} title={g.name} description={g.desc}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {g.colors.map((c) => (
              <div key={c.name} className="space-y-1.5">
                <div className={`h-14 rounded-xl ${c.bg} border border-black/5 flex items-end justify-end p-1.5`}>
                  <CopyChip value={c.hex} />
                </div>
                <p className="text-[12px] font-semibold text-[#18181b]">{c.name}</p>
                <p className="text-[11px] text-[#a1a1aa] leading-tight">{c.usage}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

function TypographySection() {
  return (
    <Section title="Type Scale" description="Font sizes, weights, and line heights for the Geist Sans type system.">
      <div className="divide-y divide-[#f4f4f5]">
        {typeScale.map((t) => (
          <div key={t.name} className="py-3 grid grid-cols-[100px_1fr_80px_80px] gap-4 items-center">
            <span className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">{t.name}</span>
            <span className={t.class}>{t.sample}</span>
            <span className="text-[11px] text-[#a1a1aa] text-right">{t.size}</span>
            <span className="text-[11px] text-[#a1a1aa] text-right">w{t.weight}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ButtonsSection() {
  return (
    <div className="space-y-4">
      <Section title="Button Variants" description="Five variants — primary, secondary, ghost, destructive, outline.">
        <SubLabel>Variants</SubLabel>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </Row>
        <SubLabel>Sizes</SubLabel>
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
        <SubLabel>With Icons</SubLabel>
        <Row>
          <Button variant="primary" icon={Icon.plus} iconPosition="left">New Item</Button>
          <Button variant="outline" icon={Icon.download} iconPosition="right">Export</Button>
          <Button variant="secondary" icon={Icon.search} iconPosition="left">Search</Button>
        </Row>
        <SubLabel>States</SubLabel>
        <Row>
          <Button loading>Loading...</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" loading>Saving...</Button>
        </Row>
      </Section>
      <Section title="Icon Buttons" description="Square icon-only buttons for toolbar actions.">
        <Row>
          <Tooltip content="Edit"><IconButton aria-label="Edit">{Icon.edit}</IconButton></Tooltip>
          <Tooltip content="Delete"><IconButton aria-label="Delete" variant="ghost">{Icon.trash}</IconButton></Tooltip>
          <Tooltip content="View"><IconButton aria-label="View" variant="outline">{Icon.eye}</IconButton></Tooltip>
          <Tooltip content="Download"><IconButton aria-label="Download" variant="primary">{Icon.download}</IconButton></Tooltip>
          <Tooltip content="Settings"><IconButton aria-label="Settings" size="lg" variant="outline">{Icon.settings}</IconButton></Tooltip>
          <Tooltip content="Small"><IconButton aria-label="Small" size="sm">{Icon.dots}</IconButton></Tooltip>
        </Row>
      </Section>
    </div>
  );
}

function FormsSection() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [sliderVal, setSliderVal] = useState(42);

  return (
    <div className="space-y-4">
      <Section title="Inputs" description="Text inputs with label, hint, error, icons, and disabled states.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full name" placeholder="John Smith" hint="Your legal name as it appears on ID" />
          <Input label="Email address" type="email" placeholder="john@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" hint="Min. 8 characters" />
          <Input label="Search" placeholder="Search customers…" leftIcon={Icon.search} />
          <Input label="With error" placeholder="Enter value" error="This field is required" />
          <Input label="Disabled" placeholder="Not editable" disabled value="Read only" onChange={() => {}} />
        </div>
      </Section>
      <Section title="Textarea" description="Multiline input for longer text content.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Textarea label="Description" placeholder="Write a short product description…" hint="Max 500 characters" />
          <Textarea label="With error" placeholder="Enter notes…" error="Notes cannot be empty" />
        </div>
      </Section>
      <Section title="Select" description="Native select element with custom styling.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Plan" placeholder="Choose a plan" options={[{ value: 'starter', label: 'Starter — $29/mo' }, { value: 'pro', label: 'Pro — $149/mo' }, { value: 'enterprise', label: 'Enterprise — $499/mo' }]} />
          <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'pending', label: 'Pending' }, { value: 'suspended', label: 'Suspended' }]} />
          <Select label="With error" placeholder="Select country" options={[{ value: 'us', label: 'United States' }]} error="Please select a country" />
          <Select label="Disabled" options={[{ value: 'pro', label: 'Pro — $149/mo' }]} disabled value="pro" onChange={() => {}} />
        </div>
      </Section>
      <Section title="Toggle" description="Controlled toggle switches.">
        <div className="space-y-4">
          <Toggle checked={toggle1} onChange={setToggle1} label="Email notifications" hint="Receive updates about your account activity" />
          <Toggle checked={toggle2} onChange={setToggle2} label="Two-factor authentication" hint="Add an extra layer of security" />
          <Toggle checked={true} onChange={() => {}} label="Feature flag (disabled)" disabled />
          <div className="pt-2 border-t border-[#f4f4f5]">
            <p className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">Small size</p>
            <Toggle checked={toggle1} onChange={setToggle1} size="sm" label="Compact toggle" />
          </div>
        </div>
      </Section>
      <Section title="Slider" description="Range slider with live value display.">
        <div className="space-y-6 max-w-md">
          <Slider label="Volume" value={sliderVal} onChange={setSliderVal} />
          <Slider label="Discount %" min={0} max={100} defaultValue={25} />
          <Slider label="Price range" min={0} max={1000} step={50} defaultValue={400} />
          <Slider label="Disabled" defaultValue={60} disabled />
        </div>
      </Section>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="space-y-4">
      <Section title="Status Chips" description="Semantic status indicators with colored dots.">
        <SubLabel>Variants</SubLabel>
        <Row>
          <Chip variant="success">Active</Chip>
          <Chip variant="warning">Pending</Chip>
          <Chip variant="error">Failed</Chip>
          <Chip variant="info">Processing</Chip>
          <Chip variant="neutral">Archived</Chip>
          <Chip variant="purple">Admin</Chip>
          <Chip variant="indigo">Featured</Chip>
        </Row>
        <SubLabel>Small size</SubLabel>
        <Row>
          <Chip variant="success" size="sm">Completed</Chip>
          <Chip variant="warning" size="sm">Draft</Chip>
          <Chip variant="error" size="sm">Rejected</Chip>
          <Chip variant="info" size="sm">Open</Chip>
          <Chip variant="neutral" size="sm">Closed</Chip>
        </Row>
        <SubLabel>No dot</SubLabel>
        <Row>
          <Chip variant="success" dot={false}>Verified</Chip>
          <Chip variant="error" dot={false}>Blocked</Chip>
          <Chip variant="indigo" dot={false}>Beta</Chip>
        </Row>
      </Section>
      <Section title="Badges" description="Numeric and text notification badges.">
        <Row gap="gap-4">
          {(['default', 'success', 'warning', 'error', 'info', 'purple'] as const).map((v) => (
            <div key={v} className="flex items-center gap-1.5">
              <Badge variant={v}>3</Badge>
              <Badge variant={v}>12</Badge>
              <Badge variant={v}>99+</Badge>
              <span className="text-[11px] text-[#a1a1aa]">{v}</span>
            </div>
          ))}
        </Row>
      </Section>
      <Section title="Alerts" description="Banners for contextual feedback — info, success, warning, error.">
        <div className="space-y-3">
          <Alert variant="info" title="Information">Your account is being reviewed. This usually takes 1–2 business days.</Alert>
          <Alert variant="success" title="Successfully saved">Your changes have been published and are now live.</Alert>
          <Alert variant="warning" title="Subscription expiring">Your Pro plan renews in 3 days. Update your payment method to avoid interruption.</Alert>
          <Alert variant="error" title="Payment failed">We couldn&apos;t process your payment. Please check your card details and try again.</Alert>
          <Alert variant="info" dismissible>Dismissible alert — click × to close.</Alert>
        </div>
      </Section>
      <Section title="Progress" description="Horizontal progress bars with label and percentage.">
        <div className="space-y-5 max-w-md">
          <Progress label="Storage used" value={68} />
          <Progress label="Tasks completed" value={12} max={15} variant="success" />
          <Progress label="Quota warning" value={85} variant="warning" size="lg" />
          <Progress label="Over limit" value={100} variant="error" />
          <Progress label="Small bar" value={40} size="sm" showPercent={false} />
        </div>
      </Section>
      <Section title="Spinner" description="Loading indicator in four sizes.">
        <Row gap="gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="sm" />
            <span className="text-[11px] text-[#a1a1aa]">sm</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="md" />
            <span className="text-[11px] text-[#a1a1aa]">md</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="lg" />
            <span className="text-[11px] text-[#a1a1aa]">lg</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="xl" />
            <span className="text-[11px] text-[#a1a1aa]">xl</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="lg" color="#16a34a" />
            <span className="text-[11px] text-[#a1a1aa]">success</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Spinner size="lg" color="#dc2626" />
            <span className="text-[11px] text-[#a1a1aa]">error</span>
          </div>
        </Row>
      </Section>
    </div>
  );
}

function NavigationSection() {
  const [tabActive, setTabActive] = useState('overview');
  const [page, setPage] = useState(3);

  return (
    <div className="space-y-4">
      <Section title="Page Header" description="Page title, subtitle, breadcrumb, and actions slot.">
        <div className="space-y-6">
          <Header
            title="Customer Management"
            subtitle="View and manage all customer accounts, billing, and activity."
            breadcrumb={[{ label: 'Dashboard', href: '#' }, { label: 'Customers', href: '#' }, { label: 'All Customers' }]}
            actions={
              <Row>
                <Button variant="outline" size="sm" icon={Icon.download}>Export</Button>
                <Button size="sm" icon={Icon.plus}>New Customer</Button>
              </Row>
            }
          />
          <div className="border-t border-[#f4f4f5] pt-4">
            <Header title="Analytics" subtitle="Revenue and growth metrics." />
          </div>
        </div>
      </Section>
      <Section title="Breadcrumb" description="Navigation breadcrumb trail.">
        <div className="space-y-3">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Team' }]} />
          <Breadcrumb items={[{ label: 'Dashboard', href: '#' }, { label: 'Products', href: '#' }, { label: 'Collections', href: '#' }, { label: 'Summer 2026' }]} />
          <Breadcrumb items={[{ label: 'Billing' }]} />
        </div>
      </Section>
      <Section title="Tabs" description="Horizontal underline tab navigation.">
        <div className="space-y-5">
          <Tabs
            activeId={tabActive}
            onChange={setTabActive}
            items={[
              { id: 'overview', label: 'Overview' },
              { id: 'analytics', label: 'Analytics', badge: 'New' },
              { id: 'orders', label: 'Orders', badge: 12 },
              { id: 'customers', label: 'Customers' },
              { id: 'settings', label: 'Settings' },
            ]}
          />
          <div className="bg-[#fafafa] rounded-xl p-4 text-[13px] text-[#52525b]">
            Active tab: <strong className="text-[#18181b]">{tabActive}</strong>
          </div>
        </div>
      </Section>
      <Section title="Pagination" description="Page controls with ellipsis for large page counts.">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#52525b]">Page {page} of 12</span>
            <Pagination page={page} totalPages={12} onChange={setPage} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#52525b]">Short — page 1 of 4</span>
            <Pagination page={1} totalPages={4} onChange={() => {}} />
          </div>
        </div>
      </Section>
    </div>
  );
}

function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Section title="Modal" description="Dialog overlays with title, description, body, and footer slots.">
        <Row>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Delete Item…</Button>
        </Row>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Edit Customer"
          description="Update customer details below."
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Save changes</Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input label="Full name" defaultValue="Aria Chen" />
            <Input label="Email" type="email" defaultValue="aria@example.com" />
            <Select label="Plan" options={[{ value: 'pro', label: 'Pro — $149/mo' }, { value: 'enterprise', label: 'Enterprise — $499/mo' }]} defaultValue="pro" />
          </div>
        </Modal>
        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete customer?"
          description="This action cannot be undone. All associated data will be permanently removed."
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(false)}>Delete</Button>
            </>
          }
        />
      </Section>
      <Section title="Dropdown Menu" description="Context menus triggered by a button click.">
        <Row>
          <Dropdown
            trigger={<Button variant="outline" icon={Icon.dots} iconPosition="right">Actions</Button>}
            items={[
              { label: 'View details', icon: Icon.eye, onClick: () => {} },
              { label: 'Edit', icon: Icon.edit, onClick: () => {} },
              { label: 'Duplicate', icon: Icon.copy, onClick: () => {} },
              { divider: true, label: '' },
              { label: 'Delete', icon: Icon.trash, danger: true, onClick: () => {} },
            ]}
          />
          <Dropdown
            align="left"
            trigger={<IconButton aria-label="More options">{Icon.dots}</IconButton>}
            items={[
              { label: 'Account settings', icon: Icon.settings },
              { label: 'Profile', icon: Icon.user },
              { label: 'Help', icon: Icon.help },
              { divider: true, label: '' },
              { label: 'Sign out', icon: Icon.logout, danger: true },
            ]}
          />
        </Row>
      </Section>
      <Section title="Tooltip" description="CSS-only hover tooltips in four positions.">
        <Row gap="gap-6">
          <Tooltip content="Tooltip on top" position="top"><Button variant="outline" size="sm">Top</Button></Tooltip>
          <Tooltip content="Tooltip on bottom" position="bottom"><Button variant="outline" size="sm">Bottom</Button></Tooltip>
          <Tooltip content="Left tooltip" position="left"><Button variant="outline" size="sm">Left</Button></Tooltip>
          <Tooltip content="Right tooltip" position="right"><Button variant="outline" size="sm">Right</Button></Tooltip>
          <Tooltip content="Delete this item permanently"><IconButton aria-label="Delete">{Icon.trash}</IconButton></Tooltip>
        </Row>
      </Section>
    </div>
  );
}

function DataSection() {
  return (
    <Section title="Data Table" description="Striped table with status chips, avatar, and action columns.">
      <Table>
        <TableHead>
          <TableRow>
            <TableTh>Customer</TableTh>
            <TableTh>Email</TableTh>
            <TableTh>Plan</TableTh>
            <TableTh>Status</TableTh>
            <TableTh className="text-right">MRR</TableTh>
            <TableTh className="text-right">Actions</TableTh>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableTd>
                <div className="flex items-center gap-2.5">
                  <Avatar name={row.name} size="sm" />
                  <div>
                    <p className="font-medium text-[#18181b]">{row.name}</p>
                    <p className="text-[11px] text-[#a1a1aa]">{row.id}</p>
                  </div>
                </div>
              </TableTd>
              <TableTd className="text-[#52525b]">{row.email}</TableTd>
              <TableTd>
                <span className="text-[12px] font-medium text-[#18181b]">{row.plan}</span>
              </TableTd>
              <TableTd>
                <Chip variant={statusChipVariant[row.status] ?? 'neutral'} size="sm">
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </Chip>
              </TableTd>
              <TableTd className="text-right font-semibold text-[#18181b]">{row.mrr}</TableTd>
              <TableTd className="text-right">
                <div className="flex justify-end gap-1">
                  <Tooltip content="View"><IconButton aria-label="View" size="sm">{Icon.eye}</IconButton></Tooltip>
                  <Tooltip content="Edit"><IconButton aria-label="Edit" size="sm">{Icon.edit}</IconButton></Tooltip>
                </div>
              </TableTd>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  );
}

function LayoutSection() {
  return (
    <div className="space-y-4">
      <Section title="Cards" description="Content containers with optional header, body, and footer slots.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader title="Monthly Revenue" subtitle="March 2026" actions={<Chip variant="success" size="sm">+12%</Chip>} />
            <CardBody>
              <p className="text-[28px] font-bold text-[#18181b]">$24,580</p>
              <p className="text-[12px] text-[#a1a1aa] mt-1">vs. $21,950 last month</p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">View breakdown →</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader title="Active Customers" subtitle="Live count" actions={<Badge variant="info">New</Badge>} />
            <CardBody>
              <p className="text-[28px] font-bold text-[#18181b]">1,284</p>
              <Progress value={72} showPercent={false} size="sm" className="mt-3" />
              <p className="text-[12px] text-[#a1a1aa] mt-1">72% of 1,800 target</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Simple Card" />
            <CardBody>
              <p className="text-[13px] text-[#52525b]">A minimal card with only a header and body — no footer needed.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-[13px] font-medium text-[#18181b] mb-1">Card without header</p>
              <p className="text-[13px] text-[#52525b]">Sometimes you just need a bordered container with padding.</p>
            </CardBody>
          </Card>
        </div>
      </Section>
      <Section title="Avatars" description="Initials-based avatars in four sizes with status indicators.">
        <SubLabel>Sizes</SubLabel>
        <Row gap="gap-4">
          {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar name="Aria Chen" size={s} />
              <span className="text-[11px] text-[#a1a1aa]">{s}</span>
            </div>
          ))}
        </Row>
        <SubLabel>With Status</SubLabel>
        <Row gap="gap-4">
          {(['online', 'away', 'busy', 'offline'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Avatar name="Marcus Silva" size="md" status={s} />
              <span className="text-[11px] text-[#a1a1aa]">{s}</span>
            </div>
          ))}
        </Row>
        <SubLabel>Color Variants</SubLabel>
        <Row gap="gap-2">
          {['Aria Chen', 'Marcus Silva', 'Yuki Tanaka', 'Jordan Lee', 'Nina Patel', 'Alex Wong'].map((n) => (
            <Avatar key={n} name={n} size="md" />
          ))}
        </Row>
      </Section>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const MobileMenuIcon = ({ open }: { open: boolean }) => open
  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('colors');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (id: string) => {
    setActiveSection(id as SectionId);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'colors':     return <ColorsSection />;
      case 'typography': return <TypographySection />;
      case 'buttons':    return <ButtonsSection />;
      case 'forms':      return <FormsSection />;
      case 'feedback':   return <FeedbackSection />;
      case 'navigation': return <NavigationSection />;
      case 'overlays':   return <OverlaysSection />;
      case 'data':       return <DataSection />;
      case 'layout':     return <LayoutSection />;
      default:           return null;
    }
  };

  const sidebarProps = {
    activeId: activeSection,
    onSelect: handleSelect,
    sections: MENU_SECTIONS,
    header: (
      <div>
        <p className="text-[14px] font-bold text-[#18181b]">Design System</p>
        <p className="text-[11px] text-[#a1a1aa] mt-0.5">Component library v1.0</p>
      </div>
    ),
    footer: (
      <div className="flex items-center gap-2.5">
        <Avatar name="Design Team" size="sm" />
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[#18181b] truncate">Design Team</p>
          <p className="text-[11px] text-[#a1a1aa]">Admin</p>
        </div>
      </div>
    ),
  };

  const activeLabel = MENU_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeSection)?.label ?? 'Design System';

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden">
      {/* Desktop sidebar */}
      <DashboardMenu className="w-56 flex-shrink-0 hidden md:flex" {...sidebarProps} />

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <DashboardMenu className="absolute left-0 top-0 bottom-0 w-64 flex z-50" {...sidebarProps} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e4e4e7] bg-white md:hidden sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="text-[#52525b] hover:text-[#18181b] transition-colors cursor-pointer"
          >
            <MobileMenuIcon open={false} />
          </button>
          <span className="text-[13px] font-semibold text-[#18181b]">{activeLabel}</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-2">
          <Header
            title={activeLabel}
            subtitle="Component design system — minimalistic, modern, Shopify-inspired."
            className="mb-5 hidden md:flex"
          />
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
