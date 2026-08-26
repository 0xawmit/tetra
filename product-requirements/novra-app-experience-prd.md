# Novra App Experience PRD

## Status

**Product:** Shared Novra account experience  
**Scope:** Launch foundation for Earn, Trade, and Invest  
**Bank:** Not in launch scope; reserve its navigation and capital-management integration points without exposing a Bank destination.

## 1. Product Definition

Novra is a global onchain finance account where users can **earn, trade, and invest** from one interface. It is not a collection of separate apps or balances. A user's capital should remain visible, understandable, and deployable across each product, subject to each product's liquidity, settlement, and eligibility rules.

The core account loop is:

> Fund Novra → deploy capital into a trade, investment, or yield strategy → monitor the whole portfolio → return proceeds to available capital → redeploy.

### Launch promise

**One account for active capital.** Users can see what they own, what it is doing, what it is worth, and what they can do next without moving between a wallet, trading venue, yield app, and investment portal.

## 2. Goals and Non-goals

### Goals

- Make the Home screen the clearest answer to: “Where is my money, what is it doing, and what should I do next?”
- Give users a consistent way to fund, withdraw, move capital, and understand availability across products.
- Make product navigation feel like modes of one account, not separate destinations.
- Let a novice enter through simple actions while giving active users a fast path to markets and portfolio detail.
- Keep self-custody and product risks visible at the moment they matter, without making users operate onchain infrastructure.

### Non-goals for launch

- A full retail banking or card experience.
- Tax reporting, lending, borrowing, social feeds, or a programmable automation suite.
- Hiding lockups, losses, leverage, fees, or product eligibility behind a single “total balance.”
- Guaranteeing liquidity, yield, or investment returns.

## 3. Product Principles

1. **One portfolio, explicit states.** The total portfolio is primary, but Account Cash, Earn, Trade, and Invest remain separately legible.
2. **Action follows availability.** The app never implies that all value can be traded or withdrawn immediately. Each action uses the capital actually eligible for it.
3. **Progressive disclosure.** Home gives a decision-ready overview; product pages give operating detail; disclosures explain underlying risk and mechanics before commitment.
4. **Same patterns everywhere.** Asset rows, performance language, risk labels, activity statuses, confirmation sheets, and money-movement controls should work consistently across products.
5. **Plain-language confidence.** Lead with the financial job and outcome. Technical protocol, chain, and venue detail is available but never required to understand the basics.
6. **Safety before speed.** Sensitive actions have clear review steps, security gating, and pending states. Trading can be fast without being ambiguous.

## 4. Account and Capital Model

### 4.1 Portfolio states

| State | Meaning | Included in total portfolio | Usually available for |
| --- | --- | --- | --- |
| **Account Cash** | Supported assets not allocated to a product | Yes | Deposit/withdraw, Earn, Trade, Invest |
| **Earn** | Principal in a yield strategy plus accrued yield | Yes | Redemption subject to strategy liquidity |
| **Trade collateral** | Cash assigned or reserved for open orders/positions | Yes | New orders or release after orders/positions settle |
| **Trade positions** | Current marked value of spot/perpetual positions | Yes | Close/reduce position; withdrawal only after settlement |
| **Invest holdings** | Holdings in funds, fixed income, pre-IPO, or other opportunities | Yes | Sale/redemption subject to product terms |
| **Pending** | Deposits, withdrawals, orders, subscriptions, redemptions, settlements | Displayed separately; not counted as spendable | No action until status resolves |

**Total portfolio value** is a current estimated valuation in the portfolio currency. It must always include a “last updated” state and use “estimated” where price or NAV is delayed.

### 4.2 Capital destinations

From Account Cash, users can:

- add to a supported Earn strategy;
- use an asset as Trade buying power/collateral where eligible;
- subscribe to an Invest opportunity where eligible;
- withdraw to a supported external destination.

Products may return proceeds to Account Cash automatically or require a user-selected destination. In all cases, the confirmation must name the destination and expected availability.

