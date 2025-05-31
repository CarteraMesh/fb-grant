---
title: Validator Security Solution
description: Securing Solana validator stake operations with Fireblocks MPC technology
---

## Solana Validator Operations

Solana is a high-performance proof-of-stake blockchain where [validators](https://solana.com/validators) secure the network by staking SOL as collateral. Validators are responsible for processing transactions and maintaining consensus across the network.

Managing validator stake requires the use of the Solana [CLI](https://docs.anza.xyz/cli/install) utility. Critical operations such as:
- Reward distribution
- Stake deposits and withdrawals
- Validator commission adjustments
- Delegation management

All of these operations are executed via command-line transactions that require cryptographic signing.

## Current Signing Challenges

Solana's CLI currently offers two primary modes for transaction signing:

* **Plaintext private key file**: Simple but highly insecure, as the private key is stored unencrypted on disk
* **Hardware wallet integration**: Using connected devices such as [Ledger](https://www.ledger.com/) for improved security

While hardware wallets provide significantly better security than plaintext keys, they present operational challenges:
- Physical connection requirement limits automation capabilities
- Manual approval for each transaction creates operational bottlenecks
- Limited support for institutional multi-signature workflows
- Difficult to integrate with automated infrastructure management

## Fireblocks Integration Solution

Solana has a [remote wallet](https://docs.rs/solana-remote-wallet/2.2.15/solana_remote_wallet/remote_wallet/trait.RemoteWallet.html) library that enables the CLI to interact with external signing devices. Our proposal involves:

1. Developing a `FireblocksWallet` implementation for the Solana remote wallet library
2. Enabling the Solana CLI to seamlessly use Fireblocks' API for MPC-based transaction signing
3. Leveraging Fireblocks' policy engine to implement robust approval workflows for stake operations

This integration provides several key advantages:

- **Elimination of private key exposure** in validator infrastructure
- **Automated yet secure operations** through API-based signing
- **Customizable approval policies** for different stake operation types
- **Multi-party authorization** for high-value transactions
- **Audit trails** for all signing operations

## Implementation Architecture

The implementation will consist of:

1. A Rust-based `FireblocksWallet` adapter that implements the Solana `RemoteWallet` trait
2. Integration with the Fireblocks SDK for Rust to handle API communication
3. Configuration options for policy management and transaction routing
4. Documentation and examples for validator operators

## Further Reading

- [Solana Staking Documentation](https://docs.solana.com/staking)
- [Validator Performance Metrics](https://www.validators.app/)
- [Fireblocks SDK for Rust](https://github.com/CarteraMesh/fireblocks-sdk-rs)
- [Solana Remote Wallet Specification](https://docs.rs/solana-remote-wallet/2.2.15/solana_remote_wallet/remote_wallet/trait.RemoteWallet.html)
- [RemoteWallet](https://crates.io/crates/solana-remote-wallet)
