
# airtable-to-plantuml-diagram

Generate PlantUML code from Airtable data.

  

## Setup

- Create an Airtable personal access token [Airtable: Personal access tokens](https://airtable.com/create/tokens)

  

- (Optional) Create a .env file at the root (see example with `.env.example` file)

- (Optional) Fill the Airtable API token, the Airtable base Id, and a title for your diagram

  

## Usage

  

### Console output

  

```bash

npm  run  generate-console  "<YOUR AIRTABLE TOKEN HERE>"  "<YOUR AIRTABLE BASE ID HERE>"  "<A TITLE FOR THE DIAGRAM>"

```

  

(Optional) Or if `.env` exists with configured settings:

```bash

npm  run  generate-console

```

  
  

### File output

```bash

npm  run  generate-file  "<YOUR AIRTABLE TOKEN HERE>"  "<YOUR AIRTABLE BASE ID HERE>"  "<A TITLE FOR THE DIAGRAM>"

```

  

(Optional) Or if `.env` exists with configured settings:

```bash

npm  run  generate-file

```