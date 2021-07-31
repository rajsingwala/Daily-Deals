import axios from "axios";

export const paymentIntent = async (authtoken) =>
  await axios.post(
    `/create-payment-intent`,
    {},
    { headers: { authtoken } }
  );
