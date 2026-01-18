import os
import json
from datetime import datetime

# 1. Configuration: Where are the raw test results?
RESULTS_DIR = "allure-results"

def analyze_quality():
    print("🔍 Scanning test results...")
    
    total_tests = 0
    passed = 0
    failed = 0
    broken = 0
    
    # 2. Iterate through every file in the folder
    # In Big Data, this is how you process "unstructured data lakes"
    if not os.path.exists(RESULTS_DIR):
        print(f"❌ Error: Directory '{RESULTS_DIR}' not found. Run tests first!")
        return

    for filename in os.listdir(RESULTS_DIR):
        # We only care about the test result files (ending in -result.json)
        if filename.endswith("-result.json"):
            filepath = os.path.join(RESULTS_DIR, filename)
            
            with open(filepath, "r") as f:
                try:
                    data = json.load(f)
                    total_tests += 1
                    
                    # 3. Extract the status (Data Mining)
                    status = data.get("status", "unknown")
                    
                    if status == "passed":
                        passed += 1
                    elif status == "failed":
                        failed += 1
                    elif status == "broken":
                        broken += 1
                        
                except Exception as e:
                    print(f"⚠️ Could not parse {filename}: {e}")

    # 4. The "Data Science" Part: Calculate Metrics
    if total_tests == 0:
        print("⚠️ No tests found.")
        return

    pass_rate = (passed / total_tests) * 100
    
    # 5. Generate the "Manager Report"
    print("\n" + "="*30)
    print(f"📊 QUALITY REPORT - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("="*30)
    print(f"Total Tests:  {total_tests}")
    print(f"✅ Passed:     {passed}")
    print(f"❌ Failed:     {failed}")
    print(f"⚠️ Broken:     {broken}")
    print("-" * 30)
    print(f"📈 Success Rate: {pass_rate:.2f}%")
    print("="*30 + "\n")

if __name__ == "__main__":
    analyze_quality()