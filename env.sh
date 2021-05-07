#!/bin/bash
# Adapted from technique described here:
# https://medium.freecodecamp.org/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70

# Rebuild output file
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DOTENV=$DIR/$1
OUTPUT=$DIR/$2
echo $DOTENV

rm -rf $OUTPUT
touch $OUTPUT
# Add assignment
echo "// This is a generated file, do not edit" >> $OUTPUT
echo "window._env_ = {" >> $OUTPUT

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    if [[ $line == *"REACT_APP_"* ]]; then
      varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
      varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')

        # Read value of current variable if exists as environment variable
        # This allows us to overwrite from docker settings
        value=$(printf '%s\n' "${!varname}")
        varvalue=$(printf '%s' "$varvalue" | sed -e "s/\"//g")

        # Otherwise use value from .env file
        [[ -z $value ]] && value=${varvalue}

        # Append as kvp to JS file
        echo "  $varname: '$value'," >> $OUTPUT
    fi
  fi
done < $DOTENV
echo "};" >> $OUTPUT
