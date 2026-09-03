-- Indexes for StaySpot
BEGIN;

-- Partial unique index: a guest can have only one active stay (CHECKED_IN)
CREATE UNIQUE INDEX idx_active_stay ON bookings (guest_id) WHERE status = 'CHECKED_IN';

-- Standard FK indexes
CREATE INDEX idx_bookings_guest_id ON bookings (guest_id);
CREATE INDEX idx_bookings_property_id ON bookings (property_id);
CREATE INDEX idx_wallet_audit_guest_id ON wallet_audit_logs (guest_id);

-- Indexes for common query patterns
CREATE INDEX idx_bookings_check_in ON bookings (check_in_date);
CREATE INDEX idx_bookings_check_out ON bookings (check_out_date);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_property_check_in ON bookings (property_id, check_in_date);
CREATE INDEX idx_wallet_audit_created_at ON wallet_audit_logs (created_at);

-- Index for window analytics (date‑based grouping)
CREATE INDEX idx_bookings_check_in_date ON bookings (check_in_date);

COMMIT;