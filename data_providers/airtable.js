const axios = require('axios');

class AirtableApi {
    constructor(apiToken, baseId) {
        this.apiToken = apiToken;
        this.baseId = baseId;
    }

    async getTableRows (tableName, offset = null) {
        let url = `https://api.airtable.com/v0/${ this.baseId }/${ tableName }`;

        if (offset) {
            url += `?offset=${offset}`;
        }

        let config = {
            method: 'get',
            url: url,
            headers: { 
            'Authorization': `Bearer ${ this.apiToken }` 
            }
        };

        try {
            const response = await axios.request(config);
            const data = response.data;

            if (data.offset) {
                const nextRows = await this.getTableRows(tableName, data.offset);
                return data.records.concat(nextRows);
            }

            return data.records;
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    AirtableApi: AirtableApi
}
