FROM node:12

# Project needs yarn to run
# https://classic.yarnpkg.com/en/docs/install/#debian-stable
RUN apt-get update && \
	apt-get install apt-transport-https && \
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && \
	apt-get install yarn -y && \
	rm -rf /var/lib/apt/lists/*

COPY . /app
RUN useradd -s /bin/bash -m n8n && \
	chown -R n8n:n8n /app

USER n8n
WORKDIR /app

RUN npm i && npm run bootstrap && npm run build

CMD ["npm", "run", "start"]
