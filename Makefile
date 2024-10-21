.PHONY: prebuild, install, build, .help

help:
	@echo "Targets:"
	@echo "	install: Install node dependencies"
	@echo "	build: Build the project (run prebuild before)"

install:
	@echo "Installing node dependencies (npm)"
	npm install

build:
	@echo "Installing node dependencies (npm)"
	npm build

run:
	@echo "Running the project"
	npm run dev