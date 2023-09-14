dev: stop
	yarn tauri dev

stop:
	killall node | true

TAG=$(shell git tag -l "*test")

clean-tags:
	git push community --delete ${TAG} || true
	git tag -d ${TAG}
