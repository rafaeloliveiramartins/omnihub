ALTER TABLE iam.users
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ NULL;

UPDATE iam.users
SET is_superuser = TRUE
WHERE email = 'rafaeloliveiram@icloud.com';