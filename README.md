# 🧠 TruthSync – Real-Time Fact Checking Bot for Discord

**TruthSync** is a 24/7 intelligent Discord bot designed to combat misinformation in real-time. It leverages the power of Google's **Gemini Grounded Search Tool** to analyze and verify the authenticity of any news or statement, directly from your Discord server.

---

## 🚀 Features

- ✅ **24/7 Availability** – Always online and ready to verify!
- 🔍 **AI-Powered Fact Checking** – Backed by **Gemini Grounded Search** for accurate news validation.
- 💬 **Simple Usage** – Just use `!check <message>` to validate a claim.
- 🌐 **Cross-Platform Ready** – Works seamlessly on any Discord server.
- 📡 **Real-Time Results** – Instant feedback on whether the news is true, false, or misleading.

---


TruthSync will analyze the message using Gemini's verification system and return a response indicating whether the claim is accurate or false, along with supporting evidence or clarification.

---

## 🛠️ Tech Stack

| Component       | Technology Used                 |
|----------------|----------------------------------|
| Frontend       | [Next.js](https://nextjs.org/)   |
| Backend        | Python + Gemini API              |
| Development    | Firebase Studio                  |
| Deployment     | Vercel (Frontend), AWS EC2 (Backend) |
| Fact Check Engine | Gemini Grounded Search Tool    |

---

## 💡 How It Works

1. User sends a message with `!check <message>`.
2. The backend processes the message and sends it to **Gemini's Grounded Search Tool**.
3. Gemini evaluates the authenticity of the claim by referencing credible sources.
4. TruthSync returns a detailed response to the Discord server, clarifying whether the news is **true**, **false**, or **needs more context**.

---


## 🧪 Roadmap / Upcoming Features

- 🔗 Source Linking – View original fact-checking sources for transparency.
- 🌐 Multilingual Support – Verify news in multiple languages.
- 📈 Fact-Check Analytics Dashboard – Track what’s being verified most frequently.
- 🛡️ Misinformation Alert System – Real-time alerts for trending fake news.
- 🤖 Cross-Platform Support – Integration with **WhatsApp** and **Slack** coming soon.
- 📰 Knowledge Base Integration – In the future, TruthSync will include a constantly updated **news knowledge base** to cross-reference messages with real-time events for enhanced accuracy.


---

## 🤝 Contributing

Want to improve TruthSync or add new features? Feel free to fork the repo and create a pull request. Contributions are welcome!

---


## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by developers who care about the **truth**.

