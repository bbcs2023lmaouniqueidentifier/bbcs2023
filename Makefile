all :
	@echo "Usage: make prettier|deps|run|docker-run"

.PHONY : prettier deps

deps :
	npm install
	pip install -r requirements.txt

prettier :
	npx prettier . --write

docker-run :
	docker compose down --rmi all -v
	docker compose --project-name=bbcs-hackathon build
	docker compose up -d

run :
	sh run.sh
