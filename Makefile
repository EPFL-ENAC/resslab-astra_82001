.PHONY: prebuild, install, build, .help

help:
	@echo "Targets:"
	@echo "	install: Install node dependencies"
	@echo "	install-build: Install node dependencies with npm ci"
	@echo "	build: Build the project (run prebuild before)"
	@echo "	dev: Run the project"
	@echo "	convert: Convert the data to json format"
	@echo "	docker-build: Build docker image"
	@echo "	docker-run: Run docker image"

install:
	@echo "Installing node dependencies (npm)"
	npm install


install-build:
	@echo "Installing build node dependencies (npm)"
	npm ci

# npm run build will run npm run prebuild before automatically
build: install
	@echo "Building project to dist (npm)"
	npm run build

# npm run dev will run npm run predev before automatically
run: install
	@echo "Running the project locally (npm)"
	npm run dev

convert:
	@echo "Converting the data to json format"
	npm run convert

docker-build:
	@echo "Building docker image"
	docker build -t nginx-vue-app .

docker-run: docker-build
	@echo "Running docker image"
	@echo "Open your browser at http://localhost:8080"
	docker run -p 8080:80 nginx-vue-app:latest
