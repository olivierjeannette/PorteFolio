# /create-api-route [name] - Generate API Route

## Description
Creates a Next.js API route for webhooks, exports, or cron jobs.

## Arguments
- `$ARGUMENTS` : Route name e.g., `stripe-webhook`, `export-csv`, `daily-cron`

## Instructions

### 1. VALIDATE FIRST
```bash
Glob: src/app/api/$ARGUMENTS/**/*
```

### 2. DETERMINE ROUTE TYPE

- **Webhook** → External service callbacks (Stripe, Discord, etc.)
- **Export** → File downloads (CSV, PDF)
- **Cron** → Scheduled tasks
- **Internal** → App-to-app communication

### 3. WEBHOOK ROUTE TEMPLATE

```typescript
// src/app/api/$ARGUMENTS/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-01-01',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  const supabase = await createServerClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        // Handle checkout completion
        console.log('[Webhook] Checkout completed:', session.id)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        // Handle subscription update
        console.log('[Webhook] Subscription updated:', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        // Handle subscription cancellation
        console.log('[Webhook] Subscription deleted:', subscription.id)
        break
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
```

### 4. EXPORT ROUTE TEMPLATE

```typescript
// src/app/api/$ARGUMENTS/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get org context
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_org_id, role')
    .eq('id', user.id)
    .single()

  if (!profile?.current_org_id) {
    return NextResponse.json({ error: 'No organization' }, { status: 400 })
  }

  // Permission check
  if (!['owner', 'admin'].includes(profile.role || '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // Fetch data
    const { data, error } = await supabase
      .from('members')
      .select('id, name, email, created_at')
      .eq('org_id', profile.current_org_id)
      .order('name')

    if (error) throw error

    // Generate CSV
    const headers = ['ID', 'Nom', 'Email', 'Date création']
    const rows = data?.map(item => [
      item.id,
      item.name,
      item.email || '',
      new Date(item.created_at).toLocaleDateString('fr-FR'),
    ]) || []

    const csv = [
      headers.join(','),
      ...rows.map(row =>
        row.map(cell =>
          // Escape quotes and wrap in quotes if needed
          typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        ).join(',')
      ),
    ].join('\n')

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="export-${Date.now()}.csv"`,
      },
    })
  } catch (error) {
    console.error('[Export] Error:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}
```

### 5. CRON ROUTE TEMPLATE

```typescript
// src/app/api/$ARGUMENTS/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role for cron jobs
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel Cron or similar)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[Cron] Starting $ARGUMENTS job...')

    // Example: Send reminder emails for expiring subscriptions
    const { data: expiring, error } = await supabase
      .from('subscriptions')
      .select(`
        id,
        end_date,
        member:members(id, name, email)
      `)
      .gte('end_date', new Date().toISOString())
      .lte('end_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .eq('reminder_sent', false)

    if (error) throw error

    let processed = 0

    for (const subscription of expiring || []) {
      // Send email (implement your email service)
      // await sendEmail(...)

      // Mark as sent
      await supabase
        .from('subscriptions')
        .update({ reminder_sent: true })
        .eq('id', subscription.id)

      processed++
    }

    console.log(`[Cron] Processed ${processed} reminders`)

    return NextResponse.json({
      success: true,
      processed,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Error:', error)
    return NextResponse.json(
      { error: 'Cron job failed' },
      { status: 500 }
    )
  }
}
```

### 6. VERCEL CRON CONFIG

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/$ARGUMENTS",
      "schedule": "0 8 * * *"
    }
  ]
}
```

### 7. CHECKLIST
- [ ] Auth/signature verification
- [ ] Error handling with proper status codes
- [ ] Logging for debugging
- [ ] Rate limiting if public
- [ ] Idempotency for webhooks
- [ ] Timeout handling for long operations
- [ ] Environment variables documented
