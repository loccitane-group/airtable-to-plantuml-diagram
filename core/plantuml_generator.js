const NEW_LINE = `\n`;

class PlantUmlGenerator {
    constructor(dataRepository, outputWriter) {
        this.dataRepository = dataRepository;
        this.outputWriter = outputWriter;
    }

    async generate (diagramTitle) {
        let  plantUmlcode = `@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

title ${ diagramTitle }`;

            plantUmlcode += NEW_LINE;
            plantUmlcode += NEW_LINE;
            plantUmlcode += await this.generatePersons();
            plantUmlcode += NEW_LINE;
            plantUmlcode += NEW_LINE;
            plantUmlcode += await this.generateSystems();
            plantUmlcode += NEW_LINE;
            plantUmlcode += NEW_LINE;
            plantUmlcode += await this.generateSystemsRelations();
            plantUmlcode += NEW_LINE;
            plantUmlcode += NEW_LINE;
        
            plantUmlcode += '@enduml';
        
        this.outputWriter.write(plantUmlcode);
    }

    async generatePersons () {
        const rows = await this.dataRepository.getTableRows('Persons');
    
        return rows.map(row => {
            if (!row.fields.id || !row.fields.name) {
                return;
            }
    
            const id = row.fields.id.replaceAll('-', '_');
            const description = row.fields.description ? row.fields.description.trim() : '';
            return `Person(${id}, "${row.fields.name}", "${description}")`
        }).join('\n');
    }
    
    async generateSystems () {
        const rows = await this.dataRepository.getTableRows('Systems');
    
        return rows.map(row => {
            if (!row.fields.id || !row.fields.name) {
                return;
            }
    
            const id = row.fields.id.replaceAll('-', '_');
            const description = row.fields.description ? row.fields.description.trim() : '';
            return `System(${id}, "${row.fields.name}", "${description}")`
        }).join('\n');
    }
    
    async generateSystemsRelations () {
        const containers = await this.dataRepository.getTableRows('Containers');
        const persons = await this.dataRepository.getTableRows('Persons');
        const useCases = await this.dataRepository.getTableRows('UseCases');
        const systems = await this.dataRepository.getTableRows('Systems');
    
        const relations = await this.dataRepository.getTableRows('PersonInteractions');
    
        return relations.map(relation => {
            if (!relation.fields.person || !relation.fields.container || !relation.fields.useCase) {
                return;
            }
    
            const relatedPerson = persons.find(person => person.id === relation.fields.person[0]);
            const relatedContainer = containers.find(container => container.id === relation.fields.container[0]);
            const relatedSystem = systems.find(system => system.id === relatedContainer.fields.system[0]);
            const relatedUseCase = useCases.find(useCase => useCase.id === relation.fields.useCase[0]);
            const description = relatedUseCase.fields.description ? relatedUseCase.fields.description.trim() : '';
    
            return `Rel(${relatedPerson.fields.id.replaceAll('-', '_')}, "${relatedSystem.fields.id.replaceAll('-', '_')}", "${relatedUseCase.fields.name}", "${description}")`
        }).join('\n');
    }
    
}

module.exports = {
    PlantUmlGenerator: PlantUmlGenerator
}
