# ClariFlow - New Born

> **ClariFlow** is a 12-step, production-grade AI support engine built to eliminate LLM hallucinations caused by ambiguous user queries. Instead of blindly guessing when essential context is missing, ClariFlow enforces strict **Pydantic schema validation**, detects ambiguity, and proactively asks targeted clarification questions before generating responses grounded strictly in domain knowledge.

---

## 📸 System Architecture & Pipeline Flow

```text
[User Ingestion] ───────> 1. Telegram / WhatsApp Interface
                                    │
                                    ▼
                          2. FastAPI Backend Engine
                                    │
                          3. Session State & DB Memory (Redis / SQLite)
                                    │
                          4. Intent Classifier & Router
                                    │
                          5. Pydantic Schema Validation
                                    │
                          6. Missing-Field & Ambiguity Gatekeeper
                                    │
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
[ Ambiguous Query Detected ]                           [ Valid Query Context ]
7. Proactive Clarification Engine                                │
       │                                                         ▼
       └───────────> (Return to User)                  8. Database / API Tool Execution
                                                                 │
                                                       9. Grounded LLM Response (Groq)
                                                                 │
                                                       10. Safety Guardrails & PII Filter
                                                                 │
                                                       11. Streamlit Monitoring Dashboard
                                                                 │
                                                       12. Automated Evaluation Harness
