;; Studio Verification Contract
;; This contract validates legitimate VFX producers

(define-data-var admin principal tx-sender)

;; Map to store verified studios
(define-map verified-studios principal bool)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-ALREADY-VERIFIED u101)
(define-constant ERR-NOT-VERIFIED u102)

;; Check if caller is admin
(define-private (is-admin)
  (is-eq tx-sender (var-get admin)))

;; Verify a studio
(define-public (verify-studio (studio-address principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (default-to false (map-get? verified-studios studio-address)))
              (err ERR-ALREADY-VERIFIED))
    (map-set verified-studios studio-address true)
    (ok true)))

;; Revoke verification
(define-public (revoke-verification (studio-address principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (asserts! (default-to false (map-get? verified-studios studio-address))
              (err ERR-NOT-VERIFIED))
    (map-delete verified-studios studio-address)
    (ok true)))

;; Check if a studio is verified
(define-read-only (is-verified (studio-address principal))
  (default-to false (map-get? verified-studios studio-address)))

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)))

