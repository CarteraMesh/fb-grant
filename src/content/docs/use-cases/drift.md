---
title: Drift Protocol Integration
description: Securing Drift's high-frequency trading operations with Fireblocks MPC technology
---

## About Drift Protocol

[Drift](https://www.drift.trade/) Protocol is the largest open-sourced perpetual futures exchange built on Solana, the fastest L1 blockchain. Drift offers leverage trading and yield strategies through their [vault system](https://app.drift.trade/vaults/strategy-vaults).

For programmatic access, Drift provides a self-hosted API [Gateway](https://github.com/drift-labs/gateway) that serves as a web2 to web3 proxy. This allows traders to interact with the Drift V2 Protocol through simple REST endpoints. For example, creating leverage [orders](https://github.com/drift-labs/gateway?tab=readme-ov-file#place-orders) can be done with a standard HTTP request:

```bash
$ curl localhost:8080/v2/orders -X POST \
-H 'content-type: application/json' \
-d '{
    "orders": [
    {
        "marketIndex": 1,
        "marketType": "spot",
        "amount": -1.23,
        "price": 80.0,
        "postOnly": true,
        "orderType": "limit",
        "userOrderId": 101,
        "reduceOnly": false,
        "maxTs": 1707112301
    }
   ]
}'
```

This infrastructure is particularly valuable for [market makers](https://en.wikipedia.org/wiki/Market_maker) and high-frequency traders who require low-latency access to the protocol.

## Security Challenge & Fireblocks Integration

Currently, to sign Solana transactions through the Drift Gateway, private keys must be exposed in plain-text within the application environment. This creates significant security risks, especially for high-value trading operations.

```
┌─────────────────┐     ┌───────────────┐     ┌───────────────┐
│                 │     │               │     │               │
│  Market Maker   │────▶│ Drift Gateway │────▶│  Solana Node  │
│                 │     │               │     │               │
└─────────────────┘     └───────────────┘     └───────────────┘
                              │
                              │ Plain-text private key
                              ▼
                        🔴 SECURITY RISK
```

Our proposed solution integrates the Fireblocks SDK for Rust into the Drift Gateway codebase:

```
┌─────────────────┐     ┌───────────────┐     ┌───────────────┐
│                 │     │               │     │               │
│  Market Maker   │────▶│ Drift Gateway │────▶│  Solana Node  │
│                 │     │   + FB SDK    │     │               │
└─────────────────┘     └───────────────┘     └───────────────┘
                              │
                              │ Secure API call
                              ▼
                        ┌─────────────┐      ┌─────────────┐
                        │             │      │             │
                        │  Fireblocks │◀────▶│  Co-Signer  │
                        │     MPC     │      │  (AWS Nitro)│
                        │             │      │             │
                        └─────────────┘      └─────────────┘
                              │
                              │ Policy Engine
                              ▼
                        🟢 SECURE SIGNING
```

This integration will:

1. Replace direct private key handling with Fireblocks' [Solana program call](https://developers.fireblocks.com/reference/interact-with-solana-programs) REST API
2. Leverage Fireblocks' MPC (Multi-Party Computation) signing process to eliminate direct private key exposure
3. Enable robust policy controls for transaction approval, allowing organizations to implement multi-level authorization workflows

This approach provides institutional-grade security for Drift's high-frequency trading operations without compromising on performance.

## Implementation Benefits

- **Enhanced Security**: Elimination of private key exposure in application environments
- **Governance Controls**: Customizable policy engine for transaction approval
- **Operational Continuity**: Secure automation capabilities through AWS Nitro integration
- **Institutional Compliance**: Meets security requirements for regulated financial entities

## Further Reading

- [Drift Gateway Documentation](https://github.com/drift-labs/gateway)
- [Fireblocks SDK for Rust](https://github.com/CarteraMesh/fireblocks-sdk-rs)
- [Fireblocks Solana Integration Guide](https://developers.fireblocks.com/reference/interact-with-solana-programs)
