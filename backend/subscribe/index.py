import json
import os
import psycopg2
import resend

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

OWNER_EMAIL = "fil3241@gmail.com"

def send_notification(email: str, source: str):
    resend.api_key = os.environ["RESEND_API_KEY"]
    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": OWNER_EMAIL,
        "subject": "Новая заявка на гайд",
        "html": f"""
        <h2>Новая заявка с сайта «Жим не врёт»</h2>
        <p><b>Email покупателя:</b> {email}</p>
        <p><b>Источник:</b> {source}</p>
        """,
    })

def handler(event: dict, context) -> dict:
    """Сохраняет email подписчика, отправляет уведомление владельцу."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    email = body.get("email", "").strip().lower()
    source = body.get("source", "pdf_offer")

    if not email or "@" not in email:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "invalid email"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO t_p95342435_press_100kg_project.subscribers (email, source) VALUES (%s, %s) ON CONFLICT (email) DO NOTHING",
        (email, source),
    )
    cur.execute(
        "INSERT INTO t_p95342435_press_100kg_project.events (event, data) VALUES (%s, %s)",
        ("subscription", json.dumps({"email": email, "source": source})),
    )
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_notification(email, source)
    except Exception:
        pass

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
