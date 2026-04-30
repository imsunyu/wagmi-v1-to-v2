# Wagmi v1 to v2 Codemod

Automated, safe, and review-friendly migration from wagmi v1 to wagmi v2.

## Background

wagmi v2 introduced major API changes compared to v1. These changes include:

- hook renames and removals
- import source changes
- connector API changes
- configuration API changes
- return type and behavior changes

Migrating a real-world wagmi v1 codebase to v2 manually is time-consuming and error-prone.  
This codemod is designed to automate the safe parts of the migration while clearly surfacing cases that require manual review.

---

## What This Codemod Does

This codemod performs a best-effort migration from wagmi v1 to v2 using a rule-driven transformation set.

### Automatic Migrations

#### Import Renames

- `useContractRead` → `useReadContract`
- `useContractReads` → `useReadContracts`
- `useContractWrite` → `useWriteContract`
- `useContractEvent` → `useWatchContractEvent`
- `useContractInfiniteReads` → `useInfiniteReadContracts`
- `useFeeData` → `useEstimateFeesPerGas`
- `useSwitchNetwork` → `useSwitchChain`
- `useWaitForTransaction` → `useWaitForTransactionReceipt`
- `WagmiConfig` → `WagmiProvider`
- `WagmiConfigProps` → `WagmiProviderProps`

#### Import Source Changes

- `mainnet` and `sepolia` move from `wagmi` to `wagmi/chains`
- `erc20ABI` becomes `erc20Abi` and moves to `viem`
- legacy connector imports are migrated to `wagmi/connectors`

#### Hook Call Renames

- `useContractRead()` → `useReadContract()`
- `useContractReads()` → `useReadContracts()`
- `useContractWrite()` → `useWriteContract()`
- `useContractEvent()` → `useWatchContractEvent()`
- `useContractInfiniteReads()` → `useInfiniteReadContracts()`
- `useFeeData()` → `useEstimateFeesPerGas()`
- `useSwitchNetwork()` → `useSwitchChain()`
- `useWaitForTransaction()` → `useWaitForTransactionReceipt()`

#### Object Key Migrations

- `addressOrName` → `address`
- `contractInterface` → `abi`

#### Connector Migrations

- `new MetaMaskConnector()` → `injected({ target: "metaMask" })`
- `new InjectedConnector()` → `injected()`
- `new CoinbaseWalletConnector()` → `coinbaseWallet()`
- `new SafeConnector()` → `safe()`
- `new WalletConnectConnector()` → `walletConnect()`
- `new WalletConnectLegacyConnector()` → `walletConnect()`

#### Identifier and JSX Renames

- `WagmiConfig` → `WagmiProvider`
- `WagmiConfigProps` → `WagmiProviderProps`
- `erc20ABI` → `erc20Abi`
- multiple wagmi v1 config and result type names are updated to wagmi v2 equivalents

---

## Review Annotations

Some wagmi v2 changes cannot be migrated safely with a fully automatic rewrite.  
For these cases, the codemod adds review annotations instead of making risky silent changes.

Examples include:

- removed hooks such as `usePrepareContractWrite` and `usePrepareSendTransaction`
- removed APIs such as `configureChains`, `useNetwork`, `useWebSocketPublicClient`, and `getConfig`
- mutation hook setup argument changes
- return value shape changes such as `data?.hash`
- removed options such as `watch` and `suspense`
- `useBalance({ token })` and `useToken()` migration guidance
- `createConfig` legacy key review
- connector migration review notes
- destructuring and return-shape review for `useAccount`, `useConnect`, and `useDisconnect`

### Example Annotation

```ts
/* WARNING: wagmi v2 removed setup arguments from mutation hooks.
   Review useWriteContract usage and move contract request parameters to writeContract(...). */
```

---

## Example

### Before

```ts
import { useContractRead } from "wagmi";

useContractRead({
  addressOrName,
  contractInterface,
});
```

### After

```ts
import { useReadContract } from "wagmi";

useReadContract({
  address,
  abi,
});
```

### Example with Review Annotation

```ts
/* WARNING: wagmi v2 removed setup arguments from mutation hooks.
   Review useWriteContract usage and move contract request parameters to writeContract(...). */

useWriteContract({
  address,
  abi,
  functionName: "transfer",
});
```

The codemod intentionally adds comments for cases that require manual review instead of performing unsafe automatic rewrites.

---

## Additional Annotated Cases

### ENS Behavior Changes

- `useEnsAddress`, `useEnsAvatar`, and `useEnsResolver` no longer perform internal ENS normalization
- ENS names may require explicit normalization using viem utilities

### TanStack Query Option Changes

Options such as the following are no longer top-level:

- `enabled`
- `staleTime`
- `gcTime`
- `refetchInterval`

These options must now be nested under a `query` property.

### Pagination API Changes

- `paginatedIndexesConfig` is removed from `useInfiniteReadContracts`
- migrate to `initialPageParam` and pagination helpers such as `getNextPageParam`

### Mutation Hook API Changes

Setup arguments are removed from:

- `useWriteContract`
- `useSendTransaction`
- `useSignMessage`
- `useSignTypedData`
- `useDeployContract`
- `useSwitchChain`

Parameters must be passed when the returned action is invoked.

### Transaction Result Shape Changes

Affects:

- `useSendTransaction`
- `useWriteContract`

`data` is now the transaction hash directly instead of `{ hash }`.

### Account and Connection Return Shape Changes

Destructuring from the following requires review:

- `useAccount`
- `useConnect`
- `useDisconnect`

Fields such as `account`, `chain`, and `connector` require manual validation.

### wagmi Provider Removals

Removed import paths:

- `wagmi/providers/alchemy`
- `wagmi/providers/public`
- `wagmi/providers/infura`
- `wagmi/providers/jsonRpc`

Developers should migrate to Viem transports via `createConfig`.

### Config API Changes

Removed or changed properties on config include:

- `connector`
- `data`
- `error`
- `lastUsedChainId`
- `publicClient`
- `status`
- `webSocketClient`
- `clearState`
- `setConnectors`
- `setLastUsedConnector`
- `autoConnect`

---

## Design Philosophy

This codemod is a best-effort migration assistant, not a compiler-grade semantic rewrite.

- safe and mechanical changes are automated
- risky or ambiguous changes are surfaced for review
- developer intent is never guessed

This approach prioritizes correctness, stability, and clarity over unsafe full automation.

---

## How to Use

```bash
npx codemod@latest workflow run -w workflow.yaml --target <your-project>
```

### Example

```bash
npx codemod@latest workflow run -w workflow.yaml --target .
```

Running the codemod on a Git-tracked project is recommended so changes can be reviewed safely.

---

## Scope and Limitations

- covers the majority of real-world wagmi v1 to v2 migration patterns
- focuses on safe and deterministic transformations
- surfaces risky changes via explicit annotations
- does not attempt unsafe semantic rewrites
- does not guarantee zero manual follow-up

This codemod is a migration assistant, not a one-click upgrade tool.

---

## Summary

This project provides a rule-driven wagmi v1 to v2 codemod.  
It automates repetitive migration work, clearly surfaces risky changes, and is designed for real-world production codebases.

The goal is to significantly reduce migration effort while preserving correctness and developer control.