#!/bin/bash

set -e

CONTAINER_NAME="postgres"

docker exec -i $CONTAINER_NAME psql -U root -d inventory < ./backups/dump.sql
# pg_restore -d inventory ./backups/dump.sql
