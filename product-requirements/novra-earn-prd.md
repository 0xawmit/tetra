# Novra Earn PRD

## Status

**Product:** Earn  
**Launch role:** Make eligible idle stablecoin capital productive through curated, transparent yield strategies.

## 1. Product Definition

Earn is Novra's yield product for supported stablecoin balances. It should feel like a native use of Account Cash—not a DeFi protocol directory and not a savings account. Users choose from a deliberately small set of curated strategies, understand the material risks and liquidity conditions, allocate capital, track it, and redeem it back into their Novra account.

**User promise:** Put eligible idle stablecoins to work while retaining a clear view of yield, risk, and access to capital.

Yield is variable and may involve smart-contract, protocol, counterparty, liquidity, market, and regulatory risks. It is not guaranteed and must never be presented as a bank deposit, savings account, or risk-free return.

## 2. Goals and Non-goals

### Goals

- Make it simple to discover, compare, enter, monitor, and exit supported yield strategies.
- Let users understand *what produces yield*, *what can go wrong*, *when funds are available*, and *what fees apply* before allocation.
- Make the relationship to Account Cash, Trade, and future Bank/spend clear.
- Provide a credible default for idle capital without auto-enrolling users or implying suitability.

### Non-goals for launch

- An uncurated protocol marketplace or user-built vaults.
- Yield aggregation across every chain/asset.
- Automated sweeping of all idle balances into Earn.
- Guaranteed principal, rates, instant liquidity, or spendability.
- Lending/borrowing, leverage, points farming, or social yield strategies.

## 3. Users and Jobs

| User | Job to be done |
| --- | --- |
| Stablecoin holder | “I want unused digital dollars to have a productive option without managing several protocols.” |
| Active trader | “I want capital between trades to work, while understanding how quickly I can deploy it again.” |
| Global saver | “I want a transparent yield option, not an opaque APY claim.” |
| New onchain user | “I want help understanding the strategy before I risk capital.” |

## 4. Experience and Layout

### 4.1 Earn home

Earn home has two modes: **Discover** and **My Earn**. Existing users land on My Earn if they have a position; new users land on Discover.

```text
Earn header: “Put idle stablecoins to work” | Earned to date | [Explore strategies]

My Earn / Discover tabs -------------------------------------------------
Portfolio summary: Total in Earn | earnings (period) | redeemable now

My positions ------------------------------------------------------------
Strategy | amount/value | variable rate | earned | liquidity | [Manage]

Available strategies ----------------------------------------------------
Featured/default strategy, then comparison cards/rows
Asset | current variable rate | risk label | access to funds | minimum | [View]

Education + disclosures -------------------------------------------------
How Earn works | What affects yield | Risk disclosures
```

### 4.2 Strategy list and comparison

The launch catalogue should be intentionally small and ordered by suitability clarity, not highest displayed rate. Each card/row shows:

- strategy name and supported asset;
- current variable annualized rate, period basis, net/gross treatment, and “last updated” time;
- a plain-language one-line source of yield;
- primary risk and liquidity labels;
- minimum allocation and fee summary;
- “View strategy” rather than a one-click allocation CTA.

Comparison filters: asset, access-to-funds window, and risk category. Do not create a filter that encourages users to optimize solely for highest APY without seeing risk and liquidity.

### 4.3 Strategy detail

The strategy detail is the decision screen. It includes:

1. **Header:** asset, current variable rate, total value/availability for existing position, and Allocate/Manage CTA.
2. **What this is:** plain-language explanation of strategy and source of yield.
3. **Key terms:** rate methodology/date, supported asset, minimum, fees, capacity, deposit/redemption cutoff, expected access window, and geographic eligibility.
4. **Risk and access:** prominent risk labels; loss-of-principal possibility; redemption/queue/lockup conditions; underlying providers/protocols and exposure concentration.
5. **Performance:** historical rate/value information only when reliable, clearly labelled historical and non-predictive. No promotional chart that implies a stable return.
6. **Documents:** methodology, terms, disclosures, provider/protocol documentation, and transaction history for the user's position.

### 4.4 My position detail

For each allocation show principal/value, accrued/paid yield, pending yield/redemption, rate history, entry date, liquidity status, and all allocation/redemption events. The primary actions are **Add**, **Redeem**, and **Use in Trade** only when actually supported by the strategy's liquidity rules.

## 5. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| EARN-01 | Display only strategies and assets available to the user’s jurisdiction, verification state, and account configuration. | P0 |
| EARN-02 | Show Account Cash eligible for each strategy; exclude reserved, pending, or ineligible balances from the amount input. | P0 |
| EARN-03 | Display current variable rate, update time, rate basis, fees, liquidity terms, and material risks wherever a strategy can be selected. | P0 |
| EARN-04 | Require users to view and acknowledge strategy-specific terms/risk disclosure before their first allocation and after a material terms change. | P0 |
| EARN-05 | Provide allocation amount entry, max amount, validation against minimum/maximum/capacity, and a review step before confirmation. | P0 |
| EARN-06 | Move confirmed allocations from Account Cash to a clearly pending status before treating them as an Earn position. | P0 |
| EARN-07 | Provide per-position value, principal, yield earned, pending actions, liquidity, and transaction history. | P0 |
| EARN-08 | Support redemption according to strategy terms; show earliest expected access, fees, and whether redemption is instant, queued, or locked. | P0 |
| EARN-09 | Return completed redemption proceeds to Account Cash by default, unless a disclosed destination is supported and selected. | P0 |
| EARN-10 | Surface material strategy events—rate/material risk change, paused deposits/redemptions, capacity, or provider issue—on position and Home attention surfaces. | P0 |
| EARN-11 | Keep an audit record of strategy version, acknowledgments, allocations, redemptions, rates used for display, and fees. | P0 |
| EARN-12 | Let users compare strategies by asset, liquidity, and risk category. | P1 |
| EARN-13 | Offer user-configurable rate and maturity/liquidity alerts. | P1 |

