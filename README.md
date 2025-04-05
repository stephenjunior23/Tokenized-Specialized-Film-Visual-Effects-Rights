# Tokenized Specialized Film Visual Effects Rights

This blockchain platform revolutionizes visual effects (VFX) asset management in film production by tokenizing digital effects elements, establishing verifiable ownership, and creating an efficient marketplace for licensing and reuse. The system provides transparent tracking of VFX assets while ensuring proper compensation for creators.

## System Overview

The Tokenized Specialized Film Visual Effects Rights platform consists of four core smart contracts:

1. **Studio Verification Contract**: Validates authorized VFX production entities
2. **Asset Registration Contract**: Documents and tokenizes digital effects elements
3. **Usage Licensing Contract**: Manages permissions for VFX assets across productions
4. **Revenue Sharing Contract**: Automates payment distribution for effects reuse

## Getting Started

### Prerequisites

- Node.js (v16.0+)
- Blockchain development environment (Truffle/Hardhat)
- Web3 library
- IPFS integration for metadata storage
- Digital wallet (MetaMask or similar)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/tokenized-vfx-rights.git
   cd tokenized-vfx-rights
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Compile smart contracts
   ```
   npx hardhat compile
   ```

4. Deploy to test network
   ```
   npx hardhat run scripts/deploy.js --network testnet
   ```

## Smart Contract Architecture

### Studio Verification Contract
Establishes a decentralized registry of verified VFX studios, individual artists, and production companies. Validates credentials, portfolio history, and industry reputation to create a trusted network of content creators and users.

### Asset Registration Contract
Creates non-fungible tokens (NFTs) representing unique visual effects assets including 3D models, particle systems, digital environments, character rigs, and procedural effects. Each token contains comprehensive metadata about the asset's technical specifications, usage rights, and provenance.

### Usage Licensing Contract
Manages permissions for utilizing VFX assets across different productions with customizable licensing terms. Supports various usage scenarios including single production, time-limited use, modification rights, and exclusivity periods.

### Revenue Sharing Contract
Automates payment distribution to rights holders based on negotiated terms when assets are licensed or reused. Supports complex revenue structures including royalties, one-time payments, and usage-based compensation.

## Usage Examples

### Registering a VFX Asset
```javascript
const assetRegistry = await AssetRegistrationContract.deployed();
await assetRegistry.registerAsset(
  "Quantum Portal Effect",
  "Photorealistic energy vortex with procedural animation",
  "https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/asset.json",
  ["particle system", "energy effect", "sci-fi"],
  "STUDIO-QUANTUM-VFX",
  "CC-BY-NC" // license type
);
```

### Creating a Licensing Agreement
```javascript
const usageLicensing = await UsageLicensingContract.deployed();
await usageLicensing.createLicense(
  "ASSET-1234", // asset ID
  "STUDIO-MARVEL-5678", // licensee ID
  1714924800, // start timestamp (Unix format)
  1746460800, // end timestamp (Unix format)
  "single-film",
  "Exclusive use in 'Cosmic Odyssey' film production",
  45000 // license fee in contract currency
);
```

## Features

- **Verifiable Ownership**: Establishes clear provenance for digital effects assets
- **Streamlined Licensing**: Simplifies the process of securing usage rights
- **Transparent Attribution**: Maintains clear record of asset creation and modification
- **Automated Compensation**: Ensures proper payment for asset utilization
- **Reuse Marketplace**: Creates efficient ecosystem for effects repurposing
- **Industry Standards**: Supports common VFX workflow integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact: support@tokenizedvfx.org
