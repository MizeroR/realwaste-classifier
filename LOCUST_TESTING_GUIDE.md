# Locust Load Testing Guide

## Quick Start

### 1. Activate Your Virtual Environment

```bash
source path/to/your/venv/bin/activate
```

### 2. Run Locust with Web UI

```bash
locust -f locustfile.py --host=https://realwaste-classifier-production.up.railway.app
```

Then open: http://localhost:8089

### 3. Configure Test Parameters in Web UI

- **Number of users**: Start with 10, then try 50, 100
- **Spawn rate**: 5 users/second
- **Host**: Already set to Railway URL

---

## Command Line Tests (No Web UI)

### Light Load Test (10 users, 2 users/sec spawn)

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 10 \
  --spawn-rate 2 \
  --run-time 60s \
  --headless \
  --html reports/light_load_report.html
```

### Medium Load Test (50 users, 5 users/sec spawn)

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 50 \
  --spawn-rate 5 \
  --run-time 120s \
  --headless \
  --html reports/medium_load_report.html
```

### Heavy Load Test (100 users, 10 users/sec spawn)

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 100 \
  --spawn-rate 10 \
  --run-time 180s \
  --headless \
  --html reports/heavy_load_report.html
```

### Spike Test (200 users, fast spawn)

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 200 \
  --spawn-rate 20 \
  --run-time 60s \
  --headless \
  --html reports/spike_load_report.html
```

---

## Understanding the Results

### Key Metrics to Look For:

1. **Request per Second (RPS)**

   - How many requests the API handles per second
   - Higher is better

2. **Response Time**

   - Average, median, 95th percentile, 99th percentile
   - Lower is better
   - Goal: < 500ms for 95th percentile

3. **Failure Rate**

   - Percentage of failed requests
   - Goal: < 1%

4. **Throughput**
   - Total requests handled
   - Shows system capacity

### What Good Results Look Like:

```
Type     Name                              # reqs    # fails  |  Avg    Min    Max   Median  |   req/s
--------|----------------------------------|---------|---------|---------------------------|--------
POST     /predict [Image Classification]   1000       0      |  250    120    890    230    |   16.5
GET      /health [Health Check]            400        0      |   85     45    320     78    |    6.6
GET      /classes [Get Classes]            200        0      |   92     50    280     85    |    3.3
GET      /stats [Get Statistics]           200        0      |   88     48    295     82    |    3.3
POST     /retrain [Model Retraining]       50         0      |  180     95    450    165    |    0.8
--------|----------------------------------|---------|---------|---------------------------|--------
         Aggregated                        1850       0      |  175     45    890    145    |   30.5

Response time percentiles (approximated)
Type     Name                              50%    66%    75%    80%    90%    95%    98%    99%  99.9%  100%
--------|----------------------------------|------|------|------|------|------|------|------|------|------|------
POST     /predict [Image Classification]   230    260    290    310    380    450    620    750    890    890
GET      /health [Health Check]             78     95    110    125    165    195    245    290    320    320
```

---

## Test Scenarios

### Scenario 1: Normal Traffic

**Goal**: Baseline performance measurement

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 20 \
  --spawn-rate 2 \
  --run-time 300s \
  --headless
```

### Scenario 2: Peak Hours

**Goal**: Simulate high usage during peak hours

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 75 \
  --spawn-rate 5 \
  --run-time 300s \
  --headless
```

### Scenario 3: Stress Test

**Goal**: Find breaking point

```bash
locust -f locustfile.py \
  --host=https://realwaste-classifier-production.up.railway.app \
  --users 150 \
  --spawn-rate 15 \
  --run-time 180s \
  --headless
```

---

## Tips for Your Assignment

1. **Run Multiple Tests**: Show different load levels
2. **Save HTML Reports**: Include in your submission
3. **Take Screenshots**: Capture the Locust web UI charts
4. **Document Results**: Note response times and failure rates
5. **Compare Scenarios**: Show how performance changes with load

---

## Troubleshooting

### Error: "Connection refused"

- Make sure Railway API is running
- Check the URL is correct

### High Failure Rate

- Railway might be throttling
- Try reducing user count
- Increase wait_time in locustfile.py

### Slow Response Times

- Normal for Railway's free tier
- Document this in your report
- Consider Railway resource limits
