import hashlib
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
import os

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)

# Define dictionaries to store timestamps (keys) and visit counts (values) with IP addresses
visits = {}
ip_visits = {}

# Function to clean up old entries (more than 24 hours old)
def clean_visits():
  current_time = datetime.utcnow()
  threshold = current_time - timedelta(days=1)
  for timestamp in list(visits.keys()):
    if datetime.strptime(timestamp, "%Y-%m-%dT%H") < threshold:
      del visits[timestamp]
      del ip_visits[timestamp]

# Function to hash IP address
def hash_ip(ip_address):
  # Choose a secure hashing algorithm (e.g., sha256)
  return hashlib.sha256(ip_address.encode()).hexdigest()

# Route for all requests (can be modified for specific paths)
@app.route("/")
def track_visit():
  clean_visits()  # Clean up before recording new visit
  current_time = datetime.utcnow().strftime("%Y-%m-%dT%H")  # Format timestamp
  client_ip = hash_ip(request.remote_addr)  # Get client IP address

  # Check if current timestamp exists and if IP has visited within 1 hour
  if current_time in visits and client_ip in ip_visits[current_time] and (datetime.strptime(current_time, "%Y-%m-%dT%H") - datetime.strptime(ip_visits[current_time][client_ip], "%Y-%m-%dT%H")) < timedelta(hours=1):
    pass  # Do nothing if same IP visited within 1 hour
  else:
    if current_time not in visits:
      visits[current_time] = 0
      ip_visits[current_time] = {}
    visits[current_time] += 1
    ip_visits[current_time][client_ip] = current_time  # Record visit time for IP
  
  response = jsonify({
    "ip": request.remote_addr,
    "visits": ip_visits
  })
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response

# searches = []

# def incrementCount(place, country):
#   for search in searches:
#     if search["place"] == place and search["country"] == country:
#       search["count"] += 1
#       return True
#   return False

# @app.route("/search_place", methods=["GET", "POST"])
# def track_searches():
#   if request.method == "POST":
#     # place = request.form["place"]
#     # country = request.form["country"]
#     place = request.get_json().get("place")
#     country = request.get_json().get("country")

#     if incrementCount(place, country) == False:
#       searches.append({
#         "place": place,
#         "country": country,
#         "count": 1
#       })

#     response = jsonify(searches)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response
#   elif request.method == "GET":
#     response = jsonify(searches)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response
  
#   response = jsonify({})
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   return response

if __name__ == "__main__":
  context = ('webte_fei_stuba_sk.pem', 'webte.fei.stuba.sk.key')
  app.run(host="0.0.0.0", port=5004, ssl_context=context)
