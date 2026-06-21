-- ============================================
-- Create foundation_blogs table (Popular Causes)
-- ============================================
CREATE TABLE IF NOT EXISTS foundation_blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  raised DECIMAL(12,2) DEFAULT 0,
  goal DECIMAL(12,2) DEFAULT 0,
  progress INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE foundation_blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to read published blogs"
ON foundation_blogs FOR SELECT
USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated to insert blogs"
ON foundation_blogs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated to update blogs"
ON foundation_blogs FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete blogs"
ON foundation_blogs FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Create foundation_events table (Latest Events)
-- ============================================
CREATE TABLE IF NOT EXISTS foundation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  event_day TEXT NOT NULL,
  event_month TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE foundation_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to read published events"
ON foundation_events FOR SELECT
USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated to insert events"
ON foundation_events FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated to update events"
ON foundation_events FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated to delete events"
ON foundation_events FOR DELETE
TO authenticated
USING (true);
