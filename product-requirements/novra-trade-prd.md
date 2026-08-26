# Novra Trade PRD

## Status

**Product:** Trade  
**Launch role:** Give eligible users direct, clear access to supported global markets from the same Novra capital account.

## 1. Product Definition

Trade is the market-access layer of Novra. It supports spot and perpetual markets across supported crypto and tokenized real-world market products—including stocks, ETFs, commodities, and forex—subject to launch venue, jurisdiction, and eligibility. It must feel connected to the account, while still meeting the clarity and control users expect from a serious trading product.

**User promise:** Discover markets, place and manage trades, and return unused capital or proceeds to the same Novra account without maintaining a separate trading relationship.

Market availability, leverage, asset access, trading hours, settlement, and investor protections vary by instrument, venue, location, and user eligibility. Trade is not investment advice.

## 2. Goals and Non-goals

### Goals

- Offer a fast path from Account Cash to a supported market with transparent buying power, price, fees, and risk.
- Serve two levels of intent: a simple buy/sell flow and an advanced market workspace.
- Make open orders, positions, margin, funding, P&L, and liquidation risk impossible to miss.
- Keep watchlists, market discovery, and portfolio position management connected to the wider Novra account.

### Non-goals for launch

- Every global instrument, exchange, order type, or leverage configuration.
- Social-copy execution, public trading feeds, bots, strategy marketplaces, or prediction markets.
- Cross-margin across products without a documented risk engine.
- Implying tokenized instruments confer the same rights, custody, trading hours, or protections as the underlying asset.
- Personalized recommendations or suitability claims.

## 3. Users and Jobs

| User | Job to be done |
| --- | --- |
| New/direct trader | “I want to buy or sell a supported asset using my Novra balance without learning a professional terminal first.” |
| Active trader | “I want a dependable workspace for observing markets, placing orders, and managing risk.” |
| Global-markets user | “I want to understand what instrument I am trading and whether I can access it.” |
| Account user with idle capital | “I want to deploy available balance when opportunity appears, then clearly see the result in my portfolio.” |

## 4. Trading Model and Eligibility

### 4.1 Market taxonomy

Every market is labelled at the point of discovery and order entry with:

- asset/instrument name, symbol, category, and quote currency;
- **spot** or **perpetual**;
- crypto, tokenized stock, ETF, commodity, forex, or other category;
- provider/venue and, for tokenized products, issuer/underlying reference;
- trading session/hours, price source, and settlement/custody characteristics;
- jurisdiction/eligibility status.

### 4.2 Trading permissions

Before an order, Novra checks product access, identity/verification, location, risk acknowledgment, and any instrument-specific eligibility. A user who cannot access a market can still view education/market data where permitted, but sees a precise unavailable reason and no deceptive trade CTA.

### 4.3 Capital treatment

- Account Cash becomes **available buying power** when the asset and rules permit.
- Open orders reserve the needed amount and appear in both Trade and the shared portfolio.
- Perpetual positions show collateral, notional, leverage, unrealized P&L, maintenance requirement, funding, and estimated liquidation price.
- Closed-position proceeds settle into Trade-available cash, then return to Account Cash according to the venue/settlement rules. The transition must be shown, not assumed instant.
- Earn and Invest value does not count as Trade buying power unless a documented redemption/collateral route is available.

## 5. Experience and Layout

### 5.1 Trade home

Trade home is an active account view, not a generic chart page.

```text
Trade header: available buying power | [Deposit / move money] | search

My trading summary -------------------------------------------------------
Open positions | unrealized P&L | margin health (if applicable) | open orders

Watchlist / markets ------------------------------------------------------
Tabs: Watchlist | Crypto | Tokenized markets | Perpetuals
Rows: instrument | last price | change | session/market status | quick action

Discover ---------------------------------------------------------------
Featured categories, new supported markets, educational instrument cards

Recent trade activity ---------------------------------------------------
Orders, fills, funding, settlements; See all activity
```

For no-position users, lead with watchlist/market discovery and an explanation of how Account Cash becomes buying power. For users with risk-sensitive positions, the open-position/margin block appears first.

### 5.2 Market detail / advanced workspace

