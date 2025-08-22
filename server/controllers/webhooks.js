import { Webhook } from "svix";
import User from "../models/User.js";

export const ClerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    console.log("📩 Clerk Webhook event:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url, // ✅ correct field
        };

        await User.create(userData);
        console.log("✅ User created:", userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address, // ✅ fixed
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("✅ User updated:", data.id);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        res.json({});
        break;
      }

      default:
        console.log("⚠️ Unhandled event:", type);
        res.json({});
        break;
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
