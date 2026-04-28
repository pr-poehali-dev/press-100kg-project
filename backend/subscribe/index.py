import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def handler(event: dict, context) -> dict:
    """Сохраняет email подписчика и фиксирует событие подписки."""
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

    return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}
