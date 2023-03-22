#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$0")

source "$SCRIPT_DIR/db_migrate.sh" accounts
