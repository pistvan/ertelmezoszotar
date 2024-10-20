#!/bin/bash

cd `dirname "$0"`

usage() {
    cat 1>&2 <<EOF
Deploy an SQLite database to Solr.

Usage: $0 [OPTION]... [DATABASE]

  -h, --help            Show this help
EOF
    exit 1
}

eval set -- `getopt --options "h" --long "help" -- "$@"`

while true; do
    case "$1" in
        -h|--help)
            usage;;
        --)
            shift;
            break;;
        *)
            usage;
    esac
done

FILE=$1

if [[ -z $FILE ]]; then
    echo "Database file is not set." >&2
    usage
fi

if [[ ! -f $FILE ]]; then
    echo "Database file $FILE does not exist." >&2
    exit 1
fi

echo "Deploying $FILE to Solr..."

# Path to the SQLite database file inside the container.
INTERNAL_FILE=/tmp/database.sqlite

docker compose run \
    --volume "$FILE:$INTERNAL_FILE:ro" \
    --build \
    --rm \
    cli \
    bun \
    deploy.ts $INTERNAL_FILE
