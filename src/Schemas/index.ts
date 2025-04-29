import {z} from 'zod';

export const emaiilSchema = z.object({
  email: z.string().min(1,{message: 'Email is required'}).email({message: 'Invalid email address'})
});
export const otpSchema = z.object({
    otp: z.string().min(1, {message: 'OTP is required'}).min(6, {message: 'OTP must be 6 digits'}).max(6, {message: 'OTP must be 6 digits'})
})