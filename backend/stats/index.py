import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def handler(event: dict, context) -> dict:
    """Возвращает статистику: клики, подписки и конверсии в платный гайд."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM t_p95342435_press_100kg_project.subscribers")
    subscriptions = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM t_p95342435_press_100kg_project.events WHERE event = 'guide_click'")
    conversions = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM t_p95342435_press_100kg_project.events WHERE event IN ('pdf_cta_click', 'guide_click', 'telegram_click')")
    clicks = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": CORS,
        "body": json.dumps({"clicks": clicks, "subscriptions": subscriptions, "conversions": conversions}),
    }
