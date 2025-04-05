import { describe, it, expect, beforeEach } from "vitest"

// Mock implementation for testing Clarity contracts
// In a real environment, you would use a Clarity testing framework

// Mock state
let state = {
  admin: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  verifiedStudios: {},
}

// Mock contract functions
const mockContract = {
  isAdmin: () => state.admin === "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  verifyStudio: (studioAddress) => {
    if (state.admin !== "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM") {
      return { type: "err", value: 100 } // ERR-NOT-AUTHORIZED
    }
    if (state.verifiedStudios[studioAddress]) {
      return { type: "err", value: 101 } // ERR-ALREADY-VERIFIED
    }
    state.verifiedStudios[studioAddress] = true
    return { type: "ok", value: true }
  },
  revokeVerification: (studioAddress) => {
    if (state.admin !== "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM") {
      return { type: "err", value: 100 } // ERR-NOT-AUTHORIZED
    }
    if (!state.verifiedStudios[studioAddress]) {
      return { type: "err", value: 102 } // ERR-NOT-VERIFIED
    }
    delete state.verifiedStudios[studioAddress]
    return { type: "ok", value: true }
  },
  isVerified: (studioAddress) => {
    return !!state.verifiedStudios[studioAddress]
  },
  transferAdmin: (newAdmin) => {
    if (state.admin !== "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM") {
      return { type: "err", value: 100 } // ERR-NOT-AUTHORIZED
    }
    state.admin = newAdmin
    return { type: "ok", value: true }
  },
}

describe("Studio Verification Contract", () => {
  beforeEach(() => {
    // Reset state before each test
    state = {
      admin: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      verifiedStudios: {},
    }
  })
  
  it("should verify a studio successfully", () => {
    const studioAddress = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    const result = mockContract.verifyStudio(studioAddress)
    expect(result).toEqual({ type: "ok", value: true })
    expect(mockContract.isVerified(studioAddress)).toBe(true)
  })
  
  it("should fail to verify an already verified studio", () => {
    const studioAddress = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    mockContract.verifyStudio(studioAddress)
    const result = mockContract.verifyStudio(studioAddress)
    expect(result).toEqual({ type: "err", value: 101 }) // ERR-ALREADY-VERIFIED
  })
  
  it("should revoke verification successfully", () => {
    const studioAddress = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    mockContract.verifyStudio(studioAddress)
    const result = mockContract.revokeVerification(studioAddress)
    expect(result).toEqual({ type: "ok", value: true })
    expect(mockContract.isVerified(studioAddress)).toBe(false)
  })
  
  it("should fail to revoke verification for non-verified studio", () => {
    const studioAddress = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    const result = mockContract.revokeVerification(studioAddress)
    expect(result).toEqual({ type: "err", value: 102 }) // ERR-NOT-VERIFIED
  })
  
  it("should transfer admin rights successfully", () => {
    const newAdmin = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
    const result = mockContract.transferAdmin(newAdmin)
    expect(result).toEqual({ type: "ok", value: true })
    expect(state.admin).toBe(newAdmin)
  })
})

