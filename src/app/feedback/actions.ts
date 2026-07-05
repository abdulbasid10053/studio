"use server";

export async function sendFeedbackToTelegram(data: {
  feedback: string;
  name: string;
  isAnonymous: boolean;
  isPublishable: boolean;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum diatur di .env");
    return { success: false, error: "Konfigurasi server belum lengkap." };
  }

  // Format pesan
  const senderName = data.isAnonymous ? "Anonim" : (data.name.trim() ? data.name : "Tanpa Nama");
  const publishStatus = data.isPublishable ? "✅ Boleh dipublish" : "❌ Tidak untuk dipublish";
  
  const text = `
📩 *Feedback Baru Muzar Eats*
========================
👤 *Pengirim*: ${senderName}
🌐 *Status Publikasi*: ${publishStatus}

💬 *Pesan*:
${data.feedback}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gagal mengirim ke Telegram:", errorData);
      return { success: false, error: "Gagal mengirim pesan ke Telegram." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error mengirim ke Telegram:", error);
    return { success: false, error: "Terjadi kesalahan internal." };
  }
}
