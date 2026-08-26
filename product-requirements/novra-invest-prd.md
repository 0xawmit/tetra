# Novra Invest PRD

## Status

**Product:** Invest  
**Launch role:** Give eligible users a disciplined way to discover, evaluate, subscribe to, and manage longer-horizon investment opportunities from their Novra account.

## 1. Product Definition

Invest is Novra's opportunity-access product for curated investments beyond active trading: pre-IPO/private opportunities, fixed-income products, funds, and other approved offerings. It is designed for intentional allocation, not high-frequency action. It must make eligibility, suitability/appropriateness requirements, risks, liquidity, documents, and the full subscription lifecycle clear before capital is committed.

**User promise:** Evaluate and manage qualified investment opportunities from the same account where you hold capital—without confusing illiquid investments with cash or a tradeable market balance.

Investments can lose value, have limited or no liquidity, involve issuer/counterparty and regulatory risk, and may be limited to eligible users. Novra does not provide investment advice through discovery ranking, featured placement, or product copy.

## 2. Goals and Non-goals

### Goals

- Provide a trusted, documents-first path from opportunity discovery to completed subscription.
- Make capital commitment, lockups, valuation, distributions, and exit paths legible in the shared portfolio.
- Treat private/pre-IPO and fixed-income products according to their distinct risks and timelines.
- Build reusable infrastructure for future opportunity types without making all products look equivalent.

### Non-goals for launch

- A public trading venue for private investments or guaranteed secondary liquidity.
- Personalized financial advice, auto-investing, managed portfolios, or “best investment” rankings.
- Investments open to users who have not met relevant eligibility/verification requirements.
- Hiding legal documents and material terms behind a generic confirmation modal.
- Combining non-tradeable investments with Account Cash or Trade buying power.

## 3. Users and Jobs

| User | Job to be done |
| --- | --- |
| Qualified long-term allocator | “I want a clear route to opportunities I am eligible for, with the terms and risks I need to evaluate them.” |
| Stablecoin holder | “I want to allocate part of my account to a longer-term investment while keeping the rest visible and available.” |
| Fixed-income seeker | “I want to compare maturity, issuer, yield/return structure, and access to funds—not just a headline rate.” |
| Private-market participant | “I need to know exactly what I am subscribing to, who issues it, how it is valued, and when I might get liquidity.” |

## 4. Opportunity Taxonomy and Access

### 4.1 Launch opportunity types

| Type | Primary decision factors | Required special handling |
| --- | --- | --- |
| Pre-IPO / private opportunity | Issuer, security/vehicle, valuation, thesis, minimum, lockup, transferability, exit uncertainty | Eligibility/accreditation/suitability as required; document receipt; no implied liquidity or direct-share ownership without confirmation |
| Fixed income | Issuer, currency, maturity, coupon/yield methodology, payment schedule, credit/counterparty risk, redemption terms | Separate yield-to-maturity, coupon, projected return, and price movement; calendar of payments/maturity |
| Fund | Manager, strategy, holdings/exposure, fees, NAV, dealing/redemption terms, liquidity | NAV timing; subscription/redemption windows; fund documents and share class |
| Future curated opportunities | Product-specific criteria | Cannot launch until schema, disclosures, eligibility, valuation, and lifecycle are supported |

### 4.2 Eligibility model

Invest maintains a user-level readiness status separate from general account access: identity/residency, investor category/accreditation where needed, product-specific appropriateness/suitability requirements, and document acceptance.

Discovery may show unavailable opportunities only if legal policy permits. They must be clearly tagged **Not available to you** with a reason and a compliant route to learn/complete requirements; do not encourage bypassing eligibility.

## 5. Experience and Layout

### 5.1 Invest home

Invest Home is a curated catalogue plus an owned-holdings view.

```text
Invest header: “Invest beyond the daily market” | Invested value | [Explore opportunities]

My investments -----------------------------------------------------------
Total invested | estimated value | upcoming payment/maturity | pending subscriptions
Holding rows: investment | value | change/income | liquidity/status | [View]

Explore opportunities ----------------------------------------------------
Filters: type | access to funds | currency | minimum | eligibility
Cards: issuer/manager | opportunity type | key terms | risk/liquidity | [View details]

Learn & understand -------------------------------------------------------
How private investments work | fixed-income basics | risks and eligibility
```

The homepage must not sort solely by projected return. Default presentation can be editorial/curated but must be clearly labelled and cannot imply recommendation or suitability.

