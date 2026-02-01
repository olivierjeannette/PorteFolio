# /create-migration [name] - Generate Supabase Migration

## Description
Creates a Supabase SQL migration with proper conventions and RLS policies.

## Arguments
- `$ARGUMENTS` : Migration description (snake_case) e.g., `add_members_table`, `create_workout_logs`

## Instructions

### 1. VALIDATE FIRST
```bash
# Check existing migrations
ls supabase/migrations/
# Check if table exists
Grep: "CREATE TABLE.*$ARGUMENTS" in supabase/migrations/
```

### 2. GENERATE MIGRATION FILE

```bash
# Generate timestamp
timestamp=$(date +%Y%m%d%H%M%S)
filename="${timestamp}_$ARGUMENTS.sql"
```

### 3. MIGRATION TEMPLATE

```sql
-- Migration: $ARGUMENTS
-- Created: [timestamp]
-- Description: [what this migration does]

-- ========================================
-- NEW TABLES
-- ========================================
CREATE TABLE IF NOT EXISTS public.table_name (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys (multi-tenant)
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Data fields
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'archived')),

  -- JSON fields (for flexible data)
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================
-- INDEXES (for performance)
-- ========================================
CREATE INDEX IF NOT EXISTS idx_table_name_org_id
  ON public.table_name(org_id);

CREATE INDEX IF NOT EXISTS idx_table_name_user_id
  ON public.table_name(user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_table_name_status
  ON public.table_name(status);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_table_name_org_status
  ON public.table_name(org_id, status);

-- ========================================
-- TRIGGERS
-- ========================================
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_table_name_updated_at
  BEFORE UPDATE ON public.table_name
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see data from their org
CREATE POLICY "Users can view own org data"
  ON public.table_name
  FOR SELECT
  USING (
    org_id IN (
      SELECT om.org_id FROM public.org_members om
      WHERE om.user_id = auth.uid()
    )
  );

-- Policy: Only owners/admins can insert
CREATE POLICY "Admins can insert"
  ON public.table_name
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.org_members om
      WHERE om.org_id = table_name.org_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

-- Policy: Only owners/admins can update
CREATE POLICY "Admins can update"
  ON public.table_name
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.org_members om
      WHERE om.org_id = table_name.org_id
        AND om.user_id = auth.uid()
        AND om.role IN ('owner', 'admin')
    )
  );

-- Policy: Only owners can delete
CREATE POLICY "Owners can delete"
  ON public.table_name
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.org_members om
      WHERE om.org_id = table_name.org_id
        AND om.user_id = auth.uid()
        AND om.role = 'owner'
    )
  );

-- ========================================
-- GRANTS (for service role)
-- ========================================
GRANT ALL ON public.table_name TO authenticated;
GRANT ALL ON public.table_name TO service_role;

-- ========================================
-- COMMENTS (documentation)
-- ========================================
COMMENT ON TABLE public.table_name IS 'Description of what this table stores';
COMMENT ON COLUMN public.table_name.status IS 'active | inactive | archived';
```

### 4. APPLY MIGRATION

```bash
# Local development
npx supabase migration up

# Or push to remote
npx supabase db push
```

### 5. GENERATE TYPES

```bash
npx supabase gen types typescript --local > src/types/database.ts
```

### 6. CHECKLIST
- [ ] Table has UUID primary key
- [ ] Proper foreign key constraints with ON DELETE
- [ ] org_id for multi-tenant isolation
- [ ] Timestamps (created_at, updated_at)
- [ ] Indexes for common queries
- [ ] RLS enabled
- [ ] Policies for all operations (SELECT, INSERT, UPDATE, DELETE)
- [ ] Multi-tenant isolation via org_id
- [ ] Comments for documentation
- [ ] Types regenerated