## 6. Core Flows

### 6.1 First allocation

1. User opens Earn from navigation, Home opportunity, or Account Cash CTA.
2. User selects a strategy and opens its detail page.
3. User selects **Allocate**; app displays eligible Account Cash in the required asset plus an “add funds/swap” path if unavailable.
4. User enters amount; app shows estimated rate context, fees, effective date, liquidity, and remaining Account Cash.
5. User reviews strategy summary and acknowledges risks/terms if required.
6. User confirms with required account approval/signature.
7. App displays pending allocation with expected completion window; Account Cash is reduced/reserved.
8. On completion, the position appears in My Earn and portfolio allocation.

### 6.2 Add to an existing position

1. User opens position detail and selects **Add**.
2. The app repeats eligibility, amount, rate/terms, and confirmation checks.
3. The new lot is recorded with its own entry time/terms when needed for accurate accounting.

### 6.3 Redeem

1. User selects **Redeem** on a position.
2. App shows redeemable amount, locked/pending amount, expected access date, estimated proceeds, fee, and destination (default Account Cash).
3. User chooses amount and reviews implications: rate stops/accrual treatment, queue/lockup, and any partial-redemption rules.
4. User confirms; position and Home show a redemption-pending state.
5. Proceeds arrive in Account Cash when settled. If a redemption fails or pauses, explain why and link to relevant strategy status/support.

### 6.4 Deploy redeemed/available capital to Trade

This is only exposed where same-day access and supported asset/collateral rules make it valid. The flow must state whether a redemption first occurs, if proceeds are pending, and when trading buying power becomes available. Never label a locked Earn balance as immediately tradeable.

## 7. States, Exceptions, and Guardrails

| State | Required behavior |
| --- | --- |
| No Account Cash | Explain funding and supported asset requirement; provide Add funds and optional supported conversion path. |
| Strategy at capacity | Disable allocation, retain detail/risk view, and offer a notification opt-in if allowed. |
| Deposit paused | Explain current status, affected action, and next update source; preserve redemption information. |
| Redemption queued/locked | Show position value separately from redeemable amount, queue date/order, and expected timeline. |
| Rate unavailable | Do not show stale rate as current; label last-known value/date or remove rate display until restored. |
| Material strategy event | Banner on strategy and position, Home attention item, transactional notification, and an explanation of user's options. |
| Eligibility change | Prevent new allocations; clearly explain effect on existing positions and allowed exit/servicing path. |

## 8. Data, Calculations, and Disclosure

- **Rate:** Display as variable annualized rate with the exact methodology, compounding assumption, net/gross fee treatment, update time, and historical/non-guaranteed label.
- **Position value:** Principal plus/minus strategy valuation and accrued yield according to the provider's supported accounting method; distinguish unclaimed, accrued, and paid amounts.
- **Earned:** Provide a defined selected-period view and lifetime figure. Do not call a mark-to-market change “earned yield.”
- **Liquidity:** Use explicit timing (for example, “estimated 1–3 business days” only if contractual/operational rules support it), not vague “flexible” labels.
- **Risk:** Always include the possibility of loss and links to strategy-specific protocol, counterparty, liquidity, smart-contract, depeg/currency, and regulatory risk as applicable.

## 9. Launch Scope and Roadmap

### Launch (P0)

- Curated supported-stablecoin strategies, catalogue, detail pages, allocation, redemption, position management, and full disclosure/acknowledgment flow.
- Current-rate, liquidity, fee, capacity, and strategy-status data.
- Earn portfolio/account integration, activity, pending statuses, and material-event notifications.

### Next (P1)

- Strategy comparisons, optional alerts, historical rate view, and strategy status page.
- More assets/strategies only after consistent risk/liquidity treatment is proven.
- Contextual reallocation flow between eligible strategies.

### Later (P2)

- User-controlled target allocation rules and capital sweeps with explicit caps, reserve rules, and confirmation.
- Tax/export integrations and advanced yield analytics.

## 10. Success Measures

- Funded users with an eligible Earn allocation.
- Allocation completion and redemption completion rates.
- Median time from redemption request to Account Cash availability.
- Earn position retention and multi-product capital use.
- Rate/disclosure comprehension and cancellation-before-confirmation rate.
- Support/complaint rate for rate, access, or risk misunderstanding.

## 11. Dependencies and Open Decisions

- Final strategy providers, assets, caps, rate methodology, fees, and liquidation/redemption terms.
- Product/legal approval of disclosures and jurisdiction-by-strategy eligibility.
- Valuation/accrual data, incident/status feeds, and audit record requirements.
- Whether any strategy supports direct Trade collateral or must redeem to Account Cash first.

