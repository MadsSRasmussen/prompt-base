FROM denoland/deno:2.1.1

WORKDIR /app

COPY . .
RUN deno cache main.ts

ENV PORT=8080, RUNTIME_ENVIROMENT="production"

EXPOSE 8080

CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]