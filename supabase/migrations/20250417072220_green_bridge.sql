/*
  # Create achievements table

  1. New Tables
    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users.id)
      - `title` (text)
      - `description` (text, nullable)
      - `date` (date)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `achievements` table
    - Add policies for authenticated users to:
      - Insert their own achievements
      - Select their own achievements
      - Update their own achievements
      - Delete their own achievements
*/

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policy for users to insert their own achievements
CREATE POLICY "Users can create their own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to view their own achievements
CREATE POLICY "Users can view their own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to update their own achievements
CREATE POLICY "Users can update their own achievements"
  ON achievements
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to delete their own achievements
CREATE POLICY "Users can delete their own achievements"
  ON achievements
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);