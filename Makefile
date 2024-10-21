.PHONY: prebuild, install, build, .help

help:
	@echo "Targets:"
	@echo "	install: Install node dependencies"
	@echo "	build: Build the project (run prebuild before)"
	@echo "	docker: Build docker image"

install:
	@echo "Installing node dependencies (npm)"
	npm install

build:
	@echo "Installing node dependencies (npm)"
	npm build

run:
	@echo "Running the project"
	npm run dev

docker:
	@echo "Building docker image"
	docker build -t nginx-vue-app .