### 4.3 Availability language

Every balance used in an action must be labelled with the relevant availability:

- **Available now** — can be used immediately in the proposed action.
- **Reserved** — locked by an open order, margin requirement, pending transaction, or compliance review.
- **Redeemable** — can be requested, with an expected processing/settlement window.
- **Locked until [date/event]** — cannot be moved before the disclosed restriction ends.
- **Estimated value** — valuation may change or be delayed.

## 5. Information Architecture and Navigation

### 5.1 Primary navigation

Desktop: persistent left rail. Mobile: bottom navigation plus a global action sheet.

| Destination | Job | Badge/secondary state |
| --- | --- | --- |
| **Home** | Account overview and next best action | Portfolio change / alert count |
| **Earn** | Discover and manage yield strategies | Current earnings / positions |
| **Trade** | Discover markets and place/manage trades | Open positions / orders |
| **Invest** | Discover and manage investment opportunities | Holding value / pending subscriptions |
| **Activity** | One ledger of every account and product event | Pending count |

Persistent global controls:

- **Add funds** — deposit fiat/crypto rails available to the user.
- **Move money** — contextual transfer sheet for allocation, redemption, or withdrawal.
- **Notifications** — product, security, funding, and risk-relevant updates.
- **Profile / account** — identity, wallet/security, preferences, limits, statements, support, legal documents.

### 5.2 Navigation rules

- A product destination preserves its own last-viewed state (for example, Trade market/positions tab) when the user returns.
- A deep link into an asset, strategy, or opportunity always provides a path back to the originating product and to Home.
- Product screens surface cross-product actions only when the destination is valid. Example: an Earn position with same-day redemption can show “Use in Trade”; a locked private-market holding cannot.
- Bank is omitted from primary navigation at launch. The navigation system supports a future Bank destination without moving existing labels.

## 6. Home Experience

### 6.1 Purpose

Home is the account dashboard, not a marketing feed. It should answer four questions in one scan:

1. What is my total portfolio worth?
2. How is it allocated and performing?
3. What is available to deploy or withdraw?
4. What requires attention or offers a useful next step?

### 6.2 Layout

#### Desktop

```text
Top bar: logo | search | Add funds | notifications | profile
Left rail: Home / Earn / Trade / Invest / Activity

Portfolio header ------------------------------------------------------------
Total portfolio value | daily / all-time change | hide balance | currency
Available to deploy | [Add funds] [Move money]

Allocation + performance -------------------  Attention & next steps --------
Donut / stacked allocation by product         Pending deposit / margin alert
Cash / Earn / Trade / Invest                  “Earn idle USDC” / “Review order”

Your capital ---------------------------------------------------------------
Account Cash | Earn | Trade | Invest cards with value, change, availability

Markets & opportunities --------------------- Recent activity ---------------
Watchlist / market movers / featured deal     Unified ledger; see all
```

#### Mobile

1. Total portfolio and daily/all-time toggle.
2. Available-to-deploy card with Add funds and Move money actions.
3. Horizontally scrollable product summaries: Cash, Earn, Trade, Invest.
4. “Needs attention” only when relevant.
5. Opportunities/watchlist and recent activity.
6. Bottom navigation: Home, Earn, Trade, Invest, Activity. A floating/add action opens funding and transfers.

### 6.3 Required modules

| Module | Requirements |
| --- | --- |
| Portfolio header | Show total value, selected performance period, percentage and currency change, hide/show balance, portfolio-currency selector, and valuation timestamp. Do not calculate a misleading all-time performance where historic cost is unavailable. |
| Available to deploy | Show eligible Account Cash by asset and one primary action. Explain excluded value through a “Why not all funds?” detail view. |
| Allocation | Show Cash, Earn, Trade, and Invest values/percentages; open the relevant product-filtered portfolio view on tap. |
| Product summaries | Each card includes total value, period change/earned where applicable, availability, and a product CTA. Empty states explain the job and provide a first action. |
| Attention center | Prioritize time-sensitive or risk-relevant items: failed/pending transfers, margin risk, expiring investment windows, orders requiring review, document/eligibility tasks. Suppress generic engagement nudges. |
| Opportunities | Personalized but clearly labelled market/strategy/investment cards. “Featured” must not imply suitability or advice. |
| Recent activity | Last 3–5 unified events with pending/completed/failed state and a path to Activity. |

