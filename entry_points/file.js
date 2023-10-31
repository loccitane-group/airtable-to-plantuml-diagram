require('dotenv').config()

const AirtableApi = require('../data_providers/airtable').AirtableApi;
const FileWriter = require('../data_providers/file').FileWriter;
const PlantUmlGenerator = require('../core/plantuml_generator').PlantUmlGenerator;

const DEFAULT_OUTPUT_FILE_NAME = 'output_diagram.txt';

const main = async () => {
    // Retrieve the API token, base ID, diagram title from the command line arguments or environment variables.
    const apiToken = process.argv[2] || process.env.AIRTABLE_API_TOKEN;
    const baseId = process.argv[3] || process.env.AIRTABLE_BASE_ID;
    const diagramTitle = process.argv[4] || process.env.DIAGRAM_TITLE;
    const outputFileName = process.argv[4] || diagramTitle || DEFAULT_OUTPUT_FILE_NAME;

    const airtableApi = new AirtableApi(apiToken, baseId);
    const fileWriter = new FileWriter(outputFileName);

    const plantUmlGenerator = new PlantUmlGenerator(airtableApi, fileWriter);

    await plantUmlGenerator.generate(diagramTitle);
}

main();
