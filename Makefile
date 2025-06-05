install:
	npm ci
	make -C frontend install

build:
	make -C frontend build

start:
	npm start