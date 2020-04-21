package:
	@echo "ZIPPING into application.zip"
	rm -f Signal.zip application.zip
	cd build && zip -Xr ../application.zip ./*
	zip -j ./Signal.zip application.zip ./build/manifest.webapp metadata.json 