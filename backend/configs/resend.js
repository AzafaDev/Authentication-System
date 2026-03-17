import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_TOKEN);
const sender = "onboarding@resend.dev";

export { resend, sender };
