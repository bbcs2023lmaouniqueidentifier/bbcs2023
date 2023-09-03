all : prettier deps
	@echo "Done"

.PHONY : prettier deps

deps :
	npm install
	pip install -r requirements.txt

prettier :
	npx prettier . --write
