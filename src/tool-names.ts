// Auto-generated at build time
export const toolNames: Array<{ name: string; description: string }>= [
  {
    "name": "create_assessment",
    "description": "Assess identifiers for a signup or gateway decision.\n\nAssesses one account creation, login or purchase (flow) and answers with the account's one current risk: account.risk.decision is the decision for this flow (allow, step_up, review or block, where block means your block threshold was reached), and detail holds this assessment's own facts. depth sets how long the answer waits for sources: quick waits only for the fast ones (500 ms), full for the whole budget (3000 ms at most); it defaults to full for account_creation and purchase and quick for login. 200 carries complete or partial, 202 carries pending with Location and Retry-After. While the account's first assessment is pending, account is absent: apply your own fallback for that, 429, 503 or a timeout. NoResponse blocks nothing itself; you decide. Requires the assess scope. Idempotency-Key is optional in the SDK and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope. The answer leaves out detail.identifiers: you hold what you sent, and a key with the history scope gets them back with GET."
  },
  {
    "name": "get_assessment",
    "description": "Poll the authoritative assessment of one assessment.\n\nReturns the highest assessment_version, with the account's current risk. Requires the assess or history scope. While status is pending, or partial with a source still running, the response carries Retry-After; poll no faster than it says. Another workspace's assessment, an unknown or expired assessment and a malformed assessment_id all answer 404 not_found. response_mode=detailed needs the detailed scope. A key with the history scope also gets detail.identifiers, the identifiers the assessment was sent, exactly as received."
  },
  {
    "name": "delete_assessment",
    "description": "Delete one assessment.\n\nDeletes one assessment in the environment of your key, with its versions, evidence and outcomes and the identity-graph marks its outcomes set, and scores its account again from what remains. Afterwards the assessment answers 404 and leaves the account's history. The answer names the account and the assessment its current risk now comes from; current_assessment_id is absent when the account has no assessment with a decision left. Requires the history scope. An unknown, expired or already deleted assessment answers 404, so a repeat answers 404; to erase a whole account idempotently, use accounts.delete."
  },
  {
    "name": "record_outcome",
    "description": "Report what was later learned about an assessed account.\n\nRecords what you later learned about an assessed account: confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw your earlier report; unknown is recorded only. Outcomes are append-only and the latest one wins. Requires the assess scope. Idempotency-Key is optional in the SDK and handled as on POST /v1/assessments: a retry with the same key and body answers the same record with Idempotent-Replayed: true; a different body answers 409. An unknown, expired or foreign assessment answers 404 not_found."
  },
  {
    "name": "query_assessments",
    "description": "Page through one account's unexpired assessments.\n\nHistory is a POST with account_id in the body so an account identifier stays out of URLs and access logs. Requires the history scope. Read-only and safe to retry. Newest first, each at its latest assessment_version. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your workspace and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. Each item's identifiers holds the identifiers its assessment was sent, exactly as received."
  },
  {
    "name": "aggregate_assessments",
    "description": "Count assessments by time, decision and reason\n\nCount this environment's assessments created in [from,to) by hour, day or week, grouped by up to two of decision, flow, recommendation, band, reason, lane, country, asn and list_match. Each assessment counts once, by its first answer; late results do not count it again and appear in late_flips. Optional metrics add a score histogram per flow, that histogram by the latest reported outcome, and late account decision changes. from and to start a bucket and cover at most 366 days (31 for hour buckets) inside the retention period. The filters are search's and describe the first answer: send them to search with revision first to list a cell's assessments. Counts hold no identifier, stay when an assessment or account is deleted, and report reasons by code and impact band. No Idempotency-Key."
  },
  {
    "name": "search_assessments",
    "description": "Search assessments across this environment\n\nSearch retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. Each item's detail.identifiers holds the identifiers its assessment was sent, exactly as received. This read does not require an idempotency key."
  },
  {
    "name": "get_assessment_version",
    "description": "Retrieve an exact assessment revision\n\nRetrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply. detail.identifiers holds the identifiers the assessment was sent, exactly as received."
  },
  {
    "name": "bind_provisional_account",
    "description": "Bind a provisional signup account\n\nOne-time association to an opaque stable customer account. The assessment is its natural idempotency key. Repeating the same binding returns its first receipt; a conflicting target is refused. No arbitrary account merging."
  },
  {
    "name": "list_changed_accounts",
    "description": "Poll the accounts whose risk changed.\n\nYour accounts whose risk changed, oldest change first, each as accounts.get answers it. Every page carries next_cursor: pass it back as changed_since to read the changes made after that page; without changed_since the list starts from the oldest change. When nothing changed, items is empty and next_cursor is the cursor you sent, so poll by calling again with the latest next_cursor. An account appears again each time its risk changes, with a higher risk_version; keep the copy with the highest. unenforced=true lists only accounts with a decision other than allow for some flow and no applied enforcement at their current risk_version; such a page can hold fewer than limit items, or none, while later changes exist, so keep polling with next_cursor. Requires the history scope. Read-only and safe to retry. A tampered or foreign cursor answers 400 invalid_cursor."
  },
  {
    "name": "get_account",
    "description": "Read an account's one current risk.\n\nAn account is the account_id you send with your assessments. Its current risk is the risk of its latest assessment with a decision (status complete or partial), scored as GET /v1/assessments/{assessment_id} scores that assessment, with a decision for each flow; risk.decision is the decision for the flow of that assessment. Every assessment answers with this same account. Every assessment updates its account: once an assessment completes, the account carries its risk. Requires the history scope. Read-only and safe to retry. An account with no unexpired assessment that has a decision answers 404 not_found, and a malformed account_id answers 400 invalid_request."
  },
  {
    "name": "delete_account",
    "description": "Erase an account and its history.\n\nErases the account in the environment of your key, for an erasure request from your user: every assessment of it, with its revisions, evidence and outcomes, and the identity-graph marks its outcomes set. An assessment of the account begun before the call is refused or stopped. Afterwards the account and each erased assessment answer 404 and the history is empty. When the call deleted at least one assessment, an account.deleted event goes to your verified webhook endpoints. Requires the history scope. Idempotent and safe to retry: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0 and sends no event. The account_id can be assessed again later, as a new account."
  },
  {
    "name": "list_account_assessments",
    "description": "Page through one account's unexpired assessments.\n\nThe account's history: the same page as POST /v1/assessments/query for this account_id, newest first, each at its latest assessment_version. Requires the history scope. Read-only and safe to retry. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your workspace and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. Each item's identifiers holds the identifiers its assessment was sent, exactly as received. The account_id travels in the URL; use POST /v1/assessments/query to keep it out of access logs."
  },
  {
    "name": "record_enforcement",
    "description": "Record what you did to an account in your identity provider.\n\nRecords what you did to the account in your identity provider for one flow's decision at one risk_version: the action (or none), the account's state before it, the provider and whether it was applied or failed. It is your action, not an outcome, and it leaves the account's risk unchanged. A record is kept once per account, risk_version, flow and action: the first report answers 201, and a repeat answers 200 with the stored record unchanged, so retries are safe without an Idempotency-Key. An applied report after a failed one replaces the failed record, keeping its id and created_at, and answers 201. A risk_version older than the account's current one is accepted and stored, but only an applied record at the current risk_version takes the account out of listChanged with unenforced=true; a newer one answers 409 risk_version_ahead. An account with no current risk answers 404 not_found. error_code is allowed only with status failed. Requires the history scope."
  },
  {
    "name": "list_account_enforcements",
    "description": "Page through account enforcements\n\nList retained enforcement reports for one account with an authenticated cursor."
  },
  {
    "name": "record_account_outcome",
    "description": "Record or correct an account outcome\n\nRecord a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead."
  },
  {
    "name": "list_account_outcomes",
    "description": "List retained account feedback\n\nList retained account reports, newest first. The page-level effective outcome id names the current report. Each receipt preserves the effective report and risk version from its original write. Page with the returned cursor."
  },
  {
    "name": "get_account_decision",
    "description": "Retrieve an exact historical account decision\n\nRetrieve the account decision at one recorded risk version. The answer uses the original assessment and account-specific risk inputs. Earlier versions that were not captured return 404. The assessment version, policy version and account calculation version identify the decision."
  },
  {
    "name": "associate_account_credential",
    "description": "Associate a customer-issued API key\n\nAssociate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict."
  },
  {
    "name": "list_account_credentials",
    "description": "List issued credential associations\n\nRetained credential associations, ordered by id. Page with the authenticated cursor. Associations are removed on account erasure."
  },
  {
    "name": "retire_account_credential",
    "description": "Retire an issued credential association\n\nMark this association retired, idempotently. This does not revoke the actual key. Requires delete scope."
  },
  {
    "name": "export_account",
    "description": "Export an account\n\nRetrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Each assessment revision's detail.identifiers holds the identifiers that assessment was sent, exactly as received. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion."
  },
  {
    "name": "list_account_decisions",
    "description": "Page through recorded account decisions\n\nList retained immutable risk decisions for one account with an authenticated cursor."
  },
  {
    "name": "list_keys",
    "description": "List API keys.\n\nLists the keys of the signing key's environment, newest first, at most 200, revoked and expired keys included, without secrets: each key's id, prefix, scopes, status, and who created and revoked it. Requires the management scope. Read-only and safe to retry."
  },
  {
    "name": "revoke_key",
    "description": "Revoke an API key.\n\nRevokes a key of the signing key's environment at once: its next request answers 401. Requires the management scope. A key of the other environment or of another workspace answers 404 not_found. A key cannot revoke itself (409 self_revocation): rotate it with keys.rotate, or revoke it with another management key. Revoking a revoked key changes nothing and answers the key as it was revoked, so a retry is safe."
  },
  {
    "name": "create_integration",
    "description": "Register a hosted provider integration.\n\nRegisters a WorkOS, Auth0 or Supabase integration and returns its hosted endpoint, url, so a sign-up or sign-in is scored with no server of your own. For WorkOS, send the Actions signing secret from the WorkOS dashboard and point the user registration and authentication Actions at url. For Supabase, send the hook secret Supabase generates (v1,whsec_...) and set url as the Before User Created hook's HTTPS endpoint. For Auth0, the answer's secret is the shared secret of the NoResponse Auth0 Action, shown once: store it as an Action secret. hook_points defaults to every hook point the platform has (Supabase has only pre_registration); an event that is not listed is allowed without an assessment. The endpoint waits for the full assessment for at most 2.5 seconds (WorkOS, Supabase) or 4.5 seconds (Auth0), denies only when risk.block is true and allows on any failure. Requires the integrations scope; at most 10 per account. Not idempotent: a retry after a lost answer registers another integration."
  },
  {
    "name": "list_integrations",
    "description": "List the workspace's integrations.\n\nEvery integration, oldest first. Listings carry no secrets. Requires the integrations scope."
  },
  {
    "name": "delete_integration",
    "description": "Delete an integration.\n\nRemoves the integration and its secrets; its endpoint answers 404 from then on, so remove the Action from the provider first. Requires the integrations scope. An unknown or already deleted integration answers 404."
  },
  {
    "name": "rotate_integration_secret",
    "description": "Replace an integration's secret.\n\nFor Auth0, send {} and the answer's secret is the new shared secret, shown once. For WorkOS, regenerate the Actions secret in the WorkOS dashboard and send it as signing_secret; for Supabase, generate a new hook secret in the Supabase dashboard and send it as signing_secret. The replaced secret is still accepted for 24 hours (previous_secret_expires_at). Requires the integrations scope. Not idempotent: a retry after a lost answer rotates again."
  },
  {
    "name": "list_webhook_endpoints",
    "description": "List the workspace's webhook endpoints.\n\nLists your webhook endpoints in every state, ordered by endpoint_id, with the ids of their signing keys and without secrets. Requires the webhooks scope."
  },
  {
    "name": "create_webhook_endpoint",
    "description": "Register a webhook endpoint.\n\nRegisters a webhook endpoint and returns it with its first signing secret, shown only in this answer: store it where your receiver reads it. The URL is https on port 443 or 8443 with a DNS host whose every address is public; it is checked now and on every delivery. The endpoint starts unverified and receives assessment events once it echoes an endpoint.verification challenge, which sendTestEvent sends. You can hold 5 endpoints. Requires the webhooks scope, and response_mode detailed also the detailed scope. Registration is not idempotent: a retry after a lost answer registers a second endpoint, which you can list and delete."
  },
  {
    "name": "delete_webhook_endpoint",
    "description": "Delete a webhook endpoint.\n\nDeletes the endpoint and its signing keys. Deliveries still queued for it are dropped. Requires the webhooks scope. An endpoint that is already gone answers 404."
  },
  {
    "name": "rotate_webhook_signing_key",
    "description": "Rotate an endpoint's signing key.\n\nIssues a new signing key for the endpoint and returns its secret once. Every delivery from now on is signed with it; the key it replaces keeps verifying for 7 days, so your receiver can hold both while it switches. Requires the webhooks scope. Rotation is not idempotent: a retry after a lost answer issues another key, which replaces the first."
  },
  {
    "name": "send_webhook_test_event",
    "description": "Send a test event to an endpoint.\n\nendpoint.verification sends a signed challenge now and answers whether the endpoint echoed it within 5 seconds; an echo verifies the endpoint, including a disabled one. assessment.updated queues one signed event with test: true and a fixed example assessment in the endpoint's response mode, delivered and retried like any other event; the endpoint must be verified. Both use the endpoint's current signing key. Requires the webhooks scope."
  },
  {
    "name": "list_webhook_deliveries",
    "description": "List an endpoint's delivery attempts.\n\nEvery POST the endpoint received, newest first: the event id and type, which attempt it was, whether it was a replay, delivered or failed, the response code, why it failed and how long it took. Attempts are kept for 30 days, or your retention_days when that is shorter, and are deleted with the assessment they carried. Requires the webhooks scope. Read-only and safe to retry. The cursor is opaque and bound to your workspace and the endpoint; a tampered or expired cursor answers 400 invalid_cursor."
  },
  {
    "name": "replay_webhook_delivery",
    "description": "Send one delivery again.\n\nQueues the event for the endpoint again: the same event id and body it received, with a new NR-Webhook-Timestamp and a signature from the endpoint's current signing key, retried like any other delivery and listed with replay: true. Your receiver deduplicates on the event id. The endpoint must be verified. Requires the webhooks scope. Not idempotent: each call, a retry included, sends the event again."
  },
  {
    "name": "aggregate_webhooks",
    "description": "Summarise retained webhook attempts and delivery queue\n\nCount retained webhook delivery attempts within thirty days and report current retained queue state."
  },
  {
    "name": "list_members",
    "description": "List a workspace's members.\n\nRead the workspace directory with a live key carrying members or members_manage. Member identities and grants belong to this workspace. Owner-controlled issuance limits team automation to authorised service credentials."
  },
  {
    "name": "update_member",
    "description": "Change a member's role.\n\nUpdate a non-owner member role, environment access or sensitive permission exclusions with a live members_manage key. Owner changes, identity binding and support access remain outside this scope. The current delegation ceiling is checked within the change transaction."
  },
  {
    "name": "remove_member",
    "description": "Remove a member.\n\nRemove a non-owner member with a live members_manage key. Subsequent access is refused and personal credentials are revoked. Independently owned service credentials follow their own lifecycle."
  },
  {
    "name": "list_audit_events",
    "description": "List a workspace's audit log.\n\nRead audit events within your current environment permissions. Filters apply before pagination."
  },
  {
    "name": "get_audit_retention",
    "description": "Read audit retention and available history.\n\nRead audit retention for the environment. The default is 365 days. Oldest available is an observation; it does not establish uninterrupted capture. Workspace-wide events follow the live storage policy."
  },
  {
    "name": "update_audit_retention",
    "description": "Set bounded customer audit retention.\n\nSet test-environment audit retention from 1 to 365 days with audit_manage scope. Live retention also governs workspace-wide audit events and requires a dashboard member authorised in both environments. Shortening immediately hides older events and invalidates audit exports; extending cannot restore deleted events. External receivers control copies already delivered."
  },
  {
    "name": "list_audit_streams",
    "description": "Read audit stream subscriptions.\n\nList audit subscriptions and their endpoint state and latest delivery attempt. Streams use verified HTTPS webhook endpoints and signed audit.event bodies. Delivery is at least once and unordered; deduplicate by webhook id. An empty action filter accepts all actions within the chosen scope."
  },
  {
    "name": "configure_audit_stream",
    "description": "Configure an audit stream subscription.\n\nConfigure the action filter for one verified webhook endpoint. Requires audit_manage. Capture starts at subscription creation; use an audit export for available earlier events. Workspace-wide scope requires an unrestricted console member and is unavailable to API keys."
  },
  {
    "name": "remove_audit_stream",
    "description": "Remove an audit stream.\n\nRemove an audit subscription and cancel queued deliveries. Requires audit_manage. An HTTP delivery already in flight cannot be recalled. The endpoint remains registered for other event types."
  },
  {
    "name": "replay_audit_stream",
    "description": "Replay an audit delivery.\n\nReplay a recorded delivery for the current audit subscription. Requires audit_manage. Source retention and the current action filter are checked again before sending. Expired or unsubscribed events are dropped."
  },
  {
    "name": "get_workspace_usage",
    "description": "Read a workspace's usage.\n\nRead daily usage units for the environments you can access. These counts are unpriced. With live access it also returns the daily console lookup cap: used, limit and resets_at."
  },
  {
    "name": "list_invites",
    "description": "List pending invites.\n\nRead pending workspace invitations with a live members_manage key. Tokens are excluded. Expiry and token reissue timestamps describe invitation state; they do not establish email delivery."
  },
  {
    "name": "revoke_invite",
    "description": "Revoke an invite.\n\nRevoke a pending invitation with a live members_manage key. A revoked token cannot be accepted. Owner-role invitations remain outside machine delegation."
  },
  {
    "name": "get_settings",
    "description": "Read an environment's settings.\n\nRead this environment retention, source selection and effective flow policies. A flow without its own thresholds inherits account_creation. Requires settings or management. Another environment answers404. Read-only and safe to retry."
  },
  {
    "name": "update_settings",
    "description": "Change an environment's settings.\n\nChange named retention, source or flow settings in one transaction. Requires settings or management; changes to active policy also require policy_publish, which legacy management includes. Use expected_policy_version to reject concurrent changes and record a change_reason. Each accepted change creates a fresh version and an atomic audit event. Retention-only edits do not require policy publication authority. Flow thresholds preserve their declared ordering and bounds."
  },
  {
    "name": "list_policy_history",
    "description": "Read immutable configuration versions.\n\nRead immutable configuration versions in one environment with settings or management. Follow before_version for older records."
  },
  {
    "name": "restore_policy",
    "description": "Restore captured settings as a new guarded version.\n\nRestore a retained configuration as a fresh version with the expected current version and a change reason. Requires settings plus policy_publish, or legacy management. Restore preserves the historical record and does not undo customer enforcement."
  },
  {
    "name": "preview_policy",
    "description": "Preview exact retained-score threshold transitions without side effects.\n\nCompare proposed policy with bounded retained first answers, including baseline, coverage and uncertainty. Requires settings or management. This read starts no provider work and publishes no changes."
  },
  {
    "name": "list_request_diagnostics",
    "description": "Search request diagnostics\n\nSearch authenticated request attempts by time, route, status or request correlation id. The interval is at most seven days. Each attempt has a unique id and may include the exact served decision. Records are bounded best effort and exclude request bodies, secrets and source payloads. A repeated correlation id does not overwrite another attempt."
  },
  {
    "name": "aggregate_requests",
    "description": "Summarise retained request attempts\n\nCount all retained matching request attempts and latency samples within seven days. Capture is best effort."
  },
  {
    "name": "list_list_entries",
    "description": "List an environment's list entries.\n\nPage through this environment allow and block entries, with canonical values, reasons and optional expiry. Requires settings or management. Follow the returned cursor until exhausted; a page is not the complete list. The cursor is bound to the environment and current filters."
  },
  {
    "name": "create_list_entry",
    "description": "Add an entry to an environment's list.\n\nAdd a canonical email or email-domain override with a reason and optional expiry. Requires settings plus policy_publish, or legacy management. Block wins over allow when both match. A small single-entry change retains the documented synchronous match budget; use lists.change for larger changes, whose account propagation is durable and resumable."
  },
  {
    "name": "delete_list_entry",
    "description": "Remove an entry from an environment's list.\n\nRemove an override with settings plus policy_publish, or legacy management. The removal takes effect for new decisions and schedules resumable propagation across matching retained accounts. An unknown or already removed entry answers404. Account risk events announce changed decisions as propagation runs."
  },
  {
    "name": "preview_list",
    "description": "Preview a list override change without side effects.\n\nPreview canonical list matches and current override effects with settings or management. The result states its bounded coverage and changes no list entries."
  },
  {
    "name": "change_lists",
    "description": "Apply an idempotent atomic bulk list change.\n\nAtomically add and remove a bounded batch of entries with an idempotency key. Requires settings plus policy_publish, or legacy management. The receipt exposes durable account propagation beyond the synchronous single-entry budget; poll lists.getChange until completion."
  },
  {
    "name": "get_list_change",
    "description": "Read a bulk list change and propagation progress.\n\nRead retained propagation progress for a list change with settings or management."
  },
  {
    "name": "list_reviews",
    "description": "List retained account reviews.\n\nList retained investigation reviews using filters and an authenticated cursor."
  },
  {
    "name": "create_review",
    "description": "Open a review for a retained account.\n\nOpen a review for one account. An account can have one active review in its environment."
  },
  {
    "name": "get_review",
    "description": "Read an account review.\n\nRead a retained review and its current version."
  },
  {
    "name": "update_review",
    "description": "Assign, prioritize or reopen a guarded review.\n\nChange review status, priority or assignment after checking the expected version."
  },
  {
    "name": "resolve_review",
    "description": "Resolve a review against an exact account risk version.\n\nResolve a review against the exact current review and account decision versions. A resolution does not report a factual outcome or execute enforcement."
  },
  {
    "name": "list_review_comments",
    "description": "Read retained review comments.\n\nPage through retained review comments."
  },
  {
    "name": "comment_review",
    "description": "Append a comment against the current review version.\n\nAppend a comment after checking the expected review version."
  },
  {
    "name": "list_review_resolutions",
    "description": "Read immutable review resolution history.\n\nPage through immutable review resolutions."
  },
  {
    "name": "list_review_views",
    "description": "List your private and shared review filters.\n\nList private and shared saved review filters visible to you."
  },
  {
    "name": "create_review_view",
    "description": "Save a tenant-local review filter.\n\nSave a private or shared review filter."
  },
  {
    "name": "update_review_view",
    "description": "Replace your saved filter with optimistic concurrency.\n\nUpdate your saved review filter after checking its expected version."
  },
  {
    "name": "delete_review_view",
    "description": "Delete your saved filter with optimistic concurrency.\n\nDelete your saved review filter after checking its expected version."
  },
  {
    "name": "export_review",
    "description": "Export an account review\n\nExport retained review details, comments, resolutions and linked subjects. Requires current reviews.read and exports.read; API keys need management together with exports, history or audit_manage. The audit event commits before any bytes are returned. Oversized exports are refused without truncation; use the bounded collection APIs."
  },
  {
    "name": "list_review_subjects",
    "description": "List retained subjects linked to a review.\n\nList retained subjects linked to this review. A link supplies investigation context and does not prove a relationship or change account risk."
  },
  {
    "name": "add_review_subject",
    "description": "Link retained tenant-local evidence to an investigation.\n\nLink an account, exact assessment revision or issued-key association within this environment. Supply the expected review version. A review permits 100 links. Erasure removes links to erased subjects. This action records context without creating feedback or enforcement."
  },
  {
    "name": "delete_review_subject",
    "description": "Remove a linked subject using the current review version.\n\nRemove a subject link with the expected review version. The linked account, assessment or key association remains unchanged."
  },
  {
    "name": "get_erasure_receipt",
    "description": "Read an erasure receipt\n\nRead retained erasure progress and downstream acknowledgements. Completion does not certify deletion from backups."
  },
  {
    "name": "create_export",
    "description": "Request an asynchronous customer export.\n\nRequest an encrypted JSON Lines snapshot of retained account or audit records. Requires exports plus history or audit scope; detailed account data also needs evidence or detailed scope. Criteria are frozen and hashed. Each environment permits four active jobs, 64 MiB per artifact, and 256 KiB per chunk. Artifacts expire after 24 hours. Send an Idempotency-Key to safely repeat a request. Every operation checks current permissions and source retention."
  },
  {
    "name": "list_exports",
    "description": "List exports for one collection.\n\nList authorised jobs for one kind and environment. Detailed jobs require current detailed-data permission and are filtered before pagination. Keep the kind and environment unchanged when following next_cursor."
  },
  {
    "name": "get_export",
    "description": "Read export state and progress.\n\nRead the status of an authorised export. Records and bytes describe committed progress in the current generation. Only completed, unexpired artifacts can be downloaded. Source erasure, retention changes and workspace removal can invalidate a job."
  },
  {
    "name": "cancel_export",
    "description": "Cancel and remove an export artifact.\n\nCancel an export and remove its stored chunks. Repeating cancellation is safe. An already admitted download may finish; bytes already returned cannot be recalled. Send an empty JSON object."
  },
  {
    "name": "retry_export",
    "description": "Retry a failed export.\n\nStart a new generation of a failed export before its original expiry, up to ten generations. The request criteria stay fixed and the new generation takes a fresh source snapshot. Cancelled, erased and expired jobs cannot be retried. Send an empty JSON object."
  },
  {
    "name": "download_export_chunk",
    "description": "Download one authorized export chunk.\n\nDownload one chunk of a completed, unexpired export after a fresh permission and privacy check. The response contains base64-encoded JSON Lines, a SHA-256, generation and next index. Decode and concatenate chunks in order from one generation. Audit storage failure withholds the bytes."
  },
  {
    "name": "list_policy_evaluations",
    "description": "List retained policy evaluation jobs.\n\nList retained policy evaluation jobs for this environment, newest first. At most five jobs are retained for their 24-hour evidence lifetime. Use next_before as before on the next page."
  },
  {
    "name": "create_policy_evaluation",
    "description": "Freeze an evaluation cohort and queue a bounded job.\n\nCreate a bounded evaluation with an Idempotency-Key, expected policy version, fixed candidates, cohort, seed and cost assumptions. Evidence is frozen before evaluation and recorded by hashes. Limits are 1000 accounts, 50000 request attempts and 64 MiB. Capture completeness is currently unknown, so results are no_change and cannot be published. The evaluation fetches no new source evidence and changes no live policy."
  },
  {
    "name": "get_policy_evaluation",
    "description": "Read evaluation state and provenance.\n\nRead a retained evaluation job and its capture and provenance metadata. Cancellation, source erasure, retention reduction and expiry can make a result unavailable."
  },
  {
    "name": "get_policy_evaluation_result",
    "description": "Read the bounded completed evaluator report.\n\nRead the completed evaluation report, including coverage, uncertainty and candidate results. Unknown capture completeness produces no_change. A completed result is not an automatic policy change."
  },
  {
    "name": "cancel_policy_evaluation",
    "description": "Cancel processing and destroy retained evidence and report.\n\nCancel a queued or running evaluation and invalidate its stored evidence. The operation does not change policy. Send an empty JSON object."
  },
  {
    "name": "publish_policy_evaluation",
    "description": "Publish an explicitly reviewed proposal with exact provenance.\n\nPublish an explicitly reviewed candidate with its exact manifest, input and result hashes and unchanged baseline policy version. Requires settings plus policy_publish, or legacy management. Publication creates a fresh policy version and immutable provenance. no_change, expired or invalidated results are refused."
  },
  {
    "name": "summarize_workspace_operations",
    "description": "Summarize retained account outcomes, enforcement reports and reviews.\n\nRead one retained snapshot of account outcomes, enforcement reports and review states for the environment and a window of at most 31 days. Each section declares its own population, numerator, denominator and label coverage. Current outcome heads preserve explicit unknown labels. Enforcement rows are reports from your application and do not independently verify execution. Requires history or investigate together with management scope. A result exceeding 100000 population rows or the query budget is refused without truncation."
  },
  {
    "name": "wait_for_assessment",
    "description": "Wait until an assessment is complete, then return it.\n\nPolls get_assessment at the interval the API's Retry-After asks for (at least once a second) until status is complete, or until timeout_seconds pass. When the time runs out the result says so and carries the latest answer, and you can call this tool again. A partial answer has a recommendation you can act on while a lane is still running; a pending one has none, so apply your own fallback until it settles. Requires the assess or history scope."
  }
];
