FROM node:12

COPY . /app
RUN useradd -s /bin/bash -m n8n && \
	chown -R n8n:n8n /app

USER n8n
WORKDIR /app

RUN npm config set prefix ~/.npm/global && \
	npm i -g yarn

ENV PATH "/home/n8n/.npm/global:$PATH"

RUN npm i && npm run bootstrap && npm run build

CMD ["npm", "run", "start"]