### 5.2 Opportunity detail

Opportunity detail is an investment memo and transaction entry point, with tabs/sections:

1. **Overview:** issuer/manager, opportunity type, what the user is buying, objective/use of proceeds, and primary risks.
2. **Key terms:** minimum, currency, offering window, target/maximum raise where appropriate, price/NAV/valuation date, fees, subscription date, settlement date, and eligibility.
3. **Return and liquidity:** fixed-income coupon/yield/maturity/payment schedule; private-market valuation/exit uncertainty; fund NAV/redemption window. Projected, historical, and realized information must be visibly distinct.
4. **Issuer/manager:** verified entity information, relevant materials, and conflicts/affiliations where required.
5. **Documents:** offering memorandum, subscription agreement, KID/prospectus where applicable, financials, risk disclosures, and terms. Require required documents to be read/acknowledged before subscription.
6. **Updates:** issuer/product updates, lifecycle events, and a user's relevant holding activity once subscribed.

### 5.3 Holding detail

Holding detail shows invested amount/cost basis where available, current valuation or NAV date, units/interest/ownership representation, lifecycle stage, distributions, documents, activity, restrictions, and permitted action(s). Its primary CTA reflects reality: **View documents**, **Request redemption**, **Express interest in transfer**, or **No action available**, not a generic Sell button.

## 6. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| INVEST-01 | Show opportunities based on user eligibility, jurisdiction, and product availability; clearly label unavailable states. | P0 |
| INVEST-02 | Provide catalogue filtering by opportunity type, currency, minimum, and liquidity/access category, without an unqualified default “highest return” sort. | P0 |
| INVEST-03 | Provide a standardized opportunity detail that clearly identifies instrument/vehicle, issuer/manager, key terms, risk, fees, liquidity, and document set. | P0 |
| INVEST-04 | Distinguish target/projected, historical, realized, and mark-to-market/NAV results in all user-facing data. | P0 |
| INVEST-05 | Gate subscriptions by required identity, investor category, appropriateness/suitability, jurisdiction, and documents/attestations. | P0 |
| INVEST-06 | Provide a multi-step subscription flow with amount validation, source of funds, complete order/commitment review, electronic agreement/signature where required, and status tracking. | P0 |
| INVEST-07 | Reserve Account Cash only after the user submits the commitment; show withdrawal/cancellation rights and offering-window rules before confirmation. | P0 |
| INVEST-08 | Track subscription states: draft, submitted, under review, accepted, funded, rejected, cancelled, settled, and allocation adjusted. | P0 |
| INVEST-09 | Show owned holdings as non-tradeable/locked/redeemable according to their specific terms, separate from Account Cash and Trade buying power. | P0 |
| INVEST-10 | Display valuation/NAV date, distributions, maturity/redemption milestones, documents, updates, and full activity for every holding. | P0 |
| INVEST-11 | Notify users about subscription decisions, funding deadlines, document updates, distributions, maturity, redemption windows, and material issuer events. | P0 |
| INVEST-12 | Support secondary interest/transfer requests only where permitted; no liquidity implication if no actual matching/venue exists. | P1 |
| INVEST-13 | Support investment watchlists and due-diligence comparison workspace. | P1 |

## 7. Core Flows

### 7.1 Explore and evaluate an opportunity

1. User opens Invest from navigation, Home opportunity, or a direct link.
2. User browses/filter catalogue and opens an opportunity detail page.
3. App shows eligibility status early. If eligible, user can inspect terms/documents and choose **Start subscription**. If not, the app gives the specific compliant next step.
4. User can save to watchlist (P1) or return to Home without commitment.

### 7.2 Subscribe / invest

1. User selects **Start subscription**.
2. App confirms identity/eligibility, then displays requirements still needed before the user proceeds.
3. User enters amount in supported currency/asset. App validates available Account Cash, minimum/maximum, capacity, and offering window.
4. User reviews all material terms: investment vehicle/instrument, fees, expected funding/settlement date, lockup/liquidity, valuation nature, return information, key risks, cancellation/withdrawal terms, and source/destination of funds.
5. User reads/acknowledges required documents and signs/attests where required.
6. User submits. Amount is reserved and the subscription is recorded as submitted/under review; it is not represented as a completed holding yet.
7. Novra updates status. On acceptance/funding/settlement, the holding appears in My investments and the overall portfolio. On rejection/cancellation, reservation is released according to terms with a clear explanation.

