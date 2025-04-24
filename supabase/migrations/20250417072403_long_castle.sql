/*
  # Fix achievements table RLS policies

  1. Changes
    - Drop existing RLS policies on achievements table
    - Create new, more secure RLS policies with proper auth checks
    
  2. Security
    - Ensures proper user authentication checks
    - Maintains data isolation between users
    - Uses auth.uid() consistently for user verification
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can create their own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can update their own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can delete their own achievements" ON achievements;

-- Create new policies with proper auth checks
CREATE POLICY "Enable read access for authenticated users"
ON achievements FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
ON achievements FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for users based on user_id"
ON achievements FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete access for users based on user_id"
ON achievements FOR DELETE
TO authenticated
USING (auth.uid() = user_id);