Desktop uses a three-column layout:

```text
Instrument header: name, spot/perp + category tags, price, market status, favourite
Left: chart + timeframes + technical tools | Centre: order book/trades + positions/orders tabs | Right: order ticket
Below: instrument overview, contract/issuer details, fees, risk, related markets
```

Mobile prioritizes instrument header, price/chart, Buy/Sell control, key position/order state, then order ticket in a full-height sheet. Depth and advanced data are accessible through tabs rather than compressed into the first view.

### 5.3 Order ticket

The ticket supports only enabled order types at launch (minimum: market and limit; conditional orders only if risk engine supports them). It contains:

- Buy/Sell and Spot/Perpetual context;
- order type, size (asset and quote-currency input), price where applicable, estimated total, and time-in-force where supported;
- available buying power/collateral and a max control;
- fee estimate, price impact/slippage where applicable, market/session state, and settlement note;
- for perpetuals: leverage selector, collateral, notional, estimated liquidation price, maintenance requirement, funding information, and an explicit risk warning;
- a review state that repeats all material order details before submission.

### 5.4 Positions and orders

**Positions** shows open assets/contracts, quantity/notional, entry/mark/last price as relevant, unrealized/realized P&L, value, and risk state. **Orders** separates open, filled, cancelled, rejected, and pending orders. Every row opens its detail with complete status history and action controls.

## 6. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| TRADE-01 | Display only tradeable instruments for a user's market permissions; label unavailable instruments and reason where display is permitted. | P0 |
| TRADE-02 | Provide search, market-category navigation, market status/session, watchlist, and instrument detail for supported markets. | P0 |
| TRADE-03 | Provide spot market and limit orders; render unsupported order types unavailable rather than silently changing execution behavior. | P0 |
| TRADE-04 | Provide perpetual order flow only after explicit product/risk permission and show leverage, collateral, liquidation, funding, and margin data. | P0 |
| TRADE-05 | Calculate and display current available buying power, reserved funds, estimated fees, price impact where applicable, and resulting remaining balance before order confirmation. | P0 |
| TRADE-06 | Validate price/size increments, minimums, available balance/collateral, market status, permissions, limits, and order parameters before submit. | P0 |
| TRADE-07 | Require an order review step and clear execution-status feedback; market orders must not promise a fill price before execution. | P0 |
| TRADE-08 | Show open/filled/cancelled/rejected/pending orders and provide cancellation only while supported by order/venue state. | P0 |
| TRADE-09 | Show positions with current valuation and P&L source/timestamp; distinguish realized from unrealized values. | P0 |
| TRADE-10 | Display perpetual margin health and escalating risk alerts well before liquidation thresholds; surface action paths to reduce, close, or add collateral when supported. | P0 |
| TRADE-11 | Record every order, fill, fee, funding event, settlement, and position close in unified Activity. | P0 |
| TRADE-12 | Return settled proceeds to Account Cash or show the intermediate settlement state clearly. | P0 |
| TRADE-13 | Support price alerts, richer watchlists, and advanced conditional orders. | P1 |
| TRADE-14 | Add social/copy trading only after consent, risk, conflict, and performance-reporting requirements are defined. | P2 |

## 7. Core Flows

### 7.1 Buy spot

1. User opens a market from Trade Home, watchlist, search, or Home.
2. User selects **Buy** and opens an order ticket preconfigured for spot.
3. User selects market/limit, enters size/price, and sees buying power, estimated fee, price impact and settlement detail.
4. User reviews instrument/market status and confirms.
5. App submits and immediately shows pending/open/filled/rejected state; Account Cash becomes reserved or settled trade balance as appropriate.
6. Once filled, the position appears in Trade, portfolio allocation, and Activity.

### 7.2 Sell / close spot

1. User opens a held asset/position and selects Sell.
2. Ticket shows sellable quantity, price/fee estimate, and effect on position.
3. User reviews and confirms; position and order state update.
4. Proceeds are marked pending/settling then available as Account Cash when complete.

### 7.3 Open/manage a perpetual position

