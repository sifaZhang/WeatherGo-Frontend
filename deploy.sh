#!/bin/bash

echo "🚀 Triggering Render Deployments..."

echo "1. Deploying Frontend..."
curl -s -X POST "https://api.render.com/deploy/srv-d8ebkes2m8qs738od7e0?key=Lgfj6X_vsXM"

echo -e "\n\n2. Deploying Backend..."
curl -s -X POST "https://api.render.com/deploy/srv-d8ebige8bjmc73avokd0?key=3SCnphOroSM"

echo -e "\n\n3. Deploying AISuggestion Microservice..."
curl -s -X POST "https://api.render.com/deploy/srv-d8ebjev40ujc73deq380?key=uJj9Deqhf2Y"

echo -e "\n\n✅ Deployment requests sent successfully!"
echo "Check your Render Dashboard for build status."