### 6.4 Home states

- **New/unfunded:** explain the account loop; primary CTA Add funds; secondary CTA Explore markets.
- **Funded, no product use:** show Account Cash and appropriate Earn/Trade/Invest starting points; never auto-allocate.
- **Active:** show portfolio, availability, positions, and attention items.
- **Restricted/verification required:** show only the specific action blocked, why it is needed, and a clear completion route. Retain read-only portfolio access where permitted.
- **Data unavailable:** preserve last known data with timestamp; disable price-sensitive actions until live data recovers.

## 7. Shared Flows

### 7.1 Onboarding and account readiness

1. User creates or connects a Novra self-custodial account.
2. App explains recovery/access method, security controls, and account currency.
3. User completes only the verification/eligibility steps needed for currently selected products or actions.
4. Home opens in the unfunded state with Add funds and Explore options.

Requirements:

- Security setup cannot be buried after a deposit; show a clear status and recovery reminder.
- Verification must be staged and explain the purpose and expected result; avoid collecting data before it is needed.
- Jurisdiction and eligibility restrictions must block the affected product/action—not render the whole account unexplainedly unusable.

### 7.2 Add funds

1. User selects **Add funds**.
2. User selects a permitted rail and asset/network.
3. App presents destination details, expected timing, fees (if known), minimums, and warnings.
4. User initiates deposit; Activity records a pending deposit.
5. On confirmation, funds appear as Account Cash with the resolved status and CTA to deploy.

Requirements:

- Prevent address/network mismatches with explicit selectors and a confirmation warning.
- Do not display a deposit as spendable/allocable until required confirmations and checks complete.
- The completion screen suggests next actions without presuming the user wants yield, trading, or investment exposure.

### 7.3 Move money / allocation

This is a shared sheet launched from Home, Account Cash, or a product CTA.

1. Select **from** source (defaulting to the contextual balance).
2. Select **to** destination: Account Cash, supported Earn strategy, Trade, Invest subscription, or external withdrawal.
3. Enter amount; show available amount, minimum, fees, expected timing, and what remains available.
4. Review a plain-language summary of product-specific risk, terms, and destination.
5. Confirm with required wallet/signature/security approval.
6. Show pending or completed status and route to the destination detail.

### 7.4 Withdraw / cash out

1. User selects an eligible Account Cash asset or redeems a product position first.
2. App validates amount, destination, network/rail, fees, limits, and security checks.
3. User reviews final amount, fee, destination, estimated arrival, and irreversibility warning where relevant.
4. Confirm; record a pending withdrawal and make the reserved amount clear.

Product positions must not offer “Withdraw” unless redemption or sale is an actual prerequisite represented in the flow.

## 8. Portfolio, Activity, and Account Management

### 8.1 Portfolio detail

Accessible from Home total value and each product card. Includes:

- allocation by product, asset, and account state;
- value and performance by selected time period;
- cost basis / realized and unrealized outcomes when data is available, otherwise a clear “not available” state;
- filters for product, asset, and status;
- a detail view that identifies pricing source/time and product valuation caveats.

### 8.2 Activity

Activity is the immutable, user-readable account ledger. It aggregates deposits, withdrawals, allocations, redemptions, trades, orders, funding/fees, investment subscriptions, distributions, documents, and security events.

Each event must show:

- type, timestamp, amount/asset, status, and relevant product;
- transaction/order/reference identifier;
- fee where applicable;
- destination/source and an explorer/reference link where appropriate;
- failure/pending reason and a safe remediation path.

