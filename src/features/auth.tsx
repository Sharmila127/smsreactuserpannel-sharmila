/* eslint-disable @typescript-eslint/no-explicit-any */

import Client from "../../src/api"

export const loginUser = async (data: any) => {
  try {
    const response = await new Client().user.auth.login(data)
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error
  }
}

export const signUp = async (data: any) => {
  try {
    const response = await new Client().user.auth.signUp(data)
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
export const verifyotp = async (data: any) => {
  try {
    const response = await new Client().user.auth.verify_otp(data)
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

export const forgotPassword = async (data: any) => {
  try {
    const response = await new Client().user.auth.forgotPassword(data)
    return response;
  } catch (error) {
    console.error("Error in forgot password:", error);
    throw error;

  }
}

export const resetPassword = async (data: any) => {
  try {
    const response = await new Client().user.auth.resetPassword(data)
    return response;
  } catch (error) {
    console.error("Error in reset password:", error);
    throw error;

  }
}

export const resendOtp = async (data: any) => {
  try {
    const response = await new Client().user.auth.resend_otp(data)
    return response;
  } catch (error) {
    console.error("Error in resending OTP:", error);
    throw error;
  }
}


