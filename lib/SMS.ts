import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const serviceId = process.env.TWILLO_SERVICE_ID!;

const client = twilio(accountSid, authToken); // ✅ Initialize Twilio client

export const sendVerificationSMS = async (
  phonenumber: string,
  token: string
) => {
  try {
    // await client.messages.create({
    //   body: `Your OTP code is: ${token}`,
    //   from: ``, // Your Twilio phone number
    //   to: `${phonenumber}`,
    // });
//  await client.verify.v2.services(serviceId)
//       .verifications
//       .create({to: ` ${phonenumber}`, channel: 'sms'})
//       .then(verification => console.log(verification.sid));

    console.log(`✅ SMS Sent to ${phonenumber} with OTP: ${token}`);
  } catch (error) {
    throw new Error("Failed to send verification SMS");
  }
};

export const sendResetPasswordSMS = async (
  phonenumber: string,
  token: string
) => {
  try {
    // await client.messages.create({
    //   body: `Your OTP code is: ${token}`,
    //   from: ``, // Your Twilio phone number
    //   to: `${phonenumber}`,
    // });
//  await client.verify.v2.services(serviceId)
//       .verifications
//       .create({to: ` ${phonenumber}`, channel: 'sms'})
//       .then(verification => console.log(verification.sid));

    console.log(`✅ SMS Sent to ${phonenumber} with OTP: ${token}`);
  } catch (error) {
    throw new Error("Failed to send verification SMS");
  }
};