Filters: all activity, product, asset, status, and date range. Exportable statements are a post-launch enhancement unless legally required at launch.

### 8.3 Account settings

| Area | Launch requirements |
| --- | --- |
| Profile and identity | Personal details, verification state, country/residency, eligibility and product-access status |
| Security and custody | Access/recovery status, passkeys/2FA where supported, connected devices/sessions, wallet/export/recovery education, security-event log |
| Preferences | Portfolio currency, language, notification preferences, price-alert preferences, privacy settings |
| Limits and permissions | Product eligibility, transfer limits, trading permissions, investor accreditation/suitability state where needed |
| Documents and support | Terms, risk disclosures, strategy/instrument documents, confirmations, support contact and incident reporting |

## 9. Shared UI System Requirements

- Use the same asset icon/name/ticker and fiat-value treatment across all products.
- Use green/red only with a textual sign and period label; do not rely on color alone.
- Every yield rate includes **variable**, period basis, net/gross treatment, and a route to methodology/risk information.
- Every investment return or chart distinguishes realized, unrealized, projected, and historical information.
- Every trading metric identifies mark, last, index, or indicative price as relevant.
- Fees appear before confirmation and in completed activity; “network/provider fees may apply” is not enough where a figure can be calculated.
- Risk labels use a reusable taxonomy: liquidity, market, leverage, smart-contract/protocol, counterparty/issuer, currency, and eligibility/regulatory.
- Mobile touch targets, chart alternatives, keyboard navigation, screen-reader labels, and non-color states are required for critical actions.

## 10. Notifications

### Transactional (default on)

- Deposit, withdrawal, allocation, redemption, order, trade, subscription, and distribution status changes.
- Material security events and account-access changes.
- Margin, liquidation, or order-risk alerts for Trade.

### User-controlled alerts

- Yield rate/material strategy changes.
- Price alerts, watchlist moves, position performance, and order fills.
- New or closing investment opportunities.

Notifications must deep-link to a resolved detail state and never show sensitive balances on a locked device by default.

## 11. Launch Scope and Roadmap

### Launch (P0)

- Account creation/security onboarding, product eligibility gates, and funding.
- Home dashboard with portfolio total, allocation, Account Cash, product summaries, attention items, and activity preview.
- Shared account capital model and Move money flow.
- Product-specific Earn, Trade, and Invest experiences defined in their companion PRDs.
- Unified Activity, basic settings/security, disclosures, and transaction-status notifications.

### Next (P1)

- Personalized opportunity ranking, richer portfolio analytics, watchlists/alerts, statement exports, and advanced transfer routes.
- More automated allocation suggestions that always require explicit confirmation.
- Bank preparation: Account Cash spending availability, transfer history, and card/transfer entry points once the product launches.

### Later (P2)

- Cross-product goals and rules-based capital automation.
- Household/team account views, tax integrations, advanced reporting, and deeper social/investor collaboration features.

## 12. Success Measures

| Outcome | Example measures |
| --- | --- |
| Account activation | Funded-account rate; median time from account creation to successful deposit |
| Capital clarity | Share of users viewing portfolio/availability before allocation; support contacts tagged “where is my balance?” |
| Product adoption | First Earn allocation, first trade, first investment subscription, and multi-product adoption rates |
| Money movement reliability | Deposit/withdrawal/transfer completion rate; pending/failure rate; median resolution time |
| Informed action | Disclosure-view and acknowledgment completion; cancellation/review rate before high-risk action |
| Trust and retention | 30/90-day funded retention; security incident rate; account-management CSAT |

## 13. Dependencies and Open Decisions

- Supported custody model, chains/assets, deposit and withdrawal rails.
- Portfolio valuation, price/NAV sources, performance methodology, and historical-data availability.
- Identity/KYC/AML, market access, investor eligibility, and jurisdiction rules by product.
- Final product liquidity and settlement rules from Earn, trading, and investment partners.
- Fee schedule, supported portfolio currencies, notification infrastructure, and customer support model.

