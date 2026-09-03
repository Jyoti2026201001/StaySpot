-- Trigger function
CREATE OR REPLACE FUNCTION log_wallet_balance_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO wallet_audit_logs (
        guest_id,
        amount_changed,
        action_type,
        balance_after
    )
    VALUES (
        NEW.id,
        NEW.wallet_balance - OLD.wallet_balance,
        CASE
            WHEN NEW.wallet_balance > OLD.wallet_balance THEN 'CREDIT'
            WHEN NEW.wallet_balance < OLD.wallet_balance THEN 'DEBIT'
            ELSE 'NO_CHANGE'
        END,
        NEW.wallet_balance
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Trigger
CREATE TRIGGER wallet_balance_audit_trigger
AFTER UPDATE OF wallet_balance ON guests
FOR EACH ROW
WHEN (OLD.wallet_balance IS DISTINCT FROM NEW.wallet_balance)
EXECUTE FUNCTION log_wallet_balance_change();
