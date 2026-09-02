-- StaySpot PostgreSQL Schema
-- Run as superuser or database owner.

BEGIN;

CREATE TABLE guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    wallet_balance DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (wallet_balance >= 0.00),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);