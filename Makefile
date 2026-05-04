DOCKER_USERNAME = shanto15
APP_NAME = todo
APP_VERSION ?= 1.0.1

BACKEND_IMAGE = $(DOCKER_USERNAME)/$(APP_NAME)-backend
FRONTEND_IMAGE = $(DOCKER_USERNAME)/$(APP_NAME)-frontend

DOCKER_CONTEXT = todo-app-docker-server
DEPLOY_STACK_NAME = deployed

PLATFORMS ?= linux/amd64,linux/arm64
BUILDER_NAME ?= multiarch-builder

.PHONY: build-images
build-images:
	docker build -f ./backend/Dockerfile.prod -t $(BACKEND_IMAGE):$(APP_VERSION) ./backend
	docker build -f ./frontend/Dockerfile.prod -t $(FRONTEND_IMAGE):$(APP_VERSION) ./frontend

.PHONY: push-images
push-images:
	docker push $(BACKEND_IMAGE):$(APP_VERSION)
	docker push $(FRONTEND_IMAGE):$(APP_VERSION)

.PHONY: release-images
release-images: build-images push-images

.PHONY: buildx-create
buildx-create:
	docker buildx create --name $(BUILDER_NAME) --driver docker-container --use || docker buildx use $(BUILDER_NAME)
	docker buildx inspect --bootstrap

.PHONY: build-images-all-platforms
build-images-all-platforms: buildx-create
	docker buildx build \
		--platform $(PLATFORMS) \
		-f ./backend/Dockerfile.prod \
		-t $(BACKEND_IMAGE):$(APP_VERSION) \
		--push \
		./backend

	docker buildx build \
		--platform $(PLATFORMS) \
		-f ./frontend/Dockerfile.prod \
		-t $(FRONTEND_IMAGE):$(APP_VERSION) \
		--push \
		./frontend

.PHONY: inspect-images
inspect-images:
	docker buildx imagetools inspect $(BACKEND_IMAGE):$(APP_VERSION)
	docker buildx imagetools inspect $(FRONTEND_IMAGE):$(APP_VERSION)

.PHONY: release-images-all-platforms
release-images-all-platforms: build-images-all-platforms inspect-images

.PHONY: aws-deploy
aws-deploy:
	docker --context $(DOCKER_CONTEXT) stack deploy -c docker-stack.yml --with-registry-auth $(DEPLOY_STACK_NAME)

.PHONY: get-aws-deploy-status
get-aws-deploy-status:
	docker --context $(DOCKER_CONTEXT) stack services $(DEPLOY_STACK_NAME)