1. Eligible user opens a perpetual market and selects Buy/Long or Sell/Short.
2. Ticket presents contract, leverage, collateral, notional, margin requirements, funding, liquidation estimate, and risk warning before order details.
3. User sets size and permitted leverage; app validates collateral and acknowledges risk for first/changed leverage use.
4. User reviews and confirms the order.
5. Position detail continuously shows mark price, P&L, collateral, margin ratio, funding, liquidation estimate, and close/reduce/add-collateral actions if supported.
6. Risk notifications escalate as margin health changes. A liquidation status is never represented as a normal completed trade.

### 7.4 Move Account Cash to Trade

1. User selects Move money from Home/Trade; app defaults to Account Cash → Trade buying power.
2. User selects eligible asset/amount; app shows what the asset can trade and any conversion or settlement requirement.
3. User confirms; buying power is updated when available. No redundant internal transfer should be shown if the underlying account model already makes Account Cash directly tradeable.

## 8. States, Exceptions, and Risk Guardrails

| State | Required behavior |
| --- | --- |
| Market closed / halted | Disable new orders as required; clearly show status, venue/session explanation, and open-order treatment. |
| Price/data delayed | Mark data delayed, timestamp it, and block/confirm price-sensitive actions according to venue policy. |
| Partial fill | Show filled and remaining size, average fill price, fee, and cancellable remainder status. |
| Rejected order | Explain the reason in user language (insufficient funds, price band, eligibility, market state); release reserve when confirmed. |
| Insufficient margin | Prevent submission; identify required vs available collateral and available safe actions. |
| Margin risk | Persistent in-product and Home alert with current metric, threshold meaning, and action CTA; notification escalation follows risk policy. |
| Liquidation | Record transparent liquidation event, position outcome, fees, and support/disclosure route. |
| Instrument restriction | Stop affected actions, preserve read-only history/position servicing, and state settlement/close-only rules. |

## 9. Data and Disclosure Requirements

- Identify last, mark, index, bid/ask, or indicative price and timestamp; never present them as interchangeable.
- Charts state data source, market/session, and selected interval. Historical performance is not predictive.
- Instrument detail distinguishes tokenized reference exposure from direct ownership; explain issuer, underlying-reference, corporate-action, custody, and trading-hours treatment where relevant.
- Fees include trading, spread/price impact, funding, liquidation, conversion, and settlement fees whenever relevant and calculable.
- Perpetuals prominently disclose leverage/loss/liquidation and funding risk before first trade and within the order/position views.
- Product use is subject to availability and local eligibility; no “global access” claim should override product restrictions.

## 10. Launch Scope and Roadmap

### Launch (P0)

- Supported spot and perpetual markets, with actual product availability defined by partner/venue and legal approvals.
- Market discovery, watchlist, market detail, market/limit order tickets, orders/positions, portfolio and Activity integration.
- Trading permissions, risk acknowledgments, cost/margin/liquidation information, and transactional/risk notifications.

### Next (P1)

- Price alerts, richer market screeners, conditional orders, additional market categories/instruments, and downloadable history.
- More advanced charting and execution controls once data/venue quality meets product standards.

### Later (P2)

- Social trading: opt-in profiles, follow lists, transparent performance methodology, copy safeguards, and conflict disclosures.
- Strategy automation/APIs only with explicit account permission, rate limits, monitoring, and risk controls.

## 11. Success Measures

- Funded eligible users who reach market detail and place a first completed order.
- Order acceptance/fill/cancel/reject rates and time-to-status resolution.
- Rate of order amendments/cancellations after review, segmented by order type.
- Open-position risk events, support contacts, and liquidation rate; lower confusion is a success, not just higher volume.
- Trade-to-Earn/Account Cash reuse of realized proceeds and repeat active-trader retention.

## 12. Dependencies and Open Decisions

- Trading venues/providers, market universe, price/oracle/market-data feeds, execution and settlement model.
- Jurisdictional eligibility, KYC, appropriateness/risk permissions, tokenized-instrument legal disclosures, and trading hours.
- Margin model, leverage caps, liquidation engine, funding methodology, insurance/backstop policy, and incident operations.
- Fees, currency conversion, account-cash vs separate-collateral architecture, and order/position reporting data.

