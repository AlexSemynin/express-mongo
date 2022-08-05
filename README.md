# Классика :)
## посты-пользователи
--

## Стек

Сборка, разработка:
- typescript, webpack, nodemon

Server, DB, ODM:
- nodejs, mongodb, mongoose

Client:
- react, mobx

tecnology:
- rest, jwt

--

## for developer
- установить докер
- клонировать репозиторий
```
git clone https://github.com/AlexSemynin/express-mongo.git
```

Клиент и сервер запускаются отдельно
- Для запуска сервера выполнить команды:
```
docker-compose up -d
docker-compose logs
```

- Для запуска клиента:
```
cd .\CLient\
npm i
npm run dev
```
nginx выступает в качестве реверс прокси:
запросы начинающиеся с /api проксирует на сервер nodejs, запушенный в контейнере докера
```
http://localhost:3001/api/posts
```
остальные - на dev сервер клиента, запущеный на локальной машине разработчка
по данному запросу отдаст клиентскую статику
```
http://localhost:3001/
```
