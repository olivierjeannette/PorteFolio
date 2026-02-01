# /create-form [name] - Generate Form with Validation

## Description
Creates a complete form with React Hook Form and Zod validation.

## Arguments
- `$ARGUMENTS` : Form name (PascalCase) e.g., `MemberForm`, `WorkoutForm`, `SettingsForm`

## Instructions

### 1. VALIDATE FIRST
```bash
Grep: "$ARGUMENTSSchema|$ARGUMENTS.*form" in src/
```

### 2. FORM TEMPLATE

```typescript
// src/components/forms/$ARGUMENTS.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createAction } from '@/actions/domain'

// ========================================
// VALIDATION SCHEMA
// ========================================
const $ARGUMENTSSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom est trop long'),
  email: z
    .string()
    .email('Email invalide')
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Sélectionnez un statut' }),
  }),
  amount: z
    .string()
    .transform((v) => parseFloat(v) || 0)
    .pipe(z.number().min(0, 'Le montant doit être positif')),
})

type $ARGUMENTSInput = z.infer<typeof $ARGUMENTSSchema>

// ========================================
// PROPS
// ========================================
interface $ARGUMENTSProps {
  defaultValues?: Partial<$ARGUMENTSInput>
  onSuccess?: () => void
  onCancel?: () => void
}

// ========================================
// COMPONENT
// ========================================
export function $ARGUMENTS({
  defaultValues,
  onSuccess,
  onCancel,
}: $ARGUMENTSProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<$ARGUMENTSInput>({
    resolver: zodResolver($ARGUMENTSSchema),
    defaultValues: {
      name: '',
      email: '',
      status: 'active',
      amount: '0',
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form

  async function onSubmit(data: $ARGUMENTSInput) {
    startTransition(async () => {
      const result = await createAction(data)

      if (result.success) {
        toast.success('Enregistré avec succès')
        onSuccess?.()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Nom <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Entrez le nom"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="email@example.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Select Input */}
      <div className="space-y-2">
        <Label htmlFor="status">
          Statut <span className="text-red-500">*</span>
        </Label>
        <Select
          value={watch('status')}
          onValueChange={(value) => setValue('status', value as 'active' | 'inactive')}
        >
          <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Number Input */}
      <div className="space-y-2">
        <Label htmlFor="amount">Montant</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register('amount')}
          placeholder="0.00"
          className={errors.amount ? 'border-red-500' : ''}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Annuler
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  )
}
```

### 3. COMMON VALIDATION PATTERNS

```typescript
// Required string
z.string().min(1, 'Ce champ est requis')

// Optional string (empty allowed)
z.string().optional().or(z.literal(''))

// Email
z.string().email('Email invalide')

// Phone (French format)
z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro invalide')

// URL
z.string().url('URL invalide')

// Number from string input
z.string().transform((v) => parseFloat(v)).pipe(z.number().positive())

// Date
z.string().pipe(z.coerce.date())

// Array with min items
z.array(z.string()).min(1, 'Sélectionnez au moins un élément')

// Conditional validation
z.object({
  type: z.enum(['individual', 'company']),
  companyName: z.string().optional(),
}).refine(
  (data) => data.type !== 'company' || data.companyName,
  { message: 'Nom requis pour les entreprises', path: ['companyName'] }
)
```

### 4. CHECKLIST
- [ ] Zod schema with user's language error messages
- [ ] React Hook Form integration
- [ ] useTransition for pending state
- [ ] Error display per field
- [ ] Loading state on submit button
- [ ] Cancel button if in modal
- [ ] Proper labels with htmlFor
- [ ] Required field indicators
- [ ] Toast feedback on submit