### 7.3 Manage a fixed-income holding

1. User opens holding detail.
2. App shows issuer, principal/value, coupon or yield methodology, payment schedule, maturity, current status, and redemption terms.
3. Each paid/pending distribution is shown in activity and returned to Account Cash (or another explicit destination) once settled.
4. At maturity/redemption, the app explains timing and records principal/proceeds separately from income.

### 7.4 Manage a private/pre-IPO holding

1. User opens holding detail to see vehicle/security, committed/funded amount, valuation date/value, issuer updates, transfer restrictions, and documents.
2. If a permitted transfer/redemption window exists, user selects the relevant action; otherwise the app states that no exit is currently available.
3. Material updates or corporate events appear in the holding timeline and notification center. Do not translate an issuer update into an implied change in value without a valuation basis.

## 8. States, Exceptions, and Guardrails

| State | Required behavior |
| --- | --- |
| Eligibility incomplete | List only the required steps and why; preserve opportunity detail without allowing commitment. |
| Offering closed/capacity reached | Prevent new subscriptions, show resolved status and any waitlist/notification option if approved. |
| Subscription under review | Show reserved amount, expected decision window if known, documents, and cancellation rights; keep it out of invested value until applicable. |
| Subscription adjusted/rejected | Explain amount/status change, resulting released or reserved funds, and activity record. |
| Delayed valuation/NAV | Show last valuation date/source and clearly state that displayed value is estimated/not current. |
| Locked holding | Separate current estimated value from cash availability; show lockup/restriction reason and next possible event. |
| Issuer/product event | Surface a prominent holding and Home notice with source document, impact known/unknown, and user action if any. |
| Product wind-down/default | Do not hide or normalize the event; show known status, servicing path, communications/documents, and support/escalation route. |

## 9. Data and Disclosure Requirements

- Show which entity issues/manages the opportunity, what legal vehicle/instrument the user obtains, and whether exposure is direct, fractional, tokenized, or through a fund/SPV.
- Do not call a target yield, IRR, coupon, distribution rate, or past performance a guaranteed return. Each has dedicated label and methodology.
- Fixed-income data includes currency, coupon/yield method, payment frequency, maturity, call/default/redemption risk, and price/NAV treatment.
- Private-market data includes valuation date and source, transfer/lockup restrictions, exit uncertainty, dilution/corporate-action conditions, and any fees/carry.
- Every subscription preserves the document versions, acknowledgements, disclosures, agreement/signature records, and final allocation.
- Holding valuation shown in portfolio must identify if it is cost, NAV, manager-provided estimate, or another disclosed basis.

## 10. Launch Scope and Roadmap

### Launch (P0)

- Curated opportunity catalogue and standardized opportunity/holding detail.
- Product eligibility and document/attestation gates.
- Subscription workflow, allocation-status lifecycle, Account Cash reservation/settlement, and portfolio/activity integration.
- At least the operational schemas for pre-IPO/private, fixed-income, and fund opportunities; launch only products with required data and servicing.

### Next (P1)

- Watchlists, comparison/due-diligence workspace, investor update center, and transfer-interest workflow where permitted.
- More curated investment types after standardized lifecycle, data, and disclosure treatment exists.

### Later (P2)

- Secondary marketplace integrations only with valid liquidity, regulatory, pricing, and suitability design.
- Optional recurring allocation tools that require strict eligibility, caps, and explicit user approvals.

## 11. Success Measures

- Eligible users who open a full opportunity detail and complete required document review.
- Subscription initiation, submission, acceptance, and funding completion rates.
- Time from commitment to resolved allocation decision.
- Holdings with current required valuation/documents and timely distribution/maturity processing.
- Support contacts and abandonment reasons around eligibility, liquidity, fees, and terms.
- Repeat, diversified, and retained investment use—without treating volume as the only success metric.

## 12. Dependencies and Open Decisions

- Investment sourcing/partner workflow, issuer/manager onboarding, legal vehicle, custody/recordkeeping, funding and settlement model.
- Jurisdiction, accreditation/qualification, appropriateness/suitability, marketing restrictions, and required documents/signatures.
- Valuation/NAV feeds, issuer update process, distributions, corporate actions, maturity/redemption servicing, and support escalation.
- Fee structure, base/settlement currencies, minimums/capacity, and any legitimate secondary-liquidity process.

