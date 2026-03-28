# Design System

A Shopify-inspired dashboard component library built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Minimalistic, modern, no gradients.

**Live preview:** `npm run dev` → `http://localhost:3000`

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color Tokens](#color-tokens)
3. [Typography](#typography)
4. [Components](#components)
   - [Island](#island)
   - [Button & IconButton](#button--iconbutton)
   - [Input](#input)
   - [Textarea](#textarea)
   - [Select](#select)
   - [Toggle](#toggle)
   - [Slider](#slider)
   - [Modal](#modal)
   - [Chip](#chip)
   - [Badge](#badge)
   - [Alert](#alert)
   - [Avatar](#avatar)
   - [Breadcrumb](#breadcrumb)
   - [Progress](#progress)
   - [Spinner](#spinner)
   - [Tooltip](#tooltip)
   - [Dropdown](#dropdown)
   - [DashboardMenu](#dashboardmenu)
   - [Header](#header)
   - [Tabs](#tabs)
   - [Card](#card)
   - [Table](#table)
   - [Pagination](#pagination)
5. [File Structure](#file-structure)

---

## Design Principles

| Rule | Detail |
|---|---|
| **Navy as the single brand accent** | `#1b3a5c` is the only brand color. One primary CTA per page. |
| **No gradients** | All surfaces are flat. Color is used for meaning, not decoration. |
| **Semantic color only** | Green = success, Amber = warning, Red = error, Blue = info, Purple = admin. Never applied for aesthetics. |
| **Neutral surfaces** | Gray neutrals carry no brand meaning — they structure layout and hierarchy. |
| **Overflow-safe containers** | `Island` and `Card` do not use `overflow-hidden`, so Dropdowns and Tooltips can escape their bounds. |

---

## Color Tokens

Defined in `app/globals.css` via Tailwind v4 `@theme inline`.

### Brand (Navy)

| Token | Hex | Usage |
|---|---|---|
| Navy /10 | `#e8edf3` | Active nav background, tinted chip surfaces |
| Navy 300 | `#8baabf` | Illustrated elements, light accents |
| Navy 400 | `#264d75` | Secondary brand shade, hover on light surfaces |
| **Navy 500** | **`#1b3a5c`** | **Primary CTA, active states, focus borders, links** |
| Navy 600 | `#16324f` | Hover state on primary actions |
| Navy 900 | `#0a1929` | Deep brand, pressed state |

### Neutral (Gray)

| Token | Hex | Usage |
|---|---|---|
| White | `#ffffff` | Card backgrounds, inputs, modals |
| Gray 50 | `#f9fafb` | Page background, table row stripes |
| Gray 100 | `#f3f4f6` | Input fills, secondary surfaces |
| Gray 200 | `#e5e7eb` | Borders, dividers, separator lines |
| Gray 400 | `#9ca3af` | Placeholder text, muted icons |
| Gray 600 | `#4b5563` | Secondary body text, subtitles |
| Gray 900 | `#111827` | Headings, primary labels |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| Success | `#16a34a` | Completed, approved, active, live |
| Warning | `#d97706` | Pending, expiring, draft, scheduled |
| Error | `#dc2626` | Failed, rejected, destructive actions |
| Info | `#2563eb` | Processing, open, informational |
| Purple | `#9333ea` | Admin badge, beta, special roles |

### Status Surfaces

Light chip/badge backgrounds — always paired with their matching semantic text color.

| Name | Hex | Paired with |
|---|---|---|
| Success bg | `#f0fdf4` | `text-[#16a34a]` |
| Warning bg | `#fffbeb` | `text-[#d97706]` |
| Error bg | `#fef2f2` | `text-[#dc2626]` |
| Info bg | `#eff6ff` | `text-[#2563eb]` |
| Purple bg | `#faf5ff` | `text-[#9333ea]` |
| Neutral bg | `#f3f4f6` | `text-[#4b5563]` |

---

## Typography

Font: **Geist Sans** (via `next/font/google`). Scale: 11px–24px.

| Style | Size | Weight | Usage |
|---|---|---|---|
| Display | 24px | 700 | Hero numbers, stat callouts |
| Heading 1 | 20px | 600 | Page titles |
| Heading 2 | 16px | 600 | Section headings |
| Heading 3 | 14px | 600 | Card titles, island headers |
| Body | 14px | 400 | Regular content areas |
| Body Sm | 13px | 400 | Dense layouts, form labels |
| Caption | 12px | 400 | Hints, timestamps, helper text |
| Label | 11px | 600 | Table headers, section labels (uppercase + tracked) |

---

## Components

All components live in `app/components/ui/`. Import by name:

```ts
import { Button } from '@/app/components/ui/Button';
```

---

### Island

`app/components/ui/Island.tsx`

The standard section/card container used throughout the design system. Does **not** use `overflow-hidden` — Dropdowns and Tooltips nested inside will render correctly.

```tsx
<Island title="Section Title" description="Optional subtitle.">
  {/* content */}
</Island>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Island header title |
| `description` | `string` | — | Subtitle below title |
| `actions` | `ReactNode` | — | Right-aligned slot in the header row |
| `children` | `ReactNode` | **required** | Body content |
| `className` | `string` | `''` | Extra classes on the outer wrapper |

---

### Button & IconButton

`app/components/ui/Button.tsx`

```tsx
<Button variant="primary" size="md" icon={<PlusIcon />} iconPosition="left">
  New Order
</Button>

<Button loading>Saving…</Button>

<IconButton aria-label="Delete" variant="ghost">
  <TrashIcon />
</IconButton>
```

#### Button props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive' \| 'outline'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and padding |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `icon` | `ReactNode` | — | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement relative to label |
| `disabled` | `boolean` | `false` | Native disabled state |

#### Variant reference

| Variant | Background | Text | Use for |
|---|---|---|---|
| `primary` | Navy `#1b3a5c` | White | Main CTA — one per page |
| `secondary` | Navy /10 `#e8edf3` | Navy | Secondary actions |
| `ghost` | Transparent | Gray | Tertiary, toolbar actions |
| `destructive` | Red `#dc2626` | White | Delete, remove, revoke |
| `outline` | White | Navy | Bordered alternative to ghost |

#### IconButton props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'ghost' \| 'outline' \| 'primary'` | `'ghost'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding |
| `aria-label` | `string` | **required** | Accessible label |

---

### Input

`app/components/ui/Input.tsx`

```tsx
<Input
  label="Email address"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email."
  leftIcon={<MailIcon />}
/>

<Input label="Username" error="This username is already taken." />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `hint` | `string` | — | Helper text below input (hidden when `error` is set) |
| `error` | `string` | — | Error message; also turns border red |
| `leftIcon` | `ReactNode` | — | Icon inside left edge |
| `rightIcon` | `ReactNode` | — | Icon inside right edge |

Extends all native `<input>` attributes. Uses `useId()` for stable SSR-safe label association.

---

### Textarea

`app/components/ui/Textarea.tsx`

```tsx
<Textarea
  label="Notes"
  placeholder="Write something…"
  hint="Max 500 characters."
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `hint` | `string` | — | Helper text |
| `error` | `string` | — | Error message + red border |

Extends all native `<textarea>` attributes. Vertically resizable (`resize-y`), min height 80px.

---

### Select

`app/components/ui/Select.tsx`

```tsx
<Select
  label="Plan"
  placeholder="Choose a plan"
  options={[
    { value: 'starter', label: 'Starter — $29/mo' },
    { value: 'pro',     label: 'Pro — $149/mo' },
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ value: string; label: string }[]` | **required** | Option list |
| `placeholder` | `string` | — | Unselected placeholder option |
| `label` | `string` | — | Field label |
| `hint` | `string` | — | Helper text |
| `error` | `string` | — | Error message + red border |

Extends all native `<select>` attributes. Custom chevron icon via absolute positioning.

---

### Toggle

`app/components/ui/Toggle.tsx`

```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Email notifications"
  hint="Receive updates about your account."
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | **required** | Controlled state |
| `onChange` | `(checked: boolean) => void` | **required** | Change handler |
| `label` | `string` | — | Label text |
| `hint` | `string` | — | Description below label |
| `disabled` | `boolean` | `false` | Disabled state |
| `size` | `'sm' \| 'md'` | `'md'` | Toggle track size |

**Note:** Uses a hidden `<input type="checkbox">` inside a `<label>` wrapper. The `onChange` fires exactly once per interaction.

---

### Slider

`app/components/ui/Slider.tsx`

```tsx
const [vol, setVol] = useState(50);

<Slider label="Volume" min={0} max={100} value={vol} onChange={setVol} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `50` | Uncontrolled initial value |
| `onChange` | `(value: number) => void` | — | Change handler |
| `label` | `string` | — | Label above slider |
| `showValue` | `boolean` | `true` | Show live value in navy next to label |
| `disabled` | `boolean` | `false` | Disabled state |

---

### Modal

`app/components/ui/Modal.tsx`

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  description="This action cannot be undone."
  size="sm"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Called on backdrop click or × button |
| `title` | `string` | — | Modal heading |
| `description` | `string` | — | Subtitle below heading |
| `children` | `ReactNode` | — | Modal body content |
| `footer` | `ReactNode` | — | Footer slot — render action buttons here |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Max width (`sm`=384px, `md`=448px, `lg`=512px) |

Uses `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` for full screen-reader support. Scroll chaining prevented via `overscroll-contain`.

---

### Chip

`app/components/ui/Chip.tsx`

```tsx
<Chip variant="success">Active</Chip>
<Chip variant="warning" size="sm">Pending</Chip>
<Chip variant="error" dot={false}>Rejected</Chip>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral' \| 'purple' \| 'indigo'` | `'neutral'` | Color scheme |
| `size` | `'sm' \| 'md'` | `'md'` | `sm`=11px pill, `md`=12px pill |
| `dot` | `boolean` | `true` | Show colored dot before label |

---

### Badge

`app/components/ui/Badge.tsx`

Small numeric or text counter, typically overlaid on icons or placed next to menu items.

```tsx
<Badge variant="error">3</Badge>
<Badge variant="info">New</Badge>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'purple'` | `'default'` | Color scheme |

---

### Alert

`app/components/ui/Alert.tsx`

```tsx
<Alert variant="warning" title="Subscription expiring">
  Your plan renews in 3 days.
</Alert>

<Alert variant="error" dismissible>
  Payment method declined.
</Alert>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Color + icon |
| `title` | `string` | — | Bold heading line |
| `dismissible` | `boolean` | `false` | Shows × button; hides component on click |

---

### Avatar

`app/components/ui/Avatar.tsx`

Initials-based avatar — no image dependency. Background color is deterministically derived from the `name` prop.

```tsx
<Avatar name="Aria Chen" size="lg" status="online" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | **required** | Used to generate initials and background color |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 28 / 36 / 48 / 64px |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | — | Status dot (bottom-right) |
| `color` | `string` | auto | Override background color |

---

### Breadcrumb

`app/components/ui/Breadcrumb.tsx`

```tsx
<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Orders', href: '/orders' },
    { label: '#1042' },
  ]}
/>
```

| Prop | Type | Description |
|---|---|---|
| `items` | `{ label: string; href?: string }[]` | Crumb list — last item is always plain text (current page) |

---

### Progress

`app/components/ui/Progress.tsx`

```tsx
<Progress label="Storage" value={68} />
<Progress label="Tasks" value={12} max={15} variant="success" size="lg" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | **required** | Current value |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | — | Label above bar |
| `showPercent` | `boolean` | `true` | Show percentage right of label |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Bar color (`default` = navy) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Bar height (4 / 8 / 12px) |

---

### Spinner

`app/components/ui/Spinner.tsx`

```tsx
<Spinner size="md" />
<Spinner size="lg" color="#16a34a" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 14 / 20 / 28 / 40px |
| `color` | `string` | `#1b3a5c` | Stroke color |

---

### Tooltip

`app/components/ui/Tooltip.tsx`

CSS-only (`group-hover`) — no JavaScript positioning.

```tsx
<Tooltip content="Delete permanently" position="top">
  <IconButton aria-label="Delete"><TrashIcon /></IconButton>
</Tooltip>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | **required** | Tooltip text |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement relative to trigger |

**Note:** The tooltip container must not be inside a component with `overflow: hidden`.

---

### Dropdown

`app/components/ui/Dropdown.tsx`

```tsx
<Dropdown
  trigger={<Button variant="outline" icon={<DotsIcon />}>Actions</Button>}
  align="right"
  items={[
    { label: 'Edit',      icon: <EditIcon />,  onClick: () => {} },
    { label: 'Duplicate', icon: <CopyIcon />,  onClick: () => {} },
    { divider: true },
    { label: 'Delete',    icon: <TrashIcon />, danger: true, onClick: () => {} },
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `trigger` | `ReactNode` | **required** | Element that opens the menu |
| `items` | `DropdownItem[]` | **required** | Menu item list |
| `align` | `'left' \| 'right'` | `'right'` | Menu alignment relative to trigger |

#### DropdownItem shape

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Item label |
| `icon` | `ReactNode` | Optional leading icon (16×16) |
| `onClick` | `() => void` | Click handler |
| `danger` | `boolean` | Red text + red hover background |
| `disabled` | `boolean` | Grayed out, non-interactive |
| `divider` | `boolean` | Renders a horizontal rule instead of a button |

Closes on outside click via `mousedown` listener with cleanup.

---

### DashboardMenu

`app/components/ui/DashboardMenu.tsx`

Left sidebar navigation. Active item is indicated by a navy left-border stripe.

```tsx
<DashboardMenu
  sections={[
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <GridIcon />, badge: 3 },
        { id: 'orders',    label: 'Orders',    icon: <BoxIcon /> },
      ],
    },
  ]}
  activeId="dashboard"
  onSelect={(id) => setPage(id)}
  header={<Logo />}
  footer={<UserProfile />}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `MenuSection[]` | **required** | Grouped nav items |
| `activeId` | `string` | — | ID of the currently active item |
| `onSelect` | `(id: string) => void` | — | Called when an item is clicked |
| `header` | `ReactNode` | — | Slot above nav (logo, workspace name) |
| `footer` | `ReactNode` | — | Slot below nav (user profile, settings) |

#### MenuSection shape

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Optional section heading (uppercase label) |
| `items` | `MenuItem[]` | Nav items |

#### MenuItem shape

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `ReactNode` | Optional 16×16 icon |
| `badge` | `string \| number` | Optional count/label badge |
| `href` | `string` | Optional href (informational, navigation is handled by `onSelect`) |

---

### Header

`app/components/ui/Header.tsx`

Page-level header with title, subtitle, optional breadcrumb, and actions slot.

```tsx
<Header
  title="Customers"
  subtitle="Manage all customer accounts and billing."
  breadcrumb={[
    { label: 'Dashboard', href: '/' },
    { label: 'Customers' },
  ]}
  actions={
    <>
      <Button variant="outline" size="sm">Export</Button>
      <Button size="sm" icon={<PlusIcon />}>Add customer</Button>
    </>
  }
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **required** | Page title (H1) |
| `subtitle` | `string` | — | Subtitle below title |
| `breadcrumb` | `{ label: string; href?: string }[]` | — | Renders `<Breadcrumb>` above title |
| `actions` | `ReactNode` | — | Right-aligned slot |

---

### Tabs

`app/components/ui/Tabs.tsx`

Horizontal underline tab bar. Active tab shows a navy bottom border.

```tsx
const [tab, setTab] = useState('overview');

<Tabs
  activeId={tab}
  onChange={setTab}
  items={[
    { id: 'overview',  label: 'Overview' },
    { id: 'analytics', label: 'Analytics', badge: 'New' },
    { id: 'orders',    label: 'Orders', badge: 12 },
  ]}
/>
```

| Prop | Type | Description |
|---|---|---|
| `items` | `TabItem[]` | Tab definitions |
| `activeId` | `string` | Currently active tab ID |
| `onChange` | `(id: string) => void` | Called on tab click |

#### TabItem shape

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `ReactNode` | Optional 16×16 leading icon |
| `badge` | `string \| number` | Optional count/label badge |

---

### Card

`app/components/ui/Card.tsx`

Content container with optional header, body, and footer sub-components.

```tsx
<Card>
  <CardHeader title="Revenue" subtitle="March 2026" actions={<Chip variant="success">+12%</Chip>} />
  <CardBody>
    <p className="text-[28px] font-bold">$24,580</p>
  </CardBody>
  <CardFooter>
    <Button variant="ghost" size="sm">View breakdown →</Button>
  </CardFooter>
</Card>
```

| Component | Key props | Description |
|---|---|---|
| `Card` | `className` | Outer border + rounded container |
| `CardHeader` | `title`, `subtitle`, `actions`, `children` | Header row with border-bottom |
| `CardBody` | `className` | Padded body area |
| `CardFooter` | `className` | Gray-tinted footer with border-top |

---

### Table

`app/components/ui/Table.tsx`

Horizontally scrollable data table composed of sub-components.

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableTh>Customer</TableTh>
      <TableTh>Status</TableTh>
      <TableTh className="text-right">MRR</TableTh>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableTd>{row.name}</TableTd>
        <TableTd><Chip variant="success">Active</Chip></TableTd>
        <TableTd className="text-right font-semibold">{row.mrr}</TableTd>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

| Component | Description |
|---|---|
| `Table` | Scrollable wrapper with rounded border |
| `TableHead` | `<thead>` — gray-50 background |
| `TableBody` | `<tbody>` — divided rows |
| `TableRow` | `<tr>` — hover highlight |
| `TableTh` | `<th>` — uppercase 11px label |
| `TableTd` | `<td>` — 13px body text |

---

### Pagination

`app/components/ui/Pagination.tsx`

```tsx
const [page, setPage] = useState(1);

<Pagination page={page} totalPages={24} onChange={setPage} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | **required** | Current page (1-indexed) |
| `totalPages` | `number` | **required** | Total number of pages |
| `onChange` | `(page: number) => void` | **required** | Called with new page number |

Automatically collapses middle pages into `…` when `totalPages > 7`.

---

## File Structure

```
app/
├── components/
│   └── ui/
│       ├── Alert.tsx          # Info / success / warning / error banners
│       ├── Avatar.tsx         # Initials avatar with status dot
│       ├── Badge.tsx          # Numeric / text notification badge
│       ├── Breadcrumb.tsx     # Navigation breadcrumb trail
│       ├── Button.tsx         # Button + IconButton
│       ├── Card.tsx           # Card + CardHeader + CardBody + CardFooter
│       ├── Chip.tsx           # Semantic status chip / pill
│       ├── DashboardMenu.tsx  # Left sidebar navigation
│       ├── Dropdown.tsx       # Click-triggered context menu
│       ├── Header.tsx         # Page header with breadcrumb + actions
│       ├── Input.tsx          # Text input with label / hint / error / icons
│       ├── Island.tsx         # Section container (no overflow-hidden)
│       ├── Modal.tsx          # Dialog overlay
│       ├── Pagination.tsx     # Page controls with ellipsis
│       ├── Progress.tsx       # Horizontal progress bar
│       ├── Select.tsx         # Styled native select
│       ├── Slider.tsx         # Range slider
│       ├── Spinner.tsx        # Loading spinner
│       ├── Table.tsx          # Table + sub-components
│       ├── Tabs.tsx           # Horizontal underline tab bar
│       ├── Textarea.tsx       # Multiline text input
│       ├── Toggle.tsx         # Controlled toggle switch
│       └── Tooltip.tsx        # CSS-only hover tooltip
├── globals.css                # Tailwind v4 @theme tokens
├── layout.tsx                 # Root layout (Geist font)
└── page.tsx                   # Design system showcase
```
