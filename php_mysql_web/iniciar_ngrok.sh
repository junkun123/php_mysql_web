#!/bin/bash

# Cierra instancias anteriores
pkill ngrok

# Inicia ngrok en segundo plano
nohup ngrok tcp 3306 > ngrok.log &

# Espera a que arranque
sleep 5

# Extrae la URL
NGROK_URL=$(curl -s localhost:4040/api/tunnels | grep -o 'tcp://[^"]*')
HOST=$(echo "$NGROK_URL" | cut -d: -f2 | sed 's|//||')
PORT=$(echo "$NGROK_URL" | cut -d: -f3)

echo "🔗 Copia estos valores a .render.yaml:"
echo "DB_HOST: $HOST"
echo "DB_PORT: $PORT"
