export const rules = [
    {
        name: "rename-import-useContractRead",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useContractRead",
        },
        transform: {
            replaceWith: "useReadContract",
        },
    },
    {
        name: "rename-import-useContractReads",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useContractReads",
        },
        transform: {
            replaceWith: "useReadContracts",
        },
    },
    {
        name: "rename-import-useContractWrite",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useContractWrite",
        },
        transform: {
            replaceWith: "useWriteContract",
        },
    },
    {
        name: "rename-import-useContractEvent",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useContractEvent",
        },
        transform: {
            replaceWith: "useWatchContractEvent",
        },
    },
    {
        name: "rename-import-useContractInfiniteReads",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useContractInfiniteReads",
        },
        transform: {
            replaceWith: "useInfiniteReadContracts",
        },
    },
    {
        name: "rename-import-useFeeData",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useFeeData",
        },
        transform: {
            replaceWith: "useEstimateFeesPerGas",
        },
    },
    {
        name: "rename-import-useSwitchNetwork",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useSwitchNetwork",
        },
        transform: {
            replaceWith: "useSwitchChain",
        },
    },
    {
        name: "rename-import-useWaitForTransaction",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useWaitForTransaction",
        },
        transform: {
            replaceWith: "useWaitForTransactionReceipt",
        },
    },
    {
        name: "rename-import-WagmiConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "WagmiConfig",
        },
        transform: {
            replaceWith: "WagmiProvider",
        },
    },
    {
        name: "rename-import-WagmiConfigProps",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "WagmiConfigProps",
        },
        transform: {
            replaceWith: "WagmiProviderProps",
        },
    },
    {
        name: "migrate-mainnet-import-source",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "mainnet",
        },
        transform: {
            replaceImportSource: "wagmi/chains",
        },
    },
    {
        name: "migrate-sepolia-import-source",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "sepolia",
        },
        transform: {
            replaceImportSource: "wagmi/chains",
        },
    },
    {
        name: "migrate-import-erc20ABI",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "erc20ABI",
        },
        transform: {
            replaceWith: "erc20Abi",
            replaceImportSource: "viem",
        },
    },
    {
        name: "migrate-import-MetaMaskConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/metaMask",
            imported: "MetaMaskConnector",
        },
        transform: {
            replaceWith: "injected",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "migrate-import-InjectedConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/injected",
            imported: "InjectedConnector",
        },
        transform: {
            replaceWith: "injected",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "migrate-import-CoinbaseWalletConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/coinbaseWallet",
            imported: "CoinbaseWalletConnector",
        },
        transform: {
            replaceWith: "coinbaseWallet",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "migrate-import-SafeConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/safe",
            imported: "SafeConnector",
        },
        transform: {
            replaceWith: "safe",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "migrate-import-WalletConnectConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/walletConnect",
            imported: "WalletConnectConnector",
        },
        transform: {
            replaceWith: "walletConnect",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "migrate-import-WalletConnectLegacyConnector",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/connectors/walletConnectLegacy",
            imported: "WalletConnectLegacyConnector",
        },
        transform: {
            replaceWith: "walletConnect",
            replaceImportSource: "wagmi/connectors",
        },
    },
    {
        name: "rename-call-useContractRead",
        match: {
            type: "CallExpression",
            callee: "useContractRead",
        },
        transform: {
            renameCallee: "useReadContract",
            objectKeyMap: {
                addressOrName: "address",
            },
        },
    },
    {
        name: "rename-call-useContractReads",
        match: {
            type: "CallExpression",
            callee: "useContractReads",
        },
        transform: {
            renameCallee: "useReadContracts",
            objectKeyMap: {
                addressOrName: "address",
            },
        },
    },
    {
        name: "rename-call-useContractWrite",
        match: {
            type: "CallExpression",
            callee: "useContractWrite",
        },
        transform: {
            renameCallee: "useWriteContract",
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from mutation hooks. Review useWriteContract usage and move contract request parameters to writeContract(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "rename-call-useContractEvent",
        match: {
            type: "CallExpression",
            callee: "useContractEvent",
        },
        transform: {
            renameCallee: "useWatchContractEvent",
            objectKeyMap: {
                addressOrName: "address",
            },
        },
    },
    {
        name: "rename-call-useContractInfiniteReads",
        match: {
            type: "CallExpression",
            callee: "useContractInfiniteReads",
        },
        transform: {
            renameCallee: "useInfiniteReadContracts",
            objectKeyMap: {
                addressOrName: "address",
            },
        },
    },
    {
        name: "rename-call-useFeeData",
        match: {
            type: "CallExpression",
            callee: "useFeeData",
        },
        transform: {
            renameCallee: "useEstimateFeesPerGas",
        },
    },
    {
        name: "rename-call-useSwitchNetwork",
        match: {
            type: "CallExpression",
            callee: "useSwitchNetwork",
        },
        transform: {
            renameCallee: "useSwitchChain",
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from mutation hooks. Review useSwitchChain usage and move chain selection arguments to switchChain(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "rename-call-useWaitForTransaction",
        match: {
            type: "CallExpression",
            callee: "useWaitForTransaction",
        },
        transform: {
            renameCallee: "useWaitForTransactionReceipt",
        },
    },
    {
        name: "rename-jsx-WagmiConfig",
        match: {
            type: "JSXIdentifier",
            name: "WagmiConfig",
        },
        transform: {
            replaceWith: "WagmiProvider",
        },
    },
    {
        name: "rename-identifier-WagmiConfig",
        match: {
            type: "Identifier",
            name: "WagmiConfig",
        },
        transform: {
            replaceWith: "WagmiProvider",
        },
    },
    {
        name: "rename-identifier-WagmiConfigProps",
        match: {
            type: "Identifier",
            name: "WagmiConfigProps",
        },
        transform: {
            replaceWith: "WagmiProviderProps",
        },
    },
    {
        name: "rename-identifier-erc20ABI",
        match: {
            type: "Identifier",
            name: "erc20ABI",
        },
        transform: {
            replaceWith: "erc20Abi",
        },
    },
    {
        name: "rename-object-key-contractInterface",
        match: {
            type: "ObjectProperty",
            key: "contractInterface",
        },
        when: {
            withinCallCallee: [
                "useContractRead",
                "useReadContract",
                "useContractReads",
                "useReadContracts",
                "useContractWrite",
                "useWriteContract",
                "useContractEvent",
                "useWatchContractEvent",
                "useContractInfiniteReads",
                "useInfiniteReadContracts",
                "usePrepareContractWrite",
                "useSimulateContract",
            ],
        },
        transform: {
            replaceKey: "abi",
        },
    },
    {
        name: "rename-object-key-addressOrName-read",
        match: {
            type: "ObjectProperty",
            key: "addressOrName",
        },
        when: {
            withinCallCallee: [
                "useContractRead",
                "useReadContract",
                "useContractReads",
                "useReadContracts",
            ],
        },
        transform: {
            replaceKey: "address",
        },
    },
    {
        name: "rename-object-key-addressOrName-write",
        match: {
            type: "ObjectProperty",
            key: "addressOrName",
        },
        when: {
            withinCallCallee: [
                "useContractWrite",
                "useWriteContract",
                "usePrepareContractWrite",
                "useSimulateContract",
            ],
        },
        transform: {
            replaceKey: "address",
        },
    },
    {
        name: "rename-object-key-addressOrName-event",
        match: {
            type: "ObjectProperty",
            key: "addressOrName",
        },
        when: {
            withinCallCallee: [
                "useContractEvent",
                "useWatchContractEvent",
                "useContractInfiniteReads",
                "useInfiniteReadContracts",
            ],
        },
        transform: {
            replaceKey: "address",
        },
    },
    {
        name: "migrate-new-MetaMaskConnector",
        match: {
            type: "NewExpression",
            callee: "MetaMaskConnector",
        },
        transform: {
            replaceWith: 'injected({ target: "metaMask" })',
            annotate: {
                severity: "warning",
                message:
                    "Review MetaMask connector options after migration since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "migrate-new-InjectedConnector",
        match: {
            type: "NewExpression",
            callee: "InjectedConnector",
        },
        transform: {
            renameCallee: "injected",
            convertNewToCall: true,
            preserveArguments: true,
            annotate: {
                severity: "warning",
                message:
                    "Review injected connector options after migration since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "migrate-new-CoinbaseWalletConnector",
        match: {
            type: "NewExpression",
            callee: "CoinbaseWalletConnector",
        },
        transform: {
            renameCallee: "coinbaseWallet",
            convertNewToCall: true,
            preserveArguments: true,
            annotate: {
                severity: "warning",
                message:
                    "Review coinbaseWallet connector options after migration since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "migrate-new-SafeConnector",
        match: {
            type: "NewExpression",
            callee: "SafeConnector",
        },
        transform: {
            renameCallee: "safe",
            convertNewToCall: true,
            preserveArguments: true,
            annotate: {
                severity: "warning",
                message:
                    "Review safe connector options after migration since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "migrate-new-WalletConnectConnector",
        match: {
            type: "NewExpression",
            callee: "WalletConnectConnector",
        },
        transform: {
            renameCallee: "walletConnect",
            convertNewToCall: true,
            preserveArguments: true,
            annotate: {
                severity: "warning",
                message:
                    "Review walletConnect connector options after migration since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "migrate-new-WalletConnectLegacyConnector",
        match: {
            type: "NewExpression",
            callee: "WalletConnectLegacyConnector",
        },
        transform: {
            renameCallee: "walletConnect",
            convertNewToCall: true,
            preserveArguments: true,
            annotate: {
                severity: "warning",
                message:
                    "Review walletConnect options after migrating from WalletConnectLegacyConnector since connector APIs changed in wagmi v2.",
            },
            markForReview: true,
        },
    },
    {
        name: "review-configureChains-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "configureChains",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed configureChains. Replace with createConfig({ chains, transports }) and migrate publicClient/webSocketPublicClient usage.",
            },
            markForReview: true,
        },
    },
    {
        name: "review-configureChains-call",
        match: {
            type: "CallExpression",
            callee: "configureChains",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed configureChains. Convert to createConfig({ chains, transports }) and inline chains/transports directly.",
            },
            markForReview: true,
        },
    },
    {
        name: "review-usePrepareContractWrite-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "usePrepareContractWrite",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed usePrepareContractWrite. Replace with useSimulateContract + useWriteContract.",
            },
            markForReview: true,
        },
    },
    {
        name: "review-usePrepareContractWrite-call",
        match: {
            type: "CallExpression",
            callee: "usePrepareContractWrite",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed usePrepareContractWrite. Recommended migration: const { data } = useSimulateContract(...); const { writeContract } = useWriteContract(); then writeContract(data!.request).",
            },
            markForReview: true,
        },
    },
    {
        name: "review-usePrepareSendTransaction-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "usePrepareSendTransaction",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed usePrepareSendTransaction. Replace with useEstimateGas + useSendTransaction.",
            },
            markForReview: true,
        },
    },
    {
        name: "review-usePrepareSendTransaction-call",
        match: {
            type: "CallExpression",
            callee: "usePrepareSendTransaction",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed usePrepareSendTransaction. Recommended migration: const { data } = useEstimateGas(...); const { sendTransaction } = useSendTransaction(); then sendTransaction({ gas: data, ... }).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useNetwork-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useNetwork",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed useNetwork. For connected chain use useAccount(); for configured chains use useConfig().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useNetwork-call",
        match: {
            type: "CallExpression",
            callee: "useNetwork",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed useNetwork. Migrate based on actual usage: chain -> useAccount(), chains -> useConfig().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useAccount-callbacks",
        match: {
            type: "ObjectProperty",
            key: ["onConnect", "onDisconnect"],
        },
        when: {
            withinCallCallee: "useAccount",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed onConnect/onDisconnect from useAccount. Migrate these callbacks to useAccountEffect().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useWebSocketPublicClient-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useWebSocketPublicClient",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed useWebSocketPublicClient. Use Viem webSocket transport in createConfig and access the client via useClient() or usePublicClient().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useWebSocketPublicClient-call",
        match: {
            type: "CallExpression",
            callee: "useWebSocketPublicClient",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed useWebSocketPublicClient. Migrate to createConfig({ transports }) with Viem webSocket() and useClient()/usePublicClient().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-query-options-on-hooks",
        match: {
            type: "CallExpression",
            callee: [
                "useContractRead",
                "useReadContract",
                "useContractReads",
                "useReadContracts",
                "useBalance",
                "useBlock",
                "useBlockNumber",
                "useFeeData",
                "useEstimateFeesPerGas",
                "useEnsAddress",
                "useEnsAvatar",
                "useEnsResolver",
                "useEstimateGas",
                "useWaitForTransaction",
                "useWaitForTransactionReceipt",
                "useInfiniteReadContracts",
            ],
        },
        when: {
            firstArgumentType: "ObjectExpression",
            hasAnyTopLevelObjectKeys: [
                "enabled",
                "staleTime",
                "gcTime",
                "refetchInterval",
                "refetchIntervalInBackground",
                "refetchOnMount",
                "refetchOnReconnect",
                "refetchOnWindowFocus",
                "retry",
                "retryDelay",
                "networkMode",
            ],
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 moved TanStack Query options under the query property. Review top-level query options and nest them under query.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-watch-property-on-hooks",
        match: {
            type: "ObjectProperty",
            key: "watch",
        },
        when: {
            withinCallCallee: [
                "useContractRead",
                "useReadContract",
                "useContractReads",
                "useReadContracts",
                "useBalance",
                "useFeeData",
                "useEstimateFeesPerGas",
                "useEnsAddress",
                "useEnsAvatar",
                "useEnsResolver",
                "useInfiniteReadContracts",
                "useWaitForTransaction",
                "useWaitForTransactionReceipt",
                "useToken",
            ],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed watch from most hooks except useBlock and useBlockNumber. Replace with useBlock/useBlockNumber + effect/invalidateQueries/refetch patterns where needed.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-suspense-property-on-hooks",
        match: {
            type: "ObjectProperty",
            key: "suspense",
        },
        when: {
            withinCallCallee: [
                "useContractRead",
                "useReadContract",
                "useContractReads",
                "useReadContracts",
                "useBalance",
                "useFeeData",
                "useEstimateFeesPerGas",
                "useEnsAddress",
                "useEnsAvatar",
                "useEnsResolver",
                "useInfiniteReadContracts",
                "useWaitForTransaction",
                "useWaitForTransactionReceipt",
                "useToken",
            ],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed suspense support from hooks. Review migration to useSuspenseQuery with wagmi/query query options.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useBalance-token",
        match: {
            type: "ObjectProperty",
            key: "token",
        },
        when: {
            withinCallCallee: "useBalance",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 deprecates useBalance({ token }). For ERC-20 balances, migrate to useReadContracts + erc20Abi.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useBalance-unit",
        match: {
            type: "ObjectProperty",
            key: "unit",
        },
        when: {
            withinCallCallee: "useBalance",
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 deprecates useBalance({ unit }). Format values with viem formatUnits instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useToken-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "useToken",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 deprecates or removes useToken. Replace with useReadContracts + erc20Abi.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useToken-call",
        match: {
            type: "CallExpression",
            callee: "useToken",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 deprecates or removes useToken. Replace with useReadContracts for decimals, name, symbol, and totalSupply reads.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useEstimateFeesPerGas-formatUnits",
        match: {
            type: "ObjectProperty",
            key: "formatUnits",
        },
        when: {
            withinCallCallee: ["useFeeData", "useEstimateFeesPerGas"],
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 deprecated formatUnits parameters and related formatted return values for useEstimateFeesPerGas. Use viem formatUnits() instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useToken-formatUnits",
        match: {
            type: "ObjectProperty",
            key: "formatUnits",
        },
        when: {
            withinCallCallee: "useToken",
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 deprecated formatUnits parameters and related formatted return values for useToken. Use viem formatUnits() instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-createConfig-legacy-keys",
        match: {
            type: "CallExpression",
            callee: "createConfig",
        },
        when: {
            firstArgumentType: "ObjectExpression",
            hasAnyTopLevelObjectKeys: [
                "autoConnect",
                "publicClient",
                "webSocketPublicClient",
                "logger",
            ],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed createConfig parameters. Review autoConnect, publicClient, webSocketPublicClient, and logger, then migrate to transports, client, or WagmiProvider reconnectOnMount as needed.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-ens-normalization",
        match: {
            type: "CallExpression",
            callee: ["useEnsAddress", "useEnsAvatar", "useEnsResolver"],
        },
        when: {
            firstArgumentType: "ObjectExpression",
            hasAnyTopLevelObjectKeys: ["name"],
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 removed internal ENS normalization. Review whether name should be normalized via viem/ens normalize().",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-paginatedIndexesConfig",
        match: {
            type: "ObjectProperty",
            key: "paginatedIndexesConfig",
        },
        when: {
            withinCallCallee: ["useContractInfiniteReads", "useInfiniteReadContracts"],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed paginatedIndexesConfig from useInfiniteReadContracts. Migrate to initialPageParam/getNextPageParam and fetchNextPage/fetchPreviousPage.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useWriteContract",
        match: {
            type: "CallExpression",
            callee: ["useContractWrite", "useWriteContract"],
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useWriteContract. Move contract request parameters to writeContract(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useSendTransaction",
        match: {
            type: "CallExpression",
            callee: "useSendTransaction",
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useSendTransaction. Move transaction parameters to sendTransaction(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useSignMessage",
        match: {
            type: "CallExpression",
            callee: "useSignMessage",
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useSignMessage. Move message parameters to signMessage(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useSignTypedData",
        match: {
            type: "CallExpression",
            callee: "useSignTypedData",
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useSignTypedData. Move typed data parameters to signTypedData(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useDeployContract",
        match: {
            type: "CallExpression",
            callee: "useDeployContract",
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useDeployContract. Move deployment parameters to deployContract(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-mutation-hook-setup-args-useSwitchChain",
        match: {
            type: "CallExpression",
            callee: ["useSwitchNetwork", "useSwitchChain"],
        },
        when: {
            firstArgumentType: "ObjectExpression",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed setup arguments from useSwitchChain. Move chain selection arguments to switchChain(...).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useSendTransaction-data-hash",
        match: {
            type: "MemberExpression",
            property: "hash",
        },
        when: {
            objectChainIncludes: ["data"],
            withinHookCall: ["useSendTransaction"],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useSendTransaction return value. data is now the transaction hash directly. Replace data?.hash with data.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useWriteContract-data-hash",
        match: {
            type: "MemberExpression",
            property: "hash",
        },
        when: {
            objectChainIncludes: ["data"],
            withinHookCall: ["useWriteContract", "useContractWrite"],
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useWriteContract return value. data is now the transaction hash directly. Replace data?.hash with data.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useAccount-destructure",
        match: {
            type: "ObjectPattern",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useAccount",
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 changed useAccount return shape. Review destructured fields to ensure compatibility with the new API.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useConnect-destructure",
        match: {
            type: "ObjectPattern",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useConnect",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useConnect return shape. Review destructured fields such as account, chain, connector, accounts, chainId, error, and status.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useDisconnect-destructure",
        match: {
            type: "ObjectPattern",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useDisconnect",
        },
        transform: {
            annotate: {
                severity: "info",
                message:
                    "wagmi v2 changed useDisconnect return shape. Review destructured fields to ensure compatibility.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useConnect-account-field",
        match: {
            type: "ObjectProperty",
            key: "account",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useConnect",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useConnect return type. account is no longer returned in the same shape. Review migration to accounts and chainId.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useConnect-chain-field",
        match: {
            type: "ObjectProperty",
            key: "chain",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useConnect",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useConnect return type. chain is no longer returned in the same shape. Review migration to chainId.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-useConnect-connector-field",
        match: {
            type: "ObjectProperty",
            key: "connector",
        },
        when: {
            parentIsVariableDeclaratorInitCall: "useConnect",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 changed useConnect return type. connector is no longer returned in the same shape from the mutation result.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-wagmi-provider-alchemy-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/providers/alchemy",
            imported: "alchemyProvider",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed wagmi/providers/alchemy. Replace with Viem transports like http(...) or webSocket(...) and pass them via createConfig({ transports }).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-wagmi-provider-public-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/providers/public",
            imported: "publicProvider",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed wagmi/providers/public. Replace with Viem transports like http(...) or webSocket(...) and pass them via createConfig({ transports }).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-wagmi-provider-infura-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/providers/infura",
            imported: "infuraProvider",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed wagmi/providers/infura. Replace with Viem transports like http(...) or webSocket(...) and pass them via createConfig({ transports }).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-wagmi-provider-jsonRpc-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi/providers/jsonRpc",
            imported: "jsonRpcProvider",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed wagmi/providers/jsonRpc. Replace with Viem transports like http(...) or webSocket(...) and pass them via createConfig({ transports }).",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-connector-member",
        match: {
            type: "MemberExpression",
            property: "connector",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.connector. Use config.state.connections.get(config.state.current)?.connector instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-data-member",
        match: {
            type: "MemberExpression",
            property: "data",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.data. Use config.state.connections.get(config.state.current) instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-error-member",
        match: {
            type: "MemberExpression",
            property: "error",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.error. Review surrounding logic and remove or replace this usage.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-lastUsedChainId-member",
        match: {
            type: "MemberExpression",
            property: "lastUsedChainId",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.lastUsedChainId. Use config.state.connections.get(config.state.current)?.chainId instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-publicClient-member",
        match: {
            type: "MemberExpression",
            property: "publicClient",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.publicClient. Use config.getClient() or getPublicClient(...) instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-status-member",
        match: {
            type: "MemberExpression",
            property: "status",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.status. Use config.state.status instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-webSocketClient-member",
        match: {
            type: "MemberExpression",
            property: "webSocketClient",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.webSocketClient. Use config.getClient() or getPublicClient(...) instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-clearState-member",
        match: {
            type: "MemberExpression",
            property: "clearState",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.clearState. Review surrounding logic and remove or replace this usage.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-setConnectors-member",
        match: {
            type: "MemberExpression",
            property: "setConnectors",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 renamed config.setConnectors. Use config._internal.setConnectors instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-setLastUsedConnector-member",
        match: {
            type: "MemberExpression",
            property: "setLastUsedConnector",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.setLastUsedConnector. Use config.storage?.setItem('recentConnectorId', connectorId) instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-config-autoConnect-member",
        match: {
            type: "MemberExpression",
            property: "autoConnect",
        },
        when: {
            objectName: "config",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed config.autoConnect(). Use reconnect action, useReconnect, or WagmiProvider reconnectOnMount instead.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-getConfig-import",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "getConfig",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed getConfig. Pass config explicitly to actions instead of relying on a global config.",
            },
            markForReview: true,
        },
    },
    {
        name: "detect-getConfig-call",
        match: {
            type: "CallExpression",
            callee: "getConfig",
        },
        transform: {
            annotate: {
                severity: "warning",
                message:
                    "wagmi v2 removed getConfig. Pass config explicitly to actions instead of relying on a global config.",
            },
            markForReview: true,
        },
    },
    {
        name: "rename-import-UseAccountConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseAccountConfig",
        },
        transform: {
            replaceWith: "UseAccountParameters",
        },
    },
    {
        name: "rename-identifier-UseAccountConfig",
        match: {
            type: "Identifier",
            name: "UseAccountConfig",
        },
        transform: {
            replaceWith: "UseAccountParameters",
        },
    },
    {
        name: "rename-import-UseAccountResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseAccountResult",
        },
        transform: {
            replaceWith: "UseAccountReturnType",
        },
    },
    {
        name: "rename-identifier-UseAccountResult",
        match: {
            type: "Identifier",
            name: "UseAccountResult",
        },
        transform: {
            replaceWith: "UseAccountReturnType",
        },
    },
    {
        name: "rename-import-UseBalanceConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseBalanceConfig",
        },
        transform: {
            replaceWith: "UseBalanceParameters",
        },
    },
    {
        name: "rename-identifier-UseBalanceConfig",
        match: {
            type: "Identifier",
            name: "UseBalanceConfig",
        },
        transform: {
            replaceWith: "UseBalanceParameters",
        },
    },
    {
        name: "rename-import-UseBalanceResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseBalanceResult",
        },
        transform: {
            replaceWith: "UseBalanceReturnType",
        },
    },
    {
        name: "rename-identifier-UseBalanceResult",
        match: {
            type: "Identifier",
            name: "UseBalanceResult",
        },
        transform: {
            replaceWith: "UseBalanceReturnType",
        },
    },
    {
        name: "rename-import-UseConnectConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseConnectConfig",
        },
        transform: {
            replaceWith: "UseConnectParameters",
        },
    },
    {
        name: "rename-identifier-UseConnectConfig",
        match: {
            type: "Identifier",
            name: "UseConnectConfig",
        },
        transform: {
            replaceWith: "UseConnectParameters",
        },
    },
    {
        name: "rename-import-UseConnectResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseConnectResult",
        },
        transform: {
            replaceWith: "UseConnectReturnType",
        },
    },
    {
        name: "rename-identifier-UseConnectResult",
        match: {
            type: "Identifier",
            name: "UseConnectResult",
        },
        transform: {
            replaceWith: "UseConnectReturnType",
        },
    },
    {
        name: "rename-import-UseDisconnectConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseDisconnectConfig",
        },
        transform: {
            replaceWith: "UseDisconnectParameters",
        },
    },
    {
        name: "rename-identifier-UseDisconnectConfig",
        match: {
            type: "Identifier",
            name: "UseDisconnectConfig",
        },
        transform: {
            replaceWith: "UseDisconnectParameters",
        },
    },
    {
        name: "rename-import-UseDisconnectResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseDisconnectResult",
        },
        transform: {
            replaceWith: "UseDisconnectReturnType",
        },
    },
    {
        name: "rename-identifier-UseDisconnectResult",
        match: {
            type: "Identifier",
            name: "UseDisconnectResult",
        },
        transform: {
            replaceWith: "UseDisconnectReturnType",
        },
    },
    {
        name: "rename-import-UseContractReadConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractReadConfig",
        },
        transform: {
            replaceWith: "UseReadContractParameters",
        },
    },
    {
        name: "rename-identifier-UseContractReadConfig",
        match: {
            type: "Identifier",
            name: "UseContractReadConfig",
        },
        transform: {
            replaceWith: "UseReadContractParameters",
        },
    },
    {
        name: "rename-import-UseContractReadResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractReadResult",
        },
        transform: {
            replaceWith: "UseReadContractReturnType",
        },
    },
    {
        name: "rename-identifier-UseContractReadResult",
        match: {
            type: "Identifier",
            name: "UseContractReadResult",
        },
        transform: {
            replaceWith: "UseReadContractReturnType",
        },
    },
    {
        name: "rename-import-UseContractReadsConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractReadsConfig",
        },
        transform: {
            replaceWith: "UseReadContractsParameters",
        },
    },
    {
        name: "rename-identifier-UseContractReadsConfig",
        match: {
            type: "Identifier",
            name: "UseContractReadsConfig",
        },
        transform: {
            replaceWith: "UseReadContractsParameters",
        },
    },
    {
        name: "rename-import-UseContractReadsResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractReadsResult",
        },
        transform: {
            replaceWith: "UseReadContractsReturnType",
        },
    },
    {
        name: "rename-identifier-UseContractReadsResult",
        match: {
            type: "Identifier",
            name: "UseContractReadsResult",
        },
        transform: {
            replaceWith: "UseReadContractsReturnType",
        },
    },
    {
        name: "rename-import-UseContractWriteConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractWriteConfig",
        },
        transform: {
            replaceWith: "UseWriteContractParameters",
        },
    },
    {
        name: "rename-identifier-UseContractWriteConfig",
        match: {
            type: "Identifier",
            name: "UseContractWriteConfig",
        },
        transform: {
            replaceWith: "UseWriteContractParameters",
        },
    },
    {
        name: "rename-import-UseContractWriteResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseContractWriteResult",
        },
        transform: {
            replaceWith: "UseWriteContractReturnType",
        },
    },
    {
        name: "rename-identifier-UseContractWriteResult",
        match: {
            type: "Identifier",
            name: "UseContractWriteResult",
        },
        transform: {
            replaceWith: "UseWriteContractReturnType",
        },
    },
    {
        name: "rename-import-UseSwitchNetworkConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseSwitchNetworkConfig",
        },
        transform: {
            replaceWith: "UseSwitchChainParameters",
        },
    },
    {
        name: "rename-identifier-UseSwitchNetworkConfig",
        match: {
            type: "Identifier",
            name: "UseSwitchNetworkConfig",
        },
        transform: {
            replaceWith: "UseSwitchChainParameters",
        },
    },
    {
        name: "rename-import-UseSwitchNetworkResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseSwitchNetworkResult",
        },
        transform: {
            replaceWith: "UseSwitchChainReturnType",
        },
    },
    {
        name: "rename-identifier-UseSwitchNetworkResult",
        match: {
            type: "Identifier",
            name: "UseSwitchNetworkResult",
        },
        transform: {
            replaceWith: "UseSwitchChainReturnType",
        },
    },
    {
        name: "rename-import-UseWaitForTransactionConfig",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseWaitForTransactionConfig",
        },
        transform: {
            replaceWith: "UseWaitForTransactionReceiptParameters",
        },
    },
    {
        name: "rename-identifier-UseWaitForTransactionConfig",
        match: {
            type: "Identifier",
            name: "UseWaitForTransactionConfig",
        },
        transform: {
            replaceWith: "UseWaitForTransactionReceiptParameters",
        },
    },
    {
        name: "rename-import-UseWaitForTransactionResult",
        match: {
            type: "ImportSpecifier",
            source: "wagmi",
            imported: "UseWaitForTransactionResult",
        },
        transform: {
            replaceWith: "UseWaitForTransactionReceiptReturnType",
        },
    },
    {
        name: "rename-identifier-UseWaitForTransactionResult",
        match: {
            type: "Identifier",
            name: "UseWaitForTransactionResult",
        },
        transform: {
            replaceWith: "UseWaitForTransactionReceiptReturnType",
        },
    },
] as const;