.DEFAULT_GOAL := help

DOCKER ?= docker
IMAGE ?= quotes-scraper:lab1
NODE_IMAGE := node:22-bookworm
PROJECT_DIR := $(CURDIR)
OUT_DIR := $(PROJECT_DIR)/out
CONTAINER_USER = $$(id -u):$$(id -g)

.PHONY: build run clean ci lock help

help:
	@echo 'make lock       Generate package-lock.json in a Node container'
	@echo 'make build      Build the production image'
	@echo 'make run        Run the scraper; output is mounted at ./out'
	@echo 'make clean      Remove the project image and ./out; preserve builder cache'
	@echo 'make ci         Build, run the scraper and validate JSON in a container'
	@echo 'make help       Show this help (also the default target)'

lock:
	$(DOCKER) run --rm --user "$(CONTAINER_USER)" \
		--env HOME=/tmp --env npm_config_cache=/tmp/npm-cache \
		--mount "type=bind,source=$(PROJECT_DIR),target=/app" --workdir /app \
		$(NODE_IMAGE) npm install --package-lock-only --ignore-scripts --no-audit --no-fund

build:
	$(DOCKER) build --progress=plain --tag "$(IMAGE)" "$(PROJECT_DIR)"

run:
	@$(DOCKER) image inspect "$(IMAGE)" >/dev/null || \
		{ echo 'Image unavailable. Check Docker and run make build first.' >&2; exit 1; }
	@mkdir -p "$(OUT_DIR)"
	$(DOCKER) run --rm --user "$(CONTAINER_USER)" --env HOME=/tmp \
		--mount "type=bind,source=$(OUT_DIR),target=/app/out" "$(IMAGE)"

clean:
	@set -eu; \
		image_ids=$$($(DOCKER) image ls --quiet --filter "reference=$(IMAGE)"); \
		if [ -n "$$image_ids" ]; then \
			$(DOCKER) image rm "$(IMAGE)"; \
		else \
			echo 'Project image already absent: $(IMAGE)'; \
		fi
	@rm -rf -- "$(OUT_DIR)"

# Separate recursive calls preserve order under make -j and stop on any failure.
ci:
	$(MAKE) build
	$(MAKE) run
	@echo 'Validating out/result.json...'
	@$(DOCKER) run --rm --user "$(CONTAINER_USER)" --env HOME=/tmp \
		--mount "type=bind,source=$(OUT_DIR),target=/app/out,readonly" "$(IMAGE)" \
		node --input-type=module -e 'import { readFile } from "node:fs/promises"; const quotes = JSON.parse(await readFile("out/result.json", "utf8")); if (!Array.isArray(quotes) || quotes.length === 0 || quotes.some((quote) => !quote || typeof quote.text !== "string" || !quote.text.trim() || typeof quote.author !== "string" || !quote.author.trim() || !Array.isArray(quote.tags) || quote.tags.some((tag) => typeof tag !== "string"))) throw new Error("Invalid result: expected a non-empty array of quotes with text, author and tags"); console.log("Validated " + quotes.length + " quotes in out/result.json");'

