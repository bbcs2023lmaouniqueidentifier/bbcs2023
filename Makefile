all :
	@echo "Usage: make prettier|deps"

.PHONY : prettier deps

deps :
	npm install
	pip install -r requirements.txt

prettier :
	npx prettier . --write

docker-run :
	docker compose --project-name=bbcs-hackathon build
	docker compose up -d