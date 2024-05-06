#!/bin/bash

set -e

# Имя контейнера
CONTAINER_NAME="postgres"

# Имя файла дампа
DUMP_FILE="dump.sql"

# Выполнение pg_dumpall
docker exec -it $CONTAINER_NAME pg_dumpall -U root > ./backups/$DUMP_FILE

echo "Дамп базы данных успешно создан: $DUMP_FILE"
