.PHONY: install start stop

install:
	@echo "Installing dependencies..."
	npm install

start:
	@echo "Starting server in background..."
	@npx live-server --port=8000 --open=/ --no-browser &
	@echo "Server running at http://localhost:8000"
	@sleep 2
	@open http://localhost:8000 || xdg-open http://localhost:8000

stop:
	@echo "Stopping server..."
	@pkill -f "live-server" || true