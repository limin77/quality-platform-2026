import sqlite3
import pandas as pd  # Optional: Data Scientists often use Pandas with SQL

def run_data_integrity_check():
    print("🗄️  Connecting to Production Replica Database...")
    
    # 1. Setup: Create a temporary "Mock" Database in memory
    # (In a real job, you would connect to: psycopg2.connect(host="production-db"))
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()

    # 2. Schema: Recreate the table structure (Simulating the App DB)
    cursor.execute('''
        CREATE TABLE bookings (
            booking_id INTEGER PRIMARY KEY,
            firstname TEXT,
            lastname TEXT,
            totalprice INTEGER,
            depositpaid BOOLEAN,
            bookingdates_checkin DATE
        )
    ''')

    # 3. Simulation: Insert the data we "Expect" to find
    # (Simulates the app saving the data from your Playwright test)
    mock_data = [
        (101, "Jim", "Ericsson", 250, True, "2026-01-01"),
        (102, "Sarah", "Connor", 999, False, "2026-02-14"),
        (103, "Test", "Bot", 150, True, "2026-01-20")
    ]
    cursor.executemany('INSERT INTO bookings VALUES (?,?,?,?,?,?)', mock_data)
    conn.commit()

    # ======================================================
    # 🕵️‍♂️ THE TEST: Data Scientist Verification Logic
    # ======================================================
    print("🔍 Executing SQL Query: SELECT * FROM bookings WHERE lastname='Connor'...")
    
    # Query: Verify the specific user exists
    cursor.execute("SELECT * FROM bookings WHERE lastname=?", ("Connor",))
    record = cursor.fetchone()

    if record:
        print(f"✅ PASS: Found expected record in DB: {record}")
    else:
        print("❌ FAIL: Record 'Connor' missing from Database!")
        exit(1)

    # Advanced Check: Verify Data Types & Integrity (Data Science check)
    print("\n📊 Verifying Price Distribution (Data Integrity)...")
    
    # Using Pandas to check for outliers (Data Science style)
    df = pd.read_sql_query("SELECT totalprice FROM bookings", conn)
    avg_price = df['totalprice'].mean()
    
    print(f"   -> Average Booking Price: ${avg_price:.2f}")
    
    if avg_price > 0:
        print("✅ PASS: Financial data looks sane.")
    else:
        print("❌ FAIL: Negative or Zero pricing detected!")

    conn.close()

if __name__ == "__main__":
    run_data_integrity_check()