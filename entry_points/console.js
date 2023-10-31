require('dotenv').config()

const AirtableApi = require('../data_providers/airtable').AirtableApi;
const ConsoleWriter = require('../data_providers/console').ConsoleWriter;
const PlantUmlGenerator = require('../core/plantuml_generator').PlantUmlGenerator;

const main = async () => {
    // Retrieve the API token, base ID, diagram title from the command line arguments or environment variables.
    const apiToken = process.argv[2] || process.env.AIRTABLE_API_TOKEN;
    const baseId = process.argv[3] || process.env.AIRTABLE_BASE_ID;
    const diagramTitle = process.argv[4] || process.env.DIAGRAM_TITLE;

    const airtableApi = new AirtableApi(apiToken, baseId);
    const consoleWriter = new ConsoleWriter();

    const plantUmlGenerator = new PlantUmlGenerator(airtableApi, consoleWriter);

    await plantUmlGenerator.generate(diagramTitle);
}

main();
