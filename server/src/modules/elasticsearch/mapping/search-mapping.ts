// elastic-configs.ts
export const postMapping = {
  properties: {
    position: { type: 'text' },
    description: { type: 'text' },
    companyName: { type: 'text' },
    location: { type: 'text' },
    salary: { type: 'text' },
    workingHours: { type: 'text' },
    deadline: { type: 'date' },
    contactInfo: { type: 'text' },
    status: { type: 'text' },
    postedDate: { type: 'date' },
    experience: { type: 'text' },
    numberOfPositions: { type: 'integer' },
    tags: { type: 'keyword' },
    isHot: { type: 'boolean' },
    companyId: { type: 'keyword' },
    userId: { type: 'keyword' },
  },
};

export const autocompleteAnalyzer = {
  analysis: {
    filter: {
      autocomplete_filter: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 20,
      },
    },
    analyzer: {
      autocomplete: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'autocomplete_filter'],
      },
    },
  